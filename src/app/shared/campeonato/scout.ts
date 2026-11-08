// Cálculos do Scout: classificação, mata-mata (regras do regulamento), modelo de
// probabilidade (Poisson) e estatísticas por time. Funções puras, sem Angular.
import { Artilheiro, SumulaDoJogo, Jogo, PlacarConfronto, PlacaresMataMata, TimeElenco, TimeTurno } from '../models/campeonato.model';

export type Resultado = 'V' | 'E' | 'D';

// ----------------------------------------------------------------------------
// Classificação geral (mesmos critérios da página da categoria)
// ----------------------------------------------------------------------------

export function classificacaoGeral(turnos: TimeTurno[][]): TimeTurno[] {
  const mapa = new Map<string, TimeTurno>();
  for (const turno of turnos) {
    for (const t of turno) {
      const jogos = t.wins + t.draws + t.losses;
      const atual = mapa.get(t.name);
      if (!atual) {
        mapa.set(t.name, { ...t, games: jogos, players: [] });
      } else {
        atual.points += t.points;
        atual.SaldoGols += t.SaldoGols;
        atual.games += jogos;
        atual.wins += t.wins;
        atual.draws += t.draws;
        atual.losses += t.losses;
        atual.goalsFor += t.goalsFor;
        atual.goalsAgainst += t.goalsAgainst;
        atual.woLosses += t.woLosses;
      }
    }
  }
  return [...mapa.values()].sort((a, b) =>
    b.points - a.points || b.wins - a.wins || b.SaldoGols - a.SaldoGols || b.goalsFor - a.goalsFor);
}

// ----------------------------------------------------------------------------
// Mata-mata (regulamento 2.2.2.3 a 2.4.3)
// ----------------------------------------------------------------------------

export interface Duelo {
  rotulo: string;
  timeA: TimeTurno | null;
  timeB: TimeTurno | null;
  placar: PlacarConfronto;
  completo: boolean;
  vencedor: TimeTurno | null;
  perdedor: TimeTurno | null;
}

export interface MataMata {
  quartas: Duelo[];
  semifinais: Duelo[];
  final: Duelo;
}

export const PLACAR_VAZIO: PlacarConfronto = { idaA: null, idaB: null, voltaA: null, voltaB: null };

/** Posição (0 = melhor) na classificação geral. */
export function posicao(geral: TimeTurno[], nome: string): number {
  return geral.findIndex(t => t.name === nome);
}

function duelo(geral: TimeTurno[], rotulo: string, a: TimeTurno | null, b: TimeTurno | null, placar: PlacarConfronto): Duelo {
  const completo = [placar.idaA, placar.idaB, placar.voltaA, placar.voltaB].every(v => v !== null);
  let vencedor: TimeTurno | null = null;
  if (a && b && completo) {
    const totA = placar.idaA! + placar.voltaA!;
    const totB = placar.idaB! + placar.voltaB!;
    // empate no agregado: avança o melhor TPG (vantagem de dois empates)
    vencedor = totA === totB
      ? (posicao(geral, a.name) <= posicao(geral, b.name) ? a : b)
      : (totA > totB ? a : b);
  }
  return { rotulo, timeA: a, timeB: b, placar, completo, vencedor, perdedor: vencedor ? (vencedor === a ? b : a) : null };
}

export function montarMataMata(geral: TimeTurno[], p: PlacaresMataMata): MataMata {
  const g = (i: number) => geral[i] ?? null;
  const quartas = [
    duelo(geral, '4º x 5º', g(3), g(4), p.quartas.q1),
    duelo(geral, '3º x 6º', g(2), g(5), p.quartas.q2),
    duelo(geral, '2º x 7º', g(1), g(6), p.quartas.q3),
    duelo(geral, '1º x 8º', g(0), g(7), p.quartas.q4),
  ];
  // semifinais remontadas pelo TPG: melhor x pior (S2) e 2º x 3º (S1)
  const classif = quartas.map(q => q.vencedor);
  const ordem: (TimeTurno | null)[] = classif.every(t => t)
    ? (classif as TimeTurno[]).sort((a, b) => posicao(geral, a.name) - posicao(geral, b.name))
    : [null, null, null, null];
  const semifinais = [
    duelo(geral, 'Semifinal 1', ordem[1], ordem[2], p.semifinais.s1),
    duelo(geral, 'Semifinal 2 · melhor colocado', ordem[0], ordem[3], p.semifinais.s2),
  ];
  const final = duelo(geral, 'Final', semifinais[0].vencedor, semifinais[1].vencedor, p.final);
  return { quartas, semifinais, final };
}

// ----------------------------------------------------------------------------
// Modelo de probabilidade: Poisson com força de ataque e de defesa
// ----------------------------------------------------------------------------
// Gols esperados de A contra B = média da série × ataque(A) × defesa(B).
// Ataque/defesa vêm dos jogos da 1ª fase; jogos mais recentes pesam um pouco mais
// e cada time recebe 3 "jogos médios" de amortecimento para não exagerar extremos.

const PESO_TURNO: Record<number, number> = { 1: 0.8, 2: 1, 3: 1.2 };
const AMORTECIMENTO = 3;
const MAX_GOLS = 15;

export interface Modelo {
  media: number;
  ataque: Map<string, number>;
  defesa: Map<string, number>;
}

export function criarModelo(jogos: Jogo[]): Modelo {
  const acc = new Map<string, { gp: number; gc: number; j: number }>();
  let gols = 0, pesoTotal = 0;
  for (const jg of jogos) {
    const w = PESO_TURNO[jg.turno] ?? 1;
    const [gm, gv] = jg.gols;
    for (const [time, gp, gc] of [[jg.mandante, gm, gv], [jg.visitante, gv, gm]] as const) {
      const o = acc.get(time) ?? { gp: 0, gc: 0, j: 0 };
      o.gp += w * gp; o.gc += w * gc; o.j += w;
      acc.set(time, o);
    }
    gols += w * (gm + gv);
    pesoTotal += 2 * w;
  }
  const media = pesoTotal ? gols / pesoTotal : 1.5;
  const ataque = new Map<string, number>();
  const defesa = new Map<string, number>();
  for (const [time, o] of acc) {
    ataque.set(time, (o.gp + AMORTECIMENTO * media) / (o.j + AMORTECIMENTO) / media);
    defesa.set(time, (o.gc + AMORTECIMENTO * media) / (o.j + AMORTECIMENTO) / media);
  }
  return { media, ataque, defesa };
}

export function golsEsperados(m: Modelo, a: string, b: string): number {
  return m.media * (m.ataque.get(a) ?? 1) * (m.defesa.get(b) ?? 1);
}

function poisson(lambda: number): number[] {
  const p: number[] = [Math.exp(-lambda)];
  for (let k = 1; k <= MAX_GOLS; k++) p.push(p[k - 1] * lambda / k);
  return p;
}

/** Distribuição da diferença de gols (A − B) de um jogo, indexada por d + MAX_GOLS. */
function difJogo(m: Modelo, a: string, b: string): number[] {
  const pa = poisson(golsEsperados(m, a, b));
  const pb = poisson(golsEsperados(m, b, a));
  const d = new Array(2 * MAX_GOLS + 1).fill(0);
  for (let x = 0; x <= MAX_GOLS; x++) for (let y = 0; y <= MAX_GOLS; y++) d[x - y + MAX_GOLS] += pa[x] * pb[y];
  return d;
}

export interface ProbJogo { vitoriaA: number; empate: number; vitoriaB: number; placarProvavel: [number, number]; golsA: number; golsB: number; }

export function probJogo(m: Modelo, a: string, b: string): ProbJogo {
  const la = golsEsperados(m, a, b), lb = golsEsperados(m, b, a);
  const pa = poisson(la), pb = poisson(lb);
  let v = 0, e = 0, d = 0, melhor = -1, placar: [number, number] = [0, 0];
  for (let x = 0; x <= MAX_GOLS; x++) for (let y = 0; y <= MAX_GOLS; y++) {
    const p = pa[x] * pb[y];
    if (x > y) v += p; else if (x === y) e += p; else d += p;
    if (p > melhor) { melhor = p; placar = [x, y]; }
  }
  return { vitoriaA: v, empate: e, vitoriaB: d, placarProvavel: placar, golsA: la, golsB: lb };
}

/**
 * Probabilidade de A avançar num confronto de ida e volta, considerando os jogos já
 * disputados e a vantagem do empate para quem tem melhor TPG.
 */
export function probAvancar(m: Modelo, a: string, b: string, placar: PlacarConfronto, vantagemA: boolean): number {
  let saldo = 0;
  let restantes = 0;
  for (const [ga, gb] of [[placar.idaA, placar.idaB], [placar.voltaA, placar.voltaB]]) {
    if (ga !== null && gb !== null) saldo += ga - gb; else restantes++;
  }
  // distribuição do saldo agregado
  let dist = new Map<number, number>([[saldo, 1]]);
  const dj = difJogo(m, a, b);
  for (let r = 0; r < restantes; r++) {
    const nova = new Map<number, number>();
    for (const [s, ps] of dist) dj.forEach((pd, i) => { if (pd > 1e-12) nova.set(s + i - MAX_GOLS, (nova.get(s + i - MAX_GOLS) ?? 0) + ps * pd); });
    dist = nova;
  }
  let p = 0;
  for (const [s, ps] of dist) if (s > 0 || (s === 0 && vantagemA)) p += ps;
  return p;
}

export interface ChanceTitulo { time: TimeTurno; semi: number; final: number; titulo: number; }

/** Chances de semifinal, final e título enumerando todos os caminhos do chaveamento. */
export function chancesTitulo(m: Modelo, geral: TimeTurno[], mm: MataMata): ChanceTitulo[] {
  const res = new Map<string, ChanceTitulo>();
  for (const t of geral.slice(0, 8)) res.set(t.name, { time: t, semi: 0, final: 0, titulo: 0 });
  const pos = (t: TimeTurno) => posicao(geral, t.name);
  const melhor = (a: TimeTurno, b: TimeTurno) => pos(a) <= pos(b);
  const placarSe = (d: Duelo, a: TimeTurno, b: TimeTurno) =>
    d.timeA?.name === a.name && d.timeB?.name === b.name ? d.placar : PLACAR_VAZIO;

  const pq = mm.quartas.map(q => q.timeA && q.timeB
    ? probAvancar(m, q.timeA.name, q.timeB.name, q.placar, melhor(q.timeA, q.timeB)) : 0);

  for (let mask = 0; mask < 16; mask++) {
    let prob = 1;
    const venc: TimeTurno[] = [];
    mm.quartas.forEach((q, i) => {
      const ganhaA = !(mask & (1 << i));
      prob *= ganhaA ? pq[i] : 1 - pq[i];
      venc.push((ganhaA ? q.timeA : q.timeB)!);
    });
    if (prob < 1e-12 || venc.some(v => !v)) continue;
    venc.forEach(v => res.get(v.name)!.semi += prob);
    const o = [...venc].sort((a, b) => pos(a) - pos(b));
    const s1: [TimeTurno, TimeTurno] = [o[1], o[2]];
    const s2: [TimeTurno, TimeTurno] = [o[0], o[3]];
    const p1 = probAvancar(m, s1[0].name, s1[1].name, placarSe(mm.semifinais[0], s1[0], s1[1]), melhor(s1[0], s1[1]));
    const p2 = probAvancar(m, s2[0].name, s2[1].name, placarSe(mm.semifinais[1], s2[0], s2[1]), melhor(s2[0], s2[1]));
    for (const [f1, q1] of [[s1[0], p1], [s1[1], 1 - p1]] as const) {
      for (const [f2, q2] of [[s2[0], p2], [s2[1], 1 - p2]] as const) {
        const pf = prob * q1 * q2;
        if (pf < 1e-12) continue;
        res.get(f1.name)!.final += pf;
        res.get(f2.name)!.final += pf;
        const pt = probAvancar(m, f1.name, f2.name, placarSe(mm.final, f1, f2), melhor(f1, f2));
        res.get(f1.name)!.titulo += pf * pt;
        res.get(f2.name)!.titulo += pf * (1 - pt);
      }
    }
  }
  return [...res.values()].sort((a, b) => b.titulo - a.titulo || pos(a.time) - pos(b.time));
}

// ----------------------------------------------------------------------------
// Estatísticas por time
// ----------------------------------------------------------------------------

export interface JogoDoTime { jogo: Jogo; adversario: string; gp: number; gc: number; resultado: Resultado; }

export function jogosDoTime(jogos: Jogo[], time: string): JogoDoTime[] {
  return jogos
    .filter(j => j.mandante === time || j.visitante === time)
    .sort((a, b) => a.data.localeCompare(b.data))
    .map(j => {
      const casa = j.mandante === time;
      const gp = casa ? j.gols[0] : j.gols[1];
      const gc = casa ? j.gols[1] : j.gols[0];
      return { jogo: j, adversario: casa ? j.visitante : j.mandante, gp, gc, resultado: gp > gc ? 'V' : gp === gc ? 'E' : 'D' };
    });
}

export interface ResumoTime {
  nome: string;
  icon: string;
  posicao: number;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsPro: number;
  golsContra: number;
  aproveitamento: number;
  mediaGolsPro: number;
  mediaGolsContra: number;
  semSofrerGols: number;
  forma: JogoDoTime[];
  invencibilidade: number;
  maiorVitoria: JogoDoTime | null;
  emQuemMaisMarcou: { adversario: string; gols: number } | null;
  quemMaisMarcou: { adversario: string; gols: number } | null;
  faltas: number;
  amarelos: number;
  vermelhos: number;
  artilheiros: { nome: string; gols: number }[];
}

function maiorPor(map: Map<string, number>): { adversario: string; gols: number } | null {
  let r: { adversario: string; gols: number } | null = null;
  for (const [adversario, gols] of map) if (!r || gols > r.gols) r = { adversario, gols };
  return r;
}

export function resumoTime(nome: string, geral: TimeTurno[], jogos: Jogo[], elenco: TimeElenco[]): ResumoTime {
  const g = geral.find(t => t.name === nome)!;
  const js = jogosDoTime(jogos, nome);
  let seq = 0, invenc = 0;
  const marcou = new Map<string, number>(), sofreu = new Map<string, number>();
  let maiorVitoria: JogoDoTime | null = null;
  for (const j of js) {
    seq = j.resultado === 'D' ? 0 : seq + 1;
    invenc = Math.max(invenc, seq);
    marcou.set(j.adversario, (marcou.get(j.adversario) ?? 0) + j.gp);
    sofreu.set(j.adversario, (sofreu.get(j.adversario) ?? 0) + j.gc);
    if (j.resultado === 'V' && (!maiorVitoria || j.gp - j.gc > maiorVitoria.gp - maiorVitoria.gc
      || (j.gp - j.gc === maiorVitoria.gp - maiorVitoria.gc && j.gp > maiorVitoria.gp))) maiorVitoria = j;
  }
  const time = elenco.find(t => t.name === nome);
  const jogadores = time?.players ?? [];
  const soma = (f: (p: (typeof jogadores)[number]) => number) => jogadores.reduce((s, p) => s + f(p), 0);
  return {
    nome,
    icon: g.icon,
    posicao: posicao(geral, nome) + 1,
    pontos: g.points,
    jogos: g.games,
    vitorias: g.wins,
    empates: g.draws,
    derrotas: g.losses,
    golsPro: g.goalsFor,
    golsContra: g.goalsAgainst,
    aproveitamento: g.games ? (3 * g.wins + g.draws) / (3 * g.games) : 0,
    mediaGolsPro: g.games ? g.goalsFor / g.games : 0,
    mediaGolsContra: g.games ? g.goalsAgainst / g.games : 0,
    semSofrerGols: js.filter(j => j.gc === 0).length,
    forma: js.slice(-5),
    invencibilidade: invenc,
    maiorVitoria,
    emQuemMaisMarcou: maiorPor(marcou),
    quemMaisMarcou: maiorPor(sofreu),
    faltas: soma(p => p.fouls),
    amarelos: soma(p => p.yellowCard),
    vermelhos: soma(p => p.redCard),
    artilheiros: [...jogadores].sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, 'pt-BR'))
      .slice(0, 3).map(p => ({ nome: p.name, gols: p.goals })),
  };
}

export interface Historico { jogos: JogoDoTime[]; vitoriasA: number; empates: number; vitoriasB: number; golsA: number; golsB: number; }

/** Jogos da 1ª fase entre A e B, do ponto de vista de A. */
export function historico(jogos: Jogo[], a: string, b: string): Historico {
  const js = jogosDoTime(jogos, a).filter(j => j.adversario === b);
  return {
    jogos: js,
    vitoriasA: js.filter(j => j.resultado === 'V').length,
    empates: js.filter(j => j.resultado === 'E').length,
    vitoriasB: js.filter(j => j.resultado === 'D').length,
    golsA: js.reduce((s, j) => s + j.gp, 0),
    golsB: js.reduce((s, j) => s + j.gc, 0),
  };
}

// ----------------------------------------------------------------------------
// Curiosidades da 1ª fase (tom leve, só sobre times e jogos)
// ----------------------------------------------------------------------------

export interface Curiosidade { titulo: string; valor: string; detalhe: string; }

export function curiosidades(jogos: Jogo[], geral: TimeTurno[]): Curiosidade[] {
  const fmt = (j: Jogo) => `${j.mandante} ${j.gols[0]} x ${j.gols[1]} ${j.visitante}`;
  const dataBr = (d: string) => d.split('-').reverse().join('/');
  const lista: Curiosidade[] = [];

  const goleada = [...jogos].sort((a, b) =>
    Math.abs(b.gols[0] - b.gols[1]) - Math.abs(a.gols[0] - a.gols[1]) || (b.gols[0] + b.gols[1]) - (a.gols[0] + a.gols[1]))[0];
  if (goleada) lista.push({ titulo: 'Maior goleada', valor: fmt(goleada), detalhe: `${goleada.turno}º turno · ${dataBr(goleada.data)}` });

  const festival = [...jogos].sort((a, b) => (b.gols[0] + b.gols[1]) - (a.gols[0] + a.gols[1]))[0];
  if (festival) lista.push({ titulo: 'Jogo com mais gols', valor: fmt(festival), detalhe: `${festival.gols[0] + festival.gols[1]} gols · ${dataBr(festival.data)}` });

  const total = jogos.reduce((s, j) => s + j.gols[0] + j.gols[1], 0);
  lista.push({ titulo: 'Média de gols', valor: `${(total / Math.max(jogos.length, 1)).toFixed(2).replace('.', ',')} por jogo`, detalhe: `${total} gols em ${jogos.length} jogos` });

  const empates = jogos.filter(j => j.gols[0] === j.gols[1]).length;
  lista.push({ titulo: 'Empates', valor: `${empates} jogos`, detalhe: `${Math.round(100 * empates / Math.max(jogos.length, 1))}% das partidas` });

  const ataque = [...geral].sort((a, b) => b.goalsFor - a.goalsFor)[0];
  if (ataque) lista.push({ titulo: 'Melhor ataque', valor: ataque.name, detalhe: `${ataque.goalsFor} gols` });
  const defesa = [...geral].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
  if (defesa) lista.push({ titulo: 'Melhor defesa', valor: defesa.name, detalhe: `${defesa.goalsAgainst} gols sofridos` });

  let melhorSeq = { time: '', n: 0 };
  for (const t of geral) {
    let seq = 0;
    for (const j of jogosDoTime(jogos, t.name)) {
      seq = j.resultado === 'V' ? seq + 1 : 0;
      if (seq > melhorSeq.n) melhorSeq = { time: t.name, n: seq };
    }
  }
  if (melhorSeq.n) lista.push({ titulo: 'Maior sequência de vitórias', valor: melhorSeq.time, detalhe: `${melhorSeq.n} vitórias seguidas` });

  const reiEmpate = [...geral].sort((a, b) => b.draws - a.draws)[0];
  if (reiEmpate) lista.push({ titulo: 'Especialista em empates', valor: reiEmpate.name, detalhe: `${reiEmpate.draws} empates` });

  // confronto com mais gols somando os três turnos
  const pares = new Map<string, number>();
  for (const j of jogos) {
    const k = [j.mandante, j.visitante].sort().join(' x ');
    pares.set(k, (pares.get(k) ?? 0) + j.gols[0] + j.gols[1]);
  }
  const classico = [...pares].sort((a, b) => b[1] - a[1])[0];
  if (classico) lista.push({ titulo: 'Clássico dos gols', valor: classico[0], detalhe: `${classico[1]} gols nos 3 turnos` });

  return lista;
}

// ----------------------------------------------------------------------------
// Gols por jogador (a partir das súmulas transcritas)
// ----------------------------------------------------------------------------

/** Desempate das listas de jogadores: ordem alfabética, igual à artilharia e aos goleiros. */
const alfabetica = (a: string, b: string) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });

export interface Marcador { jogador: string; time: string; gols: number; jogos: number; }

function somarMarcadores(jogos: SumulaDoJogo[], filtro: (j: SumulaDoJogo, g: SumulaDoJogo['gols'][number]) => boolean): Marcador[] {
  const mapa = new Map<string, Marcador>();
  for (const j of jogos) for (const g of j.gols) {
    if (g.contra || !filtro(j, g)) continue; // gol contra não conta para o jogador
    const k = g.time + '|' + g.jogador;
    const m = mapa.get(k) ?? { jogador: g.jogador, time: g.time, gols: 0, jogos: 0 };
    m.gols += g.gols;
    m.jogos++;
    mapa.set(k, m);
  }
  return [...mapa.values()].sort((a, b) => b.gols - a.gols || alfabetica(a.jogador, b.jogador));
}

const entre = (j: SumulaDoJogo, a: string, b: string) =>
  (j.mandante === a && j.visitante === b) || (j.mandante === b && j.visitante === a);

/** Quem marcou nos jogos entre A e B na 1ª fase. */
export function marcadoresDoConfronto(jogos: SumulaDoJogo[], a: string, b: string): Marcador[] {
  return somarMarcadores(jogos, j => entre(j, a, b));
}

/** Jogadores de outros times que mais marcaram contra `time` na 1ª fase. */
export function quemMaisMarcouContra(jogos: SumulaDoJogo[], time: string, limite = 3): Marcador[] {
  return somarMarcadores(jogos, (j, g) => (j.mandante === time || j.visitante === time) && g.time !== time).slice(0, limite);
}

/** Maiores atuações individuais (mais gols num único jogo). */
export function maioresAtuacoes(jogos: SumulaDoJogo[], limite = 5): { jogador: string; time: string; gols: number; jogo: SumulaDoJogo }[] {
  return jogos.flatMap(j => j.gols.filter(g => !g.contra).map(g => ({ jogador: g.jogador, time: g.time, gols: g.gols, jogo: j })))
    .sort((x, y) => y.gols - x.gols || alfabetica(x.jogador, y.jogador) || x.jogo.data.localeCompare(y.jogo.data)).slice(0, limite);
}

// ----------------------------------------------------------------------------
// Disciplina e destaques (a partir das súmulas)
// ----------------------------------------------------------------------------

export interface Disciplina { jogos: number; amarelosPorJogo: number; vermelhos: number; ausenciasPorJogo: number; }

/** Médias por partida nos jogos que têm súmula transcrita. */
export function disciplina(sumulas: SumulaDoJogo[], time: string): Disciplina {
  const js = sumulas.filter(j => j.mandante === time || j.visitante === time);
  const conta = (f: (j: SumulaDoJogo) => { time: string }[]) => js.reduce((s, j) => s + f(j).filter(x => x.time === time).length, 0);
  const n = js.length || 1;
  return {
    jogos: js.length,
    amarelosPorJogo: conta(j => j.amarelos) / n,
    vermelhos: conta(j => j.vermelhos),
    ausenciasPorJogo: conta(j => j.ausentes) / n,
  };
}

/**
 * Artilheiro do time na 1ª fase. O total de gols vem da artilharia oficial (a tabela da
 * página da categoria); presença e jogos com gol vêm das súmulas, que não cobrem todos os jogos.
 */
export interface ArtilheiroDaFase {
  jogador: string;
  gols: number;
  /** true = total da artilharia oficial; false = soma das súmulas (time sem ninguém na artilharia). */
  oficial: boolean;
  /** Jogos do time na 1ª fase. */
  jogosDoTime: number;
  /** Jogos do time com súmula transcrita. */
  comSumula: number;
  /** Jogos com súmula em que ele não aparece como ausente. */
  esteve: number;
  /** Jogos com súmula em que ele marcou. */
  marcouEm: number;
}

export interface Destaques {
  artilheiro: ArtilheiroDaFase | null;
  /** Quem do time mais marcou no adversário do confronto (jogos da 1ª fase entre os dois). */
  carrasco: Marcador | null;
  /** Jogador do time que marcou em mais jogos diferentes. */
  regular: Marcador | null;
  melhorAtuacao: { jogador: string; gols: number; jogo: SumulaDoJogo } | null;
}

const semAcento = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function destaques(
  sumulas: SumulaDoJogo[], time: string, adversario: string, artilharia: Artilheiro[], jogosDoTime: number,
): Destaques {
  const doTime = (j: SumulaDoJogo, g: { time: string }) => (j.mandante === time || j.visitante === time) && g.time === time;
  const marcadores = somarMarcadores(sumulas, doTime);

  // total oficial: mesma tabela de artilharia da página da categoria
  const oficial = artilharia
    .filter(a => semAcento(a.time) === semAcento(time))
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, 'pt-BR'))[0];
  const nome = oficial?.name ?? marcadores[0]?.jogador;
  let artilheiro: ArtilheiroDaFase | null = null;
  if (nome) {
    const jogosTime = sumulas.filter(j => j.mandante === time || j.visitante === time);
    const ele = (x: { time: string; jogador: string }) => x.time === time && semAcento(x.jogador) === semAcento(nome);
    artilheiro = {
      jogador: nome,
      gols: oficial ? oficial.goals : marcadores[0].gols,
      oficial: !!oficial,
      jogosDoTime,
      comSumula: jogosTime.length,
      esteve: jogosTime.filter(j => !j.ausentes.some(ele)).length,
      marcouEm: jogosTime.filter(j => j.gols.some(g => !g.contra && ele(g))).length,
    };
  }
  const carrasco = somarMarcadores(sumulas, (j, g) => entre(j, time, adversario) && g.time === time)[0] ?? null;
  const regular = [...marcadores].sort((a, b) => b.jogos - a.jogos || alfabetica(a.jogador, b.jogador))[0] ?? null;
  const melhor = maioresAtuacoes(sumulas.filter(j => j.mandante === time || j.visitante === time), 50).find(a => a.time === time) ?? null;
  return {
    artilheiro,
    carrasco,
    regular,
    melhorAtuacao: melhor ? { jogador: melhor.jogador, gols: melhor.gols, jogo: melhor.jogo } : null,
  };
}

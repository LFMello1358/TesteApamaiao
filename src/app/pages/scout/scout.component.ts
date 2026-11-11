import { ChangeDetectionStrategy, Component, ElementRef, LOCALE_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, PercentPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { Artilheiro, Jogo, PlacarConfronto, PlacaresMataMata, SumulaDoJogo, TimeElenco, TimeTurno } from '../../shared/models/campeonato.model';
import {
  ARTILHARIA_SERIE_A, ELENCO_SERIE_A, PLACARES_MATA_MATA_SERIE_A, TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A,
} from '../../shared/data/serie-a.data';
import {
  ARTILHARIA_SERIE_B, ELENCO_SERIE_B, PLACARES_MATA_MATA_SERIE_B, TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B,
} from '../../shared/data/serie-b.data';
import { JOGOS_SERIE_A } from '../../shared/data/jogos-serie-a';
import { JOGOS_SERIE_B } from '../../shared/data/jogos-serie-b';
import { SUMULAS_SERIE_A } from '../../shared/data/sumulas-serie-a';
import { SUMULAS_SERIE_B } from '../../shared/data/sumulas-serie-b';
import {
  Duelo, chancesTitulo, classificacaoGeral, criarModelo, curiosidades, destaques, disciplina, historico,
  maioresAtuacoes, marcadoresDoConfronto, montarMataMata, posicao, probAvancar, probJogo, quemMaisMarcouContra, resumoTime,
} from '../../shared/campeonato/scout';

type Fase = 'quartas' | 'semifinais' | 'final';

interface DadosSerie {
  turnos: TimeTurno[][];
  jogos: Jogo[];
  elenco: TimeElenco[];
  placares: PlacaresMataMata;
  sumulas: SumulaDoJogo[];
  artilharia: Artilheiro[];
}

const DADOS: Record<'A' | 'B', DadosSerie> = {
  A: { turnos: [TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A], jogos: JOGOS_SERIE_A, elenco: ELENCO_SERIE_A, placares: PLACARES_MATA_MATA_SERIE_A, sumulas: SUMULAS_SERIE_A, artilharia: ARTILHARIA_SERIE_A },
  B: { turnos: [TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B], jogos: JOGOS_SERIE_B, elenco: ELENCO_SERIE_B, placares: PLACARES_MATA_MATA_SERIE_B, sumulas: SUMULAS_SERIE_B, artilharia: ARTILHARIA_SERIE_B },
};

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-scout',
  imports: [ComponetsComponent, DecimalPipe, PercentPipe],
  // números no padrão brasileiro (70,3%) só nesta página
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './scout.component.html',
  styleUrl: './scout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoutComponent {
  private readonly rota = inject(ActivatedRoute).snapshot;
  readonly serie: 'A' | 'B' = this.rota.data['serie'] === 'B' ? 'B' : 'A';

  private readonly dados = DADOS[this.serie];
  /** Classificação oficial da 1ª fase (posição e TPG não mudam no mata-mata). */
  readonly geral = classificacaoGeral(this.dados.turnos);
  /** Súmulas da 1ª fase (Resenha da 1ª fase) e do mata-mata. */
  private readonly sumulasFase1 = this.dados.sumulas.filter(s => !s.fase);
  private readonly sumulasMataMata = this.dados.sumulas.filter(s => s.fase);
  /** Temporada inteira: jogos da 1ª fase + jogos do mata-mata já disputados. */
  private readonly jogosTemporada: Jogo[] = [
    ...this.dados.jogos,
    ...this.sumulasMataMata.map(s => {
      const gols = (t: string) => s.gols.filter(g => g.time === t).reduce((x, g) => x + g.gols, 0);
      return { turno: 3 as const, data: s.data, mandante: s.mandante, visitante: s.visitante, gols: [gols(s.mandante), gols(s.visitante)] as [number, number], fase: s.fase, perna: s.perna };
    }),
  ];
  /** Campanha na temporada: totais da 1ª fase + resultados do mata-mata (pontos/TPG continuam os da 1ª fase). */
  private readonly geralTemporada: TimeTurno[] = this.geral.map(t => {
    const r = { ...t };
    for (const j of this.jogosTemporada.filter(j => j.fase && (j.mandante === t.name || j.visitante === t.name))) {
      const casa = j.mandante === t.name, gp = j.gols[casa ? 0 : 1], gc = j.gols[casa ? 1 : 0];
      r.games++; r.goalsFor += gp; r.goalsAgainst += gc; r.SaldoGols += gp - gc;
      if (gp > gc) r.wins++; else if (gp === gc) r.draws++; else r.losses++;
    }
    return r;
  });
  readonly totalJogos = this.jogosTemporada.length;
  private readonly modelo = criarModelo(this.jogosTemporada);
  readonly mataMata = montarMataMata(this.geral, this.dados.placares);
  readonly chances = chancesTitulo(this.modelo, this.geral, this.mataMata);
  readonly curiosidades = curiosidades(this.dados.jogos, this.geral);
  readonly maxTitulo = Math.max(...this.chances.map(c => c.titulo), 0.0001);
  /** Jogos com súmula transcrita (gols por jogador, cartões, ausências). */
  readonly sumulasTranscritas = this.dados.sumulas.length;
  readonly maioresAtuacoes = maioresAtuacoes(this.sumulasFase1, 10);

  /** Gols de cada jogador pela tabela do time (elenco completo; a artilharia da página só lista parte dos jogadores). */
  private readonly golsDoElenco: Artilheiro[] = this.dados.elenco.flatMap(t =>
    t.players.map(p => ({ name: p.name.trim(), goals: p.goals, time: t.name, icon: t.icon })));

  /** Jogos do time na temporada. */
  private jogosNaTemporada(time: string): number {
    return this.geralTemporada.find(t => t.name === time)?.games ?? 0;
  }

  /** Resumo do time na temporada, com a posição oficial da 1ª fase. */
  private resumo(time: string) {
    return { ...resumoTime(time, this.geralTemporada, this.jogosTemporada, this.dados.elenco), posicao: posicao(this.geral, time) + 1 };
  }

  readonly fases: { id: Fase; nome: string }[] = [
    { id: 'quartas', nome: 'Quartas' },
    { id: 'semifinais', nome: 'Semifinais' },
    { id: 'final', nome: 'Final' },
  ];
  // ?fase=quartas&confronto=2 (vindo do 'Estatísticas' de um confronto na página da categoria)
  private readonly faseInicial = (['quartas', 'semifinais', 'final'] as Fase[]).find(f => f === this.rota.queryParamMap.get('fase'));
  readonly fase = signal<Fase>(this.faseInicial ?? 'quartas');
  readonly indice = signal(Math.max(0, Number(this.rota.queryParamMap.get('confronto')) || 0));
  /** Simulador aberto? Por padrão a página mostra só o placar oficial. */
  readonly simuladorAberto = signal(false);
  /** Placar hipotético do simulador (null = ainda igual ao oficial). */
  readonly simulacao = signal<PlacarConfronto | null>(null);

  readonly duelos = computed<Duelo[]>(() => {
    const f = this.fase();
    return f === 'quartas' ? this.mataMata.quartas : f === 'semifinais' ? this.mataMata.semifinais : [this.mataMata.final];
  });
  readonly duelo = computed(() => this.duelos()[Math.min(this.indice(), this.duelos().length - 1)]);
  readonly placarOficial = computed(() => this.duelo().placar);
  readonly placarUsado = computed(() => (this.simuladorAberto() && this.simulacao()) || this.duelo().placar);

  /** Análise completa do confronto selecionado (null enquanto os times não estão definidos). */
  readonly analise = computed(() => {
    const d = this.duelo();
    if (!d.timeA || !d.timeB) return null;
    const a = d.timeA.name, b = d.timeB.name;
    const vantagemA = posicao(this.geral, a) <= posicao(this.geral, b);
    const pA = probAvancar(this.modelo, a, b, this.placarUsado(), vantagemA);
    // Regra da página: o que diz "1ª fase" fica só com a 1ª fase; o resto é a temporada (1ª fase + mata-mata).
    const ra = this.resumo(a);
    const rb = this.resumo(b);
    // "Comparativo da 1ª fase"
    const fa = resumoTime(a, this.geral, this.dados.jogos, this.dados.elenco);
    const fb = resumoTime(b, this.geral, this.dados.jogos, this.dados.elenco);
    const da = disciplina(this.sumulasFase1, a);
    const db = disciplina(this.sumulasFase1, b);
    // gols nos jogos entre os dois na temporada (1ª fase + mata-mata)
    const marcadores = marcadoresDoConfronto(this.dados.sumulas, a, b);
    const carrasco = (t: string) => marcadores.find(m => m.time === t) ?? null;
    const comparativo = [
      { rotulo: 'Pontos (TPG)', a: fa.pontos, b: fb.pontos, fmt: 'int', maior: true },
      { rotulo: 'Aproveitamento', a: fa.aproveitamento, b: fb.aproveitamento, fmt: 'pct', maior: true },
      { rotulo: 'Vitórias', a: fa.vitorias, b: fb.vitorias, fmt: 'int', maior: true },
      { rotulo: 'Gols marcados por jogo', a: fa.mediaGolsPro, b: fb.mediaGolsPro, fmt: 'dec', maior: true },
      { rotulo: 'Gols sofridos por jogo', a: fa.mediaGolsContra, b: fb.mediaGolsContra, fmt: 'dec', maior: false },
      { rotulo: 'Jogos sem sofrer gol', a: fa.semSofrerGols, b: fb.semSofrerGols, fmt: 'int', maior: true },
      { rotulo: 'Maior sequência invicta', a: fa.invencibilidade, b: fb.invencibilidade, fmt: 'int', maior: true },
    ];
    if (da.jogos && db.jogos) {
      comparativo.push(
        { rotulo: 'Amarelos por jogo', a: da.amarelosPorJogo, b: db.amarelosPorJogo, fmt: 'dec', maior: false },
        { rotulo: 'Expulsões', a: da.vermelhos, b: db.vermelhos, fmt: 'int', maior: false },
        { rotulo: 'Ausências por jogo', a: da.ausenciasPorJogo, b: db.ausenciasPorJogo, fmt: 'dec', maior: false },
      );
    }
    return {
      a: ra,
      b: rb,
      disciplinaA: da,
      disciplinaB: db,
      destaquesA: { ...destaques(this.dados.sumulas, a, b, this.golsDoElenco, this.jogosNaTemporada(a)), carrasco: carrasco(a) },
      destaquesB: { ...destaques(this.dados.sumulas, b, a, this.golsDoElenco, this.jogosNaTemporada(b)), carrasco: carrasco(b) },
      vantagem: vantagemA ? a : b,
      chanceA: pA,
      chanceB: 1 - pA,
      jogo: probJogo(this.modelo, a, b),
      historico: historico(this.jogosTemporada, a, b),
      marcadores: marcadores,
      ameacaParaA: quemMaisMarcouContra(this.dados.sumulas, a),
      ameacaParaB: quemMaisMarcouContra(this.dados.sumulas, b),
      comparativo,
    };
  });

  constructor() {
    // veio de um confronto específico: rola direto até o raio-x
    if (this.faseInicial) {
      const host = inject(ElementRef<HTMLElement>);
      afterNextRender(() => {
        const alvo = host.nativeElement.querySelector('#raio-x');
        if (!alvo) return;
        // desconta o cabeçalho do site quando ele fica fixo no topo
        const nav = document.querySelector('app-componets .navbar');
        const fixo = nav && ['fixed', 'sticky'].includes(getComputedStyle(nav).position);
        const folga = (fixo ? nav!.getBoundingClientRect().height : 0) + 12;
        window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - folga });
      });
    }
  }

  escolherFase(f: Fase): void {
    this.fase.set(f);
    this.indice.set(0);
    this.fecharSimulador();
  }

  escolherDuelo(i: number): void {
    this.indice.set(i);
    this.fecharSimulador();
  }

  abrirSimulador(): void {
    this.simulacao.set({ ...this.duelo().placar });
    this.simuladorAberto.set(true);
  }

  fecharSimulador(): void {
    this.simuladorAberto.set(false);
    this.simulacao.set(null);
  }

  simular(campo: keyof PlacarConfronto, valor: string): void {
    const n = valor === '' ? null : Math.max(0, Math.min(30, Math.floor(Number(valor))));
    this.simulacao.set({ ...(this.simulacao() ?? this.duelo().placar), [campo]: Number.isNaN(n) ? null : n });
  }

  /** Quem avança com o placar em uso (oficial ou simulado), se os dois jogos já tiverem placar. */
  readonly classificado = computed(() => {
    const d = this.duelo(), p = this.placarUsado();
    if (!d.timeA || !d.timeB || [p.idaA, p.idaB, p.voltaA, p.voltaB].some(v => v === null)) return null;
    const ta = p.idaA! + p.voltaA!, tb = p.idaB! + p.voltaB!;
    if (ta !== tb) return { nome: ta > tb ? d.timeA.name : d.timeB.name, porVantagem: false, ta, tb };
    const vantagemA = posicao(this.geral, d.timeA.name) <= posicao(this.geral, d.timeB.name);
    return { nome: vantagemA ? d.timeA.name : d.timeB.name, porVantagem: true, ta, tb };
  });

  /** Gols e cartões de cada jogo já disputado do confronto selecionado (ida, volta). */
  readonly jogosDoConfronto = computed(() => {
    const d = this.duelo(), f = this.fase();
    if (!d.timeA || !d.timeB) return [];
    const a = d.timeA.name, b = d.timeB.name;
    const nomes = (l: { time: string; jogador: string }[], t: string) => l.filter(x => x.time === t).map(x => x.jogador.trim());
    // uma bolinha por gol, na frente de cada jogador: "⚽ Costela", "⚽⚽ Fred"
    const gols = (s: SumulaDoJogo, t: string) => s.gols.filter(g => g.time === t)
      .map(g => ({ bolas: '⚽'.repeat(Math.max(1, g.gols)), nome: g.jogador.trim() + (g.contra ? ' (contra)' : ''), qtd: g.gols }));
    return this.sumulasMataMata
      .filter(s => s.fase === f && [s.mandante, s.visitante].sort().join() === [a, b].sort().join())
      .sort((x, y) => x.data.localeCompare(y.data))
      .map(s => ({
        rotulo: s.perna === 'volta' ? 'Volta' : s.perna === 'ida' ? 'Ida' : 'Jogo',
        data: this.dataBr(s.data),
        times: [a, b].map(t => ({ nome: t, gols: gols(s, t), amarelos: nomes(s.amarelos, t), vermelhos: nomes(s.vermelhos, t) })),
      }));
  });

  /** "3º turno" ou "Quartas · ida". */
  quando(j: Jogo): string {
    if (!j.fase) return `${j.turno}º turno`;
    const fase = { quartas: 'Quartas', semifinais: 'Semifinal', final: 'Final', terceiro: '3º lugar' }[j.fase];
    return j.perna && j.perna !== 'unico' ? `${fase} · ${j.perna}` : fase;
  }

  dataBr(iso: string): string {
    return iso.split('-').reverse().join('/');
  }
}

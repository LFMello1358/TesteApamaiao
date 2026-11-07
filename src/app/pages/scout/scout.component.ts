import { ChangeDetectionStrategy, Component, ElementRef, LOCALE_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe, PercentPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { Jogo, PlacarConfronto, PlacaresMataMata, SumulaDoJogo, TimeElenco, TimeTurno } from '../../shared/models/campeonato.model';
import {
  ELENCO_SERIE_A, PLACARES_MATA_MATA_SERIE_A, TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A,
} from '../../shared/data/serie-a.data';
import {
  ELENCO_SERIE_B, PLACARES_MATA_MATA_SERIE_B, TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B,
} from '../../shared/data/serie-b.data';
import { JOGOS_SERIE_A } from '../../shared/data/jogos-serie-a';
import { JOGOS_SERIE_B } from '../../shared/data/jogos-serie-b';
import { SUMULAS_SERIE_A } from '../../shared/data/sumulas-serie-a';
import { SUMULAS_SERIE_B } from '../../shared/data/sumulas-serie-b';
import {
  Duelo, chancesTitulo, classificacaoGeral, criarModelo, curiosidades, destaques, disciplina, historico,
  maioresAtuacoes, marcadoresDoConfronto, montarMataMata, posicao, probAvancar, probJogo, quemMaisMarcouContra, resumoTime,
} from '../../shared/campeonato/scout';
import { LINK_INSTAGRAM, LINK_YOUTUBE } from '../../shared/links';

type Fase = 'quartas' | 'semifinais' | 'final';

interface DadosSerie {
  turnos: TimeTurno[][];
  jogos: Jogo[];
  elenco: TimeElenco[];
  placares: PlacaresMataMata;
  sumulas: SumulaDoJogo[];
}

const DADOS: Record<'A' | 'B', DadosSerie> = {
  A: { turnos: [TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A], jogos: JOGOS_SERIE_A, elenco: ELENCO_SERIE_A, placares: PLACARES_MATA_MATA_SERIE_A, sumulas: SUMULAS_SERIE_A },
  B: { turnos: [TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B], jogos: JOGOS_SERIE_B, elenco: ELENCO_SERIE_B, placares: PLACARES_MATA_MATA_SERIE_B, sumulas: SUMULAS_SERIE_B },
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
  readonly linkYoutube = LINK_YOUTUBE;
  readonly linkInstagram = LINK_INSTAGRAM;

  private readonly dados = DADOS[this.serie];
  readonly totalJogos = this.dados.jogos.length;
  readonly geral = classificacaoGeral(this.dados.turnos);
  private readonly modelo = criarModelo(this.dados.jogos);
  readonly mataMata = montarMataMata(this.geral, this.dados.placares);
  readonly chances = chancesTitulo(this.modelo, this.geral, this.mataMata);
  readonly curiosidades = curiosidades(this.dados.jogos, this.geral);
  readonly maxTitulo = Math.max(...this.chances.map(c => c.titulo), 0.0001);
  /** Jogos com súmula transcrita (gols por jogador, cartões, ausências). */
  readonly sumulasTranscritas = this.dados.sumulas.length;
  readonly maioresAtuacoes = maioresAtuacoes(this.dados.sumulas);

  readonly fases: { id: Fase; nome: string }[] = [
    { id: 'quartas', nome: 'Quartas' },
    { id: 'semifinais', nome: 'Semifinais' },
    { id: 'final', nome: 'Final' },
  ];
  // ?fase=quartas&confronto=2 (vindo do 'Ver mais' de um confronto na página da categoria)
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
    const ra = resumoTime(a, this.geral, this.dados.jogos, this.dados.elenco);
    const rb = resumoTime(b, this.geral, this.dados.jogos, this.dados.elenco);
    const da = disciplina(this.dados.sumulas, a);
    const db = disciplina(this.dados.sumulas, b);
    const comparativo = [
      { rotulo: 'Pontos (TPG)', a: ra.pontos, b: rb.pontos, fmt: 'int', maior: true },
      { rotulo: 'Aproveitamento', a: ra.aproveitamento, b: rb.aproveitamento, fmt: 'pct', maior: true },
      { rotulo: 'Vitórias', a: ra.vitorias, b: rb.vitorias, fmt: 'int', maior: true },
      { rotulo: 'Gols marcados por jogo', a: ra.mediaGolsPro, b: rb.mediaGolsPro, fmt: 'dec', maior: true },
      { rotulo: 'Gols sofridos por jogo', a: ra.mediaGolsContra, b: rb.mediaGolsContra, fmt: 'dec', maior: false },
      { rotulo: 'Jogos sem sofrer gol', a: ra.semSofrerGols, b: rb.semSofrerGols, fmt: 'int', maior: true },
      { rotulo: 'Maior sequência invicta', a: ra.invencibilidade, b: rb.invencibilidade, fmt: 'int', maior: true },
    ];
    if (da.jogos && db.jogos) {
      comparativo.push(
        { rotulo: 'Amarelos por jogo', a: da.amarelosPorJogo, b: db.amarelosPorJogo, fmt: 'dec', maior: false },
        { rotulo: 'Expulsões na 1ª fase', a: da.vermelhos, b: db.vermelhos, fmt: 'int', maior: false },
        { rotulo: 'Ausências por jogo', a: da.ausenciasPorJogo, b: db.ausenciasPorJogo, fmt: 'dec', maior: false },
      );
    }
    return {
      a: ra,
      b: rb,
      disciplinaA: da,
      disciplinaB: db,
      destaquesA: destaques(this.dados.sumulas, a, b),
      destaquesB: destaques(this.dados.sumulas, b, a),
      vantagem: vantagemA ? a : b,
      chanceA: pA,
      chanceB: 1 - pA,
      jogo: probJogo(this.modelo, a, b),
      historico: historico(this.dados.jogos, a, b),
      marcadores: marcadoresDoConfronto(this.dados.sumulas, a, b),
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

  dataBr(iso: string): string {
    return iso.split('-').reverse().join('/');
  }
}

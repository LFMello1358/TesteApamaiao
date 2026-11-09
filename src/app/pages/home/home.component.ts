import { Component, ChangeDetectionStrategy, HostListener, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { TimeTurno } from '../../shared/models/campeonato.model';
import { TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A } from '../../shared/data/serie-a.data';
import { LINK_INSTAGRAM, LINK_YOUTUBE } from '../../shared/links';
import { TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B } from '../../shared/data/serie-b.data';

interface Patrocinador { src: string; alt: string; }

const TURNOS: TimeTurno[][] = [
  TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A,
  TURNO_1_SERIE_B, TURNO_2_SERIE_B, TURNO_3_SERIE_B,
];

const fmt = (n: number) => n.toLocaleString('pt-BR');

/** Números da 1ª fase, calculados dos mesmos dados oficiais das páginas das categorias. */
function numerosDaTemporada(): { valor: string; rotulo: string }[] {
  const times = TURNOS.flat();
  const gols = times.reduce((s, t) => s + t.goalsFor, 0);
  const jogos = times.reduce((s, t) => s + t.games, 0) / 2; // cada jogo conta para os dois times
  const selecoes = TURNO_1_SERIE_A.length + TURNO_1_SERIE_B.length;
  return [
    { valor: fmt(2), rotulo: 'categorias' },
    { valor: fmt(selecoes), rotulo: 'seleções' },
    { valor: fmt(jogos), rotulo: 'jogos na 1ª fase' },
    { valor: fmt(gols), rotulo: 'gols marcados' },
  ];
}

@Component({
  selector: 'app-home',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly numeros = numerosDaTemporada();
  readonly linkInstagram = LINK_INSTAGRAM;
  readonly linkYoutube = LINK_YOUTUBE;

  readonly cartazes = [
    { categoria: 'Categoria A', src: 'assets/img/JogosMataMataA.jpg' },
    { categoria: 'Categoria B', src: 'assets/img/JogosMataMataB.jpg' },
  ];

  readonly patrocinadores: Patrocinador[] = embaralhar([
    { src: 'assets/img/AUAD.png', alt: 'AUAD' },
    { src: 'assets/img/Berton.jpg', alt: 'Berton' },
    { src: 'assets/img/BORELLI.png', alt: 'BORELLI' },
    { src: 'assets/img/CASA DE BOLOS.png', alt: 'BOLOS' },
    { src: 'assets/img/casa das fechaduras.png', alt: 'Casa das Fechaduras' },
    { src: 'assets/img/CEMOPE.jpg', alt: 'CEMOPE' },
    { src: 'assets/img/CUPULILLE.png', alt: 'CUPULILLE' },
    { src: 'assets/img/Farias.jpg', alt: 'Farias' },
    { src: 'assets/img/FisioMaster.jpg', alt: 'Fisio Master' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/INSETISAN.png', alt: 'INSETISAN' },
    { src: 'assets/img/JOSEPH ARAUJO.png', alt: 'JOSEPH' },
    { src: 'assets/img/KLESS.png', alt: 'KLESS' },
    { src: 'assets/img/Matuck.jpg', alt: 'Matuck' },
    { src: 'assets/img/Minha Joia.jpeg', alt: 'Minha Joia' },
    { src: 'assets/img/Mourao.jpeg', alt: 'Mourão' },
    { src: 'assets/img/MPE ENGENHARIA.png', alt: 'MPE Engenharia' },
    { src: 'assets/img/nave amarela.png', alt: 'Nave Amarela' },
    { src: 'assets/img/Predial.jpg', alt: 'Predial' },
    { src: 'assets/img/Queen Jardim.png', alt: 'Queen Jardim' },
    { src: 'assets/img/RESGATE.png', alt: 'RESGATE' },
    { src: 'assets/img/RODRIGO LIMA.png', alt: 'RODRIGO' },
    { src: 'assets/img/RodrigoPinheiro.jpg', alt: 'Rodrigo Pinheiro' },
    { src: 'assets/img/Santiê.JPG', alt: 'Santiê' },
    { src: 'assets/img/SMS MOVEIS.png', alt: 'SMS' },
    { src: 'assets/img/Vestwin.jpg', alt: 'Vestwin' },
    { src: 'assets/img/Xaper.png', alt: 'Xaper' },
  ]);

  // Carrossel: 3 logos por vez no computador, 2 no tablet e 1 no celular; avança sozinho a cada 3s.
  readonly itensPorSlide = signal(3);
  readonly indice = signal(0);
  pausado = false;
  private timer?: ReturnType<typeof setInterval>;

  readonly deslocamento = computed(() => -this.indice() * (100 / this.itensPorSlide()));

  ngOnInit(): void {
    this.ajustarItensPorSlide();
    this.timer = setInterval(() => { if (!this.pausado) this.proximo(); }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  @HostListener('window:resize')
  ajustarItensPorSlide(): void {
    const largura = window.innerWidth;
    const novo = largura <= 600 ? 1 : largura <= 1024 ? 2 : 3;
    if (novo !== this.itensPorSlide()) {
      this.itensPorSlide.set(novo);
      this.indice.set(0);
    }
  }

  private get ultimoIndice(): number {
    return this.patrocinadores.length - this.itensPorSlide();
  }

  proximo(): void {
    this.indice.update(i => (i >= this.ultimoIndice ? 0 : i + 1));
  }

  anterior(): void {
    this.indice.update(i => (i <= 0 ? this.ultimoIndice : i - 1));
  }

  openByA(): void { window.open('assets/img/LISTADEBYdoA.jpeg', '_blank'); }
  openByB(): void { window.open('assets/img/LISTADEBYdoB.jpeg', '_blank'); }
  openEsperaA(): void { window.open('assets/img/LISTADEESPERAdoA.pdf', '_blank'); }
  openEsperaB(): void { window.open('assets/img/LISTADEESPERAdoB.pdf', '_blank'); }
  Mandante(): void { window.open('assets/img/UniformeMandante.jpeg', '_blank'); }
  Visitante(): void { window.open('assets/img/UniformeVisitante.jpeg', '_blank'); }
}

function embaralhar<T>(lista: T[]): T[] {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
  return lista;
}

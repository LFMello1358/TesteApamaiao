import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { NOTICIAS, Noticia } from '../../shared/data/noticias';
import { ESCUDOS, PLAYLIST_2026, TRANSMISSOES } from '../../shared/data/transmissoes';

type Categoria = 'A' | 'B';

export interface Rodada {
  nome: string;
  data: string; // matéria mais recente da rodada
  total: number;
  A: { destaque: Noticia | null; jogos: Noticia[] };
  B: { destaque: Noticia | null; jogos: Noticia[] };
}

/**
 * Notícias do mata-mata: capa com a matéria principal e a lista de matérias;
 * /noticias/:id abre a matéria completa (link compartilhável).
 * As matérias ficam em shared/data/noticias.ts.
 */
@Component({
  selector: 'app-noticias',
  imports: [ComponetsComponent, RouterLink],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoticiasComponent {
  private readonly rota = inject(ActivatedRoute);

  readonly escudos = ESCUDOS;
  /** No celular aparece uma categoria por vez (seletor A | B); no computador, as duas lado a lado. */
  readonly abaMobile = signal<Categoria>('A');
  private readonly id = toSignal(this.rota.paramMap.pipe(map(p => p.get('id'))), { initialValue: null });

  /** Mais recentes primeiro; no mesmo dia, panorama antes dos jogos e A antes de B. */
  private readonly ordenadas = [...NOTICIAS].sort((x, y) =>
    y.data.localeCompare(x.data) || (x.tipo === y.tipo ? 0 : x.tipo === 'panorama' ? -1 : 1) || x.categoria.localeCompare(y.categoria));

  readonly aberta = computed(() => NOTICIAS.find(n => n.id === this.id()) ?? null);
  /**
   * Capa organizada por rodada (quartas ida, quartas volta, semis...), da mais recente para a mais antiga.
   * Em cada rodada e categoria: o panorama em destaque e os jogos numa lista compacta.
   */
  readonly rodadas: Rodada[] = (() => {
    const mapa = new Map<string, Noticia[]>();
    for (const n of this.ordenadas) mapa.set(n.rodada, [...(mapa.get(n.rodada) ?? []), n]);
    const lado = (lista: Noticia[], c: Categoria) => {
      const da = lista.filter(n => n.categoria === c);
      return { destaque: da.find(n => n.tipo === 'panorama') ?? null, jogos: da.filter(n => n.tipo === 'jogo') };
    };
    return [...mapa.entries()]
      .map(([nome, lista]) => ({ nome, data: lista[0].data, total: lista.length, A: lado(lista, 'A'), B: lado(lista, 'B') }))
      .sort((x, y) => y.data.localeCompare(x.data));
  })();
  readonly categorias: Categoria[] = ['A', 'B'];
  /** Na matéria aberta: outras da mesma categoria. */
  readonly relacionadas = computed(() => {
    const a = this.aberta();
    return a ? this.ordenadas.filter(n => n.categoria === a.categoria && n.id !== a.id).slice(0, 4) : [];
  });

  escolherAba(c: Categoria): void {
    this.abaMobile.set(c);
  }

  /** "10/11" (sem o ano, para a lista compacta) */
  diaMes(iso: string): string {
    const [, m, d] = iso.split('-');
    return `${d}/${m}`;
  }

  dataBr(iso: string): string {
    const [a, m, d] = iso.split('-');
    return `${d}/${m}/${a}`;
  }

  scout(n: Noticia): string {
    return n.categoria === 'A' ? '/categoria-a/scout' : '/categoria-b/scout';
  }

  /** Transmissão do dia do jogo (a live tem os jogos das duas categorias). */
  video(n: Noticia): string | null {
    if (!n.jogo) return null;
    const t = TRANSMISSOES.find(x => x.data === n.data);
    return t ? `https://www.youtube.com/watch?v=${t.videoId}` : PLAYLIST_2026;
  }
}

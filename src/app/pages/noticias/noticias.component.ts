import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { NOTICIAS, Noticia } from '../../shared/data/noticias';
import { ESCUDOS, PLAYLIST_2026, TRANSMISSOES } from '../../shared/data/transmissoes';

type Filtro = 'todas' | 'A' | 'B';

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
  readonly filtro = signal<Filtro>('todas');
  private readonly id = toSignal(this.rota.paramMap.pipe(map(p => p.get('id'))), { initialValue: null });

  /** Mais recentes primeiro; no mesmo dia, panorama antes dos jogos e A antes de B. */
  private readonly ordenadas = [...NOTICIAS].sort((x, y) =>
    y.data.localeCompare(x.data) || (x.tipo === y.tipo ? 0 : x.tipo === 'panorama' ? -1 : 1) || x.categoria.localeCompare(y.categoria));

  readonly aberta = computed(() => NOTICIAS.find(n => n.id === this.id()) ?? null);
  readonly lista = computed(() => {
    const f = this.filtro();
    return this.ordenadas.filter(n => f === 'todas' || n.categoria === f);
  });
  /** Panoramas das duas categorias em destaque, lado a lado e do mesmo tamanho (sem diferença entre as ligas). */
  readonly manchetes = computed(() => this.lista().filter(n => n.tipo === 'panorama').sort((x, y) => x.categoria.localeCompare(y.categoria)));
  readonly demais = computed(() => this.lista().filter(n => n.tipo !== 'panorama'));
  /** Na matéria aberta: outras da mesma categoria. */
  readonly relacionadas = computed(() => {
    const a = this.aberta();
    return a ? this.ordenadas.filter(n => n.categoria === a.categoria && n.id !== a.id).slice(0, 4) : [];
  });

  filtrar(f: Filtro): void {
    this.filtro.set(f);
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

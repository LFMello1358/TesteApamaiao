import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { ESCUDOS, Transmissao, transmissaoAgora } from '../../shared/data/transmissoes';

/**
 * Pop-up "Ao vivo": na hora dos jogos (ver shared/data/transmissoes.ts) abre uma vez por visita
 * com os escudos e o link da transmissão do dia. Depois de fechado, fica um selo "Ao vivo" no canto.
 * Para testar fora do horário: abra qualquer página com ?aovivo=2026-11-10 (data da transmissão).
 */
@Component({
  selector: 'app-ao-vivo',
  templateUrl: './ao-vivo.component.html',
  styleUrl: './ao-vivo.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AoVivoComponent implements OnInit, OnDestroy {
  readonly escudos = ESCUDOS;
  readonly transmissao = signal<Transmissao | null>(null);
  readonly aberto = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.verificar();
    // confere de minuto em minuto: quem já está no site vê o pop-up quando o jogo começa
    this.timer = setInterval(() => this.verificar(), 60_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    if (this.aberto()) document.body.style.overflow = '';
  }

  private verificar(): void {
    const teste = new URLSearchParams(location.search).get('aovivo');
    const agora = teste ? new Date(`${teste}T21:00:00`) : new Date();
    const t = transmissaoAgora(agora);
    const mudou = t?.videoId !== this.transmissao()?.videoId;
    this.transmissao.set(t);
    if (!t) { if (this.aberto()) this.fechar(); return; }
    if (mudou && !this.jaFechou(t)) this.abrir();
  }

  link(t: Transmissao): string {
    return `https://www.youtube.com/watch?v=${t.videoId}`;
  }

  abrir(): void {
    this.aberto.set(true);
    document.body.style.overflow = 'hidden';
  }

  @HostListener('document:keydown.escape')
  fechar(): void {
    if (!this.aberto()) return;
    this.aberto.set(false);
    document.body.style.overflow = '';
    const t = this.transmissao();
    try { if (t) sessionStorage.setItem('ao-vivo-fechado-' + t.data, '1'); } catch { /* sem storage */ }
  }

  private jaFechou(t: Transmissao): boolean {
    try { return sessionStorage.getItem('ao-vivo-fechado-' + t.data) === '1'; } catch { return false; }
  }
}

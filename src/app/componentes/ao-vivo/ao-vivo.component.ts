import { ChangeDetectionStrategy, Component, computed, effect, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { ESCUDOS, Transmissao, transmissaoAgora } from '../../shared/data/transmissoes';
import { avisoInscricaoAberto } from '../../shared/pop-ups';

/**
 * Pop-up "Ao vivo": na hora dos jogos (ver shared/data/transmissoes.ts) abre uma vez por visita
 * com os escudos e o link da transmissão do dia. Depois de fechado, fica um selo "Ao vivo" no canto.
 * É secundário ao aviso da pré-inscrição: se o aviso estiver aberto, espera ele ser fechado.
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
  readonly avisoInscricao = avisoInscricaoAberto;
  /** O modal só aparece quando o aviso da pré-inscrição não está na tela. */
  readonly visivel = computed(() => this.aberto() && !avisoInscricaoAberto());
  private timer?: ReturnType<typeof setInterval>;
  private inicio?: ReturnType<typeof setTimeout>;

  constructor() {
    // quando o aviso da pré-inscrição fecha, o "Ao vivo" assume a tela e trava a rolagem
    effect(() => { if (this.visivel()) document.body.style.overflow = 'hidden'; });
  }

  ngOnInit(): void {
    // espera um instante para o aviso da pré-inscrição (Home) abrir primeiro
    this.inicio = setTimeout(() => this.verificar(), 600);
    // confere de minuto em minuto: quem já está no site vê o pop-up quando o jogo começa
    this.timer = setInterval(() => this.verificar(), 60_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearTimeout(this.inicio);
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
  }

  @HostListener('document:keydown.escape', ['$event'])
  aoEsc(e: Event): void {
    if (!e.defaultPrevented) this.fechar();
  }

  fechar(): void {
    if (!this.visivel()) return;
    this.aberto.set(false);
    document.body.style.overflow = '';
    const t = this.transmissao();
    try { if (t) sessionStorage.setItem('ao-vivo-fechado-' + t.data, '1'); } catch { /* sem storage */ }
  }

  private jaFechou(t: Transmissao): boolean {
    try { return sessionStorage.getItem('ao-vivo-fechado-' + t.data) === '1'; } catch { return false; }
  }
}

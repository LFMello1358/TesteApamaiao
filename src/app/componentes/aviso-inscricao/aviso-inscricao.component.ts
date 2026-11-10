import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LINK_PRE_INSCRICAO_2027, PRAZO_PRE_INSCRICAO_2027 } from '../../shared/links';
import { avisoInscricaoAberto } from '../../shared/pop-ups';

const CHAVE_FECHADO = 'aviso-pre-inscricao-2027-fechado';

/**
 * Aviso da pré-inscrição 2027: abre como modal ao entrar no Home e, depois de
 * fechado, fica uma faixa para reabrir. Some sozinho depois do prazo final.
 */
@Component({
  selector: 'app-aviso-inscricao',
  imports: [MatIconModule],
  templateUrl: './aviso-inscricao.component.html',
  styleUrl: './aviso-inscricao.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AvisoInscricaoComponent implements OnInit, OnDestroy {
  readonly link = LINK_PRE_INSCRICAO_2027;
  readonly prazo = PRAZO_PRE_INSCRICAO_2027.toLocaleDateString('pt-BR');
  readonly ativo = new Date() <= PRAZO_PRE_INSCRICAO_2027;
  readonly aberto = signal(false);

  ngOnInit(): void {
    if (!this.ativo) return;
    // Na mesma visita, quem já fechou não vê o modal de novo ao voltar para o Home.
    let jaFechou = false;
    try { jaFechou = sessionStorage.getItem(CHAVE_FECHADO) === '1'; } catch { /* sem storage */ }
    // o aviso tem prioridade: na hora do jogo ele abre primeiro e o "Ao vivo" aparece depois que fechar
    if (!jaFechou) this.abrir();
  }

  ngOnDestroy(): void {
    avisoInscricaoAberto.set(false);
    this.travarRolagem(false);
  }

  abrir(): void {
    this.aberto.set(true);
    avisoInscricaoAberto.set(true);
    this.travarRolagem(true);
  }

  @HostListener('document:keydown.escape', ['$event'])
  aoEsc(e: Event): void {
    if (!this.aberto()) return;
    e.preventDefault(); // o "Ao vivo" que estava esperando não fecha junto
    this.fechar();
  }

  fechar(): void {
    if (!this.aberto()) return;
    this.aberto.set(false);
    this.travarRolagem(false);
    avisoInscricaoAberto.set(false);
    try { sessionStorage.setItem(CHAVE_FECHADO, '1'); } catch { /* sem storage */ }
  }

  private travarRolagem(travar: boolean): void {
    document.body.style.overflow = travar ? 'hidden' : '';
  }
}

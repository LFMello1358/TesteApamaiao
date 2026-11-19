import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PENEIRA_2027 } from '../../shared/links';
import { avisoInscricaoAberto } from '../../shared/pop-ups';

const CHAVE_FECHADO = 'aviso-peneira-2027-fechado';

/**
 * Aviso institucional da peneira obrigatória do APAMAIÃO 2027 (Diretoria Geral).
 * Mesmo visual do aviso da pré-inscrição: abre como modal ao entrar no Home e, depois de
 * fechado, fica uma faixa para reabrir. Some sozinho depois do dia da peneira.
 * Também tem prioridade sobre o pop-up "Ao vivo" (usa o mesmo sinal do aviso da pré-inscrição).
 */
@Component({
  selector: 'app-aviso-peneira',
  imports: [MatIconModule],
  templateUrl: './aviso-peneira.component.html',
  styleUrls: ['../aviso-inscricao/aviso-inscricao.component.scss', './aviso-peneira.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AvisoPeneiraComponent implements OnInit, OnDestroy {
  readonly data = PENEIRA_2027.toLocaleDateString('pt-BR');
  readonly ativo = new Date() <= PENEIRA_2027;
  readonly aberto = signal(false);

  ngOnInit(): void {
    if (!this.ativo) return;
    // Na mesma visita, quem já fechou não vê o modal de novo ao voltar para o Home.
    let jaFechou = false;
    try { jaFechou = sessionStorage.getItem(CHAVE_FECHADO) === '1'; } catch { /* sem storage */ }
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

import { Component, ChangeDetectionStrategy, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LINK_INSTAGRAM, LINK_YOUTUBE } from '../../shared/links';
import { AoVivoComponent } from '../ao-vivo/ao-vivo.component';

@Component({
  selector: 'app-componets',
  standalone: true,
  imports: [SharedModule, MatMenuModule, MatButtonModule, MatIconModule, AoVivoComponent],
  templateUrl: './componets.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./componets.component.scss']
})
export class ComponetsComponent {
  private readonly router = inject(Router);

  readonly linkInstagram = LINK_INSTAGRAM;
  readonly linkYoutube = LINK_YOUTUBE;

  // No celular o menu começa fechado (o ☰ abre); no desktop ele fica sempre visível pelo CSS.
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Destaca "Categoria A/B" no desktop quando a pessoa está em qualquer tela daquela categoria. */
  secaoAtiva(prefixo: string): boolean {
    return this.router.url.startsWith(prefixo);
  }

  @HostListener('document:keydown.escape')
  fecharMenu(): void {
    this.isMenuOpen = false;
  }

  openRegulamento(): void {
    window.open('assets/img/REGULAMENTO APAMAIA 2026 FINAL - 02022026.pdf', '_blank');
  }

  openJogosA(): void {
    window.open('assets/img/TABELA_A_JOGOS.pdf', '_blank');
  }

  openJogosB(): void {
    window.open('assets/img/TABELA_B_JOGOS.pdf', '_blank');
  }

  openListaA(): void {
    window.open('assets/img/Lista 110 A.pdf', '_blank');
  }

  openListaB(): void {
    window.open('assets/img/Lista 110 B.pdf', '_blank');
  }

  Mandante(): void {
    window.open('assets/img/UniformeMandante.jpeg', '_blank');
  }

  Visitante(): void {
    window.open('assets/img/UniformeVisitante.jpeg', '_blank');
  }
}

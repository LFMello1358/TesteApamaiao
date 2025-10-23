import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-componets',
  imports: [SharedModule,],
  templateUrl: './componets.component.html',
  styleUrl: './componets.component.scss'
})
export class ComponetsComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }
  openRegulamento(): void {
    const url = 'assets/img/Regulamento Apamaiao 25.pdf';
    window.open(url, '_blank');
  }
  openJogosA(): void {
    const url = 'assets/img/TABELA_A_JOGOS.pdf';
    window.open(url, '_blank');
  }
  openJogosB(): void {
    const url = 'assets/img/TABELA_B_JOGOS.pdf';
    window.open(url, '_blank');
  }
  // ✅ Método para abrir o formulário do Google
  goToForm(): void {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeaidnANXRB1JniGQLvvW0B6mKsFOL6o-MWHiPUQhcGYYlbQA/viewform?usp=dialog';
    window.open(formUrl, '_blank');
  }
}
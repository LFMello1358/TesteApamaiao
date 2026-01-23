import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'; // ✅ IMPORTAR Sidenav

@Component({
  selector: 'app-componets',
  standalone: true, 
  imports: [SharedModule, MatMenuModule, MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './componets.component.html',
  styleUrls: ['./componets.component.scss']
})
export class ComponetsComponent {
  isMenuOpen = true;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('menu-open', this.isMenuOpen);
  }

  openRegulamento(): void {
    window.open('assets/img/Regulamento Apamaiao 25.pdf', '_blank');
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
}


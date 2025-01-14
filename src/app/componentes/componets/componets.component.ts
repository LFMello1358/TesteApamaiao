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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openRegulamento(): void {
    const url = 'assets/img/REGULAMENTO 2024-v2.pdf';
    window.open(url, '_blank');
  }
}
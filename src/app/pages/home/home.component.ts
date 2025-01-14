import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppComponent } from "../../app.component";
import { ComponetsComponent } from "../../componentes/componets/componets.component";

@Component({
  selector: 'app-home',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  patrocinadores = [
    { src: 'assets/img/A Fabrica.png', alt: 'A Fábrica' },
    { src: 'assets/img/A Oficina.png', alt: 'A Oficina' },
    { src: 'assets/img/Berton.jpg', alt: 'Berton' },
    { src: 'assets/img/Biasoli.jpg', alt: 'Biasoli' },
    { src: 'assets/img/casa das fechaduras.png', alt: 'Casa das Fechaduras' },
    { src: 'assets/img/CEMOPE.jpg', alt: 'CEMOPE' },
    { src: 'assets/img/Coluna imoveis.png', alt: 'Coluna Imóveis' },
    { src: 'assets/img/DiMare.png', alt: 'DiMare' },
    { src: 'assets/img/Fruzy PNG.png', alt: 'Fruzy' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/MPE ENGENHARIA.png', alt: 'MPE Engenharia' },
    { src: 'assets/img/nave amarela.png', alt: 'Nave Amarela' },
    { src: 'assets/img/Queen Jardim.png', alt: 'Queen Jardim' },
  ];

  openRegulamento(): void {
    const url = 'assets/img/REGULAMENTO 2024-v2.pdf';
    window.open(url, '_blank');
  }

}

import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppComponent } from "../../app.component";
import { ComponetsComponent } from "../../componentes/componets/componets.component";
import { ImageModalComponent } from './componentes/image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  patrocinadores = [
    { src: 'assets/img/BEMDITO.png', alt: 'BEMDITO' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/A Fabrica.png', alt: 'A Fábrica' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/A Oficina.png', alt: 'A Oficina' },
    { src: 'assets/img/Berton.jpg', alt: 'Berton' },
    { src: 'assets/img/Biasoli.jpg', alt: 'Biasoli' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/casa das fechaduras.png', alt: 'Casa das Fechaduras' },
    { src: 'assets/img/CEMOPE.jpg', alt: 'CEMOPE' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/Coluna imoveis.png', alt: 'Coluna Imóveis' },
    { src: 'assets/img/DiMare.png', alt: 'DiMare' },
    { src: 'assets/img/Fruzy PNG.png', alt: 'Fruzy' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/MPE ENGENHARIA.png', alt: 'MPE Engenharia' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/nave amarela.png', alt: 'Nave Amarela' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/Queen Jardim.png', alt: 'Queen Jardim' },
    { src: 'assets/img/XAPER.png', alt: 'Xaper' },
    { src: 'assets/img/A USINA.png', alt: 'USINA' },
    { src: 'assets/img/AUAD.png', alt: 'AUAD' },
    { src: 'assets/img/BORELLI.png', alt: 'BORELLI' },
    { src: 'assets/img/CASA DE BOLOS.png', alt: 'BOLOS' },
    { src: 'assets/img/CUPULILLE.png', alt: 'CUPULILLE' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/INSETISAN.png', alt: 'INSETISAN' },
    { src: 'assets/img/JOSEPH ARAUJO.png', alt: 'JOSEPH' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/KLESS.png', alt: 'KLESS' },
    { src: 'assets/img/RODRIGO LIMA.png', alt: 'RODRIGO' },
    { src: 'assets/img/SERGIO MAURICIO.png', alt: 'SERGIO' },
    { src: 'assets/img/RESGATE.png', alt: 'RESGATE' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/SMS MOVEIS.png', alt: 'SMS' },
    { src: 'assets/img/BEMDITO.png', alt: 'BEMDITO' },




  ];
  constructor(private dialog: MatDialog) {}

  translateX = 0;
  currentIndex = 0;
  interval: any;

  ngOnInit(): void {
    // Exemplo: abre a primeira imagem automaticamente
    const first = this.patrocinadores[0];
      this.openImage();
  }

openImage(): void {
  this.dialog.open(ImageModalComponent, {
    data: { 
      src: 'assets/img/saveTheDate.jpg',  // caminho correto
      alt: 'Save the Date'                // texto alternativo
    },
    panelClass: 'custom-dialog'
  });
}
  // ✅ Método para abrir o formulário do Google
  goToForm(): void {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeaidnANXRB1JniGQLvvW0B6mKsFOL6o-MWHiPUQhcGYYlbQA/viewform?usp=dialog';
    window.open(formUrl, '_blank');
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.patrocinadores.length;
      this.translateX = -this.currentIndex * 100;
    }, 3000);
  }


  openRegulamento(): void {
    const url = 'assets/img/Regulamento Apamaiao 25.pdf';
    window.open(url, '_blank');
  }

openByA(): void {
  const url = 'assets/img/GoleirosBYdoA.jpg';
  window.open(url, '_blank');
}
openByB(): void {
  const url = 'assets/img/LISTADEBYdoB.pdf';
  
  window.open(url, '_blank');
}
openEsperaB(): void {
  const url = 'assets/img/LISTADEESPERAdoB.pdf';
  window.open(url, '_blank');
}
openEsperaA(): void {
  const url = 'assets/img/LISTADEESPERAdoA.jpg'; 
  window.open(url, '_blank');
}

}
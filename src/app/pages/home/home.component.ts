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
    { src: 'assets/img/AUAD.png', alt: 'AUAD' },

    { src: 'assets/img/Berton.jpg', alt: 'Berton' },
    { src: 'assets/img/BORELLI.png', alt: 'BORELLI' },
    { src: 'assets/img/CASA DE BOLOS.png', alt: 'BOLOS' },

    { src: 'assets/img/casa das fechaduras.png', alt: 'Casa das Fechaduras' },
    { src: 'assets/img/CEMOPE.jpg', alt: 'CEMOPE' },
    { src: 'assets/img/CUPULILLE.png', alt: 'CUPULILLE' },

    { src: 'assets/img/Farias.jpg', alt: 'Farias' },
    { src: 'assets/img/FisioMaster.jpg', alt: 'Fisio Master' },

    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/INSETISAN.png', alt: 'INSETISAN' },
    { src: 'assets/img/JOSEPH ARAUJO.png', alt: 'JOSEPH' },
    { src: 'assets/img/KLESS.png', alt: 'KLESS' },

    { src: 'assets/img/Matuck.jpg', alt: 'Matuck' },
    { src: 'assets/img/Minha Joia.jpeg', alt: 'Minha Joia' },
    { src: 'assets/img/Mourao.jpeg', alt: 'Mourão' },
    { src: 'assets/img/MPE ENGENHARIA.png', alt: 'MPE Engenharia' },

    { src: 'assets/img/nave amarela.png', alt: 'Nave Amarela' },
    { src: 'assets/img/Predial.jpg', alt: 'Predial' },
    { src: 'assets/img/Queen Jardim.png', alt: 'Queen Jardim' },

    { src: 'assets/img/RESGATE.png', alt: 'RESGATE' },
    { src: 'assets/img/RODRIGO LIMA.png', alt: 'RODRIGO' },
    { src: 'assets/img/RodrigoPinheiro.jpg', alt: 'Rodrigo Pinheiro' },

    { src: 'assets/img/Santiê.JPG', alt: 'Santiê' },
    { src: 'assets/img/SMS MOVEIS.png', alt: 'SMS' },

    { src: 'assets/img/Vestwin.jpg', alt: 'Vestwin' },
    { src: 'assets/img/XAPER.png', alt: 'Xaper' }

  ];



  constructor(private dialog: MatDialog) { }

  translateX = 0;
  currentIndex = 0;
  interval: any;

  ngOnInit(): void {
    this.shuffleArray(this.patrocinadores);
    this.startAutoSlide();
  }


  // openImage(): void {
  //   this.dialog.open(ImageModalComponent, {
  //     data: { 
  //       src: 'assets/img/saveTheDate.jpg',  // caminho correto
  //       alt: 'Save the Date'                // texto alternativo
  //     },
  //     panelClass: 'custom-dialog'
  //   });
  // }
  // ✅ Método para abrir o formulário do Google
  goToForm(): void {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeaidnANXRB1JniGQLvvW0B6mKsFOL6o-MWHiPUQhcGYYlbQA/viewform?usp=dialog';
    window.open(formUrl, '_blank');
  }

  // ✅ Método para abrir o formulário do Google
  goToForm2(): void {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScztDIzlJ0ZXizRSdScs681rvNGVbBqHpYTWQA96gOqF5hwcg/viewform';
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

  openListaA(): void {
    const url = 'assets/img/Lista 110 A.pdf';
    window.open(url, '_blank');
  }
  openListaB(): void {
    const url = 'assets/img/Lista 110 B.pdf';
    window.open(url, '_blank');
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


}
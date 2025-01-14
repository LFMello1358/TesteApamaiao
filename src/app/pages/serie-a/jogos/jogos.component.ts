// import { Component } from '@angular/core';
// import { SharedModule } from '../../../shared/shared.module';
// import { ComponetsComponent } from '../../../componentes/componets/componets.component';
// import { Jogador, Time } from '../../../shared/models/TimeA.model';
// import { CampeonatoService } from '../../../shared/services/campeonatoA.service';

// @Component({
//   selector: 'app-jogos',
//   imports: [SharedModule, ComponetsComponent],
//   templateUrl: './jogos.component.html',
//   styleUrls: ['./jogos.component.scss']
// })
// export class JogosComponentA {
//   currentTurn: string = '1° Turno';
//   currentRound: number = 1;

//   // Dados de jogadores
//   homeTeam: Time | undefined;
//   awayTeam: Time | undefined;

//   // Detalhes do jogo
//   homeGoals: number = 0;
//   awayGoals: number = 0;
//   homeYellowCards: number = 0;
//   awayYellowCards: number = 0;
//   homeRedCards: number = 0;
//   awayRedCards: number = 0;

//   // Array de jogadores
//   homePlayers: Jogador[] = [];
//   awayPlayers: Jogador[] = [];

//   constructor(private campeonatoService: CampeonatoService) {
//     // Inicializa os times
//     this.homeTeam = this.campeonatoService.getTimeById(1); // Barcelona
//     this.awayTeam = this.campeonatoService.getTimeById(2); // Real Madrid
//     this.loadPlayers();
//   }

//   // Carregar jogadores de ambos os times
//   loadPlayers() {
//     if (this.homeTeam) {
//       this.homePlayers = [
//         this.homeTeam.goleiro, this.homeTeam.zagueiro, this.homeTeam.lateral1, 
//         this.homeTeam.lateral2, this.homeTeam.lateral3, this.homeTeam.cabecaDeArea, 
//         this.homeTeam.meia, this.homeTeam.meia1, this.homeTeam.meia2, 
//         this.homeTeam.atacante, this.homeTeam.atacante1
//       ];
//     }
//     if (this.awayTeam) {
//       this.awayPlayers = [
//         this.awayTeam.goleiro, this.awayTeam.zagueiro, this.awayTeam.lateral1, 
//         this.awayTeam.lateral2, this.awayTeam.lateral3, this.awayTeam.cabecaDeArea, 
//         this.awayTeam.meia, this.awayTeam.meia1, this.awayTeam.meia2, 
//         this.awayTeam.atacante, this.awayTeam.atacante1
//       ];
//     }
//   }

//   // Registrar o resultado do jogo
//   updateMatchResult() {
//     if (this.homeTeam && this.awayTeam) {
//       this.campeonatoService.registrarJogo(
//         this.homeTeam.id,
//         this.homeGoals,
//         this.awayGoals,
//         this.homeYellowCards,
//         this.homeRedCards,
//         0 // Aqui você pode colocar a lógica para ausências, se necessário
//       );
      
//       this.campeonatoService.registrarJogo(
//         this.awayTeam.id,
//         this.awayGoals,
//         this.homeGoals,
//         this.awayYellowCards,
//         this.awayRedCards,
//         0 // Lógica para ausências do time adversário
//       );
//     }
//   }

//   // Função para registrar os detalhes de gols e cartões de um jogador
//   addPlayerDetails(team: 'home' | 'away', player: Jogador, goals: number, yellowCards: number, redCards: number) {
//     if (team === 'home' && this.homeTeam) {
//       const jogador = this.homeTeam![player.nome];
//       jogador.golsFeitos += goals;
//       jogador.cartaoAmarelo += yellowCards;
//       jogador.cartaoVermelho += redCards;
//     } else if (team === 'away' && this.awayTeam) {
//       const jogador = this.awayTeam![player.nome];
//       jogador.golsFeitos += goals;
//       jogador.cartaoAmarelo += yellowCards;
//       jogador.cartaoVermelho += redCards;
//     }
//   }
// }
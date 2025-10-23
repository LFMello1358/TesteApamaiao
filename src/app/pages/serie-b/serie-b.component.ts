import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PopupAvisosComponent } from '../popup-avisos/popup-avisos.component';

interface Team {
  name: string;
  points: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  woLosses: number;
  SaldoGols: number;
  players: Player[];
}
interface Player {
  name: string;
  fouls: number;
  yellowCard: number;
  redCard: number;
  goals: number;
  suspensao: boolean;
  jogosSuspensao?:number;
}
interface Player2 {
  name: string;
  time: string;
  goals: number;

}

interface Match {
  homeTeam: string;
  awayTeam: string;
  date: string;
}


interface Goalkeeper {
  name: string;
  goalsConceded: number; // Gols sofridos (para goleiros menos vazados)
  time: string
}

@Component({
  selector: 'app-serie-a',
  standalone: true,
  imports: [SharedModule, ComponetsComponent,],
  templateUrl: './serie-b.component.html',
  styleUrl: './serie-b.component.scss'
})
export class SerieBComponent {
  displayedColumns: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumns1: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumnsTimes: string[] = ['name', 'fouls', 'yellowCard', 'redCard', 'goals'];
  turnoSelecionado: number = 1;
  showWarningPopup = false;
  pdfSrc = 'assets/img/TABELA_B_JOGOS.pdf';
  zoomLevel = 1.0; // Zoom padrão



  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustZoom();
  }

  adjustZoom() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.zoomLevel = 0.8; // Ajusta o zoom para celulares
    } else if (screenWidth < 1024) {
      this.zoomLevel = 0.9; // Ajusta para tablets
    } else {
      this.zoomLevel = 1.0; // Padrão para desktops
    }
  }




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

  translateX = 0;
  currentIndex = 0;
  interval: any;



  startAutoSlide() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.patrocinadores.length;
      this.translateX = -this.currentIndex * 100;
    }, 3000);
  }




  // Dados de artilharia
  topArtillery: Player2[] = [];

  // Dados de goleiros menos vazados
  topGoalkeepers: Goalkeeper[] = [];


  // Dados fictícios para as partidas de cada rodada
  matches = [

    { turn: 1, round: 1, homeTeam: 'BlackPool', awayTeam: 'Tottenham', date: '2025-02-12', homeGoals: 1, awayGoals: 4 },
    { turn: 1, round: 1, homeTeam: 'Arsenal', awayTeam: 'Man. United', date: '2025-02-13', homeGoals: 0, awayGoals: 1 },
    { turn: 1, round: 1, homeTeam: 'Man. City', awayTeam: 'NewCastle', date: '2025-02-14', homeGoals: 0, awayGoals: 1 },

    { turn: 1, round: 2, homeTeam: 'Man. United', awayTeam: 'Wolves', date: '2025-02-17', homeGoals: 3, awayGoals: 1 },
    { turn: 1, round: 2, homeTeam: 'Man. City', awayTeam: 'Tottenham', date: '2025-02-18', homeGoals: 1, awayGoals: 0 },
    { turn: 1, round: 2, homeTeam: 'Arsenal', awayTeam: 'NewCastle', date: '2025-02-19', homeGoals: 3, awayGoals: 3 },
    { turn: 1, round: 2, homeTeam: 'Chelsea', awayTeam: 'Leeds', date: '2025-02-20', homeGoals: 0, awayGoals: 4 },
    { turn: 1, round: 2, homeTeam: 'BlackPool', awayTeam: 'Liverpool', date: '2025-02-21', homeGoals: 3, awayGoals: 2 },

    { turn: 1, round: 3, homeTeam: 'Arsenal', awayTeam: 'Man. City', date: '2025-02-24', homeGoals: 2, awayGoals: 4 },
    { turn: 1, round: 3, homeTeam: 'Aston Villa', awayTeam: 'Man. United', date: '2025-02-25', homeGoals: 2, awayGoals: 1 },
    { turn: 1, round: 3, homeTeam: 'BlackPool', awayTeam: 'NewCastle', date: '2025-02-26', homeGoals: 2, awayGoals: 2 },
    { turn: 1, round: 3, homeTeam: 'Chelsea', awayTeam: 'Wolves', date: '2025-02-27', homeGoals: 1, awayGoals: 1 },
    // { turn: 1, round: 3, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-02-28', homeGoals: 0, awayGoals: 0 },

    { turn: 1, round: 4, homeTeam: 'Aston Villa', awayTeam: 'Wolves', date: '2025-03-06', homeGoals: 0, awayGoals: 1 },
    { turn: 1, round: 4, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-03-07', homeGoals: 2, awayGoals: 2 },

    { turn: 1, round: 5, homeTeam: 'Arsenal', awayTeam: 'Tottenham', date: '2025-03-10', homeGoals: 3, awayGoals: 2 },
    { turn: 1, round: 5, homeTeam: 'NewCastle', awayTeam: 'Liverpool', date: '2025-03-11', homeGoals: 0, awayGoals: 1 },
    { turn: 1, round: 5, homeTeam: 'Man. City', awayTeam: 'Chelsea', date: '2025-03-12', homeGoals: 1, awayGoals: 1 },
    { turn: 1, round: 5, homeTeam: 'Aston Villa', awayTeam: 'BlackPool', date: '2025-03-13', homeGoals: 1, awayGoals: 1 },

    { turn: 1, round: 6, homeTeam: 'Man. City', awayTeam: 'Liverpool', date: '2025-03-17', homeGoals: 0, awayGoals: 2 },
    { turn: 1, round: 6, homeTeam: 'Wolves', awayTeam: 'BlackPool', date: '2025-03-18', homeGoals: 0, awayGoals: 0 },
    { turn: 1, round: 6, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-03-19', homeGoals: 0, awayGoals: 0 },
    { turn: 1, round: 6, homeTeam: 'Leeds', awayTeam: 'Tottenham', date: '2025-03-20', homeGoals: 0, awayGoals: 0 },
    { turn: 1, round: 6, homeTeam: 'Chelsea', awayTeam: 'Man. United', date: '2025-03-21', homeGoals: 0, awayGoals: 0 },
  ];

  // Turno e rodada
  currentTurn: number = 1; // Inicializando com o turno 1
  currentRound: number = 1; // Inicializando com a rodada 1

  // Método para obter as partidas da rodada atual com datas formatadas
  getCurrentRoundMatches() {
    return this.matches
      .filter(match => match.turn === this.currentTurn && match.round === this.currentRound)
      .map(match => ({
        ...match,
        formattedDate: this.formatDate(match.date)
      }));
  }



  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T20:00:00'); // Força horário para 20h UTC

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Nome do dia da semana
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo', // Garante o fuso horário correto
      hour12: false // Usa formato 24h
    };

    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }



  // Método para avançar para a próxima rodada
  nextRound() {
    if (this.currentRound < 12) { // Supondo que existem 3 rodadas
      this.currentRound++;
    } else if (this.currentTurn < 3) { // Supondo que existem 2 turnos
      this.currentRound = 1; // Reinicia as rodadas para o próximo turno
      this.currentTurn++; // Avança para o próximo turno
    }
  }

  // Método para voltar para a rodada anterior
  previousRound() {
    if (this.currentRound > 1) {
      this.currentRound--;
    } else if (this.currentTurn > 1) { // Se estiver no turno 2 e na rodada 1, volta para o turno 1
      this.currentTurn--;
      this.currentRound = 3; // Vai para a última rodada do turno anterior
    }
  }


  ngOnInit(): void {

  
  



    this.startAutoSlide();
    // Dados fictícios de artilharia


    this.topArtillery = this.topArtillery.slice(0, 10); // Mantém apenas os 10 primeiros

    this.topArtillery = [
      {
        name: 'SERGINHO', goals: 5, time: 'Blackpool',
      },
      {
        name: 'GREGÓRIO', goals: 9, time: 'Blackpool',
      },
      {
        name: 'MARCELO DENTISTA', goals: 5, time: 'Tottenham'
      },
      {
        name: 'CALVO', goals: 5, time: 'Tottenham'
      },
      {
        name: 'FABIO BARROS', goals: 2, time: 'Tottenham'
      },
      {
        name: 'RICARDINHO', goals: 8, time: 'Tottenham'
      },
      {
        name: 'MARCELO FERREIRA', goals: 7, time: 'Man. United'
      },
      {
        name: 'MARCELLUS', goals: 24, time: 'Man. United'
      },
      {
        name: 'DUDU SOARES', goals: 7, time: 'Newcastle'
      },
      {
        name: 'TONINHO IMÓVEIS', goals: 3, time: 'Man. United'
      },
      {
        name: 'PAULO MASSA', goals: 8, time: 'Newcastle'
      },
      {
        name: 'CLAUDIO', goals: 7, time: 'Arsenal'
      },
      {
        name: 'FRANK VIANNA', goals: 4, time: 'Arsenal'
      },
      {
        name: 'ANDRÉ PORTUGAL', goals: 3, time: 'Arsenal'
      },
      {
        name: 'JOSÉ LUIZ', goals: 1, time: 'Leeds'
      },
      {
        name: 'ANDRÉ NICOLAU', goals: 2, time: 'Leeds'
      },
      {
        name: 'CUPULILLE', goals: 15, time: 'Leeds'
      },
      {
        name: 'SHAOLIN', goals: 2, time: 'Leeds'
      },
      {
        name: 'SILVIO CAVALO', goals: 13, time: 'Leeds'
      },
      {
        name: 'IVAN', goals: 8, time: 'Blackpool'
      },
      {
        name: 'FRANÇA', goals: 17, time: 'Liverpool'
      },
      {
        name: 'SANDRINHO', goals: 12, time: 'Liverpool'
      },
      {
        name: 'JUCA', goals: 8, time: 'Arsenal'
      },

      {
        name: 'BODINHO', goals: 23, time: 'Man. City'
      },
      {
        name: 'FILÉ', goals: 2, time: 'Man. City'
      },
      {
        name: 'SERGIO SOMOS', goals: 4, time: 'Man. City'
      },
      {
        name: 'LUIZINHO', goals: 1, time: 'Man. City'
      },
      // {
      //   name: 'DEDECO', goals: 11, time: 'Man. City'
      // },
      {
        name: 'MAGRINHO', goals: 2, time: 'Man. City'
      },
      {
        name: 'RICHARD', goals: 24, time: 'Aston Villa'
      },
      {
        name: 'MARCIO LIMA', goals: 9, time: 'Blackpool'
      },
      {
        name: 'ANDRÉ VILHENA', goals: 1, time: 'Blackpool'
      },
      {
        name: 'ELOIR', goals: 7, time: 'Chelsea'
      },
      {
        name: 'MARCELINHO CID', goals: 1, time: 'Chelsea'
      },
      {
        name: 'JUNIOR LUCIO', goals: 1, time: 'Chelsea'
      },
      {
        name: 'FRANK', goals: 10, time: 'Chelsea'
      },
          {
        name: 'CARLOS ANDRÉ', goals: 4, time: 'Chelsea'
      },
      {
        name: 'LATINI', goals: 4, time: 'Wolves'
      },
      {
        name: 'JULIO CESAR', goals: 2, time: 'Arsenal'
      },
      {
        name: 'CRISTIANO MOTTA', goals: 2, time: 'Liverpool'
      },
      {
        name: 'JORGINHO', goals: 3, time: 'Chelsea'
      },
      {
        name: 'WANILDO', goals: 4, time: 'Aston Villa'
      },

      { name: 'CACAU', goals: 1, time: 'Wolves' },
      { name: 'AMIN', goals: 1, time: 'Wolves' },
      { name: 'ALBERT', goals: 6, time: 'Wolves' },
      { name: 'RIDOLFI', goals: 1, time: 'Blackpool' },
      { name: 'NAVAL', goals: 7, time: 'Arsenal' },
      { name: 'JACARÉ', goals: 10, time: 'Tottenham' },
      { name: 'CARLOS CASTELO', goals: 1, time: 'Tottenham' },
      { name: 'CAVEIRÃO', goals: 1, time: 'Man. United' },
      { name: 'NENÉM', goals: 6, time: 'Man. United' },
      { name: 'RUBINHO', goals: 2, time: 'Wolves' },
      { name: 'NEY', goals: 14, time: 'Wolves' },
      { name: 'CADU', goals: 4, time: 'Wolves' },
      { name: 'FLAVIO CHAME', goals: 2, time: 'Newcastle' },
      { name: 'MARIO GRILLO', goals: 12, time: 'Newcastle' },
      { name: 'NALDO', goals: 10, time: 'Newcastle' },
      { name: 'FABIO PINHEIRO', goals: 4, time: 'Newcastle' },

    ];

    // Ordenando e limitando a 11 jogadores
    this.topArtillery.sort((a, b) => {
      if (b.goals !== a.goals) {
        return b.goals - a.goals; // Ordena por maior número de gols
      }
      return a.name.localeCompare(b.name); // Critério de desempate: ordem alfabética
    });
    this.topArtillery = this.topArtillery
      .sort((a, b) => b.goals - a.goals)  // Do maior para o menor número de gols
      .slice(0, 10);                      // Pegando apenas os 11 primeiros


    // Dados fictícios de goleiros menos vazados
    this.topGoalkeepers = [
      { name: 'FELIPE CORREA', goalsConceded: 34, time: 'Wolves' },
      { name: 'JORGINHO', goalsConceded: 40, time: 'Newcastle' },
      { name: 'LUIZINHO JANSEN', goalsConceded: 54, time: 'Man. United' },
      { name: 'GABRIEL MARTINS', goalsConceded: 55, time: 'Arsenal' },
      { name: 'BRAGA', goalsConceded: 34, time: 'Tottenham' },
      { name: 'LEANDRO MANHÃES', goalsConceded: 25, time: 'Liverpool' },
      { name: 'LEONARDO', goalsConceded: 60, time: 'Aston Villa' },
      { name: 'AUGUSTO', goalsConceded: 41, time: 'Leeds' },
      { name: 'ZUQUI ', goalsConceded: 60, time: 'Chelsea' },
      { name: 'BRASIL', goalsConceded: 70, time: 'Blackpool' },
      { name: 'JOFRE ', goalsConceded: 31, time: 'Man. City' },
    ];
    this.topGoalkeepers.sort((a, b) => {
      if (a.goalsConceded !== b.goalsConceded) {
        return a.goalsConceded - b.goalsConceded; // Ordena por menor número de gols sofridos
      }
      return a.name.localeCompare(b.name); // Critério de desempate: ordem alfabética
    });

    // Ordena os goleiros por menos gols sofridos
    this.topGoalkeepers.sort((a, b) => a.goalsConceded - b.goalsConceded);
  }





  // Observables para os dados dos turnos
  private dataSourceTurno1Subject = new BehaviorSubject<Team[]>(this.initializeTurno1());
  private dataSourceTurno2Subject = new BehaviorSubject<Team[]>(this.initializeTurno2());
  private dataSourceTurno3Subject = new BehaviorSubject<Team[]>(this.initializeTurno3());




  initializeTurno1(): Team[] {
    const turno1: Team[] = [
      {
        name: 'Arsenal', points: 13, games: 10, wins: 3, draws: 4, losses: 3, goalsFor: 18, goalsAgainst: 17, SaldoGols: 1, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 8, goalsAgainst: 18, SaldoGols: -10, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 12, goalsAgainst: 22, SaldoGols: -10, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 15, games: 10, wins: 4, draws: 3, losses: 3, goalsFor: 12, goalsAgainst: 13, SaldoGols: -1, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 17, goalsAgainst: 18, SaldoGols: -1, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 12, goalsAgainst: 12, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 23, games: 10, wins: 6, draws: 2, losses: 2, goalsFor: 23, goalsAgainst: 10, SaldoGols: 13 , woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 20, games: 10, wins: 6, draws: 1, losses: 3, goalsFor: 18, goalsAgainst: 15, SaldoGols: 3, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 12, games: 10, wins: 2, draws: 6, losses: 2, goalsFor: 15, goalsAgainst: 13, SaldoGols: 2, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 16, goalsAgainst: 14, SaldoGols: 2, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 16, goalsAgainst: 15, SaldoGols: 1, woLosses: 0,
        players: []
      },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = [
      {
        name: 'Arsenal', points: 6, games: 10, wins: 1, draws: 3, losses: 6, goalsFor: 11, goalsAgainst: 22, SaldoGols: -11, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 7, games: 10, wins: 2, draws: 1, losses: 7, goalsFor: 17, goalsAgainst: 26, SaldoGols: -9, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 15, goalsAgainst: 24, SaldoGols: -9, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 5, games: 10, wins: 0, draws: 5, losses: 5, goalsFor: 12, goalsAgainst: 22, SaldoGols: -10, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 12, goalsAgainst: 14, SaldoGols: -2, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 17, games: 10, wins: 4, draws: 5, losses: 1, goalsFor: 20, goalsAgainst: 8, SaldoGols: 12, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 26, games: 10, wins: 7, draws: 2, losses: 1, goalsFor: 17, goalsAgainst: 10, SaldoGols: 7, woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 16, goalsAgainst: 8, SaldoGols: 8, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 13, goalsAgainst: 22, SaldoGols: -9, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 14, goalsAgainst: 6, SaldoGols: 8, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 22, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 19, goalsAgainst: 4, SaldoGols: 15, woLosses: 0,
        players: []
      },
    ];

    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = [
      {
        name: 'Arsenal', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 14, goalsAgainst: 16, SaldoGols: -2, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 9, games: 8, wins: 3, draws: 0, losses: 5, goalsFor: 16, goalsAgainst: 16, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 13, games: 9, wins: 4, draws: 1, losses: 4, goalsFor: 19, goalsAgainst: 24, SaldoGols: -5, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 8, games: 9, wins: 2, draws: 2, losses: 5, goalsFor: 13, goalsAgainst: 25, SaldoGols: -12, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 9, games: 8, wins: 3, draws: 0, losses: 5, goalsFor: 14, goalsAgainst: 9, SaldoGols: 5, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 22, games: 8, wins: 7, draws: 1, losses: 0, goalsFor: 18, goalsAgainst: 5, SaldoGols: 13, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 14, games: 9, wins: 4, draws: 2, losses: 3, goalsFor: 16, goalsAgainst: 11, SaldoGols: 5, woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 11, games: 10, wins: 4, draws: 0, losses: 6, goalsFor: 17, goalsAgainst: 31, SaldoGols: -14, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 19, games: 9, wins: 6, draws: 1, losses: 2, goalsFor: 22, goalsAgainst: 5, SaldoGols: 17, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 15, games: 9, wins: 5, draws: 0, losses: 4, goalsFor: 15, goalsAgainst: 14, SaldoGols: 1, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 7, games: 9, wins: 2, draws: 1, losses: 6, goalsFor: 7, goalsAgainst: 15, SaldoGols: -8, woLosses: 0,
        players: []
      },
    ];

    return turno3.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  constructor(private snackBar: MatSnackBar) {
    this.adjustZoom();
    // Atualizando os dados de cada turno e da classificação geral sempre que houver mudança
    this.dataSourceTurno1Subject.subscribe(() => {
      this.updateTurno1();
      this.updateGeral();
    });
    this.dataSourceTurno2Subject.subscribe(() => {
      this.updateTurno2();
      this.updateGeral();
    });
    this.dataSourceTurno3Subject.subscribe(() => {
      this.updateTurno3();
      this.updateGeral();
    });
  }

  // DataSource para as tabelas dos turnos
  dataSourceTurno1Ordenado: Team[] = [];
  dataSourceTurno2Ordenado: Team[] = [];
  dataSourceTurno3Ordenado: Team[] = [];

  updateTurno1() {
    this.dataSourceTurno1Ordenado = [...this.dataSourceTurno1Subject.value].sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // 1º: pontos
      } else if (b.wins !== a.wins) {
        return b.wins - a.wins; // 2º: vitórias
      } else if (b.SaldoGols !== a.SaldoGols) {
        return b.SaldoGols - a.SaldoGols; // 3º: saldo de gols
      } else {
        return b.goalsFor - a.goalsFor; // 4º: gols feitos
      }
    });
  }
  
  updateTurno2() {
    this.dataSourceTurno2Ordenado = [...this.dataSourceTurno2Subject.value].sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else if (b.wins !== a.wins) {
        return b.wins - a.wins;
      } else if (b.SaldoGols !== a.SaldoGols) {
        return b.SaldoGols - a.SaldoGols;
      } else {
        return b.goalsFor - a.goalsFor;
      }
    });
  }
  
  updateTurno3() {
    this.dataSourceTurno3Ordenado = [...this.dataSourceTurno3Subject.value].sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else if (b.wins !== a.wins) {
        return b.wins - a.wins;
      } else if (b.SaldoGols !== a.SaldoGols) {
        return b.SaldoGols - a.SaldoGols;
      } else {
        return b.goalsFor - a.goalsFor;
      }
    });
  }
  
  // DataSource para a classificação geral
  dataSourceGeral: Team[] = [];

  updateGeral() {
    const teamMap = new Map<string, Team>();

    // Somando os dados dos 3 turnos
    [this.dataSourceTurno1Subject.value, this.dataSourceTurno2Subject.value, this.dataSourceTurno3Subject.value].forEach(turno => {
      turno.forEach((team: Team) => {
        // Calculando o número de jogos a partir das vitórias, empates e derrotas
        const totalGames = team.wins + team.draws + team.losses;

        if (!teamMap.has(team.name)) {
          teamMap.set(team.name, {
            ...team,
            games: totalGames,  // Inicializando com o número de jogos calculado
          });
        } else {
          const existingTeam = teamMap.get(team.name)!;
          existingTeam.points += team.points;
          existingTeam.SaldoGols += team.SaldoGols
          existingTeam.games += totalGames;  // Somando os jogos corretamente
          existingTeam.wins += team.wins;
          existingTeam.draws += team.draws;
          existingTeam.losses += team.losses;
          existingTeam.goalsFor += team.goalsFor;
          existingTeam.goalsAgainst += team.goalsAgainst;
          existingTeam.woLosses += team.woLosses;

        }
      });
    });

    // Ordenando a classificação geral
    this.dataSourceGeral = [...teamMap.values()].sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      } else if (b.wins !== a.wins) {
        return b.wins - a.wins;
      } else if (b.SaldoGols !== a.SaldoGols) {
        return b.SaldoGols - a.SaldoGols;
      } else {
        return b.goalsFor - a.goalsFor;
      }
    });
    
  }



  teams: Team[] = [
    {
      name: 'Arsenal',
      players: [
        {
          name: 'GABRIEL MARTINS', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NILSÃO', fouls: 1, yellowCard: 2, redCard: 1, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FRANK VIANNA', fouls: 2, yellowCard: 5, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JOSEPH TEVEZ', fouls: 2, yellowCard: 2, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CIÇO', fouls: 6, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ANDRÉ PORTUGAL', fouls: 1, yellowCard: 4, redCard: 1, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JUCA', fouls: 4, yellowCard: 0, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NAVAL', fouls: 3, yellowCard: 2, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JULIO CESAR', fouls: 3, yellowCard: 5, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CLAUDIO', fouls: 6, yellowCard: 2, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JANSEN', fouls: 8, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0

    },
    {
      name: 'Aston Villa',
      players: [
        {
          name: 'LEONARDO', fouls: 7, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MITIDIERI', fouls: 3, yellowCard: 5, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALEX RANGEL', fouls: 0, yellowCard: 1, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LULUCHA', fouls: 5, yellowCard: 1, redCard: 1, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ASSIS', fouls: 4, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO STELLET', fouls: 2, yellowCard: 4, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RICHARD', fouls: 1, yellowCard: 2, redCard: 0, goals: 24,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DIGÃO', fouls: 0, yellowCard: 0, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CARLOS CASTELO', fouls: 3, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'WANILDO', fouls: 2, yellowCard: 1, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DAYVISON', fouls: 2, yellowCard: 0, redCard: 1, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Blackpool',
      players: [
        {
          name: 'BRASIL', fouls: 1, yellowCard: 2, redCard: 1, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CARLINHOS', fouls: 6, yellowCard: 4, redCard: 2, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ANDRÉ VILHENA', fouls: 0, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'VALDETARO', fouls: 0, yellowCard: 3, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SHAMPOO', fouls: 7, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCIO LIMA', fouls: 4, yellowCard: 2, redCard: 0, goals: 9,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GREGÓRIO', fouls: 1, yellowCard: 3, redCard: 0, goals: 9,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'IVAN', fouls: 5, yellowCard: 1, redCard: 1, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RIDOLFI', fouls: 4, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SERGINHO', fouls: 1, yellowCard: 2, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MADURO', fouls: 2, yellowCard: 4, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Chelsea',
      players: [
        {
          name: 'ZUQUI', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JUN', fouls: 0, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO CID', fouls: 4, yellowCard: 0, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JUNIOR LUCIO', fouls: 2, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RONALDINHO', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MACHADO', fouls: 1, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO PACHECO', fouls: 2, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ELOIR', fouls: 3, yellowCard: 1, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCO ANDRÉ', fouls: 7, yellowCard: 4, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FRANK', fouls: 5, yellowCard: 0, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'WALTINHO', fouls: 0, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Leeds',
      players: [
        {
          name: 'AUGUSTO', fouls: 2, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GLAUBER', fouls: 0, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JOSÉ LUIZ', fouls: 2, yellowCard: 3, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RALF', fouls: 3, yellowCard: 0, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GERALDINHO', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NICOLAU', fouls: 3, yellowCard: 1, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CUPULILLE', fouls: 2, yellowCard: 3, redCard: 0, goals: 15,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RONALDO CUNHA', fouls: 0, yellowCard: 1, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PACHEQUINHO', fouls: 0, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SILVIO CAVALO', fouls: 1, yellowCard: 3, redCard: 1, goals: 13,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BIDO', fouls: 4, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Liverpool',
      players: [
        {
          name: 'LEANDRO MANHÃES', fouls: 4, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LATTANZI', fouls: 5, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MAURICIO', fouls: 4, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO DOMINÓ', fouls: 0, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GRACIE', fouls: 3, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BAHIA', fouls: 2, yellowCard: 4, redCard: 1, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FRANÇA', fouls: 4, yellowCard: 0, redCard: 0, goals: 17,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SANDRINHO', fouls: 1, yellowCard: 1, redCard: 0, goals: 12,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ANDRINHO', fouls: 5, yellowCard: 3, redCard: 0, goals: 7,
          suspensao: true,
          jogosSuspensao: 1
        },
        {
          name: 'CRISTIANO MOTTA', fouls: 3, yellowCard: 1, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BAZHUNI', fouls: 1, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Man. City',
      players: [
        {
          name: 'JOFRE', fouls: 1, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PALUDO', fouls: 2, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ECIR', fouls: 0, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CHICO LYRA', fouls: 3, yellowCard: 3, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FILÉ', fouls: 3, yellowCard: 1, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUIZINHO', fouls: 1, yellowCard: 2, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BODINHO', fouls: 5, yellowCard: 3, redCard: 1, goals: 23,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MAGRINHO', fouls: 1, yellowCard: 4, redCard: 1, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SERGIO SOMOS', fouls: 3, yellowCard: 3, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RENATINHO', fouls: 2, yellowCard: 1, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LIGEIRINHO', fouls: 5, yellowCard: 4, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Man. United',
      players: [
        {
          name: 'LUIZINHO JANSEN', fouls: 1, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CAVEIRÃO', fouls: 2, yellowCard: 6, redCard: 2, goals: 1,
          suspensao: true,
          jogosSuspensao: 1
        },
        {
          name: 'RATINHO', fouls: 2, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUIZ SLOW', fouls: 1, yellowCard: 0, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PAULO LORIA', fouls: 2, yellowCard: 0, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO FERREIRA', fouls: 4, yellowCard: 0, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PALMIERI', fouls: 4, yellowCard: 1, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TONINHO IMÓVEIS', fouls: 7, yellowCard: 3, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MELÃO', fouls: 2, yellowCard: 4, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELLUS', fouls: 6, yellowCard: 4, redCard: 0, goals: 24,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SERGIO CASTELO', fouls: 7, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Newcastle',
      players: [
        {
          name: 'JORGINHO GK', fouls: 6, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FABIO PINHEIRO', fouls: 0, yellowCard: 0, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PAULO MASSA', fouls: 4, yellowCard: 1, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TIGRINHO', fouls: 2, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JORGE MÉDICO', fouls: 2, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TONINHO', fouls: 0, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NALDO', fouls: 0, yellowCard: 2, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FLAVIO CHAME', fouls: 8, yellowCard: 2, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ARNALDO PRAIA CLUBE', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CAROÇO', fouls: 0, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARIO GRILLO', fouls: 4, yellowCard: 0, redCard: 0, goals: 12,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Tottenham',
      players: [
        {
          name: 'BRAGA', fouls: 3, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'KONTE', fouls: 2, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JACARÉ', fouls: 4, yellowCard: 0, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TATÁ', fouls: 3, yellowCard: 3, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO LUNA', fouls: 4, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CRISTIANO DENTISTA', fouls: 5, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARCELO DENTISTA', fouls: 7, yellowCard: 4, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CALVO', fouls: 1, yellowCard: 3, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RICARDINHO', fouls: 2, yellowCard: 0, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FABIO BARROS', fouls: 0, yellowCard: 1, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BARATA', fouls: 3, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    {
      name: 'Wolves',
      players: [
        {
          name: 'FELIPE CORREA', fouls: 2, yellowCard: 4, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ZARRO', fouls: 3, yellowCard: 4, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CACAU', fouls: 4, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GALO CEGO', fouls: 3, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JUNIOR SAMARY', fouls: 2, yellowCard: 3, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RUBINHO', fouls: 2, yellowCard: 1, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CADU', fouls: 0, yellowCard: 5, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LATINI', fouls: 2, yellowCard: 3, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALBERT', fouls: 2, yellowCard: 2, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NEY', fouls: 5, yellowCard: 2, redCard: 0, goals: 14,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'AMIN', fouls: 7, yellowCard: 0, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0,
      SaldoGols: 0
    },
    // Adicione outros times aqui
      // Definir qual linha mostrar

  ];

  onPopupClosed(): void {
    this.showWarningPopup = false;
  }

}

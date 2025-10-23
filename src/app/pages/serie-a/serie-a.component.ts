import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
import { AppComponent } from '../../app.component';

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
  position: string;
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
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './serie-a.component.html',
  styleUrl: './serie-a.component.scss'
})
export class SerieAComponent {
  isMenuOpen = false;
  displayedColumns: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumns1: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumnsTimes: string[] = ['name', 'fouls', 'yellowCard', 'redCard', 'goals'];
  pdfSrc = 'assets/img/TABELA_A_JOGOS.pdf';
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
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/A Fabrica.png', alt: 'A Fábrica' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
    { src: 'assets/img/A Oficina.png', alt: 'A Oficina' },
    { src: 'assets/img/Berton.jpg', alt: 'Berton' },
    { src: 'assets/img/Biasoli.jpg', alt: 'Biasoli' },
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
    { src: 'assets/img/casa das fechaduras.png', alt: 'Casa das Fechaduras' },
    { src: 'assets/img/CEMOPE.jpg', alt: 'CEMOPE' },
    { src: 'assets/img/HMSC.jpg', alt: 'HMSC' },
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
    { src: 'assets/img/Grand Marché.png', alt: 'Grand Marché' },
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

    { turn: 1, round: 1, homeTeam: 'BlackPool', awayTeam: 'Tottenham', date: '2025-02-12', homeGoals: 3, awayGoals: 3 },
    { turn: 1, round: 1, homeTeam: 'Arsenal', awayTeam: 'Man. United', date: '2025-02-13', homeGoals: 0, awayGoals: 3 },
    { turn: 1, round: 1, homeTeam: 'Man. City', awayTeam: 'NewCastle', date: '2025-02-14', homeGoals: 4, awayGoals: 0 },

    { turn: 1, round: 2, homeTeam: 'Man. United', awayTeam: 'Wolves', date: '2025-02-17', homeGoals: 0, awayGoals: 1 },
    { turn: 1, round: 2, homeTeam: 'Man. City', awayTeam: 'Tottenham', date: '2025-02-18', homeGoals: 4, awayGoals: 4 },
    { turn: 1, round: 2, homeTeam: 'Arsenal', awayTeam: 'NewCastle', date: '2025-02-19', homeGoals: 3, awayGoals: 4 },
    { turn: 1, round: 2, homeTeam: 'Chelsea', awayTeam: 'Leeds', date: '2025-02-20', homeGoals: 1, awayGoals: 5 },
    { turn: 1, round: 2, homeTeam: 'BlackPool', awayTeam: 'Liverpool', date: '2025-02-21', homeGoals: 1, awayGoals: 1 },

    { turn: 1, round: 3, homeTeam: 'Arsenal', awayTeam: 'Man. City', date: '2025-02-24', homeGoals: 3, awayGoals: 4 },
    { turn: 1, round: 3, homeTeam: 'Aston Villa', awayTeam: 'Man. United', date: '2025-02-25', homeGoals: 2, awayGoals: 4 },
    { turn: 1, round: 3, homeTeam: 'BlackPool', awayTeam: 'NewCastle', date: '2025-02-26', homeGoals: 1, awayGoals: 2 },
    { turn: 1, round: 3, homeTeam: 'Chelsea', awayTeam: 'Wolves', date: '2025-02-27', homeGoals: 1, awayGoals: 1 },
    // { turn: 1, round: 3, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-02-28', homeGoals: 0, awayGoals: 0 },


    { turn: 1, round: 4, homeTeam: 'Aston Villa', awayTeam: 'Wolves', date: '2025-03-06', homeGoals: 1, awayGoals: 2 },

    { turn: 1, round: 5, homeTeam: 'Arsenal', awayTeam: 'Tottenham', date: '2025-03-10', homeGoals: 1, awayGoals: 3 },
    { turn: 1, round: 5, homeTeam: 'NewCastle', awayTeam: 'Liverpool', date: '2025-03-11', homeGoals: 4, awayGoals: 3 },
    { turn: 1, round: 5, homeTeam: 'Man. City', awayTeam: 'Chelsea', date: '2025-03-12', homeGoals: 1, awayGoals: 3 },
    { turn: 1, round: 5, homeTeam: 'Aston Villa', awayTeam: 'BlackPool', date: '2025-03-13', homeGoals: 5, awayGoals: 3 },

    { turn: 1, round: 6, homeTeam: 'Man. City', awayTeam: 'Liverpool', date: '2025-03-17', homeGoals: 1, awayGoals: 7 },
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
    const date = new Date(dateString + 'T21:00:00'); // Força horário para 20h UTC

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
        name: 'MORENO', goals: 6, time: 'Blackpool',
      },
      {
        name: 'CALEB', goals: 2, time: 'Blackpool',
      },
      {
        name: 'DANIEL GLORIA', goals: 7, time: 'Blackpool',
      },
      {
        name: 'HÉLIO', goals: 16, time: 'Blackpool',
      },
      {
        name: 'ARLEY', goals: 14, time: 'Tottenham',
      },
      {
        name: 'RAPHAEL UNGERER', goals: 16, time: 'Arsenal',
      },
      {
        name: 'RODRIGO SARAMAGO', goals: 2, time: 'Man. United',
      },
      {
        name: 'CLEBERSON', goals: 11, time: 'Man. United',
      },
      {
        name: 'GUILHERME POLÍCIA', goals: 11, time: 'Man. United',
      },
      {
        name: 'TELLES', goals: 2, time: 'Man. United',
      },
      {
        name: 'HENRIQUE WHISKY', goals: 26, time: 'Man. United',
      },
      {
        name: 'MAGUILA', goals: 5, time: 'Man. City',
      },
      {
        name: 'PAULO NUNES', goals: 21, time: 'Man. City',
      },
      {
        name: 'BRUNO FILÉ', goals: 15, time: 'Man. City',
      },
      {
        name: 'BERNARDO FILÉ', goals: 7, time: 'Man. City',
      },
      {
        name: 'DIEGO BLOIS', goals: 1, time: 'Man. City',
      },
      {
        name: 'CAIO ASSAD', goals: 12, time: 'Wolves',
      },
      {
        name: 'LELECO', goals: 2, time: 'Man. City',
      },
      {
        name: 'IVAN', goals: 17, time: 'Tottenham',
      },

      {
        name: 'RAFAEL HARDUIM', goals: 3, time: 'Tottenham',
      },
      {
        name: 'MESSIAS', goals: 2, time: 'Tottenham',
      },
      {
        name: 'CAPELLI', goals: 2, time: 'Tottenham',
      },
      {
        name: 'CEBOLA', goals: 2, time: 'Arsenal',
      },
      {
        name: 'JOSÉ MARCIO', goals: 10, time: 'Arsenal',
      },
      {
        name: 'BENITO', goals: 2, time: 'Arsenal',
      },
      {
        name: 'ARTUR FORTES', goals: 2, time: 'Newcastle',
      },
      {
        name: 'LÉO ROCHA', goals: 12, time: 'Newcastle',
      },
      {
        name: 'PLÍNIO', goals: 12, time: 'Chelsea',
      },
      {
        name: 'FABIANO', goals: 1, time: 'Chelsea',
      },
      {
        name: 'EDSON', goals: 2, time: 'Leeds',
      },
      {
        name: 'RODRIGO LIMA', goals: 17, time: 'Leeds',
      },
      {
        name: 'CHUMBINHO', goals: 3, time: 'Leeds',
      },
      {
        name: 'RODRIGO HERDY', goals: 5, time: 'Leeds',
      },
      {
        name: 'KIKO', goals: 2, time: 'Leeds',
      },
            {
        name: 'ITALO', goals: 5, time: 'Leeds',
      },
      {
        name: 'RONALDO', goals: 33, time: 'Leeds',
      },
      {
        name: 'THIAGO RANGEL', goals: 10, time: 'Liverpool',
      },
      {
        name: 'JORGE MARTINS', goals: 2, time: 'Liverpool',
      },
      {
        name: 'CADU', goals: 2, time: 'Liverpool',
      },
      {
        name: 'GEORGE', goals: 1, time: 'Man. City',
      },
      {
        name: 'NANDO', goals: 15, time: 'Aston Villa',
      },
      {
        name: 'LUIZINHO COSTELA', goals: 21, time: 'Aston Villa',
      },
      {
        name: 'BERTON', goals: 1, time: 'Man. United',
      },
      {
        name: 'VINICIUS REIS', goals: 11, time: 'Man. United',
      },
      {
        name: 'JORGINHO', goals: 3, time: 'Newcastle',
      },
      {
        name: 'LUIZ FELLIPE', goals: 17, time: 'Chelsea',
      },
      {
        name: 'CLEBINHO', goals: 10, time: 'Wolves',
      },
      {
        name: 'SIGILIÃO', goals: 13, time: 'Wolves',
      },
      {
        name: 'BRUNO NEGÃO', goals: 1, time: 'Newcastle',
      },
      {
        name: 'BRUNO PÃO', goals: 5, time: 'Liverpool',
      },
      {
        name: 'FEIJÓ', goals: 21, time: 'Liverpool',
      },
      {
        name: 'BRUNINHO', goals: 2, time: 'Chelsea',
      },
      {
        name: 'DOUGLAS CAVALCANTE', goals: 1, time: 'Chelsea',
      },
      {
        name: 'GINHO', goals: 7, time: 'Chelsea',
      },
      {
        name: 'ROBSON BARBOSA', goals: 2, time: 'Aston Villa',
      },
      {
        name: 'PAULINHO', goals: 1, time: 'Man. City',
      },
      {
        name: 'LÉO CANENA', goals: 10, time: 'Liverpool',
      },
      {
        name: 'DIOGO RAMOS', goals: 2, time: 'Liverpool',
      },
      {
        name: 'RAFA', goals: 2, time: 'Arsenal',
      },
      {
        name: 'ALLAN', goals: 24, time: 'Aston Villa',
      },
      {
        name: 'LUCAS FIGUEIREDO', goals: 2, time: 'Aston Villa',
      },
      {
        name: 'GUILHERME SS', goals: 8, time: 'Leeds',
      },
      {
        name: 'IGOR BRASIL', goals: 2, time: 'Wolves',
      },
      {
        name: 'ROBERTO ROMÃO', goals: 3, time: 'Newcastle',
      },
      {
        name: 'HUMBERTO', goals: 1, time: 'Newcastle',
      },
      {
        name: 'RODRIGO VILA CHÃ', goals: 1, time: 'Newcastle',
      },
      {
        name: 'TOPIQUINHO', goals: 10, time: 'Newcastle',
      },
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
      .slice(0, 10);                      // Pegando apenas os 10 primeiros

    // Dados fictícios de goleiros menos vazados
    this.topGoalkeepers = [
      {
        name: 'BACON', goalsConceded: 76,
        time: 'Arsenal'
      },
      {
        name: 'LUCAS MILWARD', goalsConceded: 67,
        time: 'Aston Villa'
      },
      {
        name: 'MARKITO', goalsConceded: 56,
        time: 'Blackpool'
      },
      {
        name: 'MAGELA', goalsConceded: 78,
        time: 'Chelsea'
      },
      {
        name: 'LUCAS POCHETINNI', goalsConceded: 48,
        time: 'Leeds'
      },
      {
        name: 'GABRIEL SPIDER', goalsConceded: 62,
        time: 'Liverpool'
      },
      {
        name: 'JOÃO VICTOR', goalsConceded: 75,
        time: 'Man. City'
      },
      {
        name: 'SOMÁLIA', goalsConceded: 43,
        time: 'Man. United'
      },
      {
        name: 'BRUNO MITIDIERI', goalsConceded: 63,
        time: 'Newcastle'
      },
      {
        name: 'ALEXANDRE', goalsConceded: 67,
        time: 'Tottenham'
      },
      {
        name: 'MATHEUS MERECCI', goalsConceded: 50,
        time: 'Wolves'
      },
    ];

    // Ordena os goleiros por menos gols sofridos
    this.topGoalkeepers.sort((a, b) => {
      if (a.goalsConceded !== b.goalsConceded) {
        return a.goalsConceded - b.goalsConceded; // Ordena por menor número de gols sofridos
      }
      return a.name.localeCompare(b.name); // Critério de desempate: ordem alfabética
    });

    this.topGoalkeepers.sort((a, b) => a.goalsConceded - b.goalsConceded);
  }




  // Observables para os dados dos turnos
  private dataSourceTurno1Subject = new BehaviorSubject<Team[]>(this.initializeTurno1());
  private dataSourceTurno2Subject = new BehaviorSubject<Team[]>(this.initializeTurno2());
  private dataSourceTurno3Subject = new BehaviorSubject<Team[]>(this.initializeTurno3());

  initializeTurno1(): Team[] {
    const turno1: Team[] = [
      {
        name: 'Arsenal', points: 1, games: 10, wins: 0, draws: 1, losses: 9, goalsFor: 15, goalsAgainst: 31, SaldoGols: -16, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 24, goalsAgainst: 32, SaldoGols: -8, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 7, games: 10, wins: 1, draws: 4, losses: 5, goalsFor: 17, goalsAgainst: 22, SaldoGols: -5, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 23, goalsAgainst: 23, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 31, games: 10, wins: 9, draws: 1, losses: 0, goalsFor: 28, goalsAgainst: 6, SaldoGols: 22, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 27, goalsAgainst: 20, SaldoGols: 7, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 17, games: 10, wins: 5, draws: 2, losses: 3, goalsFor: 28, goalsAgainst: 28, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 22, goalsAgainst: 13, SaldoGols: 9, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 18, goalsAgainst: 24, SaldoGols: -6, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 22, goalsAgainst: 27, SaldoGols: -5, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 20, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 12, goalsAgainst: 10, SaldoGols: 2, woLosses: 0,
        players: []
      },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = [
      {
        name: 'Arsenal', points: 25, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 25, goalsAgainst: 19, SaldoGols: 6, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 11, games: 10, wins: 2, draws: 5, losses: 3, goalsFor: 25, goalsAgainst: 22, SaldoGols: 3, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 12, goalsAgainst: 22, SaldoGols: -10, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 24, goalsAgainst: 31, SaldoGols: -7, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 19, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 44, goalsAgainst: 18, SaldoGols: 26, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 21, goalsAgainst: 32, SaldoGols: -11, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 17, goalsAgainst: 29, SaldoGols: -12, woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 17, games: 10, wins: 5, draws: 2, losses: 3, goalsFor: 26, goalsAgainst: 17, SaldoGols: 9, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 16, goalsAgainst: 21, SaldoGols: -5, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 25, goalsAgainst: 25, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 15, games: 10, wins: 4, draws: 3, losses: 3, goalsFor: 24, goalsAgainst: 22, SaldoGols: 2, woLosses: 0,
        players: []
      },
    ];

    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = [
      {
        name: 'Arsenal', points: 9, games: 10, wins: 2, draws: 3, losses: 5, goalsFor: 15, goalsAgainst: 26, SaldoGols: -11, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 15, games: 8, wins: 4, draws: 3, losses: 1, goalsFor: 22, goalsAgainst: 13, SaldoGols: 9, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 19, games: 9, wins: 6, draws: 1, losses: 2, goalsFor: 19, goalsAgainst: 12, SaldoGols: 7, woLosses: 0,
        players: []
      },
      {
        name: 'Chelsea', points: 2, games: 9, wins: 0, draws: 2, losses: 7, goalsFor: 10, goalsAgainst: 24, SaldoGols: -14, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 10, games: 8, wins: 3, draws: 1, losses: 4, goalsFor: 18, goalsAgainst: 24, SaldoGols: -6, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 13, games: 8, wins: 4, draws: 1, losses: 3, goalsFor: 14, goalsAgainst: 10, SaldoGols: 4, woLosses: 0,
        players: []
      },
      {
        name: 'Man. City', points: 14, games: 9, wins: 4, draws: 2, losses: 3, goalsFor: 21, goalsAgainst: 18, SaldoGols: 3, woLosses: 0,
        players: []
      },
      {
        name: 'Man. United', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 26, goalsAgainst: 13, SaldoGols: 13, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 15, games: 9, wins: 5, draws: 0, losses: 4, goalsFor: 20, goalsAgainst: 18, SaldoGols: 2, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 12, games: 9, wins: 3, draws: 3, losses: 3, goalsFor: 15, goalsAgainst: 15, SaldoGols: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 6, games: 9, wins: 1, draws: 3, losses: 5, goalsFor: 11, goalsAgainst: 18, SaldoGols: -7, woLosses: 0,
        players: []
      },
    ];

    return turno3.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  constructor() {
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
          name: 'BACON', position: 'Goleiro', fouls: 6, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JOÃO PAULO', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BENITO', position: 'Lateral 1', fouls: 1, yellowCard: 3, redCard: 1, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'KELLER', position: 'Lateral 2', fouls: 2, yellowCard: 6, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNO ARANHA', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RAPHAEL UNGERER', position: 'Meio Campo 1', fouls: 0, yellowCard: 5, redCard: 0, goals: 16,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FELIPE CID', position: 'Meio Campo 2', fouls: 2, yellowCard: 3, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JOSÉ MARCIO', position: 'Atacante', fouls: 2, yellowCard: 0, redCard: 1, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CEBOLA', position: 'Flex 1', fouls: 4, yellowCard: 2, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JOÃO ALBERTO', position: 'Flex 2', fouls: 7, yellowCard: 2, redCard: 1, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LEANDRO', position: 'Flex 3', fouls: 5, yellowCard: 0, redCard: 0, goals: 1,
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
          name: 'LUCAS MILWARD', position: 'Goleiro', fouls: 0, yellowCard: 5, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUCAS FIGUEIREDO', position: 'Zagueiro', fouls: 6, yellowCard: 1, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DANIEL TOSTES', position: 'Lateral 1', fouls: 4, yellowCard: 4, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FLAVINHO', position: 'Lateral 2', fouls: 6, yellowCard: 2, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RENATO TOSTES', position: 'Volante', fouls: 5, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUIZINHO COSTELA', position: 'Meio Campo 1', fouls: 1, yellowCard: 2, redCard: 0, goals: 21,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NANDO', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 15,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALLAN', position: 'Atacante', fouls: 0, yellowCard: 1, redCard: 0, goals: 24,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GABRIEL PALMIERI', position: 'Flex 1', fouls: 1, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RICARDO ', position: 'Flex 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'POIAVA', position: 'Flex 3', fouls: 6, yellowCard: 1, redCard: 0, goals: 0,
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
          name: 'MARKITO', position: 'Goleiro', fouls: 0, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LF PAI NOVO', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MORENO', position: 'Lateral 1', fouls: 5, yellowCard: 2, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MARIANO', position: 'Lateral 2', fouls: 1, yellowCard: 5, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUCAS SIRI', position: 'Volante', fouls: 2, yellowCard: 5, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RAFAEL ALMEIDA', position: 'Meio Campo 1', fouls: 1, yellowCard: 2, redCard: 1, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'VINICIUS PINNA', position: 'Meio Campo 2', fouls: 0, yellowCard: 1, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'HÉLIO', position: 'Atacante', fouls: 4, yellowCard: 4, redCard: 0, goals: 16,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALMIRO', position: 'Flex 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALEX GOMES', position: 'Flex 2', fouls: 4, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RUDDY', position: 'Flex 3', fouls: 6, yellowCard: 0, redCard: 0, goals: 2,
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
          name: 'MAGELA', position: 'Goleiro', fouls: 2, yellowCard: 3, redCard: 1, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FABIANO', position: 'Zagueiro', fouls: 2, yellowCard: 5, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ZAMBROTTI', position: 'Lateral 1', fouls: 8, yellowCard: 1, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRENO', position: 'Lateral 2', fouls: 1, yellowCard: 4, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNINHO', position: 'Volante', fouls: 5, yellowCard: 3, redCard: 2, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNO NEGÃO', position: 'Meio Campo 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PLÍNIO', position: 'Meio Campo 2', fouls: 3, yellowCard: 2, redCard: 0, goals: 12,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LUIZ FELLIPE', position: 'Atacante', fouls: 0, yellowCard: 3, redCard: 0, goals: 17,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PEDRO TOSTES', position: 'Flex 1', fouls: 4, yellowCard: 5, redCard: 1, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'VITOR MARTINS', position: 'Flex 2', fouls: 6, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DOUGLAS CAVALCANTE', position: 'Flex 3', fouls: 2, yellowCard: 5, redCard: 0, goals: 4,
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
          name: 'LUCAS POCHETINNI', position: 'Goleiro', fouls: 4, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'KIKO', position: 'Zagueiro', fouls: 7, yellowCard: 3, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ITALO', position: 'Lateral 1', fouls: 2, yellowCard: 3, redCard: 0, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'EDSON', position: 'Lateral 2', fouls: 3, yellowCard: 1, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RODRIGO HERDY', position: 'Volante', fouls: 4, yellowCard: 4, redCard: 2, goals: 5,
          suspensao: true,
          jogosSuspensao: 4
        },
        {
          name: 'CHUMBINHO', position: 'Meio Campo 1', fouls: 1, yellowCard: 5, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RODRIGO LIMA', position: 'Meio Campo 2', fouls: 0, yellowCard: 4, redCard: 0, goals: 17,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RONALDO', position: 'Atacante', fouls: 1, yellowCard: 3, redCard: 0, goals: 33,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MODESTO', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LEONE', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PIMENTEL', position: 'Flex 3', fouls: 1, yellowCard: 6, redCard: 0, goals: 5,
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
          name: 'GABRIEL SPIDER', position: 'Goleiro', fouls: 2, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'IGOR XINGU', position: 'Zagueiro', fouls: 1, yellowCard: 4, redCard: 1, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JORGE MARTINS', position: 'Lateral 1', fouls: 5, yellowCard: 3, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LÉO CANENA', position: 'Lateral 2', fouls: 6, yellowCard: 4, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'THIAGO RANGEL', position: 'Volante', fouls: 1, yellowCard: 5, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FEIJÓ', position: 'Meio Campo 1', fouls: 2, yellowCard: 3, redCard: 0, goals: 21,
          suspensao: true,
          jogosSuspensao: 1
        },
        {
          name: 'BRUNO PÃO', position: 'Meio Campo 2', fouls: 8, yellowCard: 3, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TONNY', position: 'Atacante', fouls: 2, yellowCard: 3, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FELIPE CAVEIRÃO', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ALLAN TITONELLI', position: 'Flex 2', fouls: 6, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DIOGO RAMOS', position: 'Flex 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 2,
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
          name: 'JOÃO VICTOR', position: 'Goleiro', fouls: 3, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BERNARDO FILÉ', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 1, goals: 8,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LELECO', position: 'Lateral 1', fouls: 1, yellowCard: 3, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNO FILÉ', position: 'Lateral 2', fouls: 1, yellowCard: 1, redCard: 0, goals: 15,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MANARTE', position: 'Volante', fouls: 0, yellowCard: 4, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PAULO NUNES', position: 'Meio Campo 1', fouls: 3, yellowCard: 3, redCard: 0, goals: 21,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'DIEGO BLOIS', position: 'Meio Campo 2', fouls: 1, yellowCard: 3, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MAGUILA', position: 'Atacante', fouls: 5, yellowCard: 2, redCard: 0, goals: 7,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GABRIEL LIMA', position: 'Flex 1', fouls: 1, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'KLEBÃO', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PAULINHO', position: 'Flex 3', fouls: 7, yellowCard: 0, redCard: 0, goals: 2,
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
          name: 'SOMÁLIA', position: 'Goleiro', fouls: 4, yellowCard: 2, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RODRIGO SARAMAGO', position: 'Zagueiro', fouls: 4, yellowCard: 6, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'VINICIUS REIS', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 11,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TELLES', position: 'Lateral 2', fouls: 0, yellowCard: 5, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BERTON', position: 'Volante', fouls: 3, yellowCard: 4, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'HENRIQUE WHISKY', position: 'Meio Campo 1', fouls: 2, yellowCard: 5, redCard: 0, goals: 26,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CLEBERSON', position: 'Meio Campo 2', fouls: 1, yellowCard: 5, redCard: 0, goals: 11,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'GUILHERME POLÍCIA', position: 'Atacante', fouls: 3, yellowCard: 1, redCard: 0, goals: 11,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CAROÇO', position: 'Flex 1', fouls: 6, yellowCard: 3, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNO ALFIERI', position: 'Flex 2', fouls: 1, yellowCard: 5, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LÉO NOVARINO', position: 'Flex 3', fouls: 6, yellowCard: 0, redCard: 0, goals: 4,
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
          name: 'BRUNO MITIDIERI', position: 'Goleiro', fouls: 1, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'NETTO', position: 'Zagueiro', fouls: 5, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'JORGINHO', position: 'Lateral 1', fouls: 1, yellowCard: 2, redCard: 1, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ROBERTO ROMÃO', position: 'Lateral 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 4,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ARTUR FORTES', position: 'Volante', fouls: 2, yellowCard: 2, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'TOPIQUINHO', position: 'Meio Campo 1', fouls: 1, yellowCard: 2, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LÉO ROCHA', position: 'Meio Campo 2', fouls: 2, yellowCard: 5, redCard: 0, goals: 12,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MAURICIO BATATA', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 5,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RODRIGO VILA CHÃ', position: 'Flex 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BRUNO TROIA', position: 'Flex 2', fouls: 1, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'HUMBERTO', position: 'Flex 3', fouls: 2, yellowCard: 3, redCard: 0, goals: 2,
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
          name: 'ALEXANDRE', position: 'Goleiro', fouls: 6, yellowCard: 1, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CHICÃO', position: 'Zagueiro', fouls: 4, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FRANCELINO', position: 'Lateral 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CAPELLI', position: 'Lateral 2', fouls: 4, yellowCard: 2, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'BELLADONNA', position: 'Volante', fouls: 1, yellowCard: 4, redCard: 0, goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'IVAN', position: 'Meio Campo 1', fouls: 2, yellowCard: 3, redCard: 0, goals: 17,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'PATRICK BITTENCOURT', position: 'Meio Campo 2', fouls: 0, yellowCard: 4, redCard: 0, goals: 6,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'ARLEY', position: 'Atacante', fouls: 1, yellowCard: 8, redCard: 1, goals: 14,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'RAFAEL HARDUIM', position: 'Flex 1', fouls: 1, yellowCard: 3, redCard: 0, goals: 7,
          suspensao: true,
          jogosSuspensao: 1
        },
        {
          name: 'LECO', position: 'Flex 2', fouls: 1, yellowCard: 3, redCard: 1, goals: 2,
          suspensao: true,
          jogosSuspensao: 1
        },
        {
          name: 'VITOR COREIXAS', position: 'Flex 3', fouls: 4, yellowCard: 3, redCard: 0, goals: 3,
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
          name: 'MATHEUS MERECCI', position: 'Goleiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'AMARAL', position: 'Zagueiro', fouls: 3, yellowCard: 2, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'IGOR BRASIL', position: 'Lateral 1', fouls: 1, yellowCard: 5, redCard: 0, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'FARIAS', position: 'Lateral 2', fouls: 6, yellowCard: 3, redCard: 0, goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MOURÃO', position: 'Volante', fouls: 2, yellowCard: 8, redCard: 1, goals: 3,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'CLEBINHO', position: 'Meio Campo 1', fouls: 0, yellowCard: 3, redCard: 0, goals: 10,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'CAIO ASSAD', position: 'Meio Campo 2', fouls: 5, yellowCard: 7, redCard: 1, goals: 12,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'SIGILIÃO', position: 'Atacante', fouls: 6, yellowCard: 8, redCard: 0, goals: 13,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'LAUZÃO', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'MINHA JOIA', position: 'Flex 2', fouls: 8, yellowCard: 3, redCard: 1, goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'XIMBINHA', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 1,
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
  ];




  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openRegulamento(): void {
    // const url = 'assets/img/REGULAMENTO 2024-v2.pdf';
    // window.open(url, '_blank');
  }
}

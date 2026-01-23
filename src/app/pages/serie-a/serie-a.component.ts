import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
import { AppComponent } from '../../app.component';

interface Team {
  name: string;
  icon: string;
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
  jogosSuspensao?: number;
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

  imagemCaminho: string = 'assets/img/JogosMataMataA.jpg';

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
      // { name: 'FABIO PINHEIRO', goals: 4, time: 'Newcastle' },
    ]

    this.topGoalkeepers = [
      {
        name: 'Jogador 1',
        goalsConceded: 0,
        time: 'Alemanha'
      },
      {
        name: 'Jogador 2',
        goalsConceded: 0,
        time: 'Argentina'
      },
      {
        name: 'Jogador 3',
        goalsConceded: 0,
        time: 'Brasil'
      },
      {
        name: 'Jogador 4',
        goalsConceded: 0,
        time: 'Espanha'
      },
      {
        name: 'Jogador 5',
        goalsConceded: 0,
        time: 'França'
      },
      {
        name: 'Jogador 6',
        goalsConceded: 0,
        time: 'Holanda'
      },
      {
        name: 'Jogador 7',
        goalsConceded: 0,
        time: 'Inglaterra'
      },
      {
        name: 'Jogador 8',
        goalsConceded: 0,
        time: 'Itália'
      },
      {
        name: 'Jogador 9',
        goalsConceded: 0,
        time: 'México'
      },
      {
        name: 'Jogador 10',
        goalsConceded: 0,
        time: 'Portugal'
      },
      {
        name: 'Jogador 11',
        goalsConceded: 0,
        time: 'Uruguai'
      }
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
      { name: 'Alemanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = [
      { name: 'Alemanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
    ];
    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = [
      { name: 'Alemanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 0, games: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
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
      name: 'Alemanha',
      icon: 'assets/img/alemanha.png',
      players: [
        {
          name: '',
          position: 'Goleiro',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Zagueiro',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Lateral 1',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Lateral 2',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Volante',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Meio Campo 1',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Meio Campo 2',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Atacante',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Flex 1',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Flex 2',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: '',
          position: 'Flex 3',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        }
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
    }, {
      name: 'Argentina',
      icon: 'assets/img/argentina.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    },
    {
      name: 'Brasil',
      icon: 'assets/img/brasil.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Espanha',
      icon: 'assets/img/espanha.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'França',
      icon: 'assets/img/frança.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Holanda',
      icon: 'assets/img/holanda.png',
      players: [
        { name: 'Teste Teste Teste', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Inglaterra',
      icon: 'assets/img/inglaterra.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Itália',
      icon: 'assets/img/italia.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'México',
      icon: 'assets/img/mexico.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Portugal',
      icon: 'assets/img/portugal.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Uruguai',
      icon: 'assets/img/uruguai.png',
      players: [
        { name: '', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: '', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }



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

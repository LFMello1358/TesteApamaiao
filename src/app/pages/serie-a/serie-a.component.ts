import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';

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
  players: Player[];
}
interface Player {
  name: string;
  position: string;
  fouls: number;
  yellowCard: number;
  redCard: number;
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
}

@Component({
  selector: 'app-serie-a',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './serie-a.component.html',
  styleUrl: './serie-a.component.scss'
})
export class SerieAComponent {
  displayedColumns: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'woLosses'];
  displayedColumns1: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'woLosses'];
  displayedColumnsTimes: string[] = [ 'position', 'name', 'fouls', 'yellowCard', 'redCard', 'goals'];

    // Dados de artilharia
    topArtillery: Player[] = [];

    // Dados de goleiros menos vazados
    topGoalkeepers: Goalkeeper[] = [];
  
  
// Dados fictícios para as partidas de cada rodada
matches = [
  { turn: 1, round: 1, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 1, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 1, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 1, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 1, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 2, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 2, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 2, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 2, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 2, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 3, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 3, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 3, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 3, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 3, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 4, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 4, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 4, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 4, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 1, round: 4, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 1, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 1, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 1, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 1, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 1, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 2, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 2, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 2, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 2, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 2, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 3, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 3, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 3, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 3, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 3, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 4, homeTeam: 'Arsenal', awayTeam: 'Aston Villa', date: '2025-01-10', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 4, homeTeam: 'Blackpool', awayTeam: 'Chealsea', date: '2025-01-11', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 4, homeTeam: 'Leeds', awayTeam: 'Liverpool', date: '2025-01-12', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 4, homeTeam: 'Manchester City', awayTeam: 'Manchester United', date: '2025-01-13', homeGoals: 0, awayGoals: 0 },
  { turn: 2, round: 4, homeTeam: 'Newcastle', awayTeam: 'Tottenham', date: '2025-01-14', homeGoals: 0, awayGoals: 0 },
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

// Método para formatar a data com o mês em números e sem o ano
formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' }).format(date);
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
      // Dados fictícios de artilharia
      this.topArtillery = [
        {
          name: 'Jogador 1', goals: 10,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 2', goals: 9,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 3', goals: 8,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 4', goals: 7,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 5', goals: 6,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 6', goals: 5,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 7', goals: 4,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 8', goals: 3,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 9', goals: 2,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 10', goals: 1,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
        {
          name: 'Jogador 11', goals: 0,
          position: '',
          fouls: 0,
          yellowCard: 0,
          redCard: 0
        },
      ];
    
      // Dados fictícios de goleiros menos vazados
      this.topGoalkeepers = [
        { name: 'Goleiro 1', goalsConceded: 29 },
        { name: 'Goleiro 2', goalsConceded: 4 },
        { name: 'Goleiro 3', goalsConceded: 6 },
        { name: 'Goleiro 4', goalsConceded: 8 },
        { name: 'Goleiro 5', goalsConceded: 10 },
        { name: 'Goleiro 6', goalsConceded: 12 },
        { name: 'Goleiro 7', goalsConceded: 14 },
        { name: 'Goleiro 8', goalsConceded: 16 },
        { name: 'Goleiro 9', goalsConceded: 18 },
        { name: 'Goleiro 10', goalsConceded: 20 },
        { name: 'Goleiro 11', goalsConceded: 22 },
      ];
    
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
        name: 'Arsenal', points: 0, games: 10, wins: 0, draws: 0, losses: 10, goalsFor: 0, goalsAgainst: 30, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 30, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 24, games: 10, wins: 8, draws: 0, losses: 2, goalsFor: 26, goalsAgainst: 10, woLosses: 0,
        players: []
      },
      {
        name: 'Chealsea', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester City', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester United', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0,
        players: []
      },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = [ 
      {
        name: 'Arsenal', points: 0, games: 10, wins: 0, draws: 0, losses: 10, goalsFor: 0, goalsAgainst: 36, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 30, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 0, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 24, games: 10, wins: 8, draws: 0, losses: 2, goalsFor: 26, goalsAgainst: 10, woLosses: 0,
        players: []
      },
      {
        name: 'Chealsea', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester City', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester United', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0,
        players: []
      },
    ];

    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = [
      {
        name: 'Arsenal', points: 35, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 5, woLosses: 0,
        players: []
      },
      {
        name: 'Aston Villa', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 25, goalsAgainst: 10, woLosses: 0,
        players: []
      },
      {
        name: 'Blackpool', points: 26, games: 10, wins: 8, draws: 2, losses: 0, goalsFor: 22, goalsAgainst: 12, woLosses: 1,
        players: []
      },
      {
        name: 'Chealsea', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Leeds', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0,
        players: []
      },
      {
        name: 'Liverpool', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester City', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0,
        players: []
      },
      {
        name: 'Manchester United', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0,
        players: []
      },
      {
        name: 'Newcastle', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0,
        players: []
      },
      {
        name: 'Tottenham', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0,
        players: []
      },
      {
        name: 'Wolves', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0,
        players: []
      },
    ];

    return turno3.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  constructor() {
    // Atualizando os dados gerais sempre que um dos turnos mudar
    this.dataSourceTurno1Subject.subscribe(() => this.updateGeral());
    this.dataSourceTurno2Subject.subscribe(() => this.updateGeral());
    this.dataSourceTurno3Subject.subscribe(() => this.updateGeral());
  }

  get dataSourceTurno1() {
    return this.dataSourceTurno1Subject.asObservable();
  }

  get dataSourceTurno2() {
    return this.dataSourceTurno2Subject.asObservable();
  }

  get dataSourceTurno3() {
    return this.dataSourceTurno3Subject.asObservable();
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
            games: totalGames  // Inicializando com o número de jogos calculado
          });
        } else {
          const existingTeam = teamMap.get(team.name)!;
          existingTeam.points += team.points;
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
    this.dataSourceGeral = Array.from(teamMap.values()).sort((a, b) => b.points - a.points);
  }


  teams: Team[] = [
    {
      name: 'Arsenal',
      players: [
        { name: 'Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: 'Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: 'Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: 'Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: 'Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: 'Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: 'Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: 'Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: 'Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: 'Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: 'Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Aston Villa',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Blackpool',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Chealsea',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Leeds',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Liverpool',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Manchester City',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Manchester United',
      players: [
        { name: '2Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Newcastle',
      players: [
        { name: '9Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Tottenham',
      players: [
        { name: '10Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    {
      name: 'Wolves',
      players: [
        { name: '11Goleiro', position: 'Goleiro', fouls: 2, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Zagueiro', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Lateral 1', position: 'Lateral 1', fouls: 3, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Lateral 2', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2 },
        { name: '2Lateral 3', position: 'Lateral 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0 },
        { name: '2Cabeça de Área', position: 'Cabeça de Área', fouls: 4, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Meio Campo 1', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 3 },
        { name: '2Meio Campo 2', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1 },
        { name: '2Meio Campo 3', position: 'Meio Campo 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0 },
        { name: '2Atacante 1', position: 'Atacante 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4 },
        { name: '2Atacante 2', position: 'Atacante 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5 },
      ],
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      woLosses: 0
    },
    // Adicione outros times aqui
  ];
}

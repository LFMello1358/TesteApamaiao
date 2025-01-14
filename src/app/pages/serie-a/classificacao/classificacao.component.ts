import { Component } from '@angular/core';
import { ComponetsComponent } from '../../../componentes/componets/componets.component';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorSubject } from 'rxjs';

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
}

@Component({
  selector: 'app-classificacao',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './classificacao.component.html',
  styleUrl: './classificacao.component.scss'
})
export class ClassificacaoComponentA {
  displayedColumns: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'woLosses'];

  // Observables para os dados dos turnos
  private dataSourceTurno1Subject = new BehaviorSubject<Team[]>(this.initializeTurno1());
  private dataSourceTurno2Subject = new BehaviorSubject<Team[]>(this.initializeTurno2());
  private dataSourceTurno3Subject = new BehaviorSubject<Team[]>(this.initializeTurno3());

  initializeTurno1(): Team[] {
    const turno1 = [
      { name: 'Time 1', points: 0, games: 10, wins: 0, draws: 0, losses: 10, goalsFor: 0, goalsAgainst: 30, woLosses: 0 },
      { name: 'Time 2', points: 30, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 0, woLosses: 0 },
      { name: 'Time 3', points: 24, games: 10, wins: 8, draws: 0, losses: 2, goalsFor: 26, goalsAgainst: 10, woLosses: 0 },
      { name: 'Time 4', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 5', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0 },
      { name: 'Time 6', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 7', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0 },
      { name: 'Time 8', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0 },
      { name: 'Time 9', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0 },
      { name: 'Time 10', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0 },
      { name: 'Time 11', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0 },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2 = [
      { name: 'Time 1', points: 0, games: 10, wins: 0, draws: 0, losses: 10, goalsFor: 0, goalsAgainst: 36, woLosses: 0 },
      { name: 'Time 2', points: 30, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 0, woLosses: 0 },
      { name: 'Time 3', points: 24, games: 10, wins: 8, draws: 0, losses: 2, goalsFor: 26, goalsAgainst: 10, woLosses: 0 },
      { name: 'Time 4', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 5', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0 },
      { name: 'Time 6', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 7', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0 },
      { name: 'Time 8', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0 },
      { name: 'Time 9', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0 },
      { name: 'Time 10', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0 },
      { name: 'Time 11', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0 },
    ];

    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3 = [
      { name: 'Time 1', points: 35, games: 10, wins: 10, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 5, woLosses: 0 },
      { name: 'Time 2', points: 30, games: 10, wins: 9, draws: 3, losses: 1, goalsFor: 25, goalsAgainst: 10, woLosses: 0 },
      { name: 'Time 3', points: 26, games: 10, wins: 8, draws: 2, losses: 0, goalsFor: 22, goalsAgainst: 12, woLosses: 1 },
      { name: 'Time 4', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 5', points: 21, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 18, goalsAgainst: 14, woLosses: 0 },
      { name: 'Time 6', points: 19, games: 10, wins: 5, draws: 4, losses: 1, goalsFor: 16, goalsAgainst: 15, woLosses: 0 },
      { name: 'Time 7', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 20, woLosses: 0 },
      { name: 'Time 8', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 14, goalsAgainst: 18, woLosses: 0 },
      { name: 'Time 9', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 9, goalsAgainst: 22, woLosses: 0 },
      { name: 'Time 10', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 7, goalsAgainst: 26, woLosses: 0 },
      { name: 'Time 11', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 3, goalsAgainst: 28, woLosses: 0 },
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
}

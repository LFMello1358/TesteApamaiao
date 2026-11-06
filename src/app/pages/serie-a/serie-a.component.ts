import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
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
  icon: string;

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
  icon: string;
}

interface PlacarConfronto {
  idaA: number | null;
  idaB: number | null;
  voltaA: number | null;
  voltaB: number | null;
}

interface PlacarJogoUnico {
  golsA: number | null;
  golsB: number | null;
}

interface PlacaresMataMata {
  quartas: {
    q1: PlacarConfronto;
    q2: PlacarConfronto;
    q3: PlacarConfronto;
    q4: PlacarConfronto;
  };

  semifinais: {
    s1: PlacarConfronto;
    s2: PlacarConfronto;
  };

  final: PlacarConfronto;

  terceiroLugar: PlacarJogoUnico;
}

@Component({
  selector: 'app-serie-a',
  imports: [SharedModule, ComponetsComponent],
  templateUrl: './serie-a.component.html',
  styleUrl: './serie-a.component.scss'
})
export class SerieAComponent {
  isMenuOpen = false;
  displayedColumns: string[] = [
    'position',
    'name',
    'points',
    'games',
    'wins',
    'draws',
    'losses',
    'goalsFor',
    'goalsAgainst',
    'SaldoGols',
    'woLosses'
  ];
  displayedColumns1: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumnsTimes: string[] = ['name', 'fouls', 'yellowCard', 'redCard', 'goals'];

  // 👉 PDFs disponíveis
  pdfs = {
    tabela1: 'assets/img/Tabela1ApamaiaoA.pdf',
    tabela2: 'assets/img/Tabela2ApamaiaoA.pdf',
    tabela3: 'assets/img/Tabela3ApamaiaoA.pdf',
    tabelaFinal: 'assets/img/TabelaFinalApamaiaoA.pdf',
  };

  // 👉 PDF padrão (você escolhe aqui qual inicia)
  pdfAtual: string = this.pdfs.tabela1;

  zoomDesktop = 1;
  zoomMobile = 0.3;
  zoomLevel = this.zoomDesktop;

  trocarPdf(pdf: string) {
    this.pdfAtual = pdf;
  }
  zoomIn() {
    this.zoomLevel += 0.1;
  }

  zoomOut() {
    this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.1);
  }

  @HostListener('window:resize')
  atualizarZoom() {
    const isMobile = window.innerWidth <= 768;
    this.zoomLevel = isMobile ? this.zoomMobile : this.zoomDesktop;
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
    this.atualizarZoom();



    this.topArtillery = [
      { name: 'Luizinho Costela', goals: 29, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Paulo Nunes', goals: 14, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Rodrigo Vila Chã', goals: 11, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Pedro Valente', goals: 16, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Villander', goals: 9, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Allan', goals: 26, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Belladonna', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Rogerio Cordeiro', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'LF Pai Novo', goals: 1, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Berton', goals: 1, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Ungerer', goals: 25, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Fabiano', goals: 1, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Zambrotti', goals: 1, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Vinicius Reis', goals: 12, time: 'Mexico', icon: 'assets/img/mexico.png' },
      { name: 'Hélio', goals: 12, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Fred Gallo', goals: 2, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Luiz Fellipe', goals: 29, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Mauricio Batata', goals: 13, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Felipe Cid', goals: 2, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Aranha', goals: 14, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Max Oliveira', goals: 2, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Jorge Martins', goals: 3, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Manarte', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Léo Novarino', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Nando', goals: 11, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Victor Carlota', goals: 5, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Rafael Harduim', goals: 1, time: 'Mexico', icon: 'assets/img/mexico.png' },
      { name: 'Caleb', goals: 8, time: 'Mexico', icon: 'assets/img/mexico.png' },
      { name: 'Vitor VZ', goals: 4, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Léo Canena', goals: 1, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Felix', goals: 7, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Ítalo', goals: 7, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Pinna', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Rodrigo Lima', goals: 14, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Clebinho', goals: 11, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Oteciano', goals: 15, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Sigilião', goals: 1, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Flavinho', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Ricardo Rego', goals: 6, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Benito', goals: 1, time: 'Italia', icon: 'assets/img/italia.png' },
      { name: 'Topiquinho', goals: 19, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Eduardo Garcia', goals: 17, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Thiago Rangel', goals: 3, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Lucas Siri', goals: 3, time: 'Alemanha', icon: 'assets/img/alemanha.png' },      
      { name: 'Bernardo Filé', goals: 6, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Léo Rocha', goals: 12, time: 'Uruguai', icon: 'assets/img/uruguai.png' },




    ]
    // 🔥 ordena por gols (desc) e nome (asc)
    this.topArtillery = this.topArtillery
      .sort((a, b) => {
        // 1️⃣ mais gols primeiro
        if (b.goals !== a.goals) {
          return b.goals - a.goals;
        }

        // 2️⃣ desempate por ordem alfabética
        return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
      })
      .slice(0, 10); // mantém apenas os 10 primeiros

    this.topGoalkeepers = [
      {
        name: 'Luizinho Jansen',
        goalsConceded: 62,
        time: 'Alemanha',
        icon: 'assets/img/alemanha.png'
      },
      {
        name: 'Somália',
        goalsConceded: 67,
        time: 'Argentina',
        icon: 'assets/img/argentina.png'
      },
      {
        name: 'Enzo Merecci',
        goalsConceded: 67,
        time: 'Brasil',
        icon: 'assets/img/brasil.png'
      },
      {
        name: 'Lucas Milward',
        goalsConceded: 60,
        time: 'Espanha',
        icon: 'assets/img/espanha.png'
      },
      {
        name: 'Gilmar',
        goalsConceded: 59,
        time: 'França',
        icon: 'assets/img/frança.png'
      },
      {
        name: 'Markito',
        goalsConceded: 71,
        time: 'Holanda',
        icon: 'assets/img/holanda.png'
      },
      {
        name: 'Bacon',
        goalsConceded: 50,
        time: 'Inglaterra',
        icon: 'assets/img/inglaterra.png'
      },
      {
        name: 'Magela',
        goalsConceded: 62,
        time: 'Itália',
        icon: 'assets/img/italia.png'
      },
      {
        name: 'João Victor',
        goalsConceded: 49,
        time: 'México',
        icon: 'assets/img/mexico.png'
      },
      {
        name: 'Matheus Merecci',
        goalsConceded: 93,
        time: 'Portugal',
        icon: 'assets/img/portugal.png'
      },
      {
        name: 'Thomás',
        goalsConceded: 44,
        time: 'Uruguai',
        icon: 'assets/img/uruguai.png'
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
      { name: 'Alemanha', points: 20, games: 10, wins: 6, draws: 2, losses: 2, goalsFor: 25, goalsAgainst: 18, SaldoGols: 7, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 12, games: 10, wins: 4, draws: 0, losses: 6, goalsFor: 20, goalsAgainst: 30, SaldoGols: -10, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 4, games: 10, wins: 1, draws: 1, losses: 8, goalsFor: 12, goalsAgainst: 25, SaldoGols: -13, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 22, goalsAgainst: 19, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 24, games: 10, wins: 7, draws: 0, losses: 3, goalsFor: 24, goalsAgainst: 14, SaldoGols: 10, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 7, games: 10, wins: 1, draws: 4, losses: 5, goalsFor: 14, goalsAgainst: 19, SaldoGols: -5, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 13, goalsAgainst: 9, SaldoGols: 4, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 16, goalsAgainst: 19, SaldoGols: -3, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 17, games: 10, wins: 5, draws: 2, losses: 3, goalsFor: 17, goalsAgainst: 14, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 20, goalsAgainst: 24, SaldoGols: -4, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 21, games: 10, wins: 6, draws: 2, losses: 2, goalsFor: 26, goalsAgainst: 18, SaldoGols: 8, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
    ];

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = [
      { name: 'Alemanha', points: 12, games: 10, wins: 4, draws: 0, losses: 6, goalsFor: 16, goalsAgainst: 22, SaldoGols: -6, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 11, goalsAgainst: 19, SaldoGols: -8, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 18, games: 10, wins: 6, draws: 0, losses: 4, goalsFor: 23, goalsAgainst: 20, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 18, games: 10, wins: 6, draws: 0, losses: 4, goalsFor: 32, goalsAgainst: 20, SaldoGols: 12, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 22, games: 10, wins: 6, draws: 3, losses: 1, goalsFor: 24, goalsAgainst: 18, SaldoGols: 6, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 9, goalsAgainst: 20, SaldoGols: -11, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 15, goalsAgainst: 22, SaldoGols: -7, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 20, goalsAgainst: 18, SaldoGols: 2, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 18, goalsAgainst: 15, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 19, goalsAgainst: 24, SaldoGols: -5, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 25, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 21, goalsAgainst: 10, SaldoGols: 11, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
    ];
    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = [
      { name: 'Alemanha', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 30, goalsAgainst: 22, SaldoGols: 8, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 22, games: 10, wins: 7, draws: 0, losses: 3, goalsFor: 25, goalsAgainst: 18, SaldoGols: 7, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 24, goalsAgainst: 22, SaldoGols: 2, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 19, games: 10, wins: 6, draws: 1, losses: 3, goalsFor: 30, goalsAgainst: 21, SaldoGols: 9, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 17, games: 10, wins: 5, draws: 2, losses: 3, goalsFor: 28, goalsAgainst: 27, SaldoGols: 1, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 2, games: 10, wins: 0, draws: 2, losses: 8, goalsFor: 15, goalsAgainst: 32, SaldoGols: -17, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 18, goalsAgainst: 19, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 9, games: 10, wins: 2, draws: 3, losses: 5, goalsFor: 25, goalsAgainst: 25, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 19, goalsAgainst: 20, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 24, goalsAgainst: 45, SaldoGols: -21, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 25, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 29, goalsAgainst: 16, SaldoGols: 13, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
    ];

    return turno3.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

constructor() {
  this.adjustZoom();

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
  // ==========================================
// MATA-MATA - SÉRIE A
// ==========================================

// Preencha os resultados diretamente neste objeto.
// null significa que o resultado ainda não foi informado.
//
// A = time da esquerda
// B = time da direita
//
// Os placares são independentes dos da Série B.

placaresMataMata: PlacaresMataMata = {

  quartas: {
    q1: { idaA: null, idaB: null, voltaA: null, voltaB: null },
    q2: { idaA: null, idaB: null, voltaA: null, voltaB: null },
    q3: { idaA: null, idaB: null, voltaA: null, voltaB: null },
    q4: { idaA: null, idaB: null, voltaA: null, voltaB: null }
  },

  semifinais: {
    s1: { idaA: null, idaB: null, voltaA: null, voltaB: null },
    s2: { idaA: null, idaB: null, voltaA: null, voltaB: null }
  },

  final: {
    idaA: null,
    idaB: null,
    voltaA: null,
    voltaB: null
  },

  terceiroLugar: {
    golsA: null,
    golsB: null
  }

};


// ==========================================
// CÁLCULO DOS RESULTADOS E CLASSIFICADOS
// ==========================================

private criarDuelo(
  timeA: Team | null,
  timeB: Team | null,
  placar: PlacarConfronto,
  dataIda: string,
  dataVolta: string,
  horarioIda: string = '21:00',
  horarioVolta: string = '21:00'
) {

  const completo =
    placar.idaA !== null &&
    placar.idaB !== null &&
    placar.voltaA !== null &&
    placar.voltaB !== null;

  const totalA = completo
    ? Number(placar.idaA) + Number(placar.voltaA)
    : null;

  const totalB = completo
    ? Number(placar.idaB) + Number(placar.voltaB)
    : null;

  let vencedor: Team | null = null;
  let perdedor: Team | null = null;

  if (
    timeA &&
    timeB &&
    completo &&
    totalA !== null &&
    totalB !== null &&
    totalA !== totalB
  ) {
    vencedor = totalA > totalB ? timeA : timeB;
    perdedor = vencedor === timeA ? timeB : timeA;
  }

  let status = 'Aguardando resultados';

  if (!timeA || !timeB) {
    status = 'Aguardando classificação anterior';
  } else if (completo && totalA === totalB) {
    status = 'Empate no agregado';
  } else if (vencedor) {
    status = 'Classificado: ' + vencedor.name;
  }

  return {
    timeA,
    timeB,
    placar,
    totalA,
    totalB,
    vencedor,
    perdedor,
    status,
    dataIda,
    dataVolta,
    horarioIda,
    horarioVolta,
    completo
  };
}


// ==========================================
// QUARTAS DE FINAL
// 1º x 8º
// 2º x 7º
// 3º x 6º
// 4º x 5º
// ==========================================

get confrontosQuartas() {
  const tabela = this.dataSourceGeral;

  const confrontos = [
    {
      // 4º x 5º - Alemanha x Argentina
      posicaoA: 4,
      posicaoB: 5,
      dataIda: '09/11/2026',
      dataVolta: '16/11/2026',
      placar: this.placaresMataMata.quartas.q1
    },
    {
      // 3º x 6º - Espanha x México
      posicaoA: 3,
      posicaoB: 6,
      dataIda: '10/11/2026',
      dataVolta: '17/11/2026',
      placar: this.placaresMataMata.quartas.q2
    },
    {
      // 2º x 7º - França x Brasil
      posicaoA: 2,
      posicaoB: 7,
      dataIda: '11/11/2026',
      dataVolta: '18/11/2026',
      placar: this.placaresMataMata.quartas.q3
    },
    {
      // 1º x 8º - Uruguai x Inglaterra
      posicaoA: 1,
      posicaoB: 8,
      dataIda: '12/11/2026',
      dataVolta: '19/11/2026',
      placar: this.placaresMataMata.quartas.q4
    }
  ];

  return confrontos.map(jogo =>
    this.criarDuelo(
      tabela[jogo.posicaoA - 1] || null,
      tabela[jogo.posicaoB - 1] || null,
      jogo.placar,
      jogo.dataIda,
      jogo.dataVolta
    )
  );
}


// ==========================================
// SEMIFINAIS AUTOMÁTICAS
// ==========================================

get confrontosSemifinais() {

  const quartas = this.confrontosQuartas;

  return [

    // Semifinal 1
    this.criarDuelo(
      quartas[0].vencedor,
      quartas[3].vencedor,
      this.placaresMataMata.semifinais.s1,
      '24/11/2026',
      '01/12/2026'
    ),

    // Semifinal 2 - Melhor colocado
    this.criarDuelo(
      quartas[1].vencedor,
      quartas[2].vencedor,
      this.placaresMataMata.semifinais.s2,
      '25/11/2026',
      '02/12/2026'
    )

  ];
}


// ==========================================
// FINAL AUTOMÁTICA
// ==========================================

get confrontoFinal() {

  const semifinais = this.confrontosSemifinais;

  return this.criarDuelo(
    semifinais[0].vencedor,
    semifinais[1].vencedor,
    this.placaresMataMata.final,
    '10/12/2026',
    '17/12/2026'
  );

}


// ==========================================
// DISPUTA DE TERCEIRO LUGAR
// ==========================================

get disputaTerceiroLugar() {

  const semifinais = this.confrontosSemifinais;

  const timeA = semifinais[0].perdedor;
  const timeB = semifinais[1].perdedor;

  const placar = this.placaresMataMata.terceiroLugar;

  const completo =
    placar.golsA !== null &&
    placar.golsB !== null;

  let vencedor: Team | null = null;
  let perdedor: Team | null = null;

  if (
    timeA &&
    timeB &&
    completo &&
    placar.golsA !== placar.golsB
  ) {
    vencedor =
      placar.golsA! > placar.golsB!
        ? timeA
        : timeB;

    perdedor = vencedor === timeA ? timeB : timeA;
  }

  return {
    timeA,
    timeB,
    placar,
    vencedor,
    perdedor,
    completo,
    data: '17/12/2026',
    horario: '20:00',

    status: !timeA || !timeB
      ? 'Aguardando semifinais'
      : !completo
        ? 'Aguardando resultado'
        : vencedor
          ? '3º lugar: ' + vencedor.name
          : 'Empate'
  };

}



  teams: Team[] = [
    {
      name: 'Alemanha',
      icon: 'assets/img/alemanha.png',
      players: [
        {
          name: 'Luizinho Jansen',
          position: 'Goleiro',
          fouls: 1,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Bernardo Filé',
          position: 'Zagueiro',
          fouls: 4,
          yellowCard: 0,
          redCard: 0,
          goals: 6,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Ítalo',
          position: 'Lateral 1',
          fouls: 2,
          yellowCard: 0,
          redCard: 0,
          goals: 10,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Gabriel Palmieri',
          position: 'Lateral 2',
          fouls: 2,
          yellowCard: 0,
          redCard: 0,
          goals: 3,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Lucas Siri',
          position: 'Volante',
          fouls: 4,
          yellowCard: 0,
          redCard: 0,
          goals: 5,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Rodrigo Lima',
          position: 'm1',
          fouls: 1,
          yellowCard: 0,
          redCard: 0,
          goals: 14,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Pinna',
          position: 'M2',
          fouls: 4,
          yellowCard: 0,
          redCard: 0,
          goals: 4,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Allan',
          position: 'Atacante',
          fouls: 1,
          yellowCard: 0,
          redCard: 0,
          goals: 26,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Rodrigo Saramago',
          position: 'Flex 1',
          fouls: 5,
          yellowCard: 0,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Parrilha',
          position: 'Flex 2',
          fouls: 3,
          yellowCard: 0,
          redCard: 0,
          goals: 2,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Leandro',
          position: 'Flex 3',
          fouls: 5,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 1
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
        { name: 'Somália', position: 'Goleiro', fouls: 8, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rodrigo Pinheiro', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Victor Careca', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Flavinho', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 3,suspensao: false, jogosSuspensao: 1 },
        { name: 'Belladonna', position: 'Volante', fouls: 3, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rafael Almeida', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Alexandre', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Thiago Pinheiro', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Douglas', position: 'Flex 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Caroço', position: 'Flex 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ricardo Rego', position: 'Flex 3', fouls: 6, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    },
    {
      name: 'Brasil',
      icon: 'assets/img/brasil.png',
      players: [
        { name: 'Enzo Merecci', position: 'Goleiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Lucas Figueiredo', position: 'Zagueiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Paulinho Aldeia', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Telles', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Fabiano', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Clebinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 11, suspensao: false, jogosSuspensao: 1 },
        { name: 'Chalu', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 8, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rodrigo Silva', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Sergio', position: 'Flex 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Minha Joia', position: 'Flex 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1},
        { name: 'Josué Campos', position: 'Flex 3', fouls: 6, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Espanha',
      icon: 'assets/img/espanha.png',
      players: [
        { name: 'Lucas Milward', position: 'Goleiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Muniz', position: 'Zagueiro', fouls: 8, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Leleco', position: 'Lateral 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 10, suspensao: false, jogosSuspensao: 1 },
        { name: 'Guilherme Amaral', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Leonardo Py', position: 'Volante', fouls: 3, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Luizinho Costela', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 29, suspensao: false, jogosSuspensao: 1 },
        { name: 'Fred', position: 'Meio Campo 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Mauricio Batata', position: 'Atacante', fouls: 8, yellowCard: 0, redCard: 0, goals: 13, suspensao: false, jogosSuspensao: 1 },
        { name: 'Villander', position: 'Flex 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 11, suspensao: false, jogosSuspensao: 1 },
        { name: 'Leco', position: 'Flex 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Francisco N.', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'França',
      icon: 'assets/img/frança.png',
      players: [
        { name: 'Gilmar', position: 'Goleiro', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Xingu', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Reseck', position: 'Lateral 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Edson Ferreira', position: 'Lateral 2', fouls: 6, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rico', position: 'Volante', fouls: 3, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Topiquinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 19, suspensao: false, jogosSuspensao: 1 },
        { name: 'Nando', position: 'Meio Campo 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Luiz Fellipe', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 29, suspensao: false, jogosSuspensao: 1},
        { name: 'Pedro Tostes', position: 'Flex 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Almiro', position: 'Flex 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Vitor Coreixas', position: 'Flex 3', fouls: 3, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Holanda',
      icon: 'assets/img/holanda.png',
      players: [
        { name: 'Markito', position: 'Goleiro', fouls: 1, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Netto', position: 'Zagueiro', fouls: 1, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Fiuza', position: 'Lateral 1', fouls: 5, yellowCard: 6, redCard: 1, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Troia', position: 'Lateral 2', fouls: 3, yellowCard: 1, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Jonas', position: 'Volante', fouls: 3, yellowCard: 1, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Felipe Cid', position: 'Meio Campo 1', fouls: 0, yellowCard: 3, redCard: 0, goals: 11, suspensao: false, jogosSuspensao: 1 },
        { name: 'Thomaz', position: 'Meio Campo 2', fouls: 8, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Aranha', position: 'Atacante', fouls: 1, yellowCard: 4, redCard: 0, goals: 14, suspensao: false, jogosSuspensao: 1 },
        { name: 'Modesto', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'João Alberto', position: 'Flex 2', fouls: 5, yellowCard: 4, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Leone', position: 'Flex 3', fouls: 8, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Inglaterra',
      icon: 'assets/img/inglaterra.png',
      players: [
        { name: 'Bacon', position: 'Goleiro', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Igor Natário', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Mariano', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Eduardo Menezes', position: 'Lateral 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Thiago Rangel', position: 'Volante', fouls: 3, yellowCard: 0, redCard: 0, goals: 8, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Pão', position: 'Meio Campo 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ginho', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Hélio', position: 'Atacante', fouls: 4, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Allan Titonelli', position: 'Flex 1', fouls: 6, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Chicão', position: 'Flex 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Léo Novarino', position: 'Flex 3', fouls: 4, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Itália',
      icon: 'assets/img/italia.png',
      players: [
        { name: 'Magela', position: 'Goleiro', fouls: 2, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Fred Gallo', position: 'Zagueiro', fouls: 2, yellowCard: 8, redCard: 1, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Benito', position: 'Lateral 1', fouls: 6, yellowCard: 2, redCard: 2, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Pedro Carvalho', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1, },
        { name: 'Berton', position: 'Volante', fouls: 5, yellowCard: 6, redCard: 1, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ungerer', position: 'Meio Campo 1', fouls: 0, yellowCard: 2, redCard: 0, goals: 25, suspensao: false, jogosSuspensao: 1 },
        { name: 'Victor Carlota', position: 'Meio Campo 2', fouls: 1, yellowCard: 5, redCard: 1, goals: 10, suspensao: false, jogosSuspensao: 1 },
        { name: 'Caio Assad', position: 'Atacante', fouls: 0, yellowCard: 1, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Capelli', position: 'Flex 1', fouls: 5, yellowCard: 2, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Vittorio', position: 'Flex 2', fouls: 6, yellowCard: 2, redCard: 1, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Poiava', position: 'Flex 3', fouls: 8, yellowCard: 4, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1}
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'México',
      icon: 'assets/img/mexico.png',
      players: [
        { name: 'João Victor', position: 'Goleiro', fouls: 5, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Renato Furtado', position: 'Zagueiro', fouls: 7, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Messias', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rafael Harduim', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Artur', position: 'Volante', fouls: 4, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Caleb', position: 'Meio Campo 1', fouls: 4, yellowCard: 0, redCard: 0, goals: 10, suspensao: false, jogosSuspensao: 1 },
        { name: 'Vinicius Reis', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Coutinho', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Breno', position: 'Flex 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Alfieri', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Pimentel', position: 'Flex 3', fouls: 2, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Portugal',
      icon: 'assets/img/portugal.png',
      players: [
        { name: 'Matheus Merecci', position: 'Goleiro', fouls: 3, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Daniel Tessari', position: 'Zagueiro', fouls: 3, yellowCard: 4, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Aquino', position: 'Lateral 1', fouls: 1, yellowCard: 3, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bruno Filé', position: 'Lateral 2', fouls: 6, yellowCard: 1, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Gregório', position: 'Volante', fouls: 1, yellowCard: 5, redCard: 1, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Paulo Nunes', position: 'Meio Campo 1', fouls: 1, yellowCard: 4, redCard: 0, goals: 14, suspensao: false, jogosSuspensao: 1 },
        { name: 'Mourão', position: 'Meio Campo 2', fouls: 0, yellowCard: 4, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rafa', position: 'Atacante', fouls: 3, yellowCard: 3, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Rodrigo Vila Chã', position: 'Flex 1', fouls: 3, yellowCard: 4, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Felix', position: 'Flex 2', fouls: 1, yellowCard: 1, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Angelo Russo', position: 'Flex 3', fouls: 5, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Uruguai',
      icon: 'assets/img/uruguai.png',
      players: [
        { name: 'Thomás', position: 'Goleiro', fouls: 8, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Renato Tostes', position: 'Zagueiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Diego Blois', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Oteciano', position: 'Lateral 2', fouls: 6, yellowCard: 0, redCard: 0, goals: 15, suspensao: false, jogosSuspensao: 1 },
        { name: 'Hugo Sillero', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Léo Rocha', position: 'Meio Campo 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Eduardo Garcia', position: 'Meio Campo 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 17, suspensao: false, jogosSuspensao: 1 },
        { name: 'Pedro Valente', position: 'Atacante', fouls: 3, yellowCard: 0, redCard: 0, goals: 16, suspensao: false, jogosSuspensao: 1 },
        { name: 'Gabriel Lima', position: 'Flex 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Indiano', position: 'Flex 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Paura', position: 'Flex 3', fouls: 8, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 }
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

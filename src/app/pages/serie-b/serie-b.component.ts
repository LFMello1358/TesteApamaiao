import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { PopupAvisosComponent } from '../popup-avisos/popup-avisos.component';

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
@Component({
  selector: 'app-serie-a',
  standalone: true,
  imports: [SharedModule, ComponetsComponent,],
  templateUrl: './serie-b.component.html',
  styleUrl: './serie-b.component.scss'
})
export class SerieBComponent {
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
  ]; displayedColumns1: string[] = ['name', 'points', 'games', 'wins', 'draws', 'losses', 'goalsFor', 'goalsAgainst', 'SaldoGols', 'woLosses'];
  displayedColumnsTimes: string[] = ['name', 'fouls', 'yellowCard', 'redCard', 'goals'];

  // 👉 PDFs disponíveis
  pdfs = {
    tabela1: 'assets/img/Tabela1ApamaiaoB.pdf',
    tabela2: 'assets/img/Tabela2ApamaiaoB.pdf',
    tabela3: 'assets/img/Tabela3ApamaiaoB.pdf',
    tabelaFinal: 'assets/img/TabelaFinalApamaiaoB.pdf',
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
    this.atualizarZoom();


    this.topArtillery = [
      { name: 'Tevez', goals: 1, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Igor Brasil', goals: 4, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Machado', goals: 1, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Juca', goals: 1, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Magrinho', goals: 2, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Sergio Somos', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Luna', goals: 1, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Paulo Massa', goals: 1, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'José Marcio', goals: 2, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Bodinho', goals: 4, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Neném', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Fabio Pinheiro', goals: 4, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Jorginho', goals: 4, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Ximbinha', goals: 1, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Maduro', goals: 1, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Maguila', goals: 2, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Cristiano Motta', goals: 2, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Ezequiel', goals: 2, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Marcelo Dentista', goals: 2, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Mauricio', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Romão', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Grillo', goals: 2, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Ferreira', goals: 3, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Luisinho', goals: 2, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Albert', goals: 1, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Fabio Barros', goals: 1, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Paulinho Loria', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Portugal', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Latini', goals: 1, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Marcellus', goals: 2, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Francelino', goals: 4, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Léo Barbosa', goals: 1, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Serginho', goals: 3, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Jun', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Naldo', goals: 2, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Silvio Cavalo', goals: 5, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Andrinho', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Claudio', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Marcelinho', goals: 1, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Alex Gomes', goals: 1, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Frank', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Cadu', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Naval', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Luquinha', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Wanildo', goals: 2, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'França', goals: 1, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Sandrinho', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Jorginho Contador', goals: 2, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Bahia', goals: 1, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Frank Vianna', goals: 1, time: 'Holanda', icon: 'assets/img/holanda.png' },

















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
        name: 'Yasser',
        goalsConceded: 16,
        time: 'Alemanha',
        icon: 'assets/img/alemanha.png'
      },
      {
        name: 'Jorginho',
        goalsConceded: 10,
        time: 'Argentina',
        icon: 'assets/img/argentina.png'
      },
      {
        name: 'Marcus',
        goalsConceded: 12,
        time: 'Brasil',
        icon: 'assets/img/brasil.png'
      },
      {
        name: 'Xingu',
        goalsConceded: 3,
        time: 'Espanha',
        icon: 'assets/img/espanha.png'
      },
      {
        name: 'Brasil',
        goalsConceded: 14,
        time: 'França',
        icon: 'assets/img/frança.png'
      },
      {
        name: 'Zuqui',
        goalsConceded: 8,
        time: 'Holanda',
        icon: 'assets/img/holanda.png'
      },
      {
        name: 'Rubano',
        goalsConceded: 8,
        time: 'Inglaterra',
        icon: 'assets/img/inglaterra.png'
      },
      {
        name: 'Bruno Mitidieri',
        goalsConceded: 3,
        time: 'Itália',
        icon: 'assets/img/italia.png'
      },
      {
        name: 'Felipe',
        goalsConceded: 5,
        time: 'México',
        icon: 'assets/img/mexico.png'
      },
      {
        name: 'Jofre',
        goalsConceded: 5,
        time: 'Portugal',
        icon: 'assets/img/portugal.png'
      },
      {
        name: 'Braga',
        goalsConceded: 5,
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
      { name: 'Alemanha', points: 1, games: 4, wins: 0, draws: 1, losses: 3, goalsFor: 9, goalsAgainst: 16, SaldoGols: -7, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
      { name: 'Argentina', points: 3, games: 4, wins: 1, draws: 0, losses: 3, goalsFor: 8, goalsAgainst: 10, SaldoGols: -2, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
      { name: 'Brasil', points: 9, games: 6, wins: 3, draws: 0, losses: 3, goalsFor: 12, goalsAgainst: 12, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
      { name: 'Espanha', points: 10, games: 4, wins: 3, draws: 1, losses: 0, goalsFor: 10, goalsAgainst: 3, SaldoGols: 7, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
      { name: 'França', points: 6, games: 5, wins: 2, draws: 0, losses: 3, goalsFor: 8, goalsAgainst: 14, SaldoGols: -6, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
      { name: 'Holanda', points: 2, games: 3, wins: 0, draws: 2, losses: 1, goalsFor: 7, goalsAgainst: 8, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
      { name: 'Inglaterra', points: 7, games: 5, wins: 2, draws: 1, losses: 2, goalsFor: 7, goalsAgainst: 8, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
      { name: 'Itália', points: 10, games: 6, wins: 3, draws: 1, losses: 2, goalsFor: 6, goalsAgainst: 3, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
      { name: 'México', points: 10, games: 5, wins: 3, draws: 1, losses: 1, goalsFor: 12, goalsAgainst: 5, SaldoGols: 7, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
      { name: 'Portugal', points: 8, games: 4, wins: 2, draws: 2, losses: 0, goalsFor: 7, goalsAgainst: 5, SaldoGols: 2, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
      { name: 'Uruguai', points: 4, games: 4, wins: 1, draws: 1, losses: 2, goalsFor: 3, goalsAgainst: 5, SaldoGols: -2, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
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
          name: 'Yasser',
          position: 'Goleiro',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Klebão',
          position: 'Zagueiro',
          fouls: 1,
          yellowCard: 1,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Vitor Martins',
          position: 'Lateral 1',
          fouls: 1,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Zé Luiz',
          position: 'Lateral 2',
          fouls: 0,
          yellowCard: 1,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Jorginho Contador',
          position: 'Volante',
          fouls: 0,
          yellowCard: 1,
          redCard: 0,
          goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Sandrinho',
          position: 'Meio Campo 1',
          fouls: 0,
          yellowCard: 1,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Andrinho',
          position: 'Meio Campo 2',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Claudio',
          position: 'Atacante',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Grillo',
          position: 'Flex 1',
          fouls: 0,
          yellowCard: 1,
          redCard: 0,
          goals: 2,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Gracie',
          position: 'Flex 2',
          fouls: 0,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 0
        },
        {
          name: 'Ciço',
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
        { name: 'Jorginho GK', position: 'Goleiro', fouls: 2, yellowCard: 0, redCard: 1, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Jun', position: 'Zagueiro', fouls: 0, yellowCard: 2, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Sergio Somos', position: 'Lateral 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Galo Cego', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Zito', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Magrinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 2, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Naldo', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Wanildo', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Jansen', position: 'Flex 1', fouls: 1, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ralf', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Jorge Médico', position: 'Flex 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    },
    {
      name: 'Brasil',
      icon: 'assets/img/brasil.png',
      players: [
        { name: 'Marcus', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Alex Rangel', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Tatá', position: 'Lateral 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Carlos Castelo', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Stellet', position: 'Volante', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Jorginho', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 0 },
        { name: 'Fábio Pinheiro', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 0 },
        { name: 'Marcelo Dentista', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Amin', position: 'Flex 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Luna', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Gatinho', position: 'Flex 3', fouls: 0, yellowCard: 2, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Espanha',
      icon: 'assets/img/espanha.png',
      players: [
        { name: 'Xingu', position: 'Goleiro', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Carlinhos', position: 'Zagueiro', fouls: 1, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Vitão', position: 'Lateral 1', fouls: 1, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Tevez', position: 'Lateral 2', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'André Freixo', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Igor Brasil', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 0 },
        { name: 'Latini', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Cristiano Motta', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ezequiel', position: 'Flex 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Slow', position: 'Flex 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Bazhuni', position: 'Flex 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'França',
      icon: 'assets/img/frança.png',
      players: [
        { name: 'Brasil', position: 'Goleiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Gustavo', position: 'Zagueiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Jacaré', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ecir', position: 'Lateral 2', fouls: 1, yellowCard: 1, redCard: 1, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ferreira', position: 'Volante', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 0 },
        { name: 'Luisinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Albert', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Fabio Barros', position: 'Atacante', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'DJ', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Lulucha', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Shampoo', position: 'Flex 3', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Holanda',
      icon: 'assets/img/holanda.png',
      players: [
        { name: 'Zuqui', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Kaveirão', position: 'Zagueiro', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Paulo Massa', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Adrian', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Bahia', position: 'Volante', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'José Marcio', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Almada', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Marcellus', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Frank Vianna', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Pacheco', position: 'Flex 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Lattanzi', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Inglaterra',
      icon: 'assets/img/inglaterra.png',
      players: [
        { name: 'Rubano', position: 'Goleiro', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Mauricio', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Marcello Cid', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Toninho', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Rubinho', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Bodinho', position: 'Meio Campo 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 0 },
        { name: 'Romão', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Neném', position: 'Atacante', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Blois', position: 'Flex 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Castelinho', position: 'Flex 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Geraldinho', position: 'Flex 3', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Itália',
      icon: 'assets/img/italia.png',
      players: [
        { name: 'Bruno Mitidieri', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Zarro', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Vilhena', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Glauber', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Frank', position: 'Volante', fouls: 0, yellowCard: 3, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Cadu', position: 'Meio Campo 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Naval', position: 'Meio Campo 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Portugal', position: 'Atacante', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Paulinho Loria', position: 'Flex 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Luquinha', position: 'Flex 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ronaldinho', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'México',
      icon: 'assets/img/mexico.png',
      players: [
        { name: 'Felipe', position: 'Goleiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Mitidieri', position: 'Zagueiro', fouls: 0, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ximbinha', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Maduro', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Francelino', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 0 },
        { name: 'Cupulille', position: 'Meio Campo 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Léo Barbosa', position: 'Meio Campo 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Maguila', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 0 },
        { name: 'Serginho', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ratinho', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Bido', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Portugal',
      icon: 'assets/img/portugal.png',
      players: [
        { name: 'Jofre', position: 'Goleiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Cacau', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Machado', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Chico Lyra', position: 'Lateral 2', fouls: 1, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Nicolau', position: 'Volante', fouls: 0, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Juca', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Orelha', position: 'Meio Campo 2', fouls: 0, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Silvio Cavalo', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 0 },
        { name: 'Junior Samary', position: 'Flex 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Tigrinho', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Filé', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Uruguai',
      icon: 'assets/img/uruguai.png',
      players: [
        { name: 'Braga', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Konte', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Alex Gomes', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Shaolin', position: 'Lateral 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Ricardinho', position: 'Volante', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Marcelinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Eloir', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'França', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 0 },
        { name: 'Barata', position: 'Flex 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Nilsão', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 },
        { name: 'Giordano', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 0 }
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

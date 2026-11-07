import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponetsComponent } from '../../componentes/componets/componets.component';
import { SharedModule } from '../../shared/shared.module';
import { TURNO_1_SERIE_A, TURNO_2_SERIE_A, TURNO_3_SERIE_A, ELENCO_SERIE_A, PLACARES_MATA_MATA_SERIE_A } from '../../shared/data/serie-a.data';
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
  changeDetection: ChangeDetectionStrategy.Eager,
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
    const turno1: Team[] = TURNO_1_SERIE_A.map(t => ({ ...t, players: [] }));

    return turno1.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno2(): Team[] {
    const turno2: Team[] = TURNO_2_SERIE_A.map(t => ({ ...t, players: [] }));
    return turno2.sort((a, b) => b.points - a.points);  // Ordenando por pontos em ordem decrescente
  }

  initializeTurno3(): Team[] {
    const turno3: Team[] = TURNO_3_SERIE_A.map(t => ({ ...t, players: [] }));

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

placaresMataMata: PlacaresMataMata = PLACARES_MATA_MATA_SERIE_A;


// ==========================================
// CÁLCULO DOS RESULTADOS E CLASSIFICADOS
// ==========================================

// Posição na classificação geral da 1ª fase (0 = maior TPG).
private posicaoGeral(time: Team): number {
  return this.dataSourceGeral.findIndex(t => t.name === time.name);
}

// Equipe com maior TPG na 1ª fase (critério de vantagem no mata-mata).
private melhorColocado(a: Team, b: Team): Team {
  return this.posicaoGeral(a) <= this.posicaoGeral(b) ? a : b;
}

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

  // Regulamento 2.2.2.3.2, 2.3.2 e 2.4.2: empate no agregado classifica a
  // equipe de maior TPG na primeira fase (vantagem de dois empates).
  const empateAgregado = completo && totalA === totalB;

  if (timeA && timeB && completo && totalA !== null && totalB !== null) {
    vencedor = empateAgregado
      ? this.melhorColocado(timeA, timeB)
      : (totalA > totalB ? timeA : timeB);
    perdedor = vencedor === timeA ? timeB : timeA;
  }

  let status = 'Aguardando resultados';

  if (!timeA || !timeB) {
    status = 'Aguardando classificação anterior';
  } else if (vencedor) {
    status = 'Classificado: ' + vencedor.name + (empateAgregado ? ' (vantagem do empate)' : '');
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

  // Regulamento 2.3.2 (mesmo critério do 2.2.2.3.1): os 4 classificados são
  // reordenados pelo TPG da 1ª fase — melhor x pior e 2º x 3º. Os confrontos
  // só ficam definidos quando as quatro quartas terminarem.
  const classificados = quartas.map(q => q.vencedor);
  const ordem: (Team | null)[] = classificados.every(t => t !== null)
    ? (classificados as Team[]).sort((a, b) => this.posicaoGeral(a) - this.posicaoGeral(b))
    : [null, null, null, null];

  return [

    // Semifinal 1 - 2º x 3º melhores colocados entre os classificados
    this.criarDuelo(
      ordem[1],
      ordem[2],
      this.placaresMataMata.semifinais.s1,
      '24/11/2026',
      '01/12/2026'
    ),

    // Semifinal 2 - Melhor colocado x pior colocado entre os classificados
    this.criarDuelo(
      ordem[0],
      ordem[3],
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

  // Regulamento 2.4.3: jogo único; o empate favorece a equipe de melhor TPG.
  const empate = completo && placar.golsA === placar.golsB;

  if (timeA && timeB && completo) {
    vencedor = empate
      ? this.melhorColocado(timeA, timeB)
      : (placar.golsA! > placar.golsB! ? timeA : timeB);

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
          ? '3º lugar: ' + vencedor.name + (empate ? ' (vantagem do empate)' : '')
          : 'Aguardando resultado'
  };

}



  teams: Team[] = ELENCO_SERIE_A;




  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  openRegulamento(): void {
    // const url = 'assets/img/REGULAMENTO 2024-v2.pdf';
    // window.open(url, '_blank');
  }
}

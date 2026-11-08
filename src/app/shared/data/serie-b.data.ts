// Dados oficiais da Série B: totais por turno (com bônus de campeão/vice já somados),
// elenco com estatísticas individuais e placares do mata-mata.
// Estes dados alimentam a página da categoria e a aba Scout.
import { Artilheiro, PlacaresMataMata, TimeElenco, TimeTurno } from '../models/campeonato.model';

export const TURNO_1_SERIE_B: TimeTurno[] = [
    { name: 'Alemanha', points: 5, games: 10, wins: 1, draws: 2, losses: 7, goalsFor: 14, goalsAgainst: 29, SaldoGols: -15, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
    { name: 'Argentina', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 13, goalsAgainst: 17, SaldoGols: -4, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
    { name: 'Brasil', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 17, goalsAgainst: 21, SaldoGols: -4, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
    { name: 'Espanha', points: 26, games: 10, wins: 7, draws: 2, losses: 1, goalsFor: 25, goalsAgainst: 11, SaldoGols: 14, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
    { name: 'França', points: 7, games: 10, wins: 2, draws: 1, losses: 7, goalsFor: 15, goalsAgainst: 29, SaldoGols: -14, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
    { name: 'Holanda', points: 13, games: 10, wins: 3, draws: 4, losses: 3, goalsFor: 21, goalsAgainst: 20, SaldoGols: 1, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
    { name: 'Inglaterra', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 13, goalsAgainst: 12, SaldoGols: 1, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
    { name: 'Itália', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 11, goalsAgainst: 7, SaldoGols: 4, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
    { name: 'México', points: 21, games: 10, wins: 6, draws: 2, losses: 2, goalsFor: 18, goalsAgainst: 8, SaldoGols: 10, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
    { name: 'Portugal', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 16, goalsAgainst: 12, SaldoGols: 4, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
    { name: 'Uruguai', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 19, goalsAgainst: 16, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
  ];

export const TURNO_2_SERIE_B: TimeTurno[] = [
    { name: 'Alemanha', points: 4, games: 10, wins: 0, draws: 4, losses: 6, goalsFor: 13, goalsAgainst: 23, SaldoGols: -10, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
    { name: 'Argentina', points: 11, games: 10, wins: 3, draws: 2, losses: 5, goalsFor: 9, goalsAgainst: 15, SaldoGols: -6, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
    { name: 'Brasil', points: 8, games: 10, wins: 2, draws: 2, losses: 6, goalsFor: 16, goalsAgainst: 20, SaldoGols: -4, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
    { name: 'Espanha', points: 29, games: 10, wins: 8, draws: 2, losses: 0, goalsFor: 17, goalsAgainst: 4, SaldoGols: 13, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
    { name: 'França', points: 15, games: 10, wins: 5, draws: 0, losses: 5, goalsFor: 17, goalsAgainst: 18, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
    { name: 'Holanda', points: 14, games: 10, wins: 4, draws: 2, losses: 4, goalsFor: 12, goalsAgainst: 15, SaldoGols: -3, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
    { name: 'Inglaterra', points: 10, games: 10, wins: 3, draws: 1, losses: 6, goalsFor: 14, goalsAgainst: 14, SaldoGols: 0, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
    { name: 'Itália', points: 15, games: 10, wins: 4, draws: 3, losses: 3, goalsFor: 19, goalsAgainst: 15, SaldoGols: 4, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
    { name: 'México', points: 11, games: 10, wins: 2, draws: 5, losses: 3, goalsFor: 18, goalsAgainst: 20, SaldoGols: -2, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
    { name: 'Portugal', points: 23, games: 10, wins: 6, draws: 4, losses: 0, goalsFor: 15, goalsAgainst: 6, SaldoGols: 9, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
    { name: 'Uruguai', points: 16, games: 10, wins: 5, draws: 1, losses: 4, goalsFor: 19, goalsAgainst: 18, SaldoGols: 1, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' },
  ];

export const TURNO_3_SERIE_B: TimeTurno[] = [
    { name: 'Alemanha', points: 6, games: 10, wins: 1, draws: 3, losses: 6, goalsFor: 19, goalsAgainst: 39, SaldoGols: -20, woLosses: 0, players: [], icon: 'assets/img/alemanha.png' },
    { name: 'Argentina', points: 13, games: 10, wins: 4, draws: 1, losses: 5, goalsFor: 12, goalsAgainst: 9, SaldoGols: 3, woLosses: 0, players: [], icon: 'assets/img/argentina.png' },
    { name: 'Brasil', points: 15, games: 10, wins: 4, draws: 3, losses: 3, goalsFor: 15, goalsAgainst: 13, SaldoGols: 2, woLosses: 0, players: [], icon: 'assets/img/brasil.png' },
    { name: 'Espanha', points: 26, games: 10, wins: 7, draws: 2, losses: 1, goalsFor: 29, goalsAgainst: 10, SaldoGols: 19, woLosses: 0, players: [], icon: 'assets/img/espanha.png' },
    { name: 'França', points: 7, games: 10, wins: 2, draws: 1, losses: 7, goalsFor: 20, goalsAgainst: 28, SaldoGols: -8, woLosses: 0, players: [], icon: 'assets/img/frança.png' },
    { name: 'Holanda', points: 10, games: 10, wins: 2, draws: 4, losses: 4, goalsFor: 15, goalsAgainst: 22, SaldoGols: -7, woLosses: 0, players: [], icon: 'assets/img/holanda.png' },
    { name: 'Inglaterra', points: 20, games: 10, wins: 6, draws: 1, losses: 3, goalsFor: 24, goalsAgainst: 17, SaldoGols: 7, woLosses: 0, players: [], icon: 'assets/img/inglaterra.png' },
    { name: 'Itália', points: 17, games: 10, wins: 5, draws: 2, losses: 3, goalsFor: 14, goalsAgainst: 9, SaldoGols: 5, woLosses: 0, players: [], icon: 'assets/img/italia.png' },
    { name: 'México', points: 16, games: 10, wins: 4, draws: 4, losses: 2, goalsFor: 15, goalsAgainst: 11, SaldoGols: 4, woLosses: 0, players: [], icon: 'assets/img/mexico.png' },
    { name: 'Portugal', points: 13, games: 10, wins: 3, draws: 4, losses: 3, goalsFor: 14, goalsAgainst: 15, SaldoGols: -1, woLosses: 0, players: [], icon: 'assets/img/portugal.png' },
    { name: 'Uruguai', points: 12, games: 10, wins: 3, draws: 3, losses: 4, goalsFor: 16, goalsAgainst: 20, SaldoGols: -4, woLosses: 0, players: [], icon: 'assets/img/uruguai.png' }
  ];

export const ELENCO_SERIE_B: TimeElenco[] = [
    {
      name: 'Alemanha',
      icon: 'assets/img/alemanha.png',
      players: [
        {
          name: 'Marquinho Jr',
          position: 'Goleiro',
          fouls: 7,
          yellowCard: 2,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Klebão',
          position: 'Zagueiro',
          fouls: 1,
          yellowCard: 3,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Edilson',
          position: 'Lateral 1',
          fouls: 1,
          yellowCard: 3,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Zé Luiz',
          position: 'Lateral 2',
          fouls: 0,
          yellowCard: 2,
          redCard: 0,
          goals: 1,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Jorginho Contador',
          position: 'Volante',
          fouls: 3,
          yellowCard: 2,
          redCard: 0,
          goals: 9,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Sandrinho',
          position: 'Meio Campo 1',
          fouls: 0,
          yellowCard: 2,
          redCard: 0,
          goals: 7,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Baiano',
          position: 'Meio Campo 2',
          fouls: 1,
          yellowCard: 0,
          redCard: 0,
          goals: 3,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Claudio',
          position: 'Atacante',
          fouls: 7,
          yellowCard: 0,
          redCard: 0,
          goals: 11,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Grillo',
          position: 'Flex 1',
          fouls: 4,
          yellowCard: 3,
          redCard: 0,
          goals: 8,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Gracie',
          position: 'Flex 2',
          fouls: 3,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 1
        },
        {
          name: 'Ciço',
          position: 'Flex 3',
          fouls: 3,
          yellowCard: 0,
          redCard: 0,
          goals: 0,
          suspensao: false,
          jogosSuspensao: 1
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
    }, {
      name: 'Argentina',
      icon: 'assets/img/argentina.png',
      players: [
        { name: 'Andrézão', position: 'Goleiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Jun', position: 'Zagueiro', fouls: 0, yellowCard: 5, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Sergio Somos', position: 'Lateral 1', fouls: 3, yellowCard: 3, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Galo Cego', position: 'Lateral 2', fouls: 4, yellowCard: 1, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Zito', position: 'Volante', fouls: 4, yellowCard: 2, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Magrinho', position: 'Meio Campo 1', fouls: 0, yellowCard: 7, redCard: 0, goals: 6, suspensao: true, jogosSuspensao: 1 },
        { name: 'Leonardo', position: 'Meio Campo 2', fouls: 0, yellowCard: 1, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marquinho Policia', position: 'Atacante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Jansen', position: 'Flex 1', fouls: 7, yellowCard: 1, redCard: 1, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ralf', position: 'Flex 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Jorge Médico', position: 'Flex 3', fouls: 0, yellowCard: 1, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    },
    {
      name: 'Brasil',
      icon: 'assets/img/brasil.png',
      players: [
        { name: 'Marquinho Country', position: 'Goleiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Alex Rangel', position: 'Zagueiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Tatá', position: 'Lateral 1', fouls: 4, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Carlos Castelo', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Carlão', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Kiko', position: 'Meio Campo 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 10, suspensao: false, jogosSuspensao: 1 },
        { name: 'Fábinho', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 8, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marcelo Dentista', position: 'Atacante', fouls: 2, yellowCard: 0, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Amin', position: 'Flex 1', fouls: 6, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Luna', position: 'Flex 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Gatinho', position: 'Flex 3', fouls: 7, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Espanha',
      icon: 'assets/img/espanha.png',
      players: [
        { name: 'Xingu', position: 'Goleiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Carlinhos', position: 'Zagueiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Vitão', position: 'Lateral 1', fouls: 4, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Tevez', position: 'Lateral 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'André Freixo', position: 'Volante', fouls: 1, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Igor Brasil', position: 'Meio Campo 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 18, suspensao: false, jogosSuspensao: 1 },
        { name: 'Latini', position: 'Meio Campo 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 19, suspensao: false, jogosSuspensao: 1 },
        { name: 'Cristiano Motta', position: 'Atacante', fouls: 3, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ezequiel', position: 'Flex 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Slow', position: 'Flex 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bazhuni', position: 'Flex 3', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'França',
      icon: 'assets/img/frança.png',
      players: [
        { name: 'Brasil', position: 'Goleiro', fouls: 4, yellowCard: 2, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Gustavo', position: 'Zagueiro', fouls: 4, yellowCard: 3, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Jacaré', position: 'Lateral 1', fouls: 1, yellowCard: 5, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ecir', position: 'Lateral 2', fouls: 1, yellowCard: 2, redCard: 1, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ferreira', position: 'Volante', fouls: 2, yellowCard: 3, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Luisinho', position: 'Meio Campo 1', fouls: 2, yellowCard: 3, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Albert', position: 'Meio Campo 2', fouls: 3, yellowCard: 3, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Fabio Barros', position: 'Atacante', fouls: 2, yellowCard: 3, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'DJ', position: 'Flex 1', fouls: 4, yellowCard: 1, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Luiz Fernando', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ligeirinho', position: 'Flex 3', fouls: 7, yellowCard: 2, redCard: 1, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Holanda',
      icon: 'assets/img/holanda.png',
      players: [
        { name: 'Zuqui', position: 'Goleiro', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Dedeco', position: 'Zagueiro', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marco André', position: 'Lateral 1', fouls: 4, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Adrian', position: 'Lateral 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Valdetaro', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'José Marcio', position: 'Meio Campo 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 18, suspensao: false, jogosSuspensao: 1 },
        { name: 'Almada', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marcellus', position: 'Atacante', fouls: 5, yellowCard: 0, redCard: 0, goals: 5, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marcelo Dominó', position: 'Flex 1', fouls: 8, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Pacheco', position: 'Flex 2', fouls: 7, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Lattanzi', position: 'Flex 3', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Inglaterra',
      icon: 'assets/img/inglaterra.png',
      players: [
        { name: 'Rubano', position: 'Goleiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Mauricio', position: 'Zagueiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Melão ', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Toninho', position: 'Lateral 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Paludo', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bodinho', position: 'Meio Campo 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 27, suspensao: false, jogosSuspensao: 1 },
        { name: 'Romão', position: 'Meio Campo 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 13, suspensao: false, jogosSuspensao: 1 },
        { name: 'Neném', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Blois', position: 'Flex 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Castelinho', position: 'Flex 2', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Geraldinho', position: 'Flex 3', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Itália',
      icon: 'assets/img/italia.png',
      players: [
        { name: 'Leandro Manhaes', position: 'Goleiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Zarro', position: 'Zagueiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Vilhena', position: 'Lateral 1', fouls: 2, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Glauber', position: 'Lateral 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Toninho Imóveis', position: 'Volante', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Cadu', position: 'Meio Campo 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Naval', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 13, suspensao: false, jogosSuspensao: 1 },
        { name: 'Portugal', position: 'Atacante', fouls: 2, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Paulinho Loria', position: 'Flex 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 9, suspensao: false, jogosSuspensao: 1 },
        { name: 'Dayvison', position: 'Flex 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ronaldinho', position: 'Flex 3', fouls: 4, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'México',
      icon: 'assets/img/mexico.png',
      players: [
        { name: 'Felipe', position: 'Goleiro', fouls: 8, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Mitidieri', position: 'Zagueiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ximbinha', position: 'Lateral 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 8, suspensao: false, jogosSuspensao: 1 },
        { name: 'Maduro', position: 'Lateral 2', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Marcio Lima', position: 'Volante', fouls: 0, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Cupulille', position: 'Meio Campo 1', fouls: 3, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Léo Barbosa', position: 'Meio Campo 2', fouls: 8, yellowCard: 0, redCard: 0, goals: 4, suspensao: false, jogosSuspensao: 1 },
        { name: 'Maguila', position: 'Atacante', fouls: 4, yellowCard: 0, redCard: 0, goals: 11, suspensao: false, jogosSuspensao: 1 },
        { name: 'Serginho', position: 'Flex 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ratinho', position: 'Flex 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Bido', position: 'Flex 3', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Portugal',
      icon: 'assets/img/portugal.png',
      players: [
        { name: 'Jofre', position: 'Goleiro', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Cacau', position: 'Zagueiro', fouls: 7, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Machado', position: 'Lateral 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Juneco', position: 'Lateral 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Nicolau', position: 'Volante', fouls: 2, yellowCard: 0, redCard: 0, goals: 6, suspensao: false, jogosSuspensao: 1 },
        { name: 'Juca', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 10, suspensao: false, jogosSuspensao: 1 },
        { name: 'Orelha', position: 'Meio Campo 2', fouls: 1, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Silvio Cavalo', position: 'Atacante', fouls: 1, yellowCard: 0, redCard: 0, goals: 11, suspensao: false, jogosSuspensao: 1 },
        { name: 'Junior Samary', position: 'Flex 1', fouls: 4, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Tigrinho', position: 'Flex 2', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 },
        { name: 'Filé', position: 'Flex 3', fouls: 2, yellowCard: 0, redCard: 0, goals: 1, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }
    ,
    {
      name: 'Uruguai',
      icon: 'assets/img/uruguai.png',
      players: [
        { name: 'Braga', position: 'Goleiro', fouls: 3, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Konte', position: 'Zagueiro', fouls: 2, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Valente', position: 'Lateral 1', fouls: 1, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Shaolin', position: 'Lateral 2', fouls: 8, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Ricardinho', position: 'Volante', fouls: 1, yellowCard: 0, redCard: 0, goals: 7, suspensao: false, jogosSuspensao: 1 },
        { name: 'Daniel', position: 'Meio Campo 1', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 },
        { name: 'Eloir', position: 'Meio Campo 2', fouls: 3, yellowCard: 0, redCard: 0, goals: 15, suspensao: false, jogosSuspensao: 1 },
        { name: 'França', position: 'Atacante', fouls: 3, yellowCard: 0, redCard: 0, goals: 12, suspensao: false, jogosSuspensao: 1 },
        { name: 'Barata', position: 'Flex 1', fouls: 5, yellowCard: 0, redCard: 0, goals: 3, suspensao: false, jogosSuspensao: 1 },
        { name: 'Nilsão', position: 'Flex 2', fouls: 5, yellowCard: 0, redCard: 0, goals: 0, suspensao: false, jogosSuspensao: 1 },
        { name: 'Waltinho', position: 'Flex 3', fouls: 0, yellowCard: 0, redCard: 0, goals: 2, suspensao: false, jogosSuspensao: 1 }
      ],
      points: 0, games: 0, wins: 0, draws: 0, losses: 0,
      goalsFor: 0, goalsAgainst: 0, woLosses: 0, SaldoGols: 0
    }



    // Adicione outros times aqui
  ];

// Preencha os resultados do mata-mata aqui (null = ainda não jogado).
// A = time da esquerda, B = time da direita.
export const PLACARES_MATA_MATA_SERIE_B: PlacaresMataMata = {
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

/** Artilharia oficial da 1ª fase: a mesma tabela da página da categoria (lá aparecem os 10 primeiros). */
export const ARTILHARIA_SERIE_B: Artilheiro[] = [
      { name: 'Tevez', goals: 1, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Igor Brasil', goals: 18, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Machado', goals: 4, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Juca', goals: 10, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Magrinho', goals: 3, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Sergio Somos', goals: 1, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Luna', goals: 1, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Paulo Massa', goals: 1, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'José Marcio', goals: 18, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Bodinho', goals: 27, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Neném', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Fabio Pinheiro', goals: 8, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Jorginho', goals: 5, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Ximbinha', goals: 7, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Maduro', goals: 1, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Maguila', goals: 11, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Cristiano Motta', goals: 12, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Ezequiel', goals: 12, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Marcelo Dentista', goals: 8, time: 'Brasil', icon: 'assets/img/brasil.png' },
      { name: 'Mauricio', goals: 1, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Romão', goals: 13, time: 'Inglaterra', icon: 'assets/img/inglaterra.png' },
      { name: 'Grillo', goals: 8, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Ferreira', goals: 12, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Luisinho', goals: 2, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Albert', goals: 1, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Fabio Barros', goals: 1, time: 'França', icon: 'assets/img/frança.png' },
      { name: 'Paulinho Loria', goals: 9, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Portugal', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Latini', goals: 19, time: 'Espanha', icon: 'assets/img/espanha.png' },
      { name: 'Marcellus', goals: 5, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Francelino', goals: 4, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Léo Barbosa', goals: 1, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Serginho', goals: 5, time: 'México', icon: 'assets/img/mexico.png' },
      { name: 'Jun', goals: 2, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Naldo', goals: 6, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'Silvio Cavalo', goals: 11, time: 'Portugal', icon: 'assets/img/portugal.png' },
      { name: 'Andrinho', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Klebão', goals: 1, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Claudio', goals: 11, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Marcelinho', goals: 6, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Alex Gomes', goals: 3, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Frank', goals: 4, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Cadu', goals: 2, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Naval', goals: 13, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Luquinha', goals: 1, time: 'Itália', icon: 'assets/img/italia.png' },
      { name: 'Wanildo', goals: 9, time: 'Argentina', icon: 'assets/img/argentina.png' },
      { name: 'França', goals: 12, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Sandrinho', goals: 5, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Jorginho Contador', goals: 7, time: 'Alemanha', icon: 'assets/img/alemanha.png' },
      { name: 'Bahia', goals: 1, time: 'Holanda', icon: 'assets/img/holanda.png' },
      { name: 'Eloir', goals: 15, time: 'Uruguai', icon: 'assets/img/uruguai.png' },
      { name: 'Cupulille', goals: 12, time: 'México', icon: 'assets/img/mexico.png' },

















    ];

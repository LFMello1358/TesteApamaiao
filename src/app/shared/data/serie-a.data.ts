// Dados oficiais da Série A: totais por turno (com bônus de campeão/vice já somados),
// elenco com estatísticas individuais e placares do mata-mata.
// Estes dados alimentam a página da categoria e a aba Scout.
import { PlacaresMataMata, TimeElenco, TimeTurno } from '../models/campeonato.model';

export const TURNO_1_SERIE_A: TimeTurno[] = [
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

export const TURNO_2_SERIE_A: TimeTurno[] = [
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

export const TURNO_3_SERIE_A: TimeTurno[] = [
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

export const ELENCO_SERIE_A: TimeElenco[] = [
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

// Preencha os resultados do mata-mata aqui (null = ainda não jogado).
// A = time da esquerda, B = time da direita.
export const PLACARES_MATA_MATA_SERIE_A: PlacaresMataMata = {

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

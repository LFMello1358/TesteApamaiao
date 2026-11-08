// Tipos compartilhados entre as páginas das categorias e a aba Scout.

export interface Jogador {
  name: string;
  position: string;
  fouls: number;
  yellowCard: number;
  redCard: number;
  goals: number;
  suspensao: boolean;
  jogosSuspensao?: number;
}

/** Linha da tabela de um turno (pontos já incluem bônus de campeão/vice do turno). */
export interface TimeTurno {
  name: string;
  icon: string;
  points: number;
  games: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  SaldoGols: number;
  woLosses: number;
  players: Jogador[];
}

/** Time com o elenco e as estatísticas individuais da 1ª fase. */
export type TimeElenco = TimeTurno;

/** Resultado de um jogo da 1ª fase. gols = [mandante, visitante]. */
export interface Jogo {
  turno: 1 | 2 | 3;
  data: string; // AAAA-MM-DD
  mandante: string;
  visitante: string;
  gols: [number, number];
}

export interface JogadorNaSumula { time: string; jogador: string; }

/** Dados de um jogo transcritos da súmula. confere = soma dos gols bate com o placar oficial. */
export interface SumulaDoJogo {
  data: string;
  mandante: string;
  visitante: string;
  confere: boolean;
  /** time = quem se beneficiou do gol; contra = gol contra (jogador é do adversário). */
  gols: { time: string; jogador: string; gols: number; contra?: boolean }[];
  amarelos: JogadorNaSumula[];
  vermelhos: JogadorNaSumula[];
  /** Marcados com "F"/FALTOU ou suspensos. */
  ausentes: JogadorNaSumula[];
}

export interface PlacarConfronto {
  idaA: number | null;
  idaB: number | null;
  voltaA: number | null;
  voltaB: number | null;
}

export interface PlacarJogoUnico {
  golsA: number | null;
  golsB: number | null;
}

export interface PlacaresMataMata {
  quartas: { q1: PlacarConfronto; q2: PlacarConfronto; q3: PlacarConfronto; q4: PlacarConfronto };
  semifinais: { s1: PlacarConfronto; s2: PlacarConfronto };
  final: PlacarConfronto;
  terceiroLugar: PlacarJogoUnico;
}

/** Linha da artilharia oficial exibida na página da categoria. */
export interface Artilheiro {
  name: string;
  goals: number;
  time: string;
  icon: string;
}

// time.model.ts
export interface Jogador {
  id: number;
  nome: string;
  golsFeitos: number;
  golsLevados: number;
  cartaoAmarelo: number;
  cartaoVermelho: number;
  ausencias: number;
}

export interface Time {
  id: number;
  nome: string;
  goleiro: Jogador;
  zagueiro: Jogador;
  lateral1: Jogador;
  lateral2: Jogador;
  lateral3: Jogador;
  cabecaDeArea: Jogador;
  meia: Jogador;
  meia1: Jogador;
  meia2: Jogador;
  atacante: Jogador;
  atacante1: Jogador;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  // Defina um índice para as posições de jogadores, mas excluindo propriedades específicas
  [key: string]: Jogador | number | string;  // A assinatura de índice permite acesso dinâmico
}



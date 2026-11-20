// Datas dos jogos do mata-mata (AAAA-MM-DD), na mesma ordem dos confrontos das páginas das categorias.
// O Scout usa isto para abrir sempre no confronto do próximo jogo (ou do jogo de hoje).
// Se a Diretoria mudar uma data, mude aqui e na página da categoria (serie-a/serie-b.component.ts).

export interface DatasConfronto { ida: string; volta: string; }

export interface CalendarioMataMata {
  quartas: DatasConfronto[];
  semifinais: DatasConfronto[];
  final: DatasConfronto;
}

const QUARTAS: DatasConfronto[] = [
  { ida: '2026-11-09', volta: '2026-11-16' },
  { ida: '2026-11-10', volta: '2026-11-17' },
  { ida: '2026-11-11', volta: '2026-11-18' },
  { ida: '2026-11-12', volta: '2026-11-19' },
];

const SEMIFINAIS: DatasConfronto[] = [
  { ida: '2026-11-24', volta: '2026-12-01' },
  { ida: '2026-11-25', volta: '2026-12-02' },
];

export const CALENDARIO_MATA_MATA: Record<'A' | 'B', CalendarioMataMata> = {
  A: { quartas: QUARTAS, semifinais: SEMIFINAIS, final: { ida: '2026-12-10', volta: '2026-12-17' } },
  B: { quartas: QUARTAS, semifinais: SEMIFINAIS, final: { ida: '2026-12-10', volta: '2026-12-16' } },
};

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
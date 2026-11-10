// Transmissões ao vivo (playlist APAMAIÃO 2026 do canal olhonolance10oficial).
// Uma transmissão por noite com os jogos das duas categorias. Para um dia novo:
// copie uma linha, troque a data, o id do vídeo (o que vem depois de "watch?v=") e os jogos.
// O pop-up "Ao vivo" aparece no site entre `inicio` e `fim` desse dia.

export interface JogoTransmitido {
  categoria: 'A' | 'B';
  hora: string;
  mandante: string;
  visitante: string;
}

export interface Transmissao {
  data: string; // AAAA-MM-DD
  inicio: string; // HH:MM
  fim: string; // HH:MM
  videoId: string;
  titulo: string;
  jogos: JogoTransmitido[];
}

export const PLAYLIST_2026 = 'https://www.youtube.com/playlist?list=PLmJ0lTVf6ojyNAqMQeW89KTJy1DuPyYmK';

export const TRANSMISSOES: Transmissao[] = [
  { data: '2026-11-09', inicio: '19:45', fim: '23:30', videoId: 'heslTfYa6FY', titulo: 'Quartas de final · ida',
    jogos: [{ categoria: 'B', hora: '20h', mandante: 'México', visitante: 'Inglaterra' }, { categoria: 'A', hora: '21h', mandante: 'Alemanha', visitante: 'Argentina' }] },
  { data: '2026-11-10', inicio: '19:45', fim: '23:30', videoId: 'f13tcCG2Q2c', titulo: 'Quartas de final · ida',
    jogos: [{ categoria: 'B', hora: '20h', mandante: 'Itália', visitante: 'Uruguai' }, { categoria: 'A', hora: '21h', mandante: 'Espanha', visitante: 'México' }] },
  { data: '2026-11-11', inicio: '19:45', fim: '23:30', videoId: 'V39niCZJVB0', titulo: 'Quartas de final · ida',
    jogos: [{ categoria: 'B', hora: '20h', mandante: 'Portugal', visitante: 'Holanda' }, { categoria: 'A', hora: '21h', mandante: 'França', visitante: 'Brasil' }] },
  { data: '2026-11-12', inicio: '19:45', fim: '23:30', videoId: 's7HF-998H_A', titulo: 'Quartas de final · ida',
    jogos: [{ categoria: 'B', hora: '20h', mandante: 'Espanha', visitante: 'Brasil' }, { categoria: 'A', hora: '21h', mandante: 'Uruguai', visitante: 'Inglaterra' }] },
];

/** Escudo de cada seleção. */
export const ESCUDOS: Record<string, string> = {
  Alemanha: 'assets/img/alemanha.png', Argentina: 'assets/img/argentina.png', Brasil: 'assets/img/brasil.png',
  Espanha: 'assets/img/espanha.png', França: 'assets/img/frança.png', Holanda: 'assets/img/holanda.png',
  Inglaterra: 'assets/img/inglaterra.png', Itália: 'assets/img/italia.png', México: 'assets/img/mexico.png',
  Portugal: 'assets/img/portugal.png', Uruguai: 'assets/img/uruguai.png',
};

/** Transmissão no ar agora (ou null). */
export function transmissaoAgora(agora = new Date()): Transmissao | null {
  const pad = (n: number) => String(n).padStart(2, '0');
  const hoje = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
  const hora = `${pad(agora.getHours())}:${pad(agora.getMinutes())}`;
  return TRANSMISSOES.find(t => t.data === hoje && hora >= t.inicio && hora <= t.fim) ?? null;
}

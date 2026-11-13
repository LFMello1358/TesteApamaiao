// Notícias do mata-mata (aba /noticias). Gerado a partir de SUMULAS-2026/noticias/materias-*.json.
// Fontes: súmulas oficiais e a narração das transmissões ao vivo. Para uma matéria nova, acrescente um item.

export interface NoticiaJogo { mandante: string; visitante: string; placarMandante: number; placarVisitante: number; }

export interface Noticia {
  id: string;
  categoria: 'A' | 'B';
  tipo: 'jogo' | 'panorama';
  data: string; // AAAA-MM-DD
  titulo: string;
  linhaFina: string;
  chapeu: string;
  jogo: NoticiaJogo | null;
  corpo: string[];
  destaques: string[];
}

export const NOTICIAS: Noticia[] = [
  {
    "id": "a-panorama",
    "categoria": "A",
    "tipo": "panorama",
    "data": "2026-11-13",
    "titulo": "Rumo às voltas: artilharia em chamas e quatro confrontos em aberto",
    "linhaFina": "Caça-Rato e Luizinho Costela dividem o topo com 30 gols, Allan corre atrás com 27 e as quartas da Categoria A seguem sem nenhum classificado garantido",
    "chapeu": "Quartas · panorama",
    "jogo": null,
    "corpo": [
      "A semana de ida das quartas de final da Categoria A terminou do jeito que o torcedor gosta: nenhuma vaga decidida e uma artilharia mais apertada do que nunca. Luiz Fellipe, o Caça-Rato, e Luizinho Costela chegaram aos 30 gols e dividem a liderança. Logo atrás aparece Allan, com 27, a três gols de alcançar a dupla.",
      "O caso do Caça-Rato já virou roteiro de filme: chegou com cara de azarão e, gol a gol, se candidatou a Rei do campeonato. Do outro lado, Luizinho Costela segue provando que um meio-campista pode, sim, disputar artilharia de igual para igual com os atacantes. E o Allan, fiel ao seu “ano de servir”, tem a chance perfeita de colocar em prática o outro bordão: se “a pressão é um privilégio”, precisar de três gols e de uma vitória na mesma noite é praticamente um presente.",
      "Na Espanha, a pergunta que não quer calar continua no ar. Mauricio Batata, o Batata Airlines, soma 13 gols no ano, deu passe, deu giro de Zidane e deu trabalho, mas ainda não balançou a rede no mata-mata. Será que vai ter gol do Batata semana que vem?",
      "Nos confrontos, o cenário é este: na q1 (16/11), a Alemanha precisa vencer a Argentina por qualquer placar, já que o empate no agregado favorece os alemães, enquanto a Argentina avança com empate. Na q2 (17/11), a Espanha leva vantagem de dois gols e pode perder por até dois; o México precisa vencer por três de diferença. Na q3 (18/11), a França joga pelo empate e o Brasil precisa vencer.",
      "Fechando a rodada, na q4 (19/11), Uruguai e Inglaterra voltam a campo depois do 1 a 1 da ida. O empate no agregado classifica o Uruguai, melhor colocado da primeira fase, e a Inglaterra precisa da vitória. Todos os jogos da Categoria A são às 21h."
    ],
    "destaques": [
      "🥇 Luiz Fellipe (FRA) e Luizinho Costela (ESP) — 30 gols",
      "🥉 Allan (ALE) — 27 gols",
      "📅 Voltas: 16/11 ALE×ARG · 17/11 ESP×MEX · 18/11 FRA×BRA · 19/11 URU×ING, às 21h"
    ]
  },
  {
    "id": "a-q1-ida",
    "categoria": "A",
    "tipo": "jogo",
    "data": "2026-11-09",
    "titulo": "Argentina vence a Alemanha e leva vantagem para a volta",
    "linhaFina": "Thiago Pinheiro marca o gol da vitória por 3 a 2 e deixa os argentinos jogando pelo empate; Lucas Siri e Allan marcaram para os alemães",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Alemanha",
      "visitante": "Argentina",
      "placarMandante": 2,
      "placarVisitante": 3
    },
    "corpo": [
      "A Argentina abriu as quartas de final da Categoria A com vitória por 3 a 2 sobre a Alemanha, na noite de 9 de novembro. Rafael Almeida, Thiago Pinheiro e Douglas marcaram para os argentinos. Lucas Siri e Allan fizeram os gols alemães.",
      "O gol da vitória foi de Thiago Pinheiro, no fim do jogo. Rafael Almeida, que também deixou o seu, recebeu cartão amarelo.",
      "Depois da partida, Thiago Pinheiro manteve os pés no chão. Disse que “a pressão segue na gente”, lembrou que o time “tava lá embaixo e cresceu” e garantiu que “o favoritismo segue deles”. Um discurso que deve soar como música para o Allan, que vive repetindo que a pressão é um privilégio. Pelo jeito, o privilégio agora é dos dois lados.",
      "Para o artilheiro alemão, o gol na ida o deixou com 27 no ano, a três dos líderes. Ou seja: o ano de servir pede, na volta, gols em série e uma vitória.",
      "A conta é simples. A Alemanha terminou a primeira fase em 4º lugar, com 50 pontos, contra 44 da Argentina, 5ª colocada, e por isso o empate no agregado é alemão. No dia 16/11, às 21h, a Alemanha precisa vencer por qualquer placar; a Argentina avança com o empate."
    ],
    "destaques": [
      "⚽ Lucas Siri, Allan (ALE)",
      "⚽ Rafael Almeida, Thiago Pinheiro, Douglas (ARG)",
      "🟨 Rafael Almeida"
    ]
  },
  {
    "id": "a-q2-ida",
    "categoria": "A",
    "tipo": "jogo",
    "data": "2026-11-10",
    "titulo": "Fred brilha, Costela faz golaço e Espanha abre dois gols sobre o México",
    "linhaFina": "Espanha vence por 3 a 1 com dois gols de Fred; Luizinho Costela ainda teve outro golaço anulado e chega aos 30 na artilharia",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Espanha",
      "visitante": "México",
      "placarMandante": 3,
      "placarVisitante": 1
    },
    "corpo": [
      "A Espanha venceu o México por 3 a 1 no jogo de ida das quartas, na noite de 10 de novembro, e leva boa vantagem para a volta. Fred marcou duas vezes e Luizinho Costela fez o outro. Vinicius Reis descontou para os mexicanos.",
      "O começo foi truncado, com o 0 a 0 segurando e Vinicius colado no Luizinho a noite toda. O placar só se abriu numa trama coletiva: Mauricio Batata deu o passe para Léo, que serviu Fred para bater. Logo depois, o México assustou com uma bola que explodiu na trave. E aí apareceu o Costela, com um golaço, para fazer 2 a 0. Vini, que correu o jogo inteiro, diminuiu.",
      "No segundo tempo, Luizinho ainda marcou outro golaço, mas o lance foi anulado porque um companheiro havia colocado a mão na bola. Depois, ele recebeu cartão amarelo. No fim, Fred limpou o goleiro com tranquilidade e fechou em 3 a 1. Com o gol, o meio-campista chega a 30 e segue dividindo a artilharia com os atacantes, como quem não quer nada.",
      "E o Batata Airlines? Deu giro de Zidane, deu trabalho, serviu os companheiros, mas o gol no mata-mata ainda não decolou. O narrador não perdoou: “a batata ficou frita”. Será que vai ter gol do Batata semana que vem?",
      "Vinicius explicou a missão da noite: “Luizinho joga muito, tem que tirar ele do jogo”. O Costela, por sua vez, valorizou a vantagem sem salto alto: “não desmerecendo o México, tem mais um jogo”. Na volta, dia 17/11, às 21h, a Espanha, 3ª colocada da primeira fase, pode perder por até dois gols; o México, 6º, precisa vencer por três de diferença."
    ],
    "destaques": [
      "⚽⚽ Fred, ⚽ Luizinho Costela (ESP)",
      "⚽ Vinicius Reis (MEX)",
      "🟨 Luizinho Costela"
    ]
  },
  {
    "id": "a-q3-ida",
    "categoria": "A",
    "tipo": "jogo",
    "data": "2026-11-11",
    "titulo": "Caça-Rato empata de cabeça no fim e iguala a artilharia",
    "linhaFina": "França busca o 1 a 1 contra o Brasil quase no apito final; Luiz Fellipe chega a 30 gols e divide a liderança com Luizinho Costela",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "França",
      "visitante": "Brasil",
      "placarMandante": 1,
      "placarVisitante": 1
    },
    "corpo": [
      "França e Brasil empataram por 1 a 1 no jogo de ida das quartas, na noite de 11 de novembro. Chalu abriu o placar para o Brasil no segundo tempo, e Luiz Fellipe, o Caça-Rato, empatou de cabeça quase no fim. O confronto reeditou um duelo marcante do ano, que teve Brasil 6 a 1 no primeiro turno e França 3 a 1 no terceiro.",
      "O primeiro tempo terminou sem gols, com boas defesas de Gilmar, pela França, e de Enzo, pelo Brasil. O Caça-Rato foi muito acionado, mas encontrou o Fabiano firme na marcação, e o Enzo ainda fez ótima defesa numa finalização dele. Na volta do intervalo, Telles preparou e Chalu colocou o Brasil na frente. Rico, da França, e o goleiro Enzo Merecci, do Brasil, receberam cartão amarelo.",
      "Quando o relógio já apertava, o artilheiro apareceu como manda o figurino: de cabeça. “Caça-Rato empata, deixa tudo igual”, resumiu a narração. Com o gol, Luiz Fellipe chega a 30 e alcança Luizinho Costela no topo da artilharia. O azarão de outros tempos agora tem pinta de Rei do campeonato.",
      "Na saída, ele foi autocrítico: “o resultado não foi ruim, mas não foi o nosso bom jogo”. E já desenhou o plano para a volta: “decidir no começo, fazer 2 a 0 no primeiro tempo”.",
      "A França, 2ª colocada da primeira fase, joga pelo empate no dia 18/11, às 21h. O Brasil, 7º, precisa vencer para seguir adiante."
    ],
    "destaques": [
      "⚽ Luiz Fellipe (FRA)",
      "⚽ Chalu (BRA)",
      "🟨 Enzo Merecci, Rico"
    ]
  },
  {
    "id": "a-q4-ida",
    "categoria": "A",
    "tipo": "jogo",
    "data": "2026-11-12",
    "titulo": "Uruguai e Inglaterra empatam e deixam tudo aberto para a volta",
    "linhaFina": "Pedro Valente e Bruno Pão marcam no primeiro tempo; Inglaterra precisa vencer no dia 19 para avançar",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Uruguai",
      "visitante": "Inglaterra",
      "placarMandante": 1,
      "placarVisitante": 1
    },
    "corpo": [
      "Uruguai e Inglaterra empataram por 1 a 1 na noite de 12 de novembro, no jogo de ida que fechou a primeira semana das quartas da Categoria A. Pedro Valente marcou para o Uruguai e Bruno Pão empatou para a Inglaterra.",
      "O Uruguai saiu na frente cedo, aos 4 minutos: Eduardo Garcia cruzou e Pedro Valente, o camisa 9, completou. A resposta veio aos 13, com Bruno Pão de cabeça, após cruzamento de Ginho. Com 25 anos de Apamaião, o veterano contou que “o 10 estava sozinho” e que conseguiu achar o passe.",
      "O segundo tempo foi de nervos à flor da pele. Teve bola explodindo no travessão, e Guilherme, que defendeu o gol uruguaio, garantiu o empate com uma grande defesa. Pedro Valente e Hélio receberam cartão amarelo no mesmo lance.",
      "Depois do jogo, Bruno Pão resumiu o espírito inglês: “a gente tá no game, 1 a 1. Vamos ter que agredir um pouco mais na volta”. Do lado uruguaio, a leitura foi de autocrítica, com um jogador lembrando que o mata-mata muda tudo.",
      "Primeiro colocado da fase de classificação, com 71 pontos, o Uruguai joga pelo empate na volta, dia 19/11, às 21h. A Inglaterra, 8ª colocada, precisa da vitória para avançar."
    ],
    "destaques": [
      "⚽ Pedro Valente (URU)",
      "⚽ Bruno Pão (ING)",
      "🟨 Hélio, Pedro Valente"
    ]
  },
  {
    "id": "b-panorama",
    "categoria": "B",
    "tipo": "panorama",
    "data": "2026-11-13",
    "titulo": "Rumo às voltas: Categoria B tem quatro confrontos em aberto",
    "linhaFina": "México, Holanda e Espanha levam vantagem; Itália e Uruguai recomeçam do zero. Decisões de 16 a 19/11, sempre às 20h",
    "chapeu": "Quartas · panorama",
    "jogo": null,
    "corpo": [
      "Os jogos de ida das quartas de final da Categoria B terminaram com três vitórias e um empate sem gols. Nenhum confronto está decidido: no formato de ida e volta, o empate no agregado classifica o time mais bem colocado na 1ª fase, detalhe que muda a conta de cada um para a semana que vem.",
      "Na segunda (16/11), a Inglaterra precisa vencer o México por dois gols ou mais para reverter o 1 a 0; o México avança até perdendo por um. Na terça (17/11), Itália e Uruguai voltam a campo depois do 0 a 0: qualquer empate classifica a Itália, e o Uruguai precisa vencer.",
      "Na quarta (18/11), Portugal, 2º colocado da 1ª fase, precisa de uma vitória por qualquer placar contra a Holanda para virar o agregado; aos holandeses, que venceram por 1 a 0, o empate basta. Na quinta (19/11), a Espanha, líder da 1ª fase com 81 pontos, defende o 2 a 0 diante do Brasil, que busca uma vitória por três gols de diferença para seguir vivo.",
      "Na artilharia, Bodinho, da Inglaterra, segue isolado na ponta com 27 gols, oito à frente de Latini, da Espanha (19). Logo atrás aparecem Igor Brasil (Espanha) e José Marcio (Holanda), com 18 cada. Com quatro jogos decisivos pela frente, a corrida pela artilharia também passa pelas voltas."
    ],
    "destaques": [
      "🗓️ 16/11 · México × Inglaterra (ida: 1 a 0)",
      "🗓️ 17/11 · Itália × Uruguai (ida: 0 a 0)",
      "🗓️ 18/11 · Portugal × Holanda (ida: 0 a 1)",
      "🗓️ 19/11 · Espanha × Brasil (ida: 2 a 0)",
      "⚽ Artilheiro: Bodinho (ING), 27 gols"
    ]
  },
  {
    "id": "b-q1-ida",
    "categoria": "B",
    "tipo": "jogo",
    "data": "2026-11-09",
    "titulo": "Maguila decide e México sai na frente contra a Inglaterra",
    "linhaFina": "Gol único garante o 1 a 0 na ida; com a vantagem do empate no agregado, mexicanos avançam até perdendo por um na volta",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "México",
      "visitante": "Inglaterra",
      "placarMandante": 1,
      "placarVisitante": 0
    },
    "corpo": [
      "O México venceu a Inglaterra por 1 a 0 na noite de 9 de novembro, no jogo de ida das quartas de final da Categoria B. Maguila marcou o único gol da partida e deu aos mexicanos a vantagem para o duelo decisivo.",
      "O confronto reuniu dois times que terminaram a 1ª fase lado a lado na tabela: o México em 4º, com 48 pontos, e a Inglaterra em 5º, com 44. O equilíbrio da campanha se refletiu no placar curto. Marcio Lima, do México, e Melão e Neném, da Inglaterra, receberam cartão amarelo.",
      "A vitória pesa ainda mais porque o empate no agregado favorece o México, mais bem colocado na fase de classificação. A Inglaterra, que tem o artilheiro da categoria, Bodinho, com 27 gols, precisa vencer por dois gols ou mais na volta, marcada para 16/11, às 20h. Ao México, até uma derrota por um gol basta."
    ],
    "destaques": [
      "⚽ Maguila (MEX)",
      "🟨 Marcio Lima (MEX)",
      "🟨 Melão, Neném (ING)"
    ]
  },
  {
    "id": "b-q2-ida",
    "categoria": "B",
    "tipo": "jogo",
    "data": "2026-11-10",
    "titulo": "Itália e Uruguai empatam sem gols e deixam tudo para a volta",
    "linhaFina": "Leandro Manhães e Braga passam a noite sem ser vazados; empate mantém a vantagem italiana para a volta",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Itália",
      "visitante": "Uruguai",
      "placarMandante": 0,
      "placarVisitante": 0
    },
    "corpo": [
      "Itália e Uruguai empataram por 0 a 0 em 10 de novembro, no jogo de ida das quartas de final da Categoria B. Os goleiros foram protagonistas: Leandro Manhães, da Itália, e Braga, do Uruguai, terminaram a partida sem sofrer gols.",
      "A Itália chegou às quartas como 3ª colocada da 1ª fase, com 48 pontos, e o Uruguai como 6º, com 42. Do lado uruguaio, Valente e Eloir receberam cartão amarelo. Eloir, um dos principais goleadores da categoria com 15 gols, passou em branco desta vez.",
      "O placar zerado deixa tudo aberto, mas com um detalhe importante: o empate no agregado classifica a Itália, mais bem colocada na fase de classificação. Na volta, em 17/11, às 20h, o Uruguai precisa vencer para seguir adiante; qualquer empate leva os italianos à semifinal."
    ],
    "destaques": [
      "🧤 Leandro Manhães (ITA) e Braga (URU) sem sofrer gols",
      "🟨 Valente, Eloir (URU)"
    ]
  },
  {
    "id": "b-q3-ida",
    "categoria": "B",
    "tipo": "jogo",
    "data": "2026-11-11",
    "titulo": "Lattanzi marca o primeiro e Holanda vence Portugal",
    "linhaFina": "Gol inédito do holandês no campeonato e goleiro Zuqui sem ser vazado garantem o 1 a 0 sobre o vice-líder da 1ª fase",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Portugal",
      "visitante": "Holanda",
      "placarMandante": 0,
      "placarVisitante": 1
    },
    "corpo": [
      "A Holanda venceu Portugal por 1 a 0 em 11 de novembro, no jogo de ida das quartas de final da Categoria B. O gol foi de Lattanzi, o primeiro dele no campeonato, e veio justamente no mata-mata.",
      "O resultado ganha peso pelo retrospecto da 1ª fase: Portugal terminou em 2º lugar, com 54 pontos, enquanto a Holanda se classificou em 7º. Na defesa holandesa, o goleiro Zuqui não sofreu gol. Juneco e Tigrinho, de Portugal, e Marco André, da Holanda, receberam cartão amarelo.",
      "Na volta, em 18/11, às 20h, Portugal conta com a vantagem do empate no agregado, garantida pela melhor campanha: uma vitória por qualquer placar classifica os portugueses. À Holanda, que tem em José Marcio um dos artilheiros da categoria, com 18 gols, o empate basta."
    ],
    "destaques": [
      "⚽ Lattanzi (HOL)",
      "🧤 Zuqui (HOL) sem sofrer gol",
      "🟨 Juneco, Tigrinho (POR)",
      "🟨 Marco André (HOL)"
    ]
  },
  {
    "id": "b-q4-ida",
    "categoria": "B",
    "tipo": "jogo",
    "data": "2026-11-12",
    "titulo": "Espanha vence o Brasil e leva vantagem para a volta",
    "linhaFina": "Cristiano Motta e Ezequiel marcam no 2 a 0; goleiro Xingu não é vazado e Brasil segue vivo na disputa",
    "chapeu": "Quartas · ida",
    "jogo": {
      "mandante": "Espanha",
      "visitante": "Brasil",
      "placarMandante": 2,
      "placarVisitante": 0
    },
    "corpo": [
      "A Espanha venceu o Brasil por 2 a 0 em 12 de novembro, no jogo de ida das quartas de final da Categoria B. Cristiano Motta e Ezequiel marcaram os gols, e o goleiro Xingu terminou a noite sem ser vazado.",
      "Líder da 1ª fase com 81 pontos, a melhor campanha da categoria, a Espanha confirmou a força do elenco. Latini e Bazhuni receberam cartão amarelo. Do outro lado, o Brasil, que conquistou sua vaga nas quartas, encarou o time de maior pontuação do campeonato e manteve o confronto em aberto.",
      "A volta está marcada para 19/11, às 20h. Como o empate no agregado favorece a Espanha, o Brasil precisa vencer por três gols de diferença para avançar. É o desafio que fica para os brasileiros, que seguem vivos na briga pela vaga na semifinal."
    ],
    "destaques": [
      "⚽ Cristiano Motta (ESP)",
      "⚽ Ezequiel (ESP)",
      "🧤 Xingu (ESP) sem sofrer gol",
      "🟨 Latini, Bazhuni (ESP)"
    ]
  }
];

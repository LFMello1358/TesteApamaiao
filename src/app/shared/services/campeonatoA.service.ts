// campeonato.service.ts
import { Injectable } from '@angular/core';
import { Jogador, Time } from '../models/TimeA.model';

@Injectable({
  providedIn: 'root',
})
export class CampeonatoService {
  private times: Time[] = [];

  constructor() {
    // Inicializando com 11 times e jogadores por posição
    this.inicializarTimes();
  }

  private inicializarTimes() {
    // Criando o time Barcelona
    this.times.push({
      id: 1,
      nome: 'Barcelona',
      goleiro: this.criarJogador(1, 'Ter Stegen'),
      zagueiro: this.criarJogador(2, 'Piqué'),
      lateral1: this.criarJogador(3, 'Alba'),
      lateral2: this.criarJogador(4, 'Roberto'),
      lateral3: this.criarJogador(5, 'Dest'),
      cabecaDeArea: this.criarJogador(6, 'Busquets'),
      meia: this.criarJogador(7, 'De Jong'),
      meia1: this.criarJogador(8, 'Pedri'),
      meia2: this.criarJogador(9, 'Gavi'),
      atacante: this.criarJogador(10, 'Ferran Torres'),
      atacante1: this.criarJogador(11, 'Lewandowski'),
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
    });
  
    // Criando o time Real Madrid
    this.times.push({
      id: 2,
      nome: 'Real Madrid',
      goleiro: this.criarJogador(1, 'Courtois'),
      zagueiro: this.criarJogador(2, 'Alaba'),
      lateral1: this.criarJogador(3, 'Mendy'),
      lateral2: this.criarJogador(4, 'Carvajal'),
      lateral3: this.criarJogador(5, 'Marcelo'),
      cabecaDeArea: this.criarJogador(6, 'Casemiro'),
      meia: this.criarJogador(7, 'Modrić'),
      meia1: this.criarJogador(8, 'Kroos'),
      meia2: this.criarJogador(9, 'Valverde'),
      atacante: this.criarJogador(10, 'Vinícius Júnior'),
      atacante1: this.criarJogador(11, 'Benzema'),
      pontos: 0,
      jogos: 0,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
    });
  }
  

  private criarJogador(id: number, nome: string): Jogador {
    return {
      id,
      nome,
      golsFeitos: 0,
      golsLevados: 0,
      cartaoAmarelo: 0,
      cartaoVermelho: 0,
      ausencias: 0,
    };
  }

  getTimes(): Time[] {
    return this.times;
  }

  getTimeById(timeId: number): Time | undefined {
    return this.times.find(time => time.id === timeId);
  }

  registrarJogador(timeId: number, posicao: keyof Time, nome: string) {
    const time = this.getTimeById(timeId);
    if (time) {
      // Verifique se a posição é válida antes de atualizar
      const jogador = time[posicao];
      if (jogador) {
        (jogador as Jogador).nome = nome; // Usando cast para garantir que seja um jogador
      }
    }
  }

  registrarJogo(timeId: number, golsFeitos: number, golsLevados: number, cartaoAmarelo: number, cartaoVermelho: number, ausencias: number) {
    const time = this.times.find(t => t.id === timeId);
    if (time) {
      time.jogos += 1;
  
      // Atualiza os dados dos jogadores, mas filtra apenas as propriedades que são de tipo Jogador
      const jogadores: Jogador[] = [
        time.goleiro, time.zagueiro, time.lateral1, time.lateral2, time.lateral3,
        time.cabecaDeArea, time.meia, time.meia1, time.meia2, time.atacante, time.atacante1
      ];
  
      jogadores.forEach(jogador => {
        if (jogador) {
          if (jogador.id === 1) { // Supondo que o goleiro é o jogador 1
            jogador.golsLevados += golsLevados;
          } else {
            jogador.golsFeitos += golsFeitos;
          }
          jogador.cartaoAmarelo += cartaoAmarelo;
          jogador.cartaoVermelho += cartaoVermelho;
          jogador.ausencias += ausencias;
        }
      });
  
      // Atualiza o desempenho do time
      if (golsFeitos > golsLevados) {
        time.vitorias += 1;
        time.pontos += 3;
      } else if (golsFeitos < golsLevados) {
        time.derrotas += 1;
      } else {
        time.empates += 1;
        time.pontos += 1;
      }
    }
  }
  
}

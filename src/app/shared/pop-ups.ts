import { signal } from '@angular/core';

/**
 * Prioridade dos pop-ups: o aviso da pré-inscrição vem primeiro.
 * Enquanto ele estiver aberto, o pop-up "Ao vivo" espera e só aparece depois que o aviso for fechado.
 */
export const avisoInscricaoAberto = signal(false);

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-popup-avisos',
  imports: [SharedModule],
  templateUrl: './popup-avisos.component.html',
  styleUrl: './popup-avisos.component.scss'
})
export class PopupAvisosComponent implements OnInit {
  visible: boolean = true; // Propriedade para controlar a visibilidade do popup
  @Output() closed = new EventEmitter<void>();

  ngOnInit(): void {
    // Fecha o popup após 5 segundos
    setTimeout(() => this.close(), 10000);
  }

  close(): void {
    this.visible = false;  // Altera a visibilidade para false, removendo o popup
    this.closed.emit();     // Emite evento de fechamento
  }
}
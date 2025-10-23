import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-modal',
  imports: [SharedModule],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']  // corrigido aqui
})
export class ImageModalComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { src: string; alt: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }


}
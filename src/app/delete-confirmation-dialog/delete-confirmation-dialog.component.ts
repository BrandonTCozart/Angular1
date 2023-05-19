import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IObjective } from '../Interfaces/IObjective';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {
  title: string = this.data.title;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IObjective) { }

  ngOnInit(): void {
  }

  closeDeleteDialog(value: boolean) {
    this.dialogRef.close(value);
  }
}

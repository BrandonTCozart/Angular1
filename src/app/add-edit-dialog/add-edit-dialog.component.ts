import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IObjective } from '../Interfaces/IObjective';
import { CommunicationServiceService } from '../Services/communication-service.service';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-add-edit-dialog',
  templateUrl: './add-edit-dialog.component.html',
  styleUrls: ['./add-edit-dialog.component.css']
})
export class AddEditDialogComponent implements OnInit {

  modalTitle: string = "Add Objective";
  loaderShow: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>,
    private objectiveService: CommunicationServiceService,
    @Inject(MAT_DIALOG_DATA) public data: IObjective,
    private _snackBar: MatSnackBar
  ) { }

  objectiveForm = new FormGroup({
    titleControl: new FormControl('', [Validators.required,
    Validators.maxLength(50),
    (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (value && value.trim().length === 0) {
        return { invalidTitle: true };
      }
      return null;
    },
    ]),
    descriptionControl: new FormControl('', [Validators.maxLength(500)]),
    doByDateControl: new FormControl('', Validators.required)
  });

  get formControlTitle(): FormControl { return this.objectiveForm.controls['titleControl']; }
  get formControlDescription(): FormControl { return this.objectiveForm.controls['descriptionControl']; }
  get formControlDate(): FormControl { return this.objectiveForm.controls['doByDateControl']; }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.modalTitle = "Edit Objective";
    }
    this.formControlTitle.setValue(this.data?.title);
    this.formControlDescription.setValue(this.data?.description);
    this.formControlDate.setValue(this.data?.completeByDate?.toString());
  }

  titleErrorMessage() {
    if (this.formControlTitle.hasError('required')) {
      return 'You must enter a title';
    }
    return 'Maximum 50 characters, Minimum 1';
  }

  descriptionErrorMessage() {
    return 'Maximum 1000 characters';
  }

  dateErrorMessage() {
    if (this.formControlDate.hasError('required')) {
      return 'You must enter a date';
    }
    return;
  }

  submitObjective() {
    this.loaderShow = true;
    this.data.title = this.formControlTitle.value!;
    this.data.description = this.formControlDescription.value!;
    this.data.completeByDate = new Date(this.formControlDate.value!);

    this.objectiveService.AddOrEditObjective(this.data.id, this.data).subscribe({
      error: (e) => {
        this.loaderShow = false;
        this._snackBar.openFromComponent(SnackBarMessageComponent, {
          duration: 2500,
          data: e['error'],
        });
        this.dialogRef.close();
      },
      complete: () => {
        this.loaderShow = false;
        this.dialogRef.close();
      },
    });
  }

}

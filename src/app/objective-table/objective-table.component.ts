import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, debounceTime} from 'rxjs';
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Objective } from '../Model/Objective';
import { CommunicationServiceService } from '../Services/communication-service.service';
import { SnackBarMessageComponent } from '../snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-objective-table',
  templateUrl: './objective-table.component.html',
  styleUrls: ['./objective-table.component.css']
})

export class ObjectiveTableComponent implements OnInit {

  Objectives!: Array<Objective>;
  displayedColumns: string[] = ['Title', 'Complete_By_Date', 'Description', 'Actions'];
  showAddEditDialog: boolean = false;
  searchBox = new FormControl();
  previousString: string = "";
  loading: boolean = true;

  constructor(private objectiveService: CommunicationServiceService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadTable();
    this.searchBox.valueChanges.pipe(debounceTime(500)).subscribe(searchValue => {
      if (searchValue.trim().length && this.previousString != searchValue.trim() || searchValue === "") {
        this.loading = true;
        this.previousString = searchValue.trim();
        this.loadTable(searchValue.trim());
      }
    }
    );
  }

  completeObjective(id: number): void {
    this.loading = true;
    this.objectiveService.CompleteObjective(id).subscribe({
      error: (e) => {
        this._snackBar.openFromComponent(SnackBarMessageComponent, {
          duration: 2500,
          data: e['error'],
        });
        this.loadTable();
      },
      complete: () => { this.loadTable(); }
    });
  }

  openDeleteConfirmationModal(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: this.Objectives.find(e => e["id"] == id),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteObjective(id);
      }
    });
  }

  deleteObjective(id: number): void {
    this.loading = true;
    this.objectiveService.DeleteObjective(id).subscribe({
      error: (e) => {
        this._snackBar.openFromComponent(SnackBarMessageComponent, {
          duration: 2500,
          data: e['error'],
        });
        this.loadTable();
      },
      complete: () => { this.loadTable() }
    });
  }

  loadTable(searchValue?: string) {
    this.objectiveService.GetObjectives(searchValue).subscribe({
      error: (e) => {
        this._snackBar.openFromComponent(SnackBarMessageComponent, {
          duration: 2500,
          data: e['error'],
        });
        document.body.classList.remove('button-click-events');
      },
      next: (x) => { this.Objectives = x },
      complete: () => {
        this.loading = false;
        document.body.classList.remove('button-click-events');
      }
    });
  }

  openDialog(id?: number): void {
    const dialogRef = this.dialog.open(AddEditDialogComponent, {
      width: '400px',
      height: '450px',
      data: this.Objectives.find(e => e["id"] == id) ?? new Objective(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) { return; }
      this.loadTable();
    });
  }
}

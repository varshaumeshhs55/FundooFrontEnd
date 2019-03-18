import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HelperServiceService } from 'src/app/service/helper-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  
  public notes: Note[] = [];
  public grid = false;

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    private helperService:HelperServiceService,
    ) { }

  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>
      this.grid = resp
    );
  }

  getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.notes = newNote;
    }, error => {
      this.snackBar.open("error", "error to retrieve notes", { duration: 2000 });
    }
    )
  }

  // openDialog(note): void {
  //   const dialogRef = this.dialog.open(TrashdailogComponent, {
  //     width: '500px',
  //     data: note
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.getNotes();
  //     console.log('The dialog was closed');
  //   });
  // }

  deleteNote(note) {
    this.noteService.deleteNote(note.id).subscribe(response => {
      this.snackBar.open("deleted Note", "OK", { duration: 2000 });
      this.getNotes();
    }), error => {
      this.snackBar.open("error to delete notes", "error", { duration: 2000 });
    }
  }

  restore(note) {
    note.inTrash = 0;
    console.log(note);
    this.noteService.updateNote(note, note.id).subscribe(response => {
      console.log(response);
      this.snackBar.open("Restored", "Ok", { duration: 2000 });
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

}
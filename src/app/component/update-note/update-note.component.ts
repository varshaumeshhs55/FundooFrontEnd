import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  closeClick(newNote) {
    console.log(newNote.title);
    console.log(newNote.description);
    this.updateNote(newNote);
  }

  moveToTrash(note) {
    note.inTrash = 1;
    console.log(note);
    this.updateNote(note);
  }

  updateArchiveNote(key, data) {
    data.archive = key === 'archive' ? 1 : 0;
    data.pinned = 0;
    this.updateNote(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    this.updateNote(note);
  }

  updateNote(newNote) {
    this.noteService.updateNote(newNote, newNote.noteId).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
    },
      error => {
        console.log("error");
      })
  }

  // removeLabel(label, note) {
  //   this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
  //     console.log("deleting check in database");
  //     this.dialogRef.close();
  //   }, (error) => console.log(error));
  // }

//   addNoteLabel(data) {
//     this.updateNote(data.note);
// }

}

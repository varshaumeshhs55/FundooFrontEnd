import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';

@Component({
  selector: 'app-retrieve-note',
  templateUrl: './retrieve-note.component.html',
  styleUrls: ['./retrieve-note.component.scss']
})
export class RetrieveNoteComponent implements OnInit {

  @Input() notes
  @Output() updateNoteEvent = new EventEmitter();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;


  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    private dailog:MatDialog) { }

  ngOnInit() {
  }

  openDialog(note): void {
    const dialogRef = this.dailog.open(UpdateNoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note }
      this.updateNoteEvent.emit(data);
      console.log('The dialog was closed');
    });
  }

  // addNoteLabel(data) {
  //   this.updateNoteEvent.emit(data);
  // }

  moveToTrash(key, note) {
    note.inTrash = 1;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  updateArchiveNote(key, note) {
    note.archive = key === 'archive' ? true:false;
    console.log(note.archive);
    note.pinned = 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  // removeLabel(label, note) {
  //   this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
  //     console.log("deleting check in database");
  //     const data = { note };
  //     this.updateNoteEvent.emit(data);
  //   }, (error) => console.log(error));
  // }

//   dailogCollaborator(note)
//   {
//     const dialogRef = this.dialog.open(CollaboratorComponent, {
//       width: '500px',
//       data: note
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       const data = { note }
//       this.updateNoteEvent.emit(data);
//       console.log('The dialog was closed');
//     });
// }

  
}

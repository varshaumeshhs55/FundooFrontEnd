import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  selectedMoment=new Date();
  min=new Date();

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar,) { }


  closeClick(newNote) {
    this.updateNote(newNote);
  }

  moveToTrash(note) {
    note.inTrash = 1;
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
      this.dialogRef.close();
    },
      error => {
        console.log("error");
      })
      
  }
  public dailogCollaborator(note) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}
removeLabel(label, note) {
  this.noteService.removeLabelFromNote(note.noteId, label.labelId).subscribe(response => {
    this.dialogRef.close();
  }, (error) => console.log(error));
}

addNoteLabel(data) {
  this.updateNote(data.note);
}

saveRemainder(selectedMoment, data) {
  data.remainder = selectedMoment;
  this.updateNote(data);
}
updateColor(data) {
  this.updateNote(data.note);
}
 
}

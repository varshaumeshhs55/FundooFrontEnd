import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DomSanitizer } from '@angular/platform-browser';

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
  selectedFiles:File;
  showDelete=false;

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<UpdateNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note, private noteService: NoteService,
    private snackBar: MatSnackBar, private sanitizer:DomSanitizer) { }


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
 

public onFileChanged(event, note) {
  this.selectedFiles = event.target.files[0];
  this.uploadImage(note);
}

public uploadImage(note) {
  this.noteService.addImage(this.selectedFiles, note.noteId).subscribe((resp) => {
    console.log("image added")
    this.updateNote(note);
  }
  );
}

public getImages(image, note): any {
  const url = `data:${note.contentType};base64,${image.images}`;
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

public deleteImage(image,note)
{
  console.log(image.imagesId)
  this.noteService.removeImage(image.imagesId).subscribe((resp)=>
  {
    console.log("successfull")
    this.updateNote(note);
  })
}
}


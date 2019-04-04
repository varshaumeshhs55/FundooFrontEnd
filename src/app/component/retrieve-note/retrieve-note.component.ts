import { Component, OnInit, Input, EventEmitter, Output, Inject,  } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { MatDialog,  MatSnackBar, MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { UserService } from 'src/app/core/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Label } from 'src/app/core/models/label';

@Component({
  selector: 'app-retrieve-note',
  templateUrl: './retrieve-note.component.html',
  styleUrls: ['./retrieve-note.component.scss']
})
export class RetrieveNoteComponent implements OnInit {

  @Input() notes: Note[] = [];
  selectedMoment = new Date();
  public min = new Date();

  @Input() grid;
  @Output() updateNoteEvent = new EventEmitter();
  @Input() message;
 
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public newLabels: Label[] = [];
  selectedFiles: File;
imageSrc: any;

 

  constructor(private noteService: NoteService, private userService: UserService,
    private dailog: MatDialog, private snackBar: MatSnackBar, private sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  public openDialog(note): void {
    const dialogRef = this.dailog.open(UpdateNoteComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note }
      this.updateNoteEvent.emit(data);
    });
  }

  addNoteLabel(data) {
    this.updateNoteEvent.emit(data);
  }
  public dailogCollaborator(note) {
    const dialogRef = this.dailog.open(CollaboratorComponent, {
      width: '500px',
      data: note
    });
    dialogRef.afterClosed().subscribe(result => {
      const data = { note }
      this.updateNoteEvent.emit(data);
    });
  }
  moveToTrash(key, note) {
    note.inTrash = 1;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  updateArchiveNote(key, note) {
    note.archive = key === 'archive' ? 1 : 0;
    note.pinned = 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  pinned(key, note) {
    note.pinned = key === 'pinned' ? 1 : 0;
    const data = { key, note };
    this.updateNoteEvent.emit(data);
  }

  removeLabel(label, note) {
    this.noteService.removeLabelFromNote(note.id, label.labelId).subscribe(response => {
      const data = { note };
      this.updateNoteEvent.emit(data);
    }, (error) => console.log(error));
  }
  

  public onFileChanged(event, note) {
    this.selectedFiles = event.target.files[0];
    this.uploadImage(note);
  }

  public uploadImage(note) {
    this.noteService.addImage(this.selectedFiles, note.id).subscribe((resp) => {
      console.log("image added")
      const data = { note }
      this.updateNoteEvent.emit(data);
    }
    );
  }

  public getImages(image, note): any {
    const url = `data:${note.contentType};base64,${image.images}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}






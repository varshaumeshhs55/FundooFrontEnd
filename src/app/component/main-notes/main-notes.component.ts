import { Component, OnInit, OnChanges } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/models/note';
import { HelperServiceService } from 'src/app/service/helper-service.service';

@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.scss']
})
export class MainNotesComponent implements OnInit {
public grid=false;
  public notes: Note[] = [];
  constructor(private noteService: NoteService,
    private helperService:HelperServiceService) { }
   

  ngOnInit() {
    this.getNotes();
    this.helperService.getTheme().subscribe((resp) =>this.grid = resp);
  }
  getNotes() {
    this.noteService.retrieveNotes().subscribe(newNote => {
      this.notes = newNote;
      console.log(newNote)
    }
    )
  }

  public onUpdateNote(data) {
    this.updateMethod(data.note);
  }

  private updateMethod(note) {
    this.noteService.updateNote(note, note.id).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

}

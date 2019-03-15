import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-main-notes',
  templateUrl: './main-notes.component.html',
  styleUrls: ['./main-notes.component.scss']
})
export class MainNotesComponent implements OnInit {

  public notes: Note[] = [];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getNotes();
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

  updateMethod(note) {
    this.noteService.updateNote(note, note.id).subscribe(response => {
      this.getNotes();
    },
      error => {
        console.log("error");
      })
  }

}

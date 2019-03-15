import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/core/models/note';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

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

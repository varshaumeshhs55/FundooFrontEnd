import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  @Output() createNoteEvent= new EventEmitter();
  createNoteForm: FormGroup;
  submitted = false;
  public mytoken = localStorage.getItem('token');
  

  constructor(
    private formBuilder: FormBuilder,
     private noteService: NoteService, private snackBar: MatSnackBar
) { }

  ngOnInit() {
    this.createNoteForm= this.formBuilder.group({
      title: ['',Validators.required],
      discription: ['',Validators.required]
    });
  }
  get f() { return this.createNoteForm.controls; }

  onSubmit(note) {
    this.submitted = true;
    const {invalid, value: {title, discription}} = this.createNoteForm;
    if (invalid || !title && !discription) {
      return;
    }

    this.noteService.createNote(note).subscribe(response => {
      this.createNoteEvent.emit();
      this.snackBar.open("Note has been created successfully", "OK", {
        duration: 2000
      });
    })
    }
    archiveNoteSave(note) {
      const newNote = {
        ...note,
        archive: true
      }
      this.onSubmit(newNote);
  
    }
  
    updateColor(data)
    {
      this.noteService.createNote(data.note).subscribe(response => {
        this.createNoteEvent.emit();
        this.snackBar.open("Note has been created successfully", "OK", {
          duration: 2000
        });
      })
    }
    
    
      
    
      
    // pinned(notes) {
    //   notes.pinned=1;
    //   this.updateMethod(notes);
    // }
    
    // updateMethod(notes) {
    //   this.noteService.updateNote(notes, notes.id).subscribe(response => {
    //     console.log(response);
    //   },
    //     error => {
    //       console.log("error");
    //     })
    // }
    
}

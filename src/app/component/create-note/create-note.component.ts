import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttputilService } from 'src/app/core/services/httputil.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  @Output() eventEmitter= new EventEmitter();
  createNoteForm: FormGroup;
  submitted = false;
  public mytoken = localStorage.getItem('token');
  

  constructor(private NoteService: NoteService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private http: HttputilService, private userService: UserService, 
    private router: Router, private noteService: NoteService, private snackBar: MatSnackBar
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
    
    if (this.createNoteForm.invalid) {
      return;
    }
    if (this.createNoteForm.value.title === "" && this.createNoteForm.value.discription === "") {
      return;
    }
    // console.log(this.mytoken);
    console.log(note);
    this.noteService.createNote(note).subscribe(response => {
      this.eventEmitter.emit(true);
      this.snackBar.open("Note has been created successfully", "OK", {
        duration: 2000
      });
    })
    }
}

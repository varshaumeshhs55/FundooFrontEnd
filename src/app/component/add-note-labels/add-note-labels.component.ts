import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Label } from 'src/app/core/models/label';
import { NoteService } from 'src/app/core/services/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-note-labels',
  templateUrl: './add-note-labels.component.html',
  styleUrls: ['./add-note-labels.component.css']
})
export class AddNoteLabelsComponent implements OnInit {

  @Input() note
  @Output() eventAddNoteLabel = new EventEmitter();
  public labels: Label[] = [];
  public newLabels: Label[] = [];
  public filter = '';

  constructor(private noteService: NoteService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getLabels();
    // this.retriveLabels();
  }

  // public retriveLabels() {
  //   this.labels=this.helperService.getLabels();
  // }

  public onClickCheckbox(event, label, note) {
    event.stopPropagation();
    this.noteService.addLabelToNote(note.id, label).subscribe(response => {
      const data = { note };
      this.eventAddNoteLabel.emit(data);
    }, (error) => console.log(error));
  }

  public getLabels() {
    this.noteService.retriveLabels().subscribe(newLabel => {
      this.labels = newLabel;
    }, error => {
      this.snackBar.open("error", "error to retrieve labels", { duration: 2000 });
    }
    )
  }

  public labelFilter(event, noteLabels) {
    event.stopPropagation();
    this.newLabels.length = 0;
    var k = 0;
    for (var i = 0; i < this.labels.length; i++) {
      var present = 0;
      for (var j = 0; j < noteLabels.length; j++) {
        if (this.labels[i].labelId === noteLabels[j].labelId && present === 0) {
          present = 1;
        }
      }
      if (present === 0) {
        this.newLabels[k] = this.labels[i];
        k++;
      }
    }
  }

  public createNewLabel(filter, note) {
    const var1 = note.labelList.some((label) => label.labelName === filter)
    const var2 = this.newLabels.some((label) => label.labelName === filter)
    if (var1 || var2) {
      this.snackBar.open("label name already present", "error", { duration: 2000 });
      return;
    }
    const newLabel =
    {
      labelName: filter
    }
    this.noteService.createLabel(newLabel).subscribe(label => {
      this.noteService.addLabelToNote(note.id, label).subscribe(response => {
        var data = { note };
        this.eventAddNoteLabel.emit(data);
        this.snackBar.open("label created", "Ok", { duration: 2000 });
      })
    }, error => {
      this.snackBar.open("error", "error to create labels", { duration: 2000 });
    }
    )
  }

}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/core/models/note';

@Component({
  selector: 'app-changecolour',
  templateUrl: './changecolour.component.html',
  styleUrls: ['./changecolour.component.scss']
})
export class ChangecolourComponent {


  @Input() newNote: Note;
  @Output() colorChange = new EventEmitter();

  public colors = ['#FFE4C4', '#5F9EA0', '#00FFFF',
    '#ADFF2F', '#FF69B4', '#F08080', '#778899', '#4682B4', '#F8F8FF'];


  changeColor(color) {
    this.newNote.color = color;
    const note = this.newNote;
    const data = { note };
    this.colorChange.emit(data);


  }

}
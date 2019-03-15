import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EditLabelComponent } from '../edit-label/edit-label.component';
import { MatDialog } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { Label } from 'src/app/core/models/label';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('drawer') public drawer;
  @Input() public toggleSidebar: Subject<any>;
  public labels: Label[] = [];
  constructor(private router: Router,
    private dailog: MatDialog, private noteService: NoteService) { }

  ngOnInit() {
    this.toggleSidebar.subscribe(event => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
  }

  public navigateTo(path) {
    this.router.navigate([path]);
  }

  openDialog(): void {
    const dialogRef = this.dailog.open(EditLabelComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLabels();
      console.log('The dialog was closed');
    });
  }
  public getLabels() {
    this.noteService.retriveLabels().subscribe(label => {
      this.labels = label;
    }
    )
  }

}

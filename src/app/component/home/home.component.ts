import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public hide=true;
  public toggleNav: Subject<any> = new Subject();
  constructor() { }

  ngOnInit() {
  }


  public toggle() {
     this.toggleNav.next();
    console.log(this.toggleNav)
  }

}

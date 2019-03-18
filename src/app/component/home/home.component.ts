import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HelperServiceService } from 'src/app/service/helper-service.service';
import { Note } from 'src/app/core/models/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public grid = false;
  public hide = true;
  public user
  public dynamicBind: Note;
public searchString = '';
  public toggleNav: Subject<any> = new Subject();
  constructor(private helperService:HelperServiceService,private router: Router) { }


  ngOnInit() {
  }


  public toggle() {
    this.toggleNav.next();
    console.log(this.toggleNav)
  }

  public viewGrid() {
    this.grid = !this.grid;
    this.helperService.setTheme(this.grid);
  }
  public searchtest() {
    this.helperService.setSearch(this.searchString);
    this.router.navigate(['home/search'])
  }

  clearSearch() {
    this.searchString = '';
    this.router.navigate(['home/main-note'])
}
}

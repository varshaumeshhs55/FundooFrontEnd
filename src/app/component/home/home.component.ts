import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HelperServiceService } from 'src/app/service/helper-service.service';
import { Note } from 'src/app/core/models/note';
import { Router } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import { UserService } from 'src/app/core/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

interface ImageData {
  imageSrc: any;
}

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
  public imageData = <ImageData>{};
  constructor(private helperService: HelperServiceService, private router: Router, private userService: UserService, private sanitizer: DomSanitizer, private dialog: MatDialog) { }


  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.userService.downloadImage().subscribe(resp => {
      this.user = resp
      if (this.user.profilePicture != null) {
        const url = `data:${this.user.contentType};base64,${this.user.profilePicture}`;
        this.imageData = {
          imageSrc: this.sanitizer.bypassSecurityTrustUrl(url)
        }
      }
      else {
        this.imageData.imageSrc = null;
      }
    }, error => {
      this.refreshPage();
      // this.snackBar.open("error to download image", "error", { duration: 2000 });
    }
    )
  }

  refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  public logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }

  public toggle() {
    this.toggleNav.next();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageComponent, {
      width: '500px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getImage();
    });
  }

}

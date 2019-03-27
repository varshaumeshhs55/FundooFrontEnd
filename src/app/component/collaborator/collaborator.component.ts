import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/core/services/note.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  
  public user;
  public emailId = '';
  public imageData = <ImageData>{};
  public myControl = new FormControl();
  public users: User[] = [];
  public collabUsers: User[] = [];

  constructor(private userService: UserService, public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public note,
    private snackBar: MatSnackBar, private sanitizer: DomSanitizer,
    private noteService: NoteService) { }

  ngOnInit() {
    // this.getImage();
    this.getUsers();
    this.getCollaborateUser();
    this.getNoteOwner();
  }

  public getNoteOwner()
  {
    this.userService.getCollaborateUser(this.note.userId).subscribe(
      user => this.user=user);
  }
  public getUsers() {
    this.userService.getUsers().subscribe(({ body }) => {
      this.users = body;
      console.log(this.users)
    }
      , error => console.log("error"));
  }

  collaborate(emailId) {
    this.userService.verifyEmail(emailId).subscribe(user => {
      if(user.id===this.note.userId)
      {
        this.snackBar.open("you cannot add the owner", "error", { duration: 2000 });
        return;
      }
      this.snackBar.open("emailId verified", "ok", { duration: 2000 });
      this.noteService.createCollaborator(this.note.id, user.id).subscribe(resp => {
        this.dialogRef.close();
        this.snackBar.open("added to collaborator", "ok", { duration: 2000 })
      }
      )
    }, error => { this.snackBar.open("email not present or collaborator already present", "error", { duration: 2000 }) });

  }

  closeClick() {
    this.dialogRef.close();
  }

  
  getCollaborateUser() {
    // TODO: need to change
    for (let i = 0; i < this.note.collaborators.length; i++) {
      var k = 0;
      this.userService.getCollaborateUser(this.note.collaborators[i].userId).subscribe(
        user => {
          this.collabUsers[k] = user;
          k++;
        }
        , error => console.log(error))
    }
  }

  removeCollaborator(collabUser) {
    this.noteService.removeCollaborateUser(this.note.id, collabUser.id).subscribe(resp => {
      this.snackBar.open("collaborator removed", "ok", { duration: 2000 });
      this.dialogRef.close();
    }, error =>
        this.snackBar.open("collaborator connot be removed", "error", { duration: 2000 })
    )
  }

}
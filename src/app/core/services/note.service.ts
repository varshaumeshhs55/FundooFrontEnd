import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { MatSnackBar } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public token = localStorage.getItem('token');
  public httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    })
  };


  constructor(private http: HttputilService,
    public snackBar: MatSnackBar) { }


  createNote(notes): Observable<any> {
    return this.http.postWithBody(`${environment.note_url}createnote`, notes, this.httpheaders);
  }
  updateNote(notes, id) {
    return this.http.postWithUpdate(`${environment.note_url}updatenote/` + id, notes, this.httpheaders)
  }
  retrieveNotes(): Observable<any> {
    return this.http.getService(environment.note_url + 'retrievenote', this.httpheaders);
  }
  deleteNote(id) {
    return this.http.deleteForNoteDelete(environment.note_url + 'deletenote/' + id, this.httpheaders);  
  }

  retriveLabels(): Observable<any>
  {
    return this.http.getService(environment.note_url + 'retrievelabel' , this.httpheaders)
  }
}

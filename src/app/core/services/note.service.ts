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
  public token=localStorage.getItem('token');

  constructor(private http: HttputilService,
    public snackBar: MatSnackBar) { }
    getHeader() {
      var token = localStorage.getItem('token')
      const httpheaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      };
      return httpheaders;
}
createNote(notes): Observable<any> {
  var httpheaders=this.getHeader();
  return this.http.postWithBody(`${environment.note_url}createnote`,notes, httpheaders);
}
  }

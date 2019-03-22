import { Injectable } from '@angular/core';
import { HttputilService } from './httputil.service';
import { MatSnackBar } from '@angular/material';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http'; import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public token = localStorage.getItem('token');
  public httpheaders() {
    return {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token')
    })}
  }


  constructor(private http: HttputilService,
    public snackBar: MatSnackBar) { }


  createNote(notes): Observable<any> {
    return this.http.postWithBody(`${environment.note_url}createnote`, notes, this.httpheaders());
  }
  updateNote(notes, id) {
    return this.http.postWithUpdate(`${environment.note_url}updatenote/` + id, notes, this.httpheaders())
  }
  retrieveNotes(): Observable<any> {
    return this.http.getService(environment.note_url + 'retrievenote', this.httpheaders());
  }
  deleteNote(id) {
    return this.http.deleteForNoteDelete(environment.note_url + 'deletenote/' + id, this.httpheaders());
  }

  retriveLabels(): Observable<any> {
    return this.http.getService(environment.note_url + 'retrievelabel', this.httpheaders())
  }
  createLabel(label): Observable<any> {
    return this.http.postForLabelCreate(environment.note_url + 'createlabel', label, this.httpheaders());
  }
  updateLabel(label, id): Observable<any> {
    return this.http.putForLabelUpdate(environment.note_url + 'updatelabel/' + id, label, this.httpheaders());
  }
  deleteLabel(id): Observable<any> {
    return this.http.deleteForLabelDelete(environment.note_url + 'deletelabel/' + id, this.httpheaders());
  }

  removeLabelFromNote(noteId, labelId): Observable<any> {
    return this.http.deleteForRemoveLabelFromNote(`${environment.note_url}removenotelabel/`, {
      params: {
        noteId: noteId,
        labelId: labelId,
      },
      observe: 'response'
    }
    )
  }

  addLabelToNote(noteId, label): Observable<any> {
    return this.http.addForAddLabelFromNote(`${environment.note_url}addnotelabel/` + noteId, label
    )
  }

  createCollaborator(noteId, userId) {
    return this.http.postForCollaborator(`${environment.note_url}createcollaborator/` + noteId + '/' + userId, this.httpheaders()
    )
  }

  removeCollaborateUser(noteId, userId) {
    return this.http.removeCollaborateUser(`${environment.note_url}removecollaborator/` + userId + '/' + noteId);


  }
}

import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttputilService {

  constructor(private http: HttpClient) { }


  postService(url, object): any {
    return this.http.post<any>(url, object, { observe: "response" });
  }


  putService(url, object, Headers) {
    return this.http.put<any>(url, object, Headers);
  }

  getService(url, headers) {
    return this.http.get<any>(url, headers);
  }

  deleteService(url, Headers) {
    return this.http.delete<any>(url, Headers);
  }
  postWithBody(url,object,header){
    return this.http.post<any>(url,object,header);
  }

  postWithUpdate(url,object,header){
    return this.http.post<any>(url,object,header);
  }
  
  labelUpdateService(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  deleteForNoteDelete(url,header){
    return this.http.delete<any>(url,header);
  }

  putForLabelUpdate(url,object,header){
    return this.http.put<any>(url,object,header);
  }

  deleteForLabelDelete(url,header){
    return this.http.delete<any>(url,header);
  }

  postForLabelCreate(url,object,header){
    return this.http.post<any>(url,object,header);
  }

  deleteForRemoveLabelFromNote(url,header){
    return this.http.delete<any>(url,header);
  }

  addForAddLabelFromNote(url,object){
    return this.http.put<any>(url,object,{observe : 'response'});
  }

  postToUploadImage(url,object,header){
    return this.http.post<any>(url,object,header);
  }

getUserEmail(url,header)
{
  return this.http.get<any>(url,header);
}

postForCollaborator(url,header)
{
  return this.http.post<any>(url,{},header);
}

getCollaborateUser(url)
{
  return this.http.get<any>(url,{});
}

removeCollaborateUser(url)
{
  return this.http.delete<any>(url,{});
}
postForAddImage(url,param,header)
{
  return this.http.post<any>(url,param,header);
}

removeImage(url)
{
  return this.http.delete<any>(url,{});
}
}




  
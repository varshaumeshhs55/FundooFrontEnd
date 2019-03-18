import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Label } from '../core/models/label';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  public theme$: Subject<any> = new Subject();
  public search$: Subject<any> = new Subject();

  constructor() { }

  public setTheme(themeChanged: boolean) {
    this.theme$.next(themeChanged);
  }

  public getTheme() {
    return this.theme$;
  }
  
  public setSearch(search: string) {
    this.search$.next(search);
  }

  public getSearch() {
    return this.search$;
  }
}

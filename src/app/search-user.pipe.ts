import { Pipe, PipeTransform } from '@angular/core';
import { User } from './core/models/user';

@Pipe({
  name: 'searchuser'
})
export class SearchuserPipe implements PipeTransform {

  transform(users: User[], searchValue: any): any {
    console.log(users, searchValue);
    if (!searchValue || !users.length) {
      return null;
    }
    else {
      return users.filter(({ emailId }) => {
        return emailId.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
}
}

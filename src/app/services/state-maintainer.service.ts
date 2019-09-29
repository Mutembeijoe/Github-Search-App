import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateMaintainerService {
  username;
  $subject = new Subject();
  constructor() { }

  updateCurrentUsername(updatedUsername) {
    this.username = updatedUsername;
    this.$subject.next(this.username);
  }

}

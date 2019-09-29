import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

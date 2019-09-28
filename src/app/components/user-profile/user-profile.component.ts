import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user;
  username;
  constructor(private github: GithubService) {
    this.username = history.state.data ? history.state.data.username : 'Mutembeijoe';
    console.log(history.state.data);
   }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    }

}

import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit {
  followers;
  username;
  constructor(private github: GithubService) {
    this.username = history.state.data ? history.state.data.username : 'Mutembeijoe';
    console.log(history.state.data);
  }

  ngOnInit() {
    this.github.getUserFollowers(this.username)
    .subscribe(followers => {
      this.followers = followers;
      // console.log(this.followers);
    });
  }

}

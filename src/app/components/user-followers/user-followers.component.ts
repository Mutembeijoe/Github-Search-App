import { StateMaintainerService } from './../../services/state-maintainer.service';
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
  constructor(private github: GithubService, private state: StateMaintainerService) {
    this.username = this.state.username;
  }

  ngOnInit() {
    this.getFollowers();
    this.state.$subject
    .subscribe((username: string) => {
      this.username = username;
      console.log(this.username);
      this.getFollowers();
    });
  }
  getFollowers() {
    this.github.getUserFollowers(this.username)
    .then(followers => {
      this.followers = followers;
      console.log(this.followers);
    });
  }

}

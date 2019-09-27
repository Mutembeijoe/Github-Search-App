import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit {
  followers;
  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getFollowers()
    .subscribe(followers => {
      this.followers = followers;
      console.log(this.followers);
    });
  }

}

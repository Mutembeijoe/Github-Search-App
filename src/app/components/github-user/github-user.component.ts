import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit {
  user;
  username = 'Mutembeijoe';
  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

}

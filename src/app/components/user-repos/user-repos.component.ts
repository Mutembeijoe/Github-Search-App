import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {
  repos;
  username;
  constructor(private github: GithubService) {
    this.username = history.state.data ? history.state.data.username : 'Mutembeijoe';
    console.log(history.state.data);
  }

  ngOnInit() {
    this.github.getRepos(this.username)
    .subscribe(repos => {
      this.repos = repos;
      // console.log(repos[0]);
    });
  }

}

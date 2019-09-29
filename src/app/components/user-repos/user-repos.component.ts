import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';
import { Repo } from 'src/app/models/repo';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {
  repos: Repo[];
  username;
  constructor(private github: GithubService) {
    this.username = history.state.data ? history.state.data.username : 'Mutembeijoe';
  }

  ngOnInit() {
    this.github.getUserRepos(this.username)
    .subscribe((repos: Repo[]) => {
      this.repos = repos;
    });
  }

}

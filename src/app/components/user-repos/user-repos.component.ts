import { StateMaintainerService } from './../../services/state-maintainer.service';
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
  constructor(private github: GithubService, private state: StateMaintainerService) {
    this.username = this.state.username;
  }

  ngOnInit() {
    this.getRepos();
    this.state.$subject
    .subscribe((username: string) => {
      this.username = username;
      this.getRepos();
    });
  }

  getRepos() {
    this.github.getUserRepos(this.username)
    .then((repos: Repo[]) => {
      this.repos = repos;
    });
  }
}

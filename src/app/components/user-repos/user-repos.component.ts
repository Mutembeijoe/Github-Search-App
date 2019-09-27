import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {
  repos;
  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getRepos()
    .subscribe(repos => {
      this.repos = repos;
      console.log(repos[0]);
    });
  }

}

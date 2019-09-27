import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent implements OnInit {

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getRepos()
    .subscribe(repos => {
      console.log(repos);
    });
  }

}

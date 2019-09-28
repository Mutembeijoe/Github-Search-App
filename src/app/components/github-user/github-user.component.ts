import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit {
  username = 'Mutembeijoe';
  user;
  repos: any[] = [];
  searchType = 'user';
  constructor(private github: GithubService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => this.user = user);
  }

  newQuery(value) {
    if (this.searchType === 'user'){
      this.username = value;
      this.github.getUser(this.username)
      .subscribe(user => {
        console.log(user);
        this.router.navigate(['home']);
        this.user = user;
      });
    } else {
      this.github.getRepository(value)
      .subscribe(repo => {
        this.repos.push(repo);
      });
      console.log(this.repos);
      this.user = undefined;
    }
  }
}

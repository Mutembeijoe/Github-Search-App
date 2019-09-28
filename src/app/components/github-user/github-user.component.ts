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
  constructor(private github: GithubService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => this.user = user);
  }

  newQuery(value) {
    this.username = value;
    this.github.getUser(this.username)
    .subscribe(user => {
      this.router.navigate(['home']);
      this.user = user;
    });
  }
}

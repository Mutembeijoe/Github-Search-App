import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username = 'Mutembeijoe';
  user;
  constructor(private github: GithubService) { }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    }

}

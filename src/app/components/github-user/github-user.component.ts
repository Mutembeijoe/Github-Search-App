import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit, AfterViewInit {
  @ViewChild('query', {static: false})input: ElementRef;
  username = 'Mutembeijoe';
  user;
  repos: any[] = [];
  searchType = 'user';
  constructor(private github: GithubService, private router: Router) { }

  ngOnInit() {
    this.github.getUser(this.username)
    .subscribe(user => this.user = user);
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      pluck('target', 'value'),
      filter((searchTerm: string) => searchTerm.length > 0 ),
      debounceTime(500),
      distinctUntilChanged()

    ).subscribe(searchTerm => {
      this.newQuery(searchTerm);
    });
  }

  newQuery(value) {
    if (this.searchType === 'user') {
      this.username = value;
      this.github.getUser(this.username)
      .subscribe(user => {
        this.user = user;
        this.router.navigate(['home']);
      });
    } else {
      this.repos = [];
      this.username = value;
      this.github.getRepository(value)
      .subscribe(repo => {
        this.repos.push(repo);
      });
      this.user = undefined;
    }
  }
}

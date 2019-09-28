import { AppError } from './../../models/app-error';
import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, filter } from 'rxjs/operators';
import { NotFoundError } from 'src/app/models/not-found-error';

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
    .subscribe(user => this.user = user,
    (error: AppError) => {
      if (error instanceof NotFoundError) {
        console.log('404 not found');
      } else {
        console.log('An unexpeted error occured,try checking your internet connection');
      }
    });
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
    },
    (error: AppError) => {
      if (error instanceof NotFoundError) {
        console.log('404 not found');
      } else {
        console.log('An unexpeted error occured,try checking your internet connection');
      }
    });
  }

  newQuery(value) {
    if (this.searchType === 'user') {
      this.username = value;
      this.github.getUser(this.username)
      .subscribe(user => {
        this.user = user;
        this.router.navigate(['home']);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('404 not found');
        } else {
          console.log('An unexpeted error occured,try checking your internet connection');
        }
      });
    } else {
      this.repos = [];
      this.username = value;
      this.github.getRepository(value)
      .subscribe(repo => {
        this.repos.push(repo);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log('404 not found');
        } else {
          console.log('An unexpeted error occured,try checking your internet connection');
        }
      });
      this.user = undefined;
    }
  }
}

import { StateMaintainerService } from './../../services/state-maintainer.service';
import { User } from './../../models/user';
import { AppError } from './../../models/app-error';
import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, filter } from 'rxjs/operators';
import { NotFoundError } from 'src/app/models/not-found-error';
import { ToastrService } from 'ngx-toastr';
import { UnprocessableEntity } from 'src/app/models/unprocessable-entity';

@Component({
  selector: 'app-github-user',
  templateUrl: './github-user.component.html',
  styleUrls: ['./github-user.component.css']
})
export class GithubUserComponent implements OnInit, AfterViewInit {
  @ViewChild('query', {static: false})input: ElementRef;
  username = 'Mutembeijoe';
  user: User;
  repos: any[] = [];
  searchType = 'user';
  constructor(private github: GithubService, private router: Router, private toastr: ToastrService,
              private state: StateMaintainerService) { }

  ngOnInit() {
    this.state.updateCurrentUsername(this.username);
    // this.state.$subject.subscribe(data => console.log(data));
    this.github.getUser(this.username)
    .subscribe((user: User) => this.user = user,
    (error: AppError) => {
      if (error instanceof NotFoundError) {
        this.toastr.error('Not Found', '404');
      } else {
        this.toastr.error('An unexpeted error occured,try checking your internet connection');
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
    });
  }

  newQuery(value) {
    if (this.searchType === 'user') {
      this.username = value;
      this.state.updateCurrentUsername(this.username);
      this.github.getUser(this.username)
      .subscribe((user: User) => {
        this.user = user;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.toastr.error('Not Found', '404');
        } else {
          this.toastr.error('An unexpeted error occured,try checking your internet connection');
        }
      });
    } else {
      this.repos = [];
      this.username = value;
      this.state.updateCurrentUsername(this.username);
      this.github.getRepository(value)
      .subscribe(repo => {
        this.repos.push(repo);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.toastr.error('404 Not found', '404');
        } else if (error instanceof UnprocessableEntity) {
          this.toastr.info(`Missing field, Query cannot be blank`, '422');
        } else {
          this.toastr.error('An unexpeted error occured,try checking your internet connection');
        }
      });
      this.user = undefined;
    }
  }
}

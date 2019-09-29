import { NotFoundError } from './../models/not-found-error';
import { AppError } from './../models/app-error';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  apiKey = environment.github_Api_key;
  url = 'https://api.github.com/users';
  urlRepo =  'https://api.github.com/search/repositories?q=';


  constructor(private http: HttpClient) { }

  getUser(username) {
    return this.http.get(`${this.url}/${username}?access_token=${this.apiKey}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUserRepos(username) {
    return this.http.get(`${this.url}/${username}/repos?access_token=${this.apiKey}`)
    .pipe(
      catchError(this.handleError)
    );
  }
  getUserFollowers(username) {
    return this.http.get(`${this.url}/${username}/followers?access_token=${this.apiKey}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getRepository(repo) {
    return this.http.get(`${this.urlRepo}${repo}&sort=stars?access_token=${this.apiKey}`)
    .pipe(
      switchMap(data => from(data['items'])),
      take(10),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else {
      return throwError(new AppError(error));
    }
  }
}

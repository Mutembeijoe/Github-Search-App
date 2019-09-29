import { NotFoundError } from './../models/not-found-error';
import { AppError } from './../models/app-error';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { UnprocessableEntity } from '../models/unprocessable-entity';
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
    ).toPromise();
  }

  getUserRepos(username) {
    return this.http.get(`${this.url}/${username}/repos?access_token=${this.apiKey}`)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }
  getUserFollowers(username) {
    return this.http.get(`${this.url}/${username}/followers?access_token=${this.apiKey}`)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  getRepository(repo) {
    return this.http.get(`${this.urlRepo}${repo}&sort=stars?access_token=${this.apiKey}`)
    .pipe(
      switchMap(data => of(data['items'])),
      take(10),
      catchError(this.handleError)
    ).toPromise();
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 422) {
      return throwError(new UnprocessableEntity(error));
    } else {
      return throwError(new AppError(error));
    }
  }
}

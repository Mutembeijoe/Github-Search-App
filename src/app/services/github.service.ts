import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  apiKey = environment.github_Api_key;
  url = 'https://api.github.com/users';
  urlRepo =  'https://api.github.com/repositories';


  constructor(private http: HttpClient) { }

  getUser(username) {
    return this.http.get(`${this.url}/${username}?access_token=${this.apiKey}`);
  }

  getUserRepos(username) {
    return this.http.get(`${this.url}/${username}/repos?access_token=${this.apiKey}`);
  }
  getUserFollowers(username) {
    return this.http.get(`${this.url}/${username}/followers?access_token=${this.apiKey}`);
  }

  getRepository(repo) {
    return this.http.get(`https://api.github.com/search/repositories?q=${repo}&sort=stars?access_token=${this.apiKey}`)
    .pipe(
      switchMap(data => from(data['items'])),
      take(10)
    );
  }

}

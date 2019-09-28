import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, take, map, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  apiKey = '7166191a66db12b164d84ab1714e50c3eb3a221e';
  url = 'https://api.github.com/users';
  urlRepo =  'https://api.github.com/repositories';

  // headers = new HttpHeaders({
  //   Accept: 'application/vnd.github.v3.text-match+json'
  // });

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

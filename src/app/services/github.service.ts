import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  apiKey = '7166191a66db12b164d84ab1714e50c3eb3a221e';
  url = 'https://api.github.com/users';
  username = 'Mutembeijoe';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.url}/${this.username}?access_token=${this.apiKey}`);
  }

  setUsername(username) {
    this.username = username;
    return this.getUser();
  }

  getRepos() {
    return this.http.get(`${this.url}/${this.username}/repos?access_token=${this.apiKey}`);
  }

}

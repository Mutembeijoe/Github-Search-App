import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { GithubService } from './services/github.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { RepoCardComponent } from './components/repo-card/repo-card.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubUserComponent,
    NotFoundPageComponent,
    UserReposComponent,
    UserFollowersComponent,
    RepoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    NgProgressModule,
    NgProgressHttpModule,
    FormsModule
  ],
  providers: [
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

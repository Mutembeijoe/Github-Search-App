import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { GithubService } from './services/github.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubUserComponent,
    NotFoundPageComponent,
    UserProfileComponent,
    UserReposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GithubService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

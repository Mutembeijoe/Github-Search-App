import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { UserReposComponent } from './components/user-repos/user-repos.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


const routes: Routes = [
  { path: 'home', component: GithubUserComponent, children: [
    { path: 'profile', component: UserProfileComponent },
    { path: 'repos', component: UserReposComponent },
    { path: 'followers', component: UserFollowersComponent},
    // { path: '', redirectTo: 'profile', pathMatch: 'full' }
  ] },
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

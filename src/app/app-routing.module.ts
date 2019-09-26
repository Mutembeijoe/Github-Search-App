import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


const routes: Routes = [
  { path: 'home', component: GithubUserComponent, children: [
    { path: 'profile', component: UserProfileComponent },
    { path: '', redirectTo: 'profile', pathMatch: 'full' }
  ] },
  { path: '', redirectTo: 'home' , pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

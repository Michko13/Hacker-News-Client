import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { TimeagoModule } from 'ngx-timeago';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoriesComponent } from './pages/stories/stories.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { AboutComponent } from './pages/about/about.component';
import { UserComponent } from './pages/user/user.component';
import { StoryComponent } from './components/story/story.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentComponent } from './components/comment/comment.component';

const routes: Routes = [
  { path: '', redirectTo: 'top', pathMatch: 'full' },
  { path: 'top', component: StoriesComponent },
  { path: 'best', component: StoriesComponent },
  { path: 'new', component: StoriesComponent },
  { path: 'ask', component: StoriesComponent },
  { path: 'show', component: StoriesComponent },
  { path: 'jobs', component: StoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'user/:id/submissions', component: StoriesComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: '**', redirectTo: 'top', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StoriesComponent,
    AboutComponent,
    UserComponent,
    StoryComponent,
    CommentsComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

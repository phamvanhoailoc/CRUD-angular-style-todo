import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './posts/components/home/home.component';
import { DetailComponent } from './posts/components/detail/detail.component';
import { FormsComponent } from './posts/components/forms/forms.component';

const routes: Routes = [
  {path:'',redirectTo: 'posts' , pathMatch:'full'},
  {
    path:'posts',
            children: [
              { path: '', redirectTo: 'home', pathMatch: 'full' },
              { path: 'home', component: HomeComponent },
              { path: 'detail/:id', component: DetailComponent },
              { path: 'edit/:id', component: FormsComponent },
              { path: 'create', component: FormsComponent },
            ]
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

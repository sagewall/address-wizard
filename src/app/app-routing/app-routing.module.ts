import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailErrorComponent } from '../detail-error/detail-error.component';
import { DetailResolverService } from '../detail-resolver.service';
import { DetailComponent } from '../detail/detail.component';
import { HomeComponent } from '../home/home.component';

const ROUTES = [
  {
    path: 'address',
    children: [
      { path: 'error', component: DetailErrorComponent },
      { path: ':adno', component: DetailComponent, resolve: { address: DetailResolverService } },
      { path: '', redirectTo: 'error', pathMatch: 'full' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ]
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    DetailResolverService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

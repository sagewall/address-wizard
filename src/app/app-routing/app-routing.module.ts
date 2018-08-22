import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailResolverService } from '../detail-resolver.service';
import { DetailComponent } from '../detail/detail.component';
import { SearchComponent } from '../search/search.component';

const ROUTES = [
  {
    path: 'address',
    children: [
      { path: 'search', component: SearchComponent },
      { path: ':adno', component: DetailComponent, resolve: { address: DetailResolverService } },
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: '**', redirectTo: 'search', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'address', pathMatch: 'full' },
  { path: '**', redirectTo: 'address', pathMatch: 'full' }
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

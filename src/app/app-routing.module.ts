import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const sharedConfig = {
  data: {
    trackingArea: 'some-feature',
    product: 'some-feature'
  }
};

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, ...sharedConfig },
  { path: '**', component: NotFoundComponent, ...sharedConfig }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

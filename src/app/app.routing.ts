import { CffGraphsComponent } from './cff-graphs/cff-graphs.component';
import { SummaryComponent } from './summary/summary.component';
import { HomeComponent } from './home/home.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailsComponent } from './details/details.component';

const appRouter: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'details', component: DetailsComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'cff-graphs', component: CffGraphsComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRouter)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

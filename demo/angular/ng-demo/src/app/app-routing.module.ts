import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ClientComponent} from './client/client.component';
import {AccountListComponent} from './account-list/account-list.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'account', component: AccountListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

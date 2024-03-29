import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyUserComponent } from './verify-user.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyUserRoutingModule { }

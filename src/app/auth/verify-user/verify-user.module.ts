import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyUserRoutingModule } from './verify-user-routing.module';
import { VerifyUserComponent } from './verify-user.component';

@NgModule({
  declarations: [VerifyUserComponent],
  imports: [
    CommonModule,
    VerifyUserRoutingModule
  ]
})
export class VerifyUserModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerRegistrationComponent } from './pages/dealer-registration/dealer-registration.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [{
    path: '',
    component: DealerRegistrationComponent,
},
{
    path: 'verify',
    component: VerifyComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

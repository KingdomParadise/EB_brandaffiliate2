import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerRegistrationComponent } from './pages/dealer-registration/dealer-registration.component';
import { ReviewDealerComponent } from './pages/review-dealer/review-dealer.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [{
    path: '',
    component: DealerRegistrationComponent,
},
{
    path: 'verify',
    component: VerifyComponent,
},
{
  path: 'review',
  component: ReviewDealerComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerCompleteProfileComponent } from './pages/dealer-complete-profile/dealer-complete-profile.component';
import { DealerPackageComponent } from './pages/dealer-package/dealer-package.component';
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
},
{
  path: 'complete-profile',
  component: DealerCompleteProfileComponent,
},
{
  path: 'dealer-package',
  component: DealerPackageComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

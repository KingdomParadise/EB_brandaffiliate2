import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DealerCompleteProfileComponent } from './pages/dealer-complete-profile/dealer-complete-profile.component';
import { DealerForgetPasswordComponent } from './pages/dealer-forget-password/dealer-forget-password.component';
import { DealerLoginComponent } from './pages/dealer-login/dealer-login.component';
import { DealerPackageComponent } from './pages/dealer-package/dealer-package.component';
import { DealerRegistrationComponent } from './pages/dealer-registration/dealer-registration.component';
import { ReviewDealerComponent } from './pages/review-dealer/review-dealer.component';
import { VerifyComponent } from './pages/verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent
    }]
  },
  {
    path: 'register',
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
  },
  {
    path: 'dealer-login',
    component: DealerLoginComponent,
  },
  {
    path: 'dealer-forgot-password',
    component: DealerForgetPasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

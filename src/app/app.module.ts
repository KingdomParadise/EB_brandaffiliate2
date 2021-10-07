import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { DealerRegistrationComponent } from './pages/dealer-registration/dealer-registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReviewDealerComponent } from './pages/review-dealer/review-dealer.component';
import { DealerCompleteProfileComponent } from './pages/dealer-complete-profile/dealer-complete-profile.component';
import { DealerPackageComponent } from './pages/dealer-package/dealer-package.component';
import { DealerLoginComponent } from './pages/dealer-login/dealer-login.component';
import { DealerForgetPasswordComponent } from './pages/dealer-forget-password/dealer-forget-password.component';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultModule } from './layouts/default/default.module';
import { NgbAlertModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './services/tokenInterceptor';
import { SettingsComponent } from './pages/settings/settings.component';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from './pages/settings/change-password-modal/change-password-modal.component';
import { AffiliatesComponent } from './pages/affiliates/affiliates.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    VerifyComponent,
    DealerRegistrationComponent,
    ReviewDealerComponent,
    DealerCompleteProfileComponent,
    DealerPackageComponent,
    DealerLoginComponent,
    DealerForgetPasswordComponent,
    SettingsComponent,
    ChangePasswordModalComponent,
    AffiliatesComponent,
    //DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgSelectModule,
    MatTabsModule,
    DefaultModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    NgbAlertModule,
    NgbDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhWahf8oOXf9UyFu8W_iCE8HChcbgOVbQ',
      libraries: ['places']
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

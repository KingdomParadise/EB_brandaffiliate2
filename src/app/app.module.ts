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
import { MatMenuModule } from '@angular/material/menu';
import { SendMessageModalComponent } from './pages/affiliates/send-message-modal/send-message-modal.component';
import { AddAffiliatesModalComponent } from './pages/affiliates/add-affiliates-modal/add-affiliates-modal.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PackagesComponent } from './pages/packages/packages.component';
import { CardModalComponent } from './pages/packages/card-modal/card-modal.component';
import { AddModalComponent } from './pages/packages/add-modal/add-modal.component';
import { SelectPackageModalComponent } from './pages/select-package-modal/select-package-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUserModalComponent } from './pages/users/add-user-modal/add-user-modal.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { AddBannerModalComponent } from './pages/promotions/add-banner-modal/add-banner-modal.component';
import { AddCampaignModalComponent } from './pages/promotions/add-campaign-modal/add-campaign-modal.component';
import { CreditCardDirective } from './helper/card.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { SupportModalComponent } from './pages/support-modal/support-modal.component';
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
    SendMessageModalComponent,
    AddAffiliatesModalComponent,
    ContactUsComponent,
    PackagesComponent,
    CardModalComponent,
    AddModalComponent,
    SelectPackageModalComponent,
    UsersComponent,
    AddUserModalComponent,
    PromotionsComponent,
    AddBannerModalComponent,
    AddCampaignModalComponent,
    CreditCardDirective,
    SupportModalComponent
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
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgbAlertModule,
    NgbDropdownModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_XQ9GC0XunCHAghiL_tByZ87TBL0jaY0',
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class InitialDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIndustries(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/dealer/getAllIndustry')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/dealer/getCountryCode')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getStates(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/dealer/getStates/countryId/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  registerDealer(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/registerDealer', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  verifyDealerRegOtp(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/verifyDealerRegOtp', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  dealerLogin(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/dealerLogin', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateDealerPassword(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateDealerPassword', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateDealerSocialInfo(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateDealerSocialInfo', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  updateDealerSettings(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateDealerSettings', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // ---------------affiliates code starts-------------- //
  getAllAffiliate(data: any, page: any, size: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/getAllCustomer/page/' + page + '/size/' + size, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addAffiliate(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/addCustomer', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  updateAffiliate(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateCustomer', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteAffiliate(data: any) {
    console.log(data);
    return this.http.post<any>(this.apiUrl + '/dealer/deleteCustomer', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteCustomerList(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/deleteCustomerList', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  sendCustomerMessage(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/sendCustomerMessage', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  contactUs(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/contactUs', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // ---------------affiliates code ends-------------- //
  packageDetails() {
    return this.http.post<any>(this.apiUrl + '/dealer/packageDetails', {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  purchaseContent(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/purchaseContent', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  purchasePackage(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/purchasePackage', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // users apis ----- //

  getAllUser(data: any, page: any, size: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/getAllUser/page/' + page + '/size/' + size, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addUser(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/addUser', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  updateUser(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateUser', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  disableUser(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/disableUser', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  enableUser(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/enableUser', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteUser(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/deleteUser', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteUserList(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/deleteUserList', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // ---------------promotions code starts-------------- //
  addBanner(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/addBanner', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  updateBanner(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateBanner', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  enableBanner(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/enableBanner', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  disableBanner(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/disableBanner', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getAllBanner(data: any, page: any, size: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/getAllBanner/page/' + page + '/size/' + size, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteBanner(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/deleteBanner', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  addCampaign(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/addCampaign', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  updateCampaign(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/updateCampaign', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  enableCampaign(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/enableCampaign', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  disableCampaign(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/disableCampaign', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  deleteCampaign(data: any) {
    return this.http.post<any>(this.apiUrl + '/dealer/deleteCampaign', data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  getAllCampaign(data: any, page: any, size: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/getAllCampaign/page/' + page + '/size/' + size, data)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  // ---------------promotions code ends-------------- //
  getDealerNotification() {
    return this.http.post<any>(this.apiUrl + '/dealer/getDealerNotification', {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  markDealerNotificationRead() {
    return this.http.post<any>(this.apiUrl + '/dealer/markDealerNotificationRead', {})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
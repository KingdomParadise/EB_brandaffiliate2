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
  getAllAffiliate(data: any, page:any ,size:any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/dealer/getAllCustomer/page/'+page+'/size/'+size, data)
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
  packageDetails(){
    return this.http.post<any>(this.apiUrl + '/dealer/packageDetails', {})
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
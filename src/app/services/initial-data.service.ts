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

  updateDealerSocialInfo(data: any){
    return this.http.post<any>(this.apiUrl + '/dealer/updateDealerSocialInfo', data)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  updateDealerSettings(data: any){
    return this.http.post<any>(this.apiUrl + '/dealer/updateDealerSettings', data)
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
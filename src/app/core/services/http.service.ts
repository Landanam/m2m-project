import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);
  private logger = inject(LoggerService);

  get<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get<T>(url, { ...this.getHttpOptions(), params })
      .pipe(catchError(this.handleError<T>('GET', url)));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(url, body, this.getHttpOptions())
      .pipe(catchError(this.handleError<T>('POST', url)));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(url, body, this.getHttpOptions())
      .pipe(catchError(this.handleError<T>('PUT', url)));
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http
      .patch<T>(url, body, this.getHttpOptions())
      .pipe(catchError(this.handleError<T>('PATCH', url)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url, this.getHttpOptions())
      .pipe(catchError(this.handleError<T>('DELETE', url)));
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  private handleError<T>(operation: string, url: string) {
    return (error: unknown): Observable<T> => {
      this.logger.error(`${operation} failed for ${url}`, error);
      throw error;
    };
  }
}

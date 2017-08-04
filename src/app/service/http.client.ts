import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpClient {
  public apiUrl = '';
  protected stopIteration = 3;
  protected countIteration = 0;

  static handle(res: any) {
    if (res instanceof Response) {
      return res.json();
    }
    return res;
  }

  constructor(
    private http: Http,
    protected router: Router
  ) {
  }

  /**
   * Get request
   *
   * @param route
   * @param search
   * @returns {Observable}
   */
  get(route: string, search?: any): Observable<any> {
    const params = new URLSearchParams();
    if (search) {
      for (const param in search) {
        if (search.hasOwnProperty(param) && param) {
          params.set(param, search[param]);
        }
      }
    }

    return this.handleCatch(this.http.get(
      this.apiUrl + route,
      new RequestOptions({
        headers: this.getHeaders(),
        search: params.toString()
      })
    ), () => {
      return this.get(route, search);
    });
  }

  /**
   * Send post request
   *
   * @param route
   * @param data
   * @param headers
   * @returns {Observable}
   */
  post(route: string, data?: any, headers?: any) {
    const headersObject = this.getHeaders();
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        headersObject.append(key, headers[key]);
      }
    }

    const params = new URLSearchParams();
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          params.set(key, data[key]);
        }
      }
    }

    return this.handleCatch(this.http.post(
      this.apiUrl + route, params.toString(), {headers: headersObject}
    ), () => {
      return this.http.post(
        this.apiUrl + route,
        JSON.stringify(data), {headers: headersObject}
      );
    });
  }


  protected handleCatch(stream$: Observable<any>, retry: Function): Observable<any> {
    return stream$.catch((err: any) => {
      // Avoid recursion problem by using counters and stops
      if ((err.status === 401 || err.status === 403) && this.countIteration < this.stopIteration) {}

      return this.formatError(err);
    })
      .map((param: any) => {
        this.countIteration = 0;
        return param;
      })
      .map(HttpClient.handle);
  }

  private formatError(error: any | Response) {
    if (error instanceof Response) {
      return Observable.throw(error.json());
    }
    return Observable.throw(error);
  }

  /**
   * Get request headers
   */
  public getHeaders(): Headers {
    let headers: Headers;
    headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    return headers;
  }
}

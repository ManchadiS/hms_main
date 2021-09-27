import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor(public http: HttpClient) { }

  headers() {
    const httpOptions = new HttpHeaders({});
    return httpOptions;
  }

  public basePathUrl(){
    return 'http://localhost:8000/'
  }

  public postRequest(url, data) {
    return this.http.post(url, data, { headers: this.headers() })
  }
}

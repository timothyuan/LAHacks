import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {  }

  classify(values: any[]): Observable<any> {
    let data = {
      values: values
    }
    return this.http.post<string>('http://localhost:3000/classify', data, httpOptions);
  }

  uploadImg(file: File) Observable<any> {
    let uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post<string>('http://localhost:3000/upload', uploadData);
  }
}

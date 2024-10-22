import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private http: HttpClient) {}

    requestHost() {
        return this.http.get<{ message: string }>('http://localhost:3000/');
    }

    requestDownload() {
        return this.http.get<{ module: string }>('http://localhost:3000/download');
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { R } from './entity/R';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private http: HttpClient) {}

    requestHost() {
        return this.http.get<{ message: string }>('http://localhost:3000/');
    }

    requestDownload(fileName: string) {
        const url = `http://localhost:3000/download/video/${fileName}`;
        return this.http.get<R>(url);
    }
}

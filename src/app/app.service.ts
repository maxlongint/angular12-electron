import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { R } from './entity/R';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private http: HttpClient) {}

    requestHost(host: string) {
        return this.http.get<R>(`http://localhost:3000/network/${host}`);
    }

    requestDownload(fileName: string) {
        const url = `http://localhost:3000/download/video/${fileName}`;
        return this.http.get<R>(url);
    }
}

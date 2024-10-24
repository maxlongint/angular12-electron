import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

@Injectable()
export class HostInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({
            url: `${AppConfig.env.host}/${request.url}`,
        });
        return next.handle(request);
    }
}

export function providerHost() {
    return { provide: HTTP_INTERCEPTORS, useClass: HostInterceptor, multi: true };
}

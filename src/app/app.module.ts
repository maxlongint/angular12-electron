import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { providerAppConfig } from './app.config';
import { providerHost } from './interceptors/host.interceptor';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
    providers: [providerAppConfig(), providerHost()],
    bootstrap: [AppComponent],
})
export class AppModule {}

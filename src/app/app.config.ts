// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';

import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Env } from './entity/Env';

@Injectable({
    providedIn: 'root',
})
export class AppConfig {
    static env: Env;
    static ipcRenderer: typeof ipcRenderer;
    constructor() {}

    onLoad() {
        AppConfig.ipcRenderer = window.require('electron').ipcRenderer;
        AppConfig.ipcRenderer.on('dotenv', (_event, value) => {
            AppConfig.env = value;
        });
    }
}

export function providerAppConfig() {
    return [
        AppConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: (appConfig: AppConfig) => () => appConfig.onLoad(),
            deps: [AppConfig],
            multi: true,
        },
    ];
}

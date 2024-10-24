import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { io } from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title?: string;
    videoPath?: string;

    socket = io('http://localhost:4210');
    progress?: number;

    constructor(private service: AppService) {}

    ngOnInit(): void {
        // 监听服务器发送的进度事件
        this.socket.on('progress', progress => {
            this.progress = progress;
        });
    }

    ngOnDestroy(): void {
        this.socket?.disconnect();
    }

    testNetwork() {
        this.service.requestHost('www.bing.com').subscribe(json => {
            this.title = json.msg;
        });
    }

    testDownFile() {
        this.progress = 0;
        this.service.requestDownload('1127.mp4').subscribe(json => {
            if (json.code === 0) {
                this.videoPath = 'http://localhost:4210/1127.mp4';
            }
        });
    }
}

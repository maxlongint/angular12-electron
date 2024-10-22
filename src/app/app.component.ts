import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title?: string;
    videoPath = 'http://localhost:3000/1127.mp4';
    constructor(private service: AppService) {}

    ngOnInit(): void {}

    testNetwork() {
        this.service.requestHost().subscribe(result => {
            this.title = result.message;
        });
    }

    testDownFile() {}
}

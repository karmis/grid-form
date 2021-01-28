import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertModalComponent} from './alert.modal.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AlertModalComponent
    ],
    exports: [
        AlertModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ]
})
export class AlertModalModule {
    entry: Type<AlertModalComponent>;

    constructor() {
        this.entry = AlertModalComponent;
    }
}

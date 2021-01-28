import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppProvider} from './providers/app.provider';
import {ModalModule} from './modules/modal';
import {ModalService} from './modules/modal/services/modal.service';
import {FormService} from './modules/form/services/form.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ModalModule,
        BrowserAnimationsModule
    ],
    providers: [
        AppProvider,
        ModalService,
        FormService,
        {provide: 'isInjected', useValue: false},
        {provide: 'data', useValue: {}}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FormComponent
    ],
    exports: [
        FormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ]
})
export class FormModule {
    entry: Type<FormComponent>;

    constructor() {
        this.entry = FormComponent;
    }
}

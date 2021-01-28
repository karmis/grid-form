import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditFormFormatterComponent} from './edit.form.formatter.component';
import {ModalModule} from '../../../modal';
import {FormComponent} from '../../../form/form.component';


@NgModule({
    declarations: [EditFormFormatterComponent],
    imports: [
        CommonModule,
        ModalModule
    ]
})
export class FormFormatterModule {
    entry: Type<EditFormFormatterComponent>;

    constructor() {
        this.entry = EditFormFormatterComponent;
    }
}

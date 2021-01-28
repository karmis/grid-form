import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteFormatterComponent} from "./delete.formatter.component";
import {ModalModule} from '../../../modal';
import {EditFormFormatterComponent} from '../edit.formatter/edit.form.formatter.component';


@NgModule({
    declarations: [DeleteFormatterComponent],
    imports: [
        CommonModule,
        ModalModule
    ]
})
export class DeleteFormatterModule {
    entry: Type<DeleteFormatterComponent>;

    constructor() {
        this.entry = DeleteFormatterComponent;
    }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid.component';
import {FormFormatterModule} from './formatters/edit.formatter';
import {ModalModule} from '../modal';
import {FormModule} from '../form';


@NgModule({
    declarations: [
        GridComponent
    ],
    exports: [
        GridComponent
    ],
    imports: [
        CommonModule,
        FormFormatterModule,
        ModalModule,
        FormModule,
        // NewGridFormModule
    ]
})
export class GridModule {
}

import {ChangeDetectionStrategy, Component, Injector, OnDestroy} from '@angular/core';
import {InterfaceFormatter} from '../interface.formatter';
import {CommonFormatter} from '../common.formatter';
import {ModalService} from '../../../modal/services/modal.service';
import {ModalEventType} from '../../../modal/types/types';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-edit-formatter',
    templateUrl: './tpls/delete.formatter.component.html',
    styleUrls: ['./styles/delete.formatter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteFormatterComponent extends CommonFormatter implements InterfaceFormatter {
    constructor(protected injector: Injector, private modalService: ModalService) {
        super(injector);
    }

    onClick() {
        this.modalService.alert({
            text: 'Are u really sure?'
        }, {
            size: 'sm',
            title: 'Warning',
            footer: 'no|yes'
        }, this.injectedData);
    }

}

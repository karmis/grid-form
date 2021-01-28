import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ModalAlertConfigType, ModalParamsType} from '../../types/types';

@Component({
    selector: 'app-form',
    templateUrl: './tpls/alert.component.html',
    styleUrls: ['./styles/alert.modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertModalComponent {
     alertConfig!: ModalAlertConfigType;

    constructor(@Inject('data')  params: ModalParamsType) {
        this.alertConfig = params.alertConfig as ModalAlertConfigType || {};
    }
}

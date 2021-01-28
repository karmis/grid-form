import {ChangeDetectionStrategy, Component, Injector} from '@angular/core';
import {InterfaceFormatter} from '../interface.formatter';
import {CommonFormatter} from '../common.formatter';
import {ModalService} from '../../../modal/services/modal.service';
import {ModalParamsType} from '../../../modal/types/types';
import {GridRouteList} from '../../grid.component';

@Component({
    selector: 'app-edit-formatter',
    templateUrl: './tpls/form.formatter.component.html',
    styleUrls: ['./styles/form.formatter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormFormatterComponent extends CommonFormatter implements InterfaceFormatter {
    constructor(protected injector: Injector, private modalService: ModalService) {
        super(injector);
    }

    onClick() {
        const title = 'Edit ' + this.injectedData.row['name'] + ' ' + this.injectedData.row['surname'];
        const opts: ModalParamsType = {
            modalConfig: {size: 'md', title: title, footer: null},
            data: this.injectedData,
            route: GridRouteList.form,
        };
        this.modalService.show(opts);
    }
}

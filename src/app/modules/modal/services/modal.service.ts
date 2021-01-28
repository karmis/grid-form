import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Route} from '@angular/router';
import {ModalAlertConfigType, ModalConfigType, ModalEventNameType, ModalEventType, ModalParamsType, ModalType} from '../types/types';
import {AppRoutesList} from '../../../views/types';

export const ModalRoutes: AppRoutesList = {
    alert: {
        loadChildren: () => import('src/app/modules/modal/modals/alert/index').then(m => m.AlertModalModule)
    }
};

@Injectable()
export class ModalService {
     isOpen: boolean = false;
    private _subject: Subject<ModalParamsType|false> = new Subject<ModalParamsType|false>();

    get subject(): Subject<any> {
        return this._subject;
    }

    private _params!: ModalParamsType;

    get params(): ModalParamsType {
        return this._params;
    }

    private _event: Subject<ModalEventType> = new Subject<ModalEventType>();

    get event(): Subject<ModalEventType> {
        return this._event;
    }

    show(opts: ModalParamsType): void {
        this._params = opts;
        if (ModalRoutes[opts.route as ModalType]) {
            this._params.route = ModalRoutes[opts.route as ModalType] as Route;
        }
        this._subject.next(opts);
    }

    alert(alertConfig: ModalAlertConfigType = {text: ''}, modalConfig: ModalConfigType = {}, data: any) {
        const opts: ModalParamsType = {
            alertConfig: alertConfig,
            modalConfig: modalConfig,
            data: data,
            route: 'alert'
        };
        this.show(opts);
    }

    close() {
        this._subject.next(false);
    }

    emitEvent(name: ModalEventNameType) {
        this.event.next({name: name as any, params: this.params});
    }
}

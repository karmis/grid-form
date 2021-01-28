import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {Route} from '@angular/router';
import {AppProvider} from '../../providers/app.provider';
import {ModalConfigType, ModalParamsType} from './types/types';
import {ModalService} from './services/modal.service';
import merge from 'lodash-es/merge';

@Component({
    selector: 'app-modal-module',
    templateUrl: './tpls/modal.component.html',
    styleUrls: ['./styles/modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
    @ViewChild('footerContainer', {
        read: ViewContainerRef,
        static: false
    }) modalFooterContainerRef!: ViewContainerRef;
    @ViewChild('body', {static: false}) body!: ElementRef;
    footerRef!: TemplateRef<any>;

    constructor(private appProvider: AppProvider,
                private vcRef: ViewContainerRef,
                private modalService: ModalService,
                private cdr: ChangeDetectorRef) {
        this.modalService.subject.subscribe((res: ModalParamsType) => {
            if (res) {
                if (!this.isOpen) {
                    this.config = res.modalConfig;
                    this.show(res.route as Route, res);
                }
            } else {
                this.close();
            }
        });
    }

    private _config: ModalConfigType = {
        size: 'md'
    };

    get config(): ModalConfigType {
        return this._config;
    }

    @Input() set config(config: ModalConfigType) {
        this._config = merge({}, this._config, config);
    }

    get service(): ModalService {
        return this.modalService;
    }

    private _isOpen: boolean = false;

    get isOpen(): boolean {
        return this._isOpen;
    }

    show(route: Route, data: any = {}) {
        this.appProvider.attachLazyComponentToView(route, this.body.nativeElement, this.vcRef, data)
            .then((compRef: ComponentRef<any>) => {
                // footer
                if (this.config.footerRef && compRef.instance[this.config.footerRef]) {
                    this.footerRef = compRef.instance[this.config.footerRef];
                }
                this._isOpen = true;
                this.cdr.markForCheck();
            });
    }

    close() {
        this._isOpen = false;
        this.cdr.markForCheck();
    }
}

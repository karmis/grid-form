import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {GridColumnType, GridFormConfigType, GridInjectedData} from '../grid/types/types';
import {FormConfigType} from './types/types';
import {NgForm} from '@angular/forms';
import {FormService} from './services/form.service';
import {ModalParamsType} from '../modal/types/types';
import {cloneDeep, merge} from 'lodash-es';

@Component({
    selector: 'app-form',
    templateUrl: './tpls/form.component.html',
    styleUrls: ['./styles/form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class FormComponent {
    @ViewChild('form', {static: false}) form!: NgForm;
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>(); // row as model
    @Output() onChange: EventEmitter<GridInjectedData> = new EventEmitter<GridInjectedData>(); // row as model
    model: any = {};

    constructor(@Inject('isInjected') private isInjected: boolean,
                @Inject('data') private params: ModalParamsType, private formService: FormService, public cdr: ChangeDetectorRef) {
        if (isInjected) {
            this._columns = this.sortColumnsByIndex(params.data.columns);
            this.model = params.data.row || {};
            this.config.type = 'modal';
            this.config.size = 'lg';
        }
    }

    private _row: any = {};

    get row(): any {
        return cloneDeep(this._row);
    }

    @Input() set row(row: any) {
        this._row = row;
    }

    _columns!: GridColumnType[];

    get columns(): GridColumnType[] {
        return this._columns;
    }

    @Input() set columns(columns: GridColumnType[]) {
        this._columns = this.sortColumnsByIndex(columns);
    }

    private _config: FormConfigType = {
        type: 'row',
        isNew: false,
        size: 'sm'

    };

    get config(): FormConfigType {
        return this._config;
    }

    @Input() set config(config: FormConfigType) {
        this._config = merge({}, this._config, config);
    }

    _onSubmit() {
        if (this.isInjected) {
            this.params.data.row = this.model;
            this.formService.onSubmit.emit(this.params.data);
            this.params.data = {} as GridInjectedData;
        } else {
            this.onSubmit.next(this.model);
        }
        this.model = {};
        this._onChange();
    }

    sortColumnsByIndex(columns: GridColumnType[]): GridColumnType[] {
        return columns.sort((a: GridColumnType, b: GridColumnType) => {
            const af: GridFormConfigType = a.form || {} as GridFormConfigType;
            const bf: GridFormConfigType = b.form || {} as GridFormConfigType;
            return af && af.index !== undefined && bf && bf.index !== undefined && af.index > bf.index ? 1 : af.index === bf.index ? 0 : -1;
        });
    }

    _onChange() {
        this.onChange.emit(this.model);
    }
}

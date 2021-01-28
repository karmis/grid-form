import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    QueryList,
    Type,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {GridColumnType, GridConfigType, GridInjectedData, GridTableConfigType} from './types/types';
import {AppProvider} from '../../providers/app.provider';
import {ModalComponent} from '../modal/modal.component';
import {FormComponent} from '../form/form.component';
import {AppRoutesList} from '../../views/types';
import {FormService} from '../form/services/form.service';
import {ModalService} from '../modal/services/modal.service';
import {ModalEventType} from '../modal/types/types';
import {animate, sequence, style, transition, trigger} from '@angular/animations';
import {cloneDeep, merge} from "lodash-es";

export const GridRouteList: AppRoutesList = {
    form: {
        loadChildren: () => import('src/app/modules/form/index').then(m => m.FormModule)
    }
};

@Component({
    selector: 'app-grid-module',
    templateUrl: './tpls/grid.component.html',
    styleUrls: ['./styles/grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('gridAnim', [
            transition(':leave', [
                style({height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
                sequence([
                    animate('.25s ease', style({height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'})),
                    animate('.1s ease', style({height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none'}))
                ])
            ]),
            transition(':enter', [
                style({height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none'}),
                sequence([
                    animate('.1s ease', style({height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'})),
                    animate('.35s ease', style({
                        height: '*',
                        opacity: 1,
                        transform: 'translateX(0)',
                        'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
                    }))
                ])
            ])
        ])
    ],
})
export class GridComponent implements AfterViewInit {
    @ViewChild('table', {static: false}) table!: ElementRef;
    @ViewChild('editFormModal', {static: true}) editFormModal!: ModalComponent;
    @ViewChild('deleteModal', {static: false}) deleteModal!: ModalComponent;
    @ViewChildren('form') forms!: QueryList<FormComponent>;
    @ViewChildren('table') tables!: QueryList<ElementRef>;
    context: GridComponent = this;
    selected!: GridInjectedData;
    count: any[] = [];
    animationGridState: boolean = false;
    // grid counter
    common: any = {
        count: [],
    };
    private _data: { [key: number]: any[] } = {};

    constructor(private appProvider: AppProvider,
                private cdr: ChangeDetectorRef,
                private formService: FormService,
                private modalService: ModalService) {

        // on submit from form
        this.formService.onSubmit.subscribe((data: GridInjectedData) => {
            this.editRow(data.row, data.tableId);
            this.modalService.close();
        });

        // on submit from modal form
        this.modalService.event.subscribe((res: ModalEventType) => {
            const params: GridInjectedData = res.params.data;
            if (res.name === 'yes') {
                this.removeRow(params.row[this.config.indexField], params.tableId);
            }
            this.modalService.close();
        });
    }

    private _config: GridConfigType = {
        indexField: '__index',
    };

    get config(): GridConfigType {
        return this._config;
    }

    @Input()
    set config(config: GridConfigType) {
        this._config = merge({}, this._config, config);
    }

    private _columns: GridColumnType[] = [];

    get columns(): GridColumnType[] {
        return this._columns;
    }

    @Input()
    set columns(data: GridColumnType[]) {
        this._columns = data;
    }

    getData(tableId: number): any[] {
        return this._data[tableId];
    }

    ngAfterViewInit(): void {
        this.addTable(true);
    }

    @Input()
    set data(data: any[]) {
        this.setData(data, 0);
    }

    setData(data: any[], tableId: number) {
        this._data[tableId] = cloneDeep(data).map((item: any, key: number) => {
            item[this.config.indexField] = key;
            return item;
        });
    }

    setFormattersForTable(tableId: number): void {
        this.animationGridState = true;
        this.cdr.detectChanges();
        setTimeout(() => {
            const table: ElementRef = this.tables.toArray()[tableId];
            if (!table) {
                return;
            }
            this.columns.forEach((column: GridColumnType, columnId: number) => {
                if (column.type !== 'plain') {
                    this.getData(tableId).forEach((row: any, rowId: number) => {
                        const selector = 't-' + tableId + '-c-' + columnId + '-r-' + rowId;
                        const element: HTMLElement = table.nativeElement.querySelector('#' + selector);
                        if (element) {
                            this.appProvider.attachComponentToView(
                                column.type as Type<any>,
                                element,
                                {
                                    column: column,
                                    columns: this.columns,
                                    row: row,
                                    cell: row[column.field],
                                    component: this,
                                    tableId: tableId
                                });
                        }
                    });
                }
            });
            this.animationGridState = false;
        });
    }

    selectRow(data: GridInjectedData) {
        this.selected = data;
    }

    removeRow(index: number, tableId: number) {
        this.setData(this.getData(tableId).filter((row) => {
            return row[this.config.indexField] !== index;
        }), tableId);
        this.setFormattersForTable(tableId);
        if (!this.getData(tableId).length) {
            this.removeTable(tableId);
        }
    }

    addRow(item: any, tableId: number) {
        if (!item) {
            return;
        }
        const data = this.getData(tableId);
        data.push(item);
        this.setData(data, tableId);
        this.setFormattersForTable(tableId);
    }

    editRow(item: any, tableId: number) {
        const data = this.getData(tableId);
        data[item[this.config.indexField]] = item;
        this.setData(data, tableId);
        this.setFormattersForTable(tableId);
    }

    syncForms($event: any) {
        this.forms.forEach((form: FormComponent) => {
            form.model = $event;
            form.cdr.markForCheck();
        });
    }

    addTable(first: boolean = false) {
        const newTableId: number = this.tables.length;
        this.setData(this.getData(0), newTableId);
        this.count = new Array(newTableId + 1);
        if (first) {
            this.cdr.detectChanges();
        }
        this.setFormattersForTable(newTableId);
    }

    removeTable(tableId: number) {
        this.animationGridState = false;
        const tableArr: ElementRef[] = this.tables.toArray();
        if (tableId !== 0 && tableArr[tableId]) {
            tableArr[tableId].nativeElement.parentElement.remove();
        }
        this.setData([], tableId);
    }

    sortColumnsByIndex(columns: GridColumnType[]): GridColumnType[] {
        return columns.sort((a: GridColumnType, b: GridColumnType) => {
            const at: GridTableConfigType = a.table || {} as GridTableConfigType;
            const bt: GridTableConfigType = b.table || {} as GridTableConfigType;
            return at && at.index !== undefined && bt && bt.index !== undefined && at.index > bt.index ? 1 : at.index === bt.index ? 0 : -1;
        });
    }

    filterColumns(excludeColumns: string[]) {
        return this.columns.filter((column: GridColumnType) => {
            return !excludeColumns.includes(column.field);
        });
    }

}

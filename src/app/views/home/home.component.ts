import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GridColumnType, GridConfigType} from '../../modules/grid/types/types';
import {EditFormFormatterComponent} from '../../modules/grid/formatters/edit.formatter/edit.form.formatter.component';
import {DeleteFormatterComponent} from '../../modules/grid/formatters/delete.formatter/delete.formatter.component';
import {UserData} from './types/types';

@Component({
    selector: 'app-home',
    templateUrl: './tpls/home.component.html',
    styleUrls: ['./styles/home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    // index field
    gridConfig: GridConfigType = {
        indexField: '__index',
    };
    columns: GridColumnType[] = [
        {
            title: 'Name',
            field: 'name',
            width: '100px',
            type: 'plain',
            form: {
                type: 'text',
                required: true,
                placeholder: 'Name',
                index: 0
            },
            table: {
                index: 0
            },
        },
        {
            title: 'Surname',
            field: 'surname',
            width: '100px',
            type: 'plain',
            form: {
                type: 'text',
                required: true,
                placeholder: 'Surname',
                index: 1
            },
            table: {
                index: 1
            },
        },
        {
            title: 'Age',
            field: 'age',
            width: '100px',
            type: 'plain',
            form: {
                type: 'text',
                required: true,
                placeholder: 'Age',
                label: false,
                index: 2
            },
            table: {
                index: 2
            },
        },
        {
            title: 'City',
            field: 'city',
            width: '100px',
            type: 'plain',
            form: {
                type: 'text',
                required: true,
                placeholder: 'City',
                label: false,
                index: 3
            },
            table: {
                index: 3
            },
        },
        {
            title: '',
            field: 'agreed',
            width: '100px',
            type: 'plain',
            table: {
                hidden: true,
                index: 4
            },
            form: {
                type: 'checkbox',
                required: true,
                label: 'Totally agree',
                index: 4
            }
        },
        {
            title: '',
            field: '',
            width: '100px',
            type: EditFormFormatterComponent,
            table: {
                index: 5
            },
        },
        {
            title: '',
            field: '',
            width: '100px',
            type: DeleteFormatterComponent,
            table: {
                index: 6
            },
        },
    ];
    readonly data: UserData[] = [
        {name: 'Ivan', surname: 'First', age: 18, city: 'Paradise'},
        {name: 'Ivan', surname: 'Second', age: 18, city: 'Paradise'},
        {name: 'Ivan', surname: 'Third', age: 18, city: 'Paradise'},
        {name: 'Ivan', surname: 'Fourth', age: 18, city: 'Paradise'}
    ];
    count: any[] = [];
}

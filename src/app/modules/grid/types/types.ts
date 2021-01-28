import {Type} from '@angular/core';
import {GridComponent} from '../grid.component';

export type GridConfigType = {
    indexField: string
};

export type GridColumnType = {
    title: string,
    field: string,
    width: string,
    type: 'plain' | Type<any>
    table?: GridTableConfigType
    form?: GridFormConfigType,
};

export type GridFormConfigType = {
    required: boolean,
    placeholder?: string | false,
    type: 'text' | 'checkbox',
    name?: string,
    id?: string,
    helpId?: string,
    helpText?: string,
    label?: string | false,
    index?: number
};


export type GridTableConfigType = {
    hidden?: boolean,
    index: number
};

export type GridInjectedData = {
    row: any,
    cell: any,
    column: GridColumnType,
    columns: GridColumnType[],
    component: GridComponent,
    tableId: number
};

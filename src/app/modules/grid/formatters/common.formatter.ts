import {GridInjectedData} from '../types/types';
import {InterfaceFormatter} from './interface.formatter';
import {Injector} from '@angular/core';

export class CommonFormatter implements InterfaceFormatter {
     injectedData: GridInjectedData;

    constructor(protected injector: Injector) {
        this.injectedData = this.injector.get('data');
    }
}

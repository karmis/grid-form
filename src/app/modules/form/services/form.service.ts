import {EventEmitter, Injectable} from '@angular/core';
import {GridInjectedData} from '../../grid/types/types';

@Injectable()
export class FormService {
     onSubmit: EventEmitter<GridInjectedData> = new EventEmitter<GridInjectedData>();
}

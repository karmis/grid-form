import {Route} from '@angular/router';

export type ModalConfigType = {
    size?: ModalOptionsSizeType
    footer?: ModalConfigFooterType;
    footerRef?: string;
    title?: string;
};

export type ModalConfigFooterType = 'no|yes'|null;

export type ModalOptionsSizeType = 'sm' | 'md' | 'lg';

export type ModalEventType = {
    name: 'submit' | string,
    params: ModalParamsType
};


export type ModalEventNameType = 'no' | 'yes' | string;

export type ModalParamsType = {
    route: Route | ModalType,
    data: any,
    modalConfig: ModalConfigType,
    alertConfig?: ModalAlertConfigType
};

export type ModalType = 'alert';
export type ModalAlertConfigType = {
    text: string
};

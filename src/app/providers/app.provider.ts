import {
    ApplicationRef,
    Compiler,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    NgModuleFactory,
    NgModuleRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import {Route} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AppProvider {
    constructor(private compFactoryResolver: ComponentFactoryResolver, private injector: Injector,
                private appRef: ApplicationRef, private compiler: Compiler) {
    }

    // attach loaded component to view
    attachComponentToView(comp: Type<any>, element: HTMLElement, data: any): void {
        const factory: ComponentFactory<any> = this.compFactoryResolver.resolveComponentFactory(comp);
        const inputs = [{provide: 'data', useValue: data}];
        const injector: Injector = Injector.create({
            providers: inputs,
            parent: this.injector
        });
        const node: HTMLElement = document.createElement('div');
        element.innerHTML = '';
        element.appendChild(node);
        const compRef: ComponentRef<any> = factory.create(injector, [], node);
        this.appRef.attachView(compRef.hostView);
    }

    // lazy load and attach component to view
    attachLazyComponentToView(path: Route, element: HTMLElement, vcr: ViewContainerRef, data: any = {}): Promise<ComponentRef<any>> {
        return new Promise((resolve, reject) => {
            (path as any /*dirty hack*/).loadChildren().then((moduleOrFactory: Type<any>) => {
                return this.compiler.compileModuleAsync(moduleOrFactory);
            }).then((factory: NgModuleFactory<any>) => {
                const inputs = [
                    {provide: 'data', useValue: data}, // injected data
                    {provide: 'isInjected', useValue: true} // isInjected flag
                ];
                const injector: Injector = Injector.create({
                    providers: inputs
                });
                const ref: NgModuleRef<any> = factory.create(injector);
                const componentType: Type<any> = ref.instance.entry;
                const componentFactory: ComponentFactory<any> = this.compFactoryResolver.resolveComponentFactory(componentType);
                const node: HTMLElement = document.createElement('div');
                const compRef: ComponentRef<any> = componentFactory.create(injector, [], node);
                element.innerHTML = '';
                element.appendChild(node);
                this.appRef.attachView(compRef.hostView);
                resolve(compRef);
            });
        });
    }
}


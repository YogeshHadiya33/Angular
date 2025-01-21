import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appIfAuthenticated]',
    standalone: true,
})
export class IfAuthenticatedDirective {
    //this is structural directive
    constructor(private templateRef: TemplateRef<any>,
        private vcRef: ViewContainerRef
    ) {

    }
    @Input() set appIfAuthenticated(condition: boolean) {
        if (condition) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else {
            this.vcRef.clear();
        }
    }
}
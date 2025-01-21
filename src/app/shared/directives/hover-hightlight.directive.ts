import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[hoverHighlight]',
    standalone: true,
})
export class HoverHighlightDirective {
    //this is attribute directive

    @Input() hoverHighlightColor?: string;
    @Input() defaultColor?: string;

    constructor(private element: ElementRef) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.element.nativeElement.style.backgroundColor = this.hoverHighlightColor || 'yellow';
    }
    
    @HostListener('mouseleave') onMouseLeave() {
        this.element.nativeElement.style.backgroundColor = this.defaultColor || 'white';
    }
}
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { FormsModule } from '@angular/forms';
import { AnotherChildComponent } from '../another-child/another-child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, FormsModule, AnotherChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {
  message: string = "";
  mesageFromChild: string = "";
  mesageForAnotherChild: string = "";

  @ViewChild(AnotherChildComponent) anotherChild!: AnotherChildComponent;


  receiveMessageFromChild(message: string) {
    this.mesageFromChild = message;
  }

  changeAnotherChildCounter() {
    this.anotherChild.incrementCounter();
  }

  changeMessageInAnotherChildCounter() {
    this.anotherChild.message = this.mesageForAnotherChild;
  }
}

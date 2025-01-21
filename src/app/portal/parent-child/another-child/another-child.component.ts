import { Component } from '@angular/core';

@Component({
  selector: 'app-another-child',
  standalone: true,
  imports: [],
  templateUrl: './another-child.component.html',
  styleUrl: './another-child.component.scss'
})
export class AnotherChildComponent {

  counter: number = 0;
  message: string = "";

  incrementCounter() {
    this.counter++;
  }
}

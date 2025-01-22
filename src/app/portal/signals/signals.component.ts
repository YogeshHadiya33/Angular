import { Component, computed, signal, effect } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {

  counter = signal(0);

  secondCounter = signal(0);

  computedCounter = computed(() => this.counter() + this.secondCounter());

  constructor() {
    effect(() => console.log(this.computedCounter()));
  }

  incrementCounter() {
    this.counter.update((x) => x + 1);
  }

  incrementSecondCounter() {
    this.secondCounter.update((x) => x + 1);
  }

  resetCounters() {
    this.counter.set(0);
    this.secondCounter.set(0);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomPipe } from '../../shared/pipes/Custom.pipe';

@Component({
  selector: 'app-pipes',
  standalone: true,
  imports: [CommonModule,CustomPipe],
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.scss'
})
export class PipesComponent {

  currencyValue: number = 101200.4571245;
  currentDate: Date = new Date();
  jsonObject: any = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
  };
  normalStringValue: string = 'Hello World THIS IS a normal string WIth MUltiple Cases ADDDed';
  percentage: number = 0.7542;
  arrayValue: any[] = ['John', 'Doe', 'Jane', 'Doe',"AAA","Abc","ETC","yyyy"];

  myObservable$: Observable<number> = of(42);
  myPromise$: Promise<string> = Promise.resolve('Hello World!');
}

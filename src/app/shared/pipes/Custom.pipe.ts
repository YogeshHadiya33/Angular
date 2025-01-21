import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custompipe',
  standalone: true,
  pure: true
})
export class CustomPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string | null {
    if (value) {
      return value.toUpperCase();
    }
    return null;
  }

}

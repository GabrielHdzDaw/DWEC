import { Directive, input } from '@angular/core';

@Directive({
  selector: '[setColor]',
  host: {
    '[style.backgroundColor]': 'color()',
    '[style.color]': 'textColor()',
  },
})
export class SetColorDirective {
  color = input('yellow');
  textColor = input('black');
}

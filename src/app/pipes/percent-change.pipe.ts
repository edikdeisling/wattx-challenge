import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentChange',
})
export class PercentChangePipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  /**
   * Transform 12.3 to +12.30%
   */
  transform(value: number): unknown {
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';

    return `${sign}${this.decimalPipe.transform(Math.abs(value), '1.2-2')}%`;
  }
}

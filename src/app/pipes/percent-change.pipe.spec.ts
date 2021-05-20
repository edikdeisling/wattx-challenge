import { DecimalPipe } from '@angular/common';
import { PercentChangePipe } from './percent-change.pipe';

describe('PercentChangePipe', () => {
  let pipe: PercentChangePipe;

  beforeEach(() => {
    pipe = new PercentChangePipe(new DecimalPipe('en'));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('create positive percentage', () => {
    expect(pipe.transform(11.01)).toBe('+11.01%');
  });

  it('create negative percentage', () => {
    expect(pipe.transform(-11)).toBe('-11.00%');
  });

  it('create zero percentage', () => {
    expect(pipe.transform(0)).toBe('0.00%');
  });
});

import { TruncateNumberPipe } from './truncate-number.pipe';

describe('TruncateNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateNumberPipe();
    expect(pipe).toBeTruthy();
  });
});

import { markdownFormatter } from './markdown-formatter.pipe';

describe('StarBoldPipe', () => {
  it('create an instance', () => {
    const pipe = new markdownFormatter();
    expect(pipe).toBeTruthy();
  });
});

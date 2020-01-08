
import * as parser from '../src';

describe('chinese', () => {
  it('last word maybe have rest text, should catch it', () => {
    const TEXT = 'ABCD';

    const words: parser.Word<any>[] = [
      {
        text: "A",
        start: 0,
        end: 1,
      },
      {
        text: "B",
        start: 1,
        end: 2,
      },
      {
        text: "C",
        start: 2,
        end: 3,
      },
    ] as any;

    const token = words as any;
    const tokenizer = parser.transform(TEXT, token);

    const finalText = tokenizer.map(e => e.text).join('');
    expect(finalText.length).toEqual(TEXT.length);
    expect(finalText).toEqual(TEXT);
  });
});

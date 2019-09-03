import * as parser from '../src';

describe('parse', () => {
  it('multiple indexes', () => {
    const text = '你有感冒，他有感冒，我也感冒';
    const words = [{ text: '感冒' }];

    const parsedWords = parser.parse(text, words);
    expect(parsedWords.length).toEqual(3);
    expect(parsedWords[0].start).toEqual(2);
    expect(parsedWords[1].start).toEqual(7);
    expect(parsedWords[2].start).toEqual(12);
  });
});

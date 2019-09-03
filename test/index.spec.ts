
import * as parser from '../src';

describe('chinese', () => {
  const TEXT = '入院后予患儿静滴阿奇霉素联合雷特迈星抗感染，予患儿静滴大环内酯类抗生素治疗6天后仍有发热,考虑难治性重症肺炎支原体肺炎.';

  const words: parser.Word<any>[] = [
    { text: '雷特迈星' },
    { text: '感染' },
    { text: '内酯类抗生素' },
    { text: '支原体肺炎' },
  ];

  const token = parser.parse(TEXT, words);
  const tokenizer = parser.transform(TEXT, token);

  // console.log(token, tokenizer);

  it('parse', () => {
    expect(token.length).toEqual(words.length);
  });

  it('transform', () => {
    // >=n
    // <= 2n + 1
    expect(tokenizer.length).toBeGreaterThan(words.length);
    expect(tokenizer.length).toBeLessThanOrEqual(words.length * 2 + 1);
    // here
    expect(tokenizer.length).toEqual(words.length * 2 + 1);
  });

  it('render', () => {
    const renderers: parser.Renderers<any, any> = {
      TEXT(token) {
        return token.text;
      },
      CUSTOM(token) {
        return token.text;
      },
    };

    expect(parser.render(tokenizer, renderers).join('')).toEqual(TEXT);;
  });

  it('render without text', () => {
    const renderers: parser.Renderers<any, any> = {
      CUSTOM(token) {
        return token.text;
      },
    };

    expect(parser.render(tokenizer, renderers).join('')).toEqual(words.map(e => e.text).join(''));;
  });

  it('words start: 0', () => {
    const TEXT = '雷特迈星抗感染，予患儿静滴大环内酯类抗生素治疗6天后仍有发热,考虑难治性重症肺炎支原体肺炎.';

    const words: parser.Word<any>[] = [
      { text: '雷特迈星' },
      { text: '感染' },
      { text: '内酯类抗生素' },
      { text: '支原体肺炎' },
    ];

    const token = parser.parse(TEXT, words);
    const tokenizer = parser.transform(TEXT, token);
    // >=n
    // <= 2n + 1
    expect(tokenizer.length).toBeGreaterThan(words.length);
    expect(tokenizer.length).toBeLessThanOrEqual(words.length * 2 + 1);
    // here
    expect(tokenizer.length).toEqual(words.length * 2);
  });

  it('words end: textLength', () => {
    const TEXT = '入院后予患儿静滴阿奇霉素联合雷特迈星抗感染，予患儿静滴大环内酯类抗生素治疗6天后仍有发热,考虑难治性重症肺炎支原体肺炎';

    const words: parser.Word<any>[] = [
      { text: '雷特迈星' },
      { text: '感染' },
      { text: '内酯类抗生素' },
      { text: '支原体肺炎' },
    ];

    const token = parser.parse(TEXT, words);
    const tokenizer = parser.transform(TEXT, token);
    // >=n
    // <= 2n + 1
    expect(tokenizer.length).toBeGreaterThan(words.length);
    expect(tokenizer.length).toBeLessThanOrEqual(words.length * 2 + 1);
    // here
    expect(tokenizer.length).toEqual(words.length * 2);
  });

  it('words start: 0, end: textLength', () => {
    const TEXT = '雷特迈星抗感染，予患儿静滴大环内酯类抗生素治疗6天后仍有发热,考虑难治性重症肺炎支原体肺炎';

    const words: parser.Word<any>[] = [
      { text: '雷特迈星' },
      { text: '感染' },
      { text: '内酯类抗生素' },
      { text: '支原体肺炎' },
    ];

    const token = parser.parse(TEXT, words);
    const tokenizer = parser.transform(TEXT, token);
    // >=n
    // <= 2n + 1
    expect(tokenizer.length).toBeGreaterThan(words.length);
    expect(tokenizer.length).toBeLessThanOrEqual(words.length * 2 + 1);
    // here
    expect(tokenizer.length).toEqual(words.length * 2 - 1);
  });

  it('word text origin length, should not change', () => {
    const TEXT = '雷特迈星抗感染，予患儿静滴大环内酯类抗生素治疗6天后仍有发热,考虑难治性重症肺炎支原体肺炎';

    const words: parser.Word<any>[] = [
      { text: '雷特迈星' },
      { text: '感染' },
      { text: '内酯类抗生素' },
      { text: '支原体肺炎' },
    ];

    const token = parser.parse(TEXT, words);
    const tokenizer = parser.transform(TEXT, token);

    const finalText = tokenizer.map(e => e.text).join('');
    expect(finalText.length).toEqual(TEXT.length);
  });
});

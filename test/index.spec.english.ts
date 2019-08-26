
import * as parser from '../src';

describe('works', () => {
  const TEXT = 'The 141-kilometer Guangzhou-Shenzhen-Hong Kong Express Rail Link will become the first high-speed railway in China to have full 5G network coverage along its entire line, Xinhua reported on Wednesday. China Mobile will work with Chinese telecom giant Huawei Technologies Co Ltd to provide a full-coverage wireless 5G network for the high-speed railway that connects Hong Kong to the Chinese mainland, according to Wei Ming, chairman of China Mobile Guangdong branch. Wei made the announcement in Hong Kong during a meeting to witness the forming of a 5G industry alliance in the Guangdong-Hong Kong-Macao Greater Bay Area. ';

  const words: parser.Word<any>[] = [
    { text: 'become' },
    { text: 'entire' },
    { text: 'work' },
    { text: 'chairman' },
    { text: 'meeting' },
    { text: 'witness' },
    { text: 'industry' },
  ];

  const token = parser.parse(TEXT, words);
  const tokenizer = parser.transform(TEXT, token);

  console.log(token, tokenizer);

  it('parse', () => {
    expect(token.length).toEqual(words.length);
  });

  it('transform', () => {
    // >=n
    // <= 2n + 1
    expect(tokenizer.length).toEqual(words.length * 2 + 1);
  });
});

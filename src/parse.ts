import { Word, WordWithPosition } from './interface';

export function parse<Args>(text: string, words: Word<Args>[]): WordWithPosition<Args>[] {
  if (!words || words.length === 0) {
    return [{
      text,
      start: 0,
      end: text.length,
    }] as WordWithPosition<Args>[];
  }

  return words.reduce((all, word) => {
    let start = -1;
    while ((start = text.indexOf(word.text, start + 1)) !== -1) {
      all.push({
        ...word,
        start,
        end: start + word.text.length,
      });
    }

    return all;
  }, [] as WordWithPosition<Args>[]);
}
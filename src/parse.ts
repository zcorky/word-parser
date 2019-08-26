import { Word, WordWithPosition } from './interface';

export function parse<Args>(text: string, words: Word<Args>[]): WordWithPosition<Args>[] {
  return words.map(word => {
    const start = text.indexOf(word.text);
    
    return {
      ...word,
      start,
      end: start + word.text.length,
    };
  });
}
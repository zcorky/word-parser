import { WordRender, WordWithPosition, RenderType } from './interface';

export function transform<Args = {}>(text: string, words: WordWithPosition<Args>[]): WordRender<Args>[] {
  const tokenizers: WordRender<Args>[] = [];
  const _words = words.sort((a, b) => a.start - b.start);
  
  const textLength = text.length;
  const wordsLength = words.length;
  let pos = 0;

  _words.forEach((word, index) => {
    // left word
    if (word.start !== pos) {
      // before custom
      const startWord: WordRender<Args> = {
        text: text.slice(pos, word.start),
        start: pos,
        end: word.start,
        type: RenderType.TEXT,
      };
      pos = word.end;

      tokenizers.push(startWord);
    }
    
    // shot at custom word
    const keyWord: WordRender<Args> = {
      ...word,
      type: RenderType.CUSTOM,
    };
    tokenizers.push(keyWord);
    
    // the last word and end at not textLength
    if (index === wordsLength - 1 && word.end !== textLength) {
      const endWord: WordRender<Args> = {
        text: text.slice(word.end, textLength),
        start: word.end,
        end: text.length,
        type: RenderType.TEXT,
      };
      
      tokenizers.push(endWord);
    }
  });
  
  return tokenizers;
}
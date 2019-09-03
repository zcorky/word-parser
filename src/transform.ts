import { WordRender, WordWithPosition, RenderType } from './interface';

export function transform<Args = {}>(text: string, words: WordWithPosition<Args>[]): WordRender<Args>[] {
  const tokenizers: WordRender<Args>[] = [];
  const _words = words.sort((a, b) => a.start - b.start);
  
  const textLength = text.length;
  const wordsLength = words.length;
  let pos = 0;

  _words.forEach((word, index) => {
    // left word
    console.log(`word: (${word.start}, ${pos})`);
    if (word.start !== pos) {
      // before custom
      const startWord: WordRender<Args> = {
        text: text.slice(pos, word.start),
        start: pos,
        end: word.start,
        type: RenderType.TEXT,
      };

      tokenizers.push(startWord);
    }
    
    // shot at custom word
    const keyWord: WordRender<Args> = {
      ...word,
      type: RenderType.CUSTOM,
    };
    tokenizers.push(keyWord);
    pos = word.end;
    
    // the last word and end at not textLength
    if (index === wordsLength - 1 && pos !== textLength) {
      const endWord: WordRender<Args> = {
        text: text.slice(pos, textLength),
        start: pos,
        end: text.length,
        type: RenderType.TEXT,
      };
      
      tokenizers.push(endWord);
    }
  });
  
  return tokenizers;
}
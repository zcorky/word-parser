import { WordRender, WordWithPosition, RenderType } from './interface';

export function transform<Args = {}>(text: string, words: WordWithPosition<Args>[]): WordRender<Args>[] {
  const tokenizers: WordRender<Args>[] = [];
  const _words = words.sort((a, b) => a.start - b.start);
  
  const textLength = text.length;
  const wordsLength = words.length;
  let pos = 0;

  _words.forEach((word, index) => {
    // if the word not on the text pos, just give up it.
    // that's the word maybe contain before word
    //
    // such: ['abcd', 'abc'] should only render 'abcd', not render 'abc'
    //    => pos > word.end
    // such: ['abc', 'abcd'] should only render 'abc', not render 'abcd',
    //    => pos + word.text.length > word.end
    //    => more: if abc is the last word, should get the last word
    // such: ['abcd', 'abcd'] should only render one 'abcd'
    //      but maybe not have rest text
    //    => pos === word.end && pos === textLength - 1
    if (pos >= word.end) {
      if (index === wordsLength - 1 && pos !== textLength) {
        const endWord: WordRender<Args> = {
          text: text.slice(pos, textLength),
          originalText: text.slice(pos, textLength),
          start: pos,
          end: textLength,
          type: RenderType.TEXT,
        };
        
        tokenizers.push(endWord);
      }

      return ;
    }

    if ((index !== wordsLength - 1 && pos + word.text.length > word.end)) {
      return ;
    }

    // left word
    if (word.start > pos) {
      // before custom
      const startWord: WordRender<Args> = {
        text: text.slice(pos, word.start),
        originalText: text.slice(pos, word.start),
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
      originalText: text.slice(word.start, word.end),
    };
    tokenizers.push(keyWord);
    pos = word.end;

    // the last word and end at not textLength
    if (index === wordsLength - 1 && pos !== textLength) {
      const endWord: WordRender<Args> = {
        text: text.slice(pos, textLength),
        originalText: text.slice(pos, textLength),
        start: pos,
        end: textLength,
        type: RenderType.TEXT,
      };
      
      tokenizers.push(endWord);
    }
  });
  
  return tokenizers;
}
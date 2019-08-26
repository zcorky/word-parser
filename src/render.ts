import { WordRender, Renderers } from './interface';

export function render<Args, ReturnType>(token: WordRender<Args>[], renderers: Renderers<Args, ReturnType>): (ReturnType | null)[] {
  return token.map((token, index) => {
    const render = renderers[token.type];
    if (render) {
      return render(token, index);
    }

    return null;
  });
}
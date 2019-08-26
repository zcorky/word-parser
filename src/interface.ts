export interface Word<Args extends any> {
  text: string;
  args?: Args;
}

export interface WordWithPosition<Args extends any> extends Word<Args>  {
  start: number;
  end: number;
}

export enum RenderType {
  TEXT  = 'TEXT',
  CUSTOM = 'CUSTOM',
};

export interface WordRender<Args extends any> extends WordWithPosition<Args> {
  type: RenderType;
}

export interface Renderer<Args, ReturnType> {
  (word: WordRender<Args>, index: number): ReturnType;
}

// export type Renderers<Args, ReturnType> = Record<RenderType,  Renderer<Args, ReturnType>>;
export interface Renderers<Args, ReturnType> {
  [RenderType.TEXT]?: Renderer<Args, ReturnType>;
  [RenderType.CUSTOM]: Renderer<Args, ReturnType>;
}
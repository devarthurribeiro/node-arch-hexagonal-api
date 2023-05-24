export interface IFactory<T> {
  build(): T;
  buildList(size: number): T[];
}
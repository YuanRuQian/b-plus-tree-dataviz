export enum NodeColor {
  RED = "red",
  BLACK = "black",
}

const generateNIL = (): Node => {
  const nil = new Node(-1);
  nil._parent = nil;
  nil._left = nil;
  nil._right = nil;
  nil._black = true;
  return nil;
};

export class Node {
  readonly _key: number;
  _parent: Node;
  _left: Node;
  _right: Node;
  _black: boolean;

  get _red(): boolean {
    return !this._black;
  }

  set _red(isRed: boolean) {
    this._black = !isRed;
  }

  get isNIL(): boolean {
    return this === Node.NIL;
  }

  get key(): number {
    return this._key;
  }

  constructor(key: number) {
    this._key = key;
    this._parent = Node.NIL;
    this._left = Node.NIL;
    this._right = Node.NIL;
    this._black = true;
  }

  static readonly NIL = generateNIL();
}

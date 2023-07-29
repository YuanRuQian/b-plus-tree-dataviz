export enum NodeColor {
  RED = "red",
  BLACK = "black",
}

export interface TreeNodeJSON {
  name: string;
  color: NodeColor;
  children?: TreeNodeJSON[];
}

const generateNIL = (): Node => {
  const nil = new Node(-1);
  nil._parent = nil;
  nil._left = nil;
  nil._right = nil;
  nil.setBlack = true;
  return nil;
};

export class Node {
  readonly _key: number;
  _parent: Node;
  _left: Node;
  _right: Node;
  _color: NodeColor;

  get isRed(): boolean {
    return this._color === NodeColor.RED;
  }

  set setRed(isRed: boolean) {
    this._color = isRed ? NodeColor.RED : NodeColor.BLACK;
  }

  get isBlack(): boolean {
    return this._color === NodeColor.BLACK;
  }

  set setBlack(isBlack: boolean) {
    this._color = isBlack ? NodeColor.BLACK : NodeColor.RED;
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
    this._color = NodeColor.BLACK;
  }

  static readonly NIL = generateNIL();
}

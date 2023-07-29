import { createContext } from 'react';
import { RedBlackTree } from '../utils/RedBlackTree'; 

type RedBlackTreeContextProps = {
  redBlackTree: RedBlackTree;
  setRedBlackTree: React.Dispatch<React.SetStateAction<RedBlackTree>>;
}

export const RedBlackTreeContext = createContext<RedBlackTreeContextProps | null>(null);

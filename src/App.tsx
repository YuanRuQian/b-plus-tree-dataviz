import React, { useState } from 'react';
import './App.css';
import ControlPanel from './components/ControlPanel';
import { RedBlackTree } from './utils/RedBlackTree';
import { RedBlackTreeContext } from './context/RedBlackTreeContext';

const App = ()  => {

  const [redBlackTree, setRedBlackTree] = useState(new RedBlackTree());

  return (
    <RedBlackTreeContext.Provider value={{ redBlackTree, setRedBlackTree }}>
    <div className="App">
      <ControlPanel />
    </div>
    </RedBlackTreeContext.Provider>
  );
}

export default App;

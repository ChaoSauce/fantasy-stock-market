import React from 'react';
import { firebase, FieldValue } from './lib/firebase';
import FirebaseContext from './context/firebase';
import Index from './index';

export default function App() {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <Index />
    </FirebaseContext.Provider>
  )
}
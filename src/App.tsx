import React from 'react';
import { PersonaChat } from './components/PersonaChat';

function App() {
  return (
    <div className="App">
      <PersonaChat 
        personaName="Narendra Modi"
        personaImage="https://cdn.gulte.com/wp-content/uploads/2022/02/1.jpg"
      />
    </div>
  );
}

export default App;
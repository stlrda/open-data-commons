import React from 'react';
import Button from './components/button'

function App() {

  const handleButtonClick = () => {
    console.log('you pressed me')
  }
  return (
    <div>
      <h1>Welcome to the project</h1>
      <Button title="hello" handleClick={handleButtonClick} />
    </div>
  );
}

export default App;

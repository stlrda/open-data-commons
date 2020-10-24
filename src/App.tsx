import React from 'react';
import Button from './components/button/Button'
import Table from './components/table/Table'
import { simpleColumns } from './mocks/table'

function App() {

  const handleButtonClick = () => {
    console.log('you pressed me')
  }
  return (
    <div>
      <h1>Welcome to the project</h1>
      <Button title="hello" handleClick={handleButtonClick} />
      <Table numRows={10} columns={simpleColumns} />
    </div>
  );
}

export default App;

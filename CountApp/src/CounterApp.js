import React, { useState } from 'react';

function CounterApp() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(count + 5);

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>Count: {count}</h1>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementFive}>Increment 5</button>

      <h1>Welcome to CHARUSAT!!!</h1>

      <div style={{ margin: '20px' }}>
        <label>
          First Name: 
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            style={{ marginLeft: '5px' }}
          />
        </label>
        <br /><br />
        <label>
          Last Name: 
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            style={{ marginLeft: '5px' }}
          />
        </label>
      </div>

      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
    </div>
  );
}

export default CounterApp;

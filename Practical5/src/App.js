import React, { useState } from 'react';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(expression).toString());
      } catch {
        setResult('Error');
      }
    } else if (value === 'DEL') {
      setExpression(expression.slice(0, -1));
    } else if (value === 'ClearAll') {
      setExpression('');
      setResult('');
    } else {
      setExpression(expression + value);
    }
  };

  const buttonStyle = {
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#f42e2eff',
    color: 'white',
    transition: '0.3s',
  };

  const darkButton = {
    ...buttonStyle,
    backgroundColor: '#222',
  };

  const containerStyle = {
    background: '#0f0f1a',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    color: '#fff',
    width: '300px',
  };

  const displayStyle = {
    background: '#1a1a2e',
    padding: '20px',
    borderRadius: '10px',
    fontSize: '24px',
    textAlign: 'right',
    marginBottom: '10px',
    wordWrap: 'break-word',
    minHeight: '60px',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={containerStyle}>
        <div style={displayStyle}>
          <small style={{ color: 'gray', fontSize: '14px' }}>
            {result && `(${result})`}
          </small>
          <div>{expression || '0'}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {['/', '*', '+', '-', 'DEL', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '=', 'ClearAll'].map((btn, i) => (
            <button
              key={i}
              onClick={() => handleClick(btn)}
              style={i < 5 ? buttonStyle : darkButton}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

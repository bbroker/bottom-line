import React, { useState } from 'react';
import { getPosition } from './utils';

function App() {

  const [position, setPosition] = useState('');

  const mouseUp = () => {
    const line = document.getElementById('line');

    line.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
  };

  const mouseMove = (e) => {
    setPosition(e.offsetX);
  };

  const onHandleMouseDown = (e) => {
    if (e) {
      const line = document.getElementById('line');

      line.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }
  };

  return (
    <div className="App">
      <div id="line" style={{ width: '500px', height: '8px', backgroundColor: 'cyan', margin: '50px auto', position: 'relative' }} >
        <div
          style={
            {
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '50%',
              position: 'absolute',
              top: -6,
              left: position
            }}
          onMouseDown={onHandleMouseDown}
        />
      </div>
      <div style={{ textAlign: 'center' }}>{position}</div>
    </div>
  );
}

export default App;

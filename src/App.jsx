import React from 'react';
import { useState, memo, useMemo, useCallback } from 'react';

function Color({ color }) {
  console.log('Color rerender!!!!!!!!!');
  return <div className="box" style={{ background: color }}></div>;
}

// when we define object or non primitive type we need to pass callback to memo to work
function ColorWithParams({ params }) {
  console.log('Color with params rerender!!!!!!!!!');
  return <div className="box" style={{ background: params.color }}></div>;
}

function ColorWithParamsWithoutCb({ params }) {
  console.log('Color with params rerender!!!!!!!!!');
  return <div className="box" style={{ background: params.color }}></div>;
}

const MemoColor = memo(Color);
const MemoColorWithParams = memo(ColorWithParams, (prevProps, nextProps) => {
  return prevProps.params.color == nextProps.params.color;
});

const MemoColorWithParamsWithoutCb = memo(ColorWithParamsWithoutCb);

export default function App() {
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState('blue');

  console.log('App rendered!', index);

  const ChangeColor = useCallback(() => {}, []);

  const params = useMemo(() => ({ color }), [color]);

  return (
    <div>
      <button onClick={() => setIndex((pre) => pre + 1)}> Click Me!</button>
      <button onClick={() => setColor(color === 'blue' ? 'red' : 'blue')}> Change Color!</button>
      {/* <button onClick={() => ChangeColor()}> Change Color!</button> */}

      {/* <MemoColor color={color} /> */}

      {/* <MemoColorWithParams params={{ color: color }} /> */}

      <MemoColorWithParamsWithoutCb params={params} onClick={ChangeColor} />
    </div>
  );
}

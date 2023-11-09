import React from 'react';
import CssDemo1 from './css-demo1/demo1';
import ShaderBackground from './shader-demo1/ShaderBackground';
import CssDemo2 from './css-demo2';
import CssDemo3 from './css-demo3';

export default function Background() {
  const children1 = [
    <CssDemo1 />,
    <CssDemo2 />
  ];
  const children2 = [
    <CssDemo3 />

  ]
  return (
    <>
      <h2>liner-gradient 线性渐变</h2>
      {children1.map((component, index) => {
        return (
          <div>
            <h3>demo {index + 1}</h3>
            {component}
          </div>
        )
      })}
      <h2>radial-gradient 径向渐变</h2>
      {children2.map((component, index) => {
        return (
          <div>
            <h3>demo {index + 1}</h3>
            {component}
          </div>
        )
      })}
    </>
  )
}

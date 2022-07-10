import React, { FC, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

/**
 * 函数组件：
 *
 * 属性的默认值(defaultProps)
 */
type Props = { name: string; age?: number };
const Hello: FC<Props> = ({ name, age = 18 }) => (
  <div>
    我叫{name},今年{age}岁
  </div>
);
// 设置默认值
// Hello.defaultProps = { age: 27 };
const App = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
  };

  return (
    <div className="App">
      <Hello name="zhang" />
      <button onClick={handleClick}>点击</button>
    </div>
  );
};

export default App;

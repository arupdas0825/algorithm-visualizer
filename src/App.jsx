import { useState } from "react";
import "./index.css";


function App() {
  const [array, setArray] = useState([]);


  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 30; i++) {
      newArray.push(Math.floor(Math.random() * 300) + 20);
    }
    setArray(newArray);
  };


  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }
  };


  return (
    <div className="container">
      <h1>Algorithm Visualizer</h1>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <button onClick={generateArray}>Generate Array</button>
      <button onClick={bubbleSort}>Start Bubble Sort</button>
    </div>
  );
}


export default App;
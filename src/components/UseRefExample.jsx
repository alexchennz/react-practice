import { useRef } from "react";
import Input from "./Input";

const UseRefExample = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <>
      <Input ref={inputRef} placeholder="Enter a number" />
      <button onClick={handleClick}>Get Input Value</button>
    </>
  );
};

export default UseRefExample;
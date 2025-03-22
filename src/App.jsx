import UseCallbackExample from "./components/UseCallbackExample";
import UseRefExample from "./components/UseRefExample";
import FetchExample from "./components/FetchExample";
import UseMemoExample from "./components/UseMemoExample";

function App() {
  return (
    <>
      {/* Uncomment one of the examples below to test */}
      {/* <UseCallbackExample /> */}
      {/* <UseRefExample /> */}
      <FetchExample />
      {/* <UseMemoExample num={10} /> */}
    </>
  );
}

export default App;

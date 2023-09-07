import "./App.css";

import Button from "./components/Button/Button";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button label="button" variant={"primary"} />
      <Button label="button" variant={"danger"} />
      <Button label="button" variant={"light"} />
      <Button label="button" variant={"dark"} />
      <Button label="" variant={"icon"} />
    </div>
  );
}

export default App;

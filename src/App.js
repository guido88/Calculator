import ButtonPanels from "./components/ButtonsPanel";
import Display from "./components/Display";
import { CalculatorContextProvider } from "./store/calculator-context";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.calculator}>
      <CalculatorContextProvider>
        <Display />
        <ButtonPanels />
      </CalculatorContextProvider>
    </div>
  );
}

export default App;

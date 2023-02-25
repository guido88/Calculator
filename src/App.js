import CalculatorPanel from "./components/CalculatorPanel";
import { CalculatorContextProvider } from "./store/calculator-context";

function App() {
  return (
    <CalculatorContextProvider>
      <CalculatorPanel />
    </CalculatorContextProvider>
  );
}

export default App;
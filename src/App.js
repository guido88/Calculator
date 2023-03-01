import { Provider } from "react-redux";
import CalculatorPanel from "./components/CalculatorPanel";
import store from "./store/calculatorStore";

function App() {
  return (
    <Provider store={store}>
      <CalculatorPanel />
    </Provider>
  );
}

export default App;

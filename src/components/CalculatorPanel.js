import Button from "./Button";
import Display from "./Display";
import classes from "./CalculatorPanel.module.css";

const CalculatorPanel = () => {
  return (
    <div className={classes.panel}>
      <Display />
      <Button value="AC" />
      <Button value="+/-" />
      <Button value="%" />
      <Button orange value="/" />
      <Button value="1" />
      <Button value="2" />
      <Button value="3" />
      <Button orange value="X" />
      <Button value="4" />
      <Button value="5" />
      <Button value="6" />
      <Button orange value="-" />
      <Button value="7" />
      <Button value="8" />
      <Button value="9" />
      <Button orange value="+" />
      <Button value="0" />
      <Button value="." />
      <Button orange value="=" />
    </div>
  );
};

export default CalculatorPanel;

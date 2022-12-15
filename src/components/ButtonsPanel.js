import Button from "./Button";
import classes from "./ButtonPanel.module.css";

const ButtonPanels = () => {
  return (
    <div className={classes.panel}>
      <div>
        <Button value="AC" />
        <Button value="+/-" />
        <Button value="%" />
        <Button orange value="/" />
      </div>
      <div>
        <Button value="1" />
        <Button value="2" />
        <Button value="3" />
        <Button orange value="X" />
      </div>
      <div>
        <Button value="4" />
        <Button value="5" />
        <Button value="6" />
        <Button orange value="-" />
      </div>
      <div>
        <Button value="7" />
        <Button value="8" />
        <Button value="9" />
        <Button orange value="+" />
      </div>
      <div>
        <Button value="0" />
        <Button value="." />
        <Button orange value="=" />
      </div>
    </div>
  );
};

export default ButtonPanels;

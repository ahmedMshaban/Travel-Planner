import classes from "./MainHeader.module.css";
import { Link } from "react-router-dom";

const MainHeader: React.FC = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <img src="./logo.svg" alt="Mozio Logo" />
      </Link>
    </header>
  );
};

export default MainHeader;

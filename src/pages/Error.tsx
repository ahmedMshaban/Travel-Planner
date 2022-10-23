import { useNavigate, useRouteError } from "react-router-dom";
import classes from "./Error.module.css";
import Button from "../components/UI/Button";

const Error: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as { status: number };
  return (
    <div className={classes.notFoundLayout + " container"}>
      <img src="./404.jpg" alt="page not found" />
      <div className={classes.leftSection}>
        <h1>Hey muchacho</h1>
        <h2>We've got a {error.status} error</h2>
        <p>
          The page you're looking for may have moved.
          <br />
          Can we get you back home?
        </p>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          Take me Home
        </Button>
      </div>
    </div>
  );
};

export default Error;

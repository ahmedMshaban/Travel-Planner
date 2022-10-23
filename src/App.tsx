import MainHeader from "./components/Layout/MainHeader";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;

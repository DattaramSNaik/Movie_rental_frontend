import "./App.css";
import Footer from "./Component/Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadLogin } from "./Resources/reducer/loginSlice";
import Navbar from "./Component/Navbar/Navbar";
import UnAuthNav from "./Component/Navbar/UnAuthNav";
import { useEffect } from "react";

function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, [dispatch]);
  return (
    <div className="App">
      {token ? <Navbar /> : <UnAuthNav />}
      <Footer />
    </div>
  );
}

export default App;

import "./style.css";
// import LoginForm from "../../components/login/LoginForm";
// import Footer from "../../components/login/Footer";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

function Login() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="login">
      <div className="login_wrapper">
        {visible && <RegisterForm setVisible={setVisible} />}
        {/*<Footer />*/}
      </div>
    </div>
  );
}
export default Login;

import React, { useState } from "react";
import "./style.css";

function RegisterForm({ setVisible }) {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(75), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            className="exit_icon"
            onClick={() => {
              setVisible(false);
            }}
          ></i>
          <span>Sign Up</span>
          <span>Quick And Easy...</span>
        </div>
        <div className="register_form">
          <div className="reg_line input_wrap register_input_wrap">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="reg_line input_wrap register_input_wrap">
            <input type="text" placeholder="Mobile Number" />
          </div>
          <div className="reg_line input_wrap register_input_wrap">
            <input type="password" name="" id="" placeholder="Password" />
          </div>
          <div className="reg_col ">
            <div className="reg_line_header">Date Of Birth</div>
            <div
              className="reg_grid"
              //   style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
            >
              <select name="bDay" value={bDay} onChange={handleRegisterChange}>
                {days.map((day, i) => (
                  <option value={day} key={i}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                name="bMonth"
                value={bMonth}
                onChange={handleRegisterChange}
              >
                {months.map((month, i) => (
                  <option value={month} key={i}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="bYear"
                value={bYear}
                onChange={handleRegisterChange}
              >
                {years.map((year, i) => (
                  <option value={year} key={i}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="reg_col">
            <div className="reg_line_header">
              Gender <i className="info_icon"></i>
            </div>

            <div className="reg_grid input_wrap register_input_wrap">
              <label htmlFor="male">
                Male
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  onChange={handleRegisterChange}
                />
              </label>
              <label htmlFor="female">
                Female
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={handleRegisterChange}
                />
              </label>
              <label htmlFor="custom">
                Custom
                <input
                  type="radio"
                  name="gender"
                  id="custom"
                  value="custom"
                  onChange={handleRegisterChange}
                />
              </label>
            </div>
          </div>
          <div className="reg_infos">
            By clicking Sign Up, you agree to our{" "}
            <span>Terms, Data Policy &nbsp;</span>
            and <span>Cookie Policy.</span> You may receive SMS notifications
            from us and can opt out at any time.
          </div>
          <div className="reg_btn_wrapper">
            <button className="black_btn open_signup">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

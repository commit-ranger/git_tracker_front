import { useState } from "react";
import { BASEURL } from "../../assets/api_adapter";
import { useNavigate } from "react-router-dom";

function Login_page() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  async function handle_submit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${BASEURL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        console.log("Username or Password is incorrect");
      } else {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);

        if (data.is_admin) {
          console.log("is_admin");
          localStorage.setItem("is_admin", data.is_admin);
        }
        console.log("Login fired success");
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  return (
    <div>
      <h3>login PAGE</h3>
      <form>
        <div>
          <input
            type="text"
            placeholder="Input Username Here"
            onChange={(e) => {
              setUsernameInput(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Input Password Here"
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
          />
        </div>
        <button onClick={handle_submit}>submit</button>
      </form>
    </div>
  );
}

export default Login_page;

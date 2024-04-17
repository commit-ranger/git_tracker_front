
import { useState } from "react";
import { BASEURL } from "../../assets/api_adapter";
import { useNavigate } from "react-router-dom";

function New_user() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  async function handle_submit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${BASEURL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone
        }),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        console.log(data);
      } else {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);

        if (data.is_admin) {
          console.log("is_admin");
          localStorage.setItem("is_admin", data.is_admin);
        }
        // window.location.reload(false);
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
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="email@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="tel"
            placeholder="(123)456-7890"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <button onClick={handle_submit}>submit</button>
      </form>
    </div>
  );
}

export default New_user;

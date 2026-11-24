import { useState } from "react";

export default function Signupform3() {
  const [formFields, setFromFields] = useState({
    name: "",
    email: "",
    password: "",
    c_passwrod: "",
    country: "",
    gender: "",
    interests: [],
    agreeToTerms: false,
  });

  function hanldeFormFiledChanges(e) {
    const { value, name } = e.target;
  }

  return (
    <form>
      <div className="field">
        <label htmlFor="name">
          name
          <input
            id="name"
            type="text"
            name="name"
            value={formFields.name}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">
          name
          <input
            id="name"
            type="text"
            name="name"
            value={formFields.name}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">
          name
          <input
            id="name"
            type="text"
            name="name"
            value={formFields.name}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>

      <div className="field">
        <label htmlFor="email">
          email
          <input
            id="email"
            type="email"
            name="email"
            value={formFields.email}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>

      <div className="field">
        <label htmlFor="password">
          password
          <input
            id="password"
            type="password"
            name="password"
            value={formFields.password}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>

      <div className="field">
        <label htmlFor="name">
          confirm password
          <input
            id="name"
            type="password"
            name="c_password"
            value={formFields.c_passwrod}
            onChange={hanldeFormFiledChanges}
          />
        </label>
      </div>
    </form>
  );
}

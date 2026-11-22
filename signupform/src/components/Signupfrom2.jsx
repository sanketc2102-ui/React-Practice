import React from "react";
import { useState } from "react";

export default function Signupfrom2() {
  const [field, setField] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "",
    gender: "male",
    interests: [],
    agreeToTerms: "",
  });

  function hanldeFieldChange({ value, name }) {
    setField((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form>
      <h2>create account</h2>

      <div className="field">
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={field.name}
          onChange={(e) => hanldeFieldChange(e.target)}
        />
      </div>
      <div className="field">
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={field.email}
          onChange={(e) => hanldeFieldChange(e.target)}
        />
      </div>
      <div className="field">
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={field.password}
          onChange={(e) => hanldeFieldChange(e.target)}
        />
      </div>
      <div className="field">
        <label htmlFor="confirm_password">confirm password</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={field.confirm_password}
          onChange={(e) => hanldeFieldChange(e.target)}
        />
      </div>
      <div className="field">
        <label htmlFor="country">country</label>
        <select
          name="country"
          id="country"
          value={field.country}
          onChange={(e) => hanldeFieldChange(e.target)}
        >
          <option value="">select country</option>
          <option value="ind">india</option>
          <option value="jap">japan</option>
          <option value="usa">usa</option>
          <option value="rus">russia</option>
        </select>
      </div>

      <div className="field">
        gender
        <label htmlFor="male">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={field.gender === "male"}
            onChange={(e) => hanldeFieldChange(e.target)}
          />
          male
        </label>
        <label htmlFor="female">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={field.gender === "female"}
            onChange={(e) => hanldeFieldChange(e.target)}
          />
          female
        </label>
        <label htmlFor="male">
          <input
            type="radio"
            name="gender"
            value="others"
            checked={field.gender === "others"}
            onChange={(e) => hanldeFieldChange(e.target)}
          />
          others
        </label>
      </div>
    </form>
  );
}

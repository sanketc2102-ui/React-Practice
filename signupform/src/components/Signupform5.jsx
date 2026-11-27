import { useState } from "react";

const fields = [
  { name: "name", type: "text", lable: "name" },
  { name: "email", type: "email", lable: "email" },
  { name: "password", type: "password", lable: "password" },
  { name: "confirmPassword", type: "password", lable: "confirm password" },
];

export default function Signupfrom5() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "male",
    interests: [],
    agreeToTerms: false,
  });

  function handleFormFieldChange(e) {
    const { value, name } = e.target;

    setValues((values) => ({ ...values, [name]: value }));
  }

  function handleIntChange(e) {
    const { checked, value } = e.target;

    const updatedInt = checked
      ? [...values.interests, value]
      : values.interests.filter((int) => int !== value);

    setValues((vlaues) => ({ ...vlaues, interests: updatedInt }));
  }

  function handleAgreeToTerms(e) {}

  return (
    <div className="container">
      <form className="form">
        <p>create account</p>

        {fields.map((field, idx) => (
          <div className="field" key={idx}>
            <label htmlFor={field.name}>
              <span>{field.lable}</span>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={values[field.name]}
                onChange={handleFormFieldChange}
              />
            </label>
          </div>
        ))}

        <div className="field">
          country
          <select
            name="country"
            id="country"
            value={values.country}
            onChange={handleFormFieldChange}
          >
            <option value="">- select country -</option>
            <option value="ind">india</option>
            <option value="us">usa</option>
            <option value="jap">japan</option>
            <option value="uk">uk</option>
          </select>
        </div>

        <div className="field">
          gender
          {["male", "female", "others"].map((gender, idx) => (
            <label key={idx}>
              {gender}
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={values.gender === gender}
                onChange={handleFormFieldChange}
              />
            </label>
          ))}
        </div>

        <div className="field">
          <label htmlFor="">interest</label>
          {["coding", "reading", "cricket"].map((int, idx) => (
            <label key={idx}>
              {int}
              <input
                type="checkbox"
                value={int}
                checked={values.interests.includes(int)}
                onChange={handleIntChange}
              />
            </label>
          ))}
        </div>

        <div className="field">
          <input
            type="checkbox"
            value={values.agreeToTerms}
            onChange={handleAgreeToTerms}
          />
          <span>i agree to the terms and conditions</span>
        </div>
      </form>
    </div>
  );
}

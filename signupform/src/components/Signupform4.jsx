import { useState } from "react";

const fields = [
  { name: "name", type: "text", label: "name" },
  { name: "email", type: "email", label: "email" },
  { name: "password", type: "password", label: "password" },
  { name: "confirmPassword", type: "password", label: "confirm password" },
];

export default function Signupform4() {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "male",
    interests: [],
    agreeToTerms: false,
  });

  function handleFormFieldChanges(e) {
    const { value, name } = e.target;
    setFormFields((fields) => ({ ...fields, [name]: value }));
  }

  function hanldeInterestChange(e) {
    const { value, checked } = e.target;

    const newInterest = checked
      ? [...formFields.interests, value]
      : formFields.interests.filter((item) => item !== value);

    setFormFields((fields) => ({ ...fields, interests: newInterest }));
  }

  function handleAgreeToTerms(e) {
    const { checked } = e.target;

    setFormFields((fields) => ({ ...fields, agreeToTerms: checked }));
  }

  return (
    <form className="form">
      {fields.map((field, idx) => (
        <div className="field" key={idx}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formFields[field.name]}
            onChange={handleFormFieldChanges}
          />
        </div>
      ))}

      {/* country */}
      <div className="field">
        <label htmlFor="country">
          country
          <select
            name="country"
            id="country"
            value={formFields.country}
            onChange={handleFormFieldChanges}
          >
            <option value="">-select options-</option>
            <option value="ind">india</option>
            <option value="us">usa</option>
            <option value="jap">japan</option>
            <option value="uk">united kingdom</option>
          </select>
        </label>
      </div>

      <div className="field">
        {["male", "female", "others"].map((gender, idx) => (
          <label key={idx}>
            {gender}
            <input
              type="radio"
              checked={formFields.gender === gender}
              name="gender"
              value={gender}
              onChange={handleFormFieldChanges}
            />
          </label>
        ))}
      </div>

      <div className="field">
        {["coding", "sports", "running", "reading"].map((int, idx) => (
          <label key={idx}>
            {int}
            <input
              type="checkbox"
              checked={formFields.interests.includes(int)}
              value={int}
              onChange={hanldeInterestChange}
            />
          </label>
        ))}
      </div>

      <label htmlFor="">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formFields.agreeToTerms}
          onChange={handleAgreeToTerms}
        />
        i agree to the terms and conditons
      </label>
    </form>
  );
}

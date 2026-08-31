import { useState } from "react";

export default function SignupForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    gender: "",
    interests: [],
    agreeToTerms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [erros, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "name is required filed";
    } else if (values.name.trim().length < 3) {
      newErrors.name = "name must be at lease 3 charaters";
    }

    if (!values.email.trim()) newErrors.email = "email is required";

    if (!values.password) {
      newErrors.password = "please enter the password";
    } else if (values.password.length < 6) {
      newErrors.password = "password must be at least 6 characters long";
    }

    if (!values.confirmPassword) {
      newErrors.confirmPassword = "please confirm your password";
    } else if (values.confirmPassword === values.password) {
      newErrors.confirmPassword = "confirm password not match with password";
    }

    if (values.country) newErrors.country = "pls select the country";

    if (values.gender) newErrors.gender = "pls select your gender";

    if (values.interests.length === 0)
      newErrors.interests = "pls choose at least one interest";

    if (values.agreeToTerms)
      newErrors.agreeToTerms = "you must be agree to terms and conditions";

    return newErrors;
  }

  function hanldeChanges(e) {
    const { value, name } = e.target;

    setValues((fields) => ({ ...fields, [name]: value }));
  }

  function hanldeSubmit(e) {
    e.preventDefault();

    const errors = validate(values);
    setErrors(errors);

    setSubmitted(true);
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedValues = { ...values, [name]: checked };
    setValues(updatedValues);

    if (submitted) {
      setErrors(validate(updatedValues));
    }
  };

  function hanldeInterests(e) {
    const { value, checked } = e.target;
    const updatedInterests = checked
      ? [...values.interests, value]
      : values.interests.filter((item) => item !== value);

    setValues((fields) => ({ ...fields, interests: updatedInterests }));
  }

  return (
    <div className="container">
      <form onSubmit={hanldeSubmit}>
        <div className="field">
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={hanldeChanges}
          />
          {erros.name && <p className="error">{erros.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={hanldeChanges}
          />
          {erros.email && <p className="error">{erros.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            value={values.password}
            onChange={hanldeChanges}
          />
          {erros.password && <p className="error">{erros.password}</p>}
        </div>
        <div className="field">
          <label htmlFor="confirmPassword">confirmPassword</label>
          <input
            type="text"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={hanldeChanges}
          />
          {erros.confirmPassword && (
            <p className="error">{erros.confirmPassword}</p>
          )}
        </div>

        {/* countery */}
        <div className="field">
          <label htmlFor="country">country</label>

          <select
            name="country"
            value={values.country}
            onChange={hanldeChanges}
          >
            <option value="">--Select Coutnry--</option>
            <option value="inr">India</option>
            <option value="us">USA</option>
            <option value="jap">Japan</option>
          </select>
          {erros.countery && <p className="error">{erros.countery}</p>}
        </div>

        {/* Gender */}
        <div className="field">
          <p>Gender</p>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value={"female"}
                checked={values.gender === "female"}
                onChange={hanldeChanges}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value={"male"}
                checked={values.gender === "male"}
                onChange={hanldeChanges}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value={"other"}
                checked={values.gender === "other"}
                onChange={hanldeChanges}
              />
              others
            </label>
          </div>
          {erros.gender && <p className="error">{erros.gender}</p>}
        </div>

        {/* interests */}
        <div className="filed">
          <p>interests</p>
          <div className="radio-group">
            <label>
              <input
                type="checkbox"
                value={"coding"}
                checked={values.interests.includes("coding")}
                onChange={hanldeInterests}
              />
              coding
            </label>
            <label>
              <input
                type="checkbox"
                value={"sports"}
                checked={values.interests.includes("sports")}
                onChange={hanldeInterests}
              />
              sports
            </label>
            <label>
              <input
                type="checkbox"
                value={"reading"}
                checked={values.interests.includes("reading")}
                onChange={hanldeInterests}
              />
              reading
            </label>
          </div>
          {erros.interests && <p className="error">{erros.interests}</p>}
        </div>

        <div className="field">
          <label>
            <input
              type="checkbox"
              checked={values.agreeToTerms}
              onChange={handleCheckboxChange}
            />
            I agree to the terms and conditions
          </label>
          {erros.agreeToTerms && <p className="error">{erros.agreeToTerms}</p>}
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

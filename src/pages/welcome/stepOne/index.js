import Form from "../../../components/form";
import TextInput from "../../../components/form/textInput";
import { useState } from "react";

const StepOne = ({ data, setData, setValidForm }) => {
  const [requiredFirstName, setRequiredFirstName] = useState(false);
  const [requiredLastName, setRequiredLastName] = useState(false);

  const checkValidFirstName = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" && value.length !== 0) {
      setRequiredFirstName(true);
    } else if (name === "firstName" && value.length === 0) {
      setRequiredFirstName(false);
    }
  };

  const checkValidLastName = (e) => {
    const { name, value } = e.target;
    if (name === "lastName" && value.length !== 0) {
      setRequiredLastName(true);
    } else if (name === "lastName" && value.length === 0) {
      setRequiredLastName(false);
    }
  };

  const checkValidBothNames = () => {
    if (requiredFirstName && requiredLastName) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  };

  const handleInput = (e) => {
    setData(e);
    checkValidFirstName(e);
    checkValidLastName(e);
  };

  checkValidBothNames();

  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={handleInput}
            value={data.firstName}
            name="firstName"
            label={"First name *"}
            required
          />
          <TextInput
            onChange={handleInput}
            value={data.lastName}
            name="lastName"
            label={"Last name *"}
            required
          />
          <TextInput
            onChange={setData}
            value={data.githubUsername}
            name="githubUsername"
            label={"Github Username"}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;

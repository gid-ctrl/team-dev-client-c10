import Form from "../../../components/form";
import TextInput from "../../../components/form/textInput";
import { useState } from "react";

const StepOne = ({ data, setData, setValidForm }) => {
  const [requiredFirstName, setRequiredFirstName] = useState(false);
  const [requiredLastName, setRequiredLastName] = useState(false);

  console.log("reqFirst 1", requiredFirstName);
  console.log("reqLast 1", requiredLastName);

  //function valid first name
  // return boolean if valid
  const checkValidFirstName = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" && value.length !== 0) {
      setRequiredFirstName(true);
    }
  };

  //function val last name
  // return boolean if valid
  const checkValidLastName = (e) => {
    const { name, value } = e.target;
    if (name === "lastName" && value.length !== 0) {
      setRequiredLastName(true);
    }
  };

  // has to be first && last -valid
  // if yes then setFormvalid to true
  const checkValidBothNames = () => {
    checkValidFirstName();
    checkValidLastName();
    if (requiredFirstName && requiredLastName) {
      setValidForm(true);
    }
  };

  console.log("data", data);
  console.log("reqFirst 2", requiredFirstName);
  console.log("reqLast 2", requiredLastName);
  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.firstName}
            name="firstName"
            label={"First name *"}
            required
          />
          {/* <span className="error-message">{requiredInput}</span> */}
          <TextInput
            onChange={setData}
            value={data.lastName}
            name="lastName"
            label={"Last name *"}
            required
          />
          {/* <span className="error-message">{requiredInput}</span> */}
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

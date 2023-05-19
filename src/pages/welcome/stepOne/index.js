import Form from "../../../components/form";
import TextInput from "../../../components/form/textInput";
import { useState } from "react";

const StepOne = ({ data, setData }) => {
  const [requiredInput, setRequiredInput] = useState();

  const onChange = (e) => {

    console.log("e.target", e.target);
    console.log("name", e.target.name);
    console.log("value", e.target.value);

    const { name, value } = e.target;

    if (name === "firstName") {
      if (value === "") {
        setRequiredInput("First name is required");
      }
    } else if (name === "lastName") {
      if (value === "") {
        setRequiredInput("Last name is required");
      }
    } else {
      setRequiredInput("");
    }
    setData({ ...FormData, [name]: value });
  };

  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <TextInput
            onChange={onChange}
            value={data.firstName}
            name="firstName"
            label={"First name *"}
            // required={required}
          />
          <span className="error-message">{requiredInput}</span>
          <TextInput
            onChange={onChange}
            value={data.lastName}
            name="lastName"
            label={"Last name *"}
            // required={required}
          />
          <span className="error-message">{requiredInput}</span>
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

import Form from "../../../components/form";

const StepFour = ({ data, setData }) => {
  console.log("bio:", data.bio);

  
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <textarea
            name="bio"
            value={data.bio}
            onChange={setData}
            placeholder="Tell us about yourself, your professional and educational highlights to date..."
          ></textarea>
          <p className="text-blue1">Optional</p>
        </div>
      </Form>
    </>
  );
};

export default StepFour;

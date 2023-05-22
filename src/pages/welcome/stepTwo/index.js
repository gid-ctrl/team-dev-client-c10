import Form from "../../../components/form"

const StepTwo = ({ data, setData }) => {
    return (
        <>
            <div className="welcome-formheader">
                <h3>Step 2</h3>
            </div>
            <Form className="welcome-form">
                <div className="welcome-form-inputs">
                  <p>Hello!</p>
                    <p className="text-blue1">*Required</p>
                </div>
            </Form>
        </>
    )
}

export default StepTwo
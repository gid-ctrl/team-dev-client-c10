import Form from "../../../components/form"
import TextInput from "../../../components/form/textInput"

const StepOne = ({ data, setData }) => {
    return (
        <>
            <div className="welcome-formheader">
				<h3>Basic info</h3>
			</div>
            <Form className="welcome-form">
                <div className="welcome-form-inputs">
                    <TextInput onChange={setData} value={data.firstName} name="firstName" label={"First name *"} required />
                    <TextInput onChange={setData} value={data.lastName} name="lastName" label={"Last name *"} required />
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
    )
}

export default StepOne
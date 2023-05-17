import { Route } from "react-router-dom";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";

import "./style.css";

const ViewProfile = () => {
  return (
    <>
      <main>
        <h2>Profile</h2>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
          </div>
        </Card>

        <h4>Basic info</h4>
        <div className="profile-icon">
              <p>AJ</p>
              <TextInput/>

            </div>
            
      </main>
    </>
  );
};

export default ViewProfile;

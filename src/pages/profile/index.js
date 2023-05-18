import { Route } from "react-router-dom";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";
import "./style.css";
import "../../styles/index.css"

const hrStyle = {
  backgroundColor: "black",
  height: 0.5
}

const ViewProfile = () => {
  return (
    <>
      <main>
        <h2>Profile</h2>
        <Card>

          <div className="profile-container">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <div className="profile-summary">
              <h3>Full name</h3>
              <p>Title</p>
            </div>
          </div>

          <div className="main-info-grid">

            <div className="basic-info">
              <hr style={hrStyle}/>
              <br/>
              <div className="basic-info-content info-grid">
                <h4>Basic info</h4>
                <div className="profile-icon">
                  <p>AJ</p>
                  <TextInput/>
                </div>
              </div>
            </div>
            
            <div className="training-info">
              <hr style={hrStyle}/>
              <br/>
                <h4>Training info</h4>
              <div className="training-info-content info-grid">
              </div>
            </div>

            <div className="contact-info">
              <hr style={hrStyle}/>
              <br/>
                <h4>Contact info</h4>
              <div className="contact-info-content info-grid">
                <p>Email*</p>
                <textarea rows="1" cols="40" className="textarea-small"></textarea>

                <p>Mobile*</p>
                <textarea rows="" cols="40" className="textarea-small"></textarea>

                <p>Password*</p>
                <textarea rows="" cols="40" className="textarea-small"></textarea>
              </div>
            </div>

            <div className="bio">
              <hr style={hrStyle}/>
              <br/>
                <h4>Bio</h4>
              <div className="bio-content">
                <p>Bio</p>
                <textarea rows="" cols="40"></textarea>
              </div>
            </div>

          </div>

        </Card>

            
      </main>
    </>
  );
};

export default ViewProfile;

import { Route, useNavigate } from "react-router-dom";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";
import "./style.css";
import "../../styles/index.css";
import LockIcon from "../../assets/icons/locIcon";
import EyeIcon from "../../assets/icons/eyeIcon";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode"
import { useEffect, useState } from 'react'
import { get } from '../../service/apiClient'


const hrStyle = {
  backgroundColor: "#e6ebf5",
  height: 1,
};

const ViewProfile = () => {
  const navigate = useNavigate();
  const [ userId, setUserId ] = useState()
	const { token } = useAuth();

  const handleClick = () => {
    navigate("/profile/1/edit");
  };

  const getUserInfo = async (userId) => {
    get()
  }
  // getUserInfo()

  useEffect(() => {
      const { userId } = jwt_decode(token)
      setUserId(userId)
  }, [token]);

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
              <hr style={hrStyle} />
              <br />
              <div className="basic-info-content info-grid">
                <h4 className="padding-title">Basic info</h4>
                <br />
                <p>Photo</p>
                <div className="profile-icon">
                  <p>AJ</p>
                  <TextInput />
                </div>
              </div>
              <br></br>
              <small className="padding-field-name">First Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Alex"
                disabled
              ></textarea>
              <small className="padding-field-name">Last Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Walker"
                disabled
              ></textarea>
              <small className="padding-field-name">Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Alex Walker"
                disabled
              ></textarea>
              <small className="padding-field-name">GitHub Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="alex-walker"
                disabled
              ></textarea>
            </div>

            <div className="training-info">
              <hr style={hrStyle} />
              <br />
              <h4 className="padding-title">Training info</h4>
              <div className="training-info-content info-grid">
                <small className="padding-field-name">Role*</small>
                <div className="training-info">
                  <textarea
                    rows="1"
                    cols="40"
                    className="textarea-small"
                    placeholder="Student"
                    disabled
                  ></textarea>
                  <div className="lock-icon">
                    <LockIcon />
                  </div>
                </div>

                <small className="padding-field-name">Specialism*</small>
                <div className="training-info">
                  <textarea
                    rows=""
                    cols="40"
                    className="textarea-small"
                    placeholder="Software Developer"
                    disabled
                  ></textarea>
                  <div className="lock-icon">
                    <LockIcon />
                  </div>
                </div>

                <small className="padding-field-name">Cohort*</small>
                <div className="training-info">
                  <textarea
                    rows=""
                    cols="40"
                    className="textarea-small"
                    placeholder="Cohort 4"
                    disabled
                  ></textarea>
                  <div className="lock-icon">
                    <LockIcon />
                  </div>
                </div>

                <small className="padding-field-name">Start Date*</small>
                <div className="training-info">
                  <textarea
                    rows=""
                    cols="40"
                    className="textarea-small"
                    placeholder="January 2023"
                    disabled
                  ></textarea>
                  <div className="lock-icon">
                    <LockIcon />
                  </div>
                </div>

                <small className="padding-field-name">End Date*</small>
                <div className="training-info">
                  <textarea
                    rows=""
                    cols="40"
                    className="textarea-small"
                    placeholder="January 2023"
                    disabled
                  ></textarea>
                  <div className="lock-icon">
                    <LockIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info">
              <hr style={hrStyle} />
              <div className="contact-info-content info-grid">
                <h4 className="padding-title">Contact info</h4>
                <div className="padding-top"></div>
                <small className="padding-field-name">Email*</small>
                <textarea
                  cols="40"
                  className="textarea-small"
                  placeholder="alex.walker@boolean.co.uk"
                  disabled
                ></textarea>
                <div className="padding"></div>
                <small className="padding-field-name">Mobile*</small>
                <textarea
                  cols="40"
                  className="textarea-small"
                  placeholder="07890 123456"
                  disabled
                ></textarea>
                <div className="padding"></div>
                <small className="padding-field-name">Password*</small>
                <div class="input-container">
                  <div className="password-field">
                    <textarea
                      rows="10"
                      cols="40"
                      class="textarea-small"
                      name="password"
                      placeholder="***************"
                      disabled
                      required
                    ></textarea>
                    <EyeIcon className="eye-icon"/>
                  </div>
                </div>

                <div className="padding-bottom"></div>
                <br></br>
                <small>*Required</small>
                <br></br>
              </div>
            </div>

            <div className="bio">
              <div className="bio-content">
                <hr style={hrStyle} />
                <h4>Bio</h4>
                <div className="padding-top"></div>
                <small>Bio</small>
                <textarea
                  placeholder="Tell us about yourself, your professional and educational highlights to date..."
                  spellCheck="false"
                ></textarea>
                <small>0/300</small>
              </div>
              <div class="button-container">
                <button
                  type="button"
                  class="button offwhite"
                  onClick={handleClick}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default ViewProfile;

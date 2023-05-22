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


const ViewProfile = () => {
  const navigate = useNavigate();
	const { userId } = useAuth();
  const [user, setUser] = useState({})
  const [userInitials, setUserInitials] = useState(``)

  const handleClick = () => {
    navigate("/profile/1/edit");
  };
 

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await get(`users/${userId}`)
      setUser(userInfo.data.user)
      setUserInitials(getInitailsFromUser(userInfo.data.user))
    }
    getUserInfo()
  }, [userId]);

  const userDisplayName = (user) => {
    return `${user.firstName} ${user.lastName}`
  }

  const cohortDisplayName = (cohortId) => {
    return `Cohort ${cohortId}`
  }

  const getInitailsFromUser = (user) => {
    const firstInital = user.firstName.slice(0, 1)
    const lastInital = user.lastName.slice(0, 1)
    return `${firstInital}${lastInital}`
  }

  return (
    <>
      <main>
        <h2>Profile</h2>
        <Card>
          <div className="profile-container">
            <div className="profile-icon">
              <p>{userInitials}</p>
            </div>
            <div className="profile-summary">
              <h3>{userDisplayName(user)}</h3>
              <p>Software Developer</p>
            </div>
          </div>

          <div className="main-info-grid">
            <div className="basic-info">
              <hr class="hr-line" />
              <br />
              <div className="basic-info-content info-grid">
                <h4 className="padding-title">Basic info</h4>
                <br />
                <p>Photo</p>
                <div className="profile-icon">
                  <p>{userInitials}</p>
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
                value={user.firstName}
              ></textarea>
              <small className="padding-field-name">Last Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Walker"
                disabled
                value={user.lastName}

              ></textarea>
              <small className="padding-field-name">Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Alex Walker"
                disabled
                value={userDisplayName(user)}

              ></textarea>
              <small className="padding-field-name">GitHub Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="alex-walker"
                disabled
                value={user.githubUrl}

              ></textarea>
            </div>

            <div className="training-info">
              <hr class="hr-line" />
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
                    value={user.role}
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
                    value={cohortDisplayName(user.cohortId)}
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
              <hr class="hr-line" />
              <div className="contact-info-content info-grid">
                <h4 className="padding-title">Contact info</h4>
                <div className="padding-top"></div>
                <small className="padding-field-name">Email*</small>
                <textarea
                  cols="40"
                  className="textarea-small"
                  placeholder="alex.walker@boolean.co.uk"
                  disabled
                  value={user.email}

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
                <hr class="hr-line" />
                <h4>Bio</h4>
                <div className="padding-top"></div>
                <small>Bio</small>
                <textarea
                  placeholder="Tell us about yourself, your professional and educational highlights to date..."
                  spellCheck="false"
                  value={user.bio}

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

import { useNavigate } from "react-router-dom";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";
import "./style.css";
import "../../styles/index.css";
import LockIcon from "../../assets/icons/locIcon";
import EyeIcon from "../../assets/icons/eyeIcon";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from 'react'
import { get } from '../../service/apiClient'
import { useParams } from 'react-router-dom';

const ViewProfile = () => {
  const navigate = useNavigate();
	const { userId } = useAuth();
  const urlParams = useParams();
  const [allowedToEdit, setAllowedToEdit] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const [userInitials, setUserInitials] = useState(``)
  const [user, setUser] = useState({id: ""})


  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await get(`users/${userId}`)
      setUser(userInfo.data.user)
    }
    getUserInfo()
  })
 
  const handleClick = () => {
    navigate(`/profile/${urlParams.id}/edit`);
  };
 
  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await get(`users/${urlParams.id}`)
      setUserProfile(userInfo.data.user)
      setUserInitials(getInitailsFromUser(userInfo.data.user))
    }
    getUserInfo()
  }, [urlParams.id, allowedToEdit]);

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

  const checkUserAllowedToEdit = (loggedInUser, profilePageId) => {
    if (loggedInUser === undefined) { 
      setAllowedToEdit(false)
      return null
    }
    if (loggedInUser.role === "TEACHER") {
      setAllowedToEdit(true)
    } else if (loggedInUser.id.toString() === profilePageId) {
      setAllowedToEdit(true)
    } else {
      setAllowedToEdit(false)
    }
  }

  useEffect(() => {
    checkUserAllowedToEdit(user, urlParams.id)
  }, [urlParams.id, userProfile.id, user.id])


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
              <h3>{userDisplayName(userProfile)}</h3>
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
                value={userProfile.firstName}
              ></textarea>
              <small className="padding-field-name">Last Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Walker"
                disabled
                value={userProfile.lastName}

              ></textarea>
              <small className="padding-field-name">Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="Alex Walker"
                disabled
                value={userDisplayName(userProfile)}

              ></textarea>
              <small className="padding-field-name">GitHub Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder="alex-walker"
                disabled
                value={userProfile.githubUrl}

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
                    value={userProfile.role}
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
                    value={cohortDisplayName(userProfile.cohortId)}
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
                  value={userProfile.email}

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
                  value={userProfile.bio}

                ></textarea>
                <small>0/300</small>
              </div>
              <div class="button-container">
                { allowedToEdit ? (
                  <button
                    type="button"
                    class="button offwhite"
                    onClick={handleClick}
                  >
                    Edit
                  </button>
                  ) : null
                }
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default ViewProfile;

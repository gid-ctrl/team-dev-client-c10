import Card from "../../components/card";
import "./style.css";
import "../../styles/index.css";
import LockIcon from "../../assets/icons/locIcon";
import EyeIcon from "../../assets/icons/eyeIcon";
import { get } from "../../service/apiClient";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { patch } from "../../service/apiClient";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { userId } = useAuth();
  const urlParams = useParams();
  const [userInitials, setUserInitials] = useState(``);
  const [user, setUser] = useState({ id: "" });
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});


  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await get(`users/${userId}`);
      setLoggedInUser(userInfo.data.user);
    }
    getUserInfo();
  }, [userId]);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await get(`users/${urlParams.id}`);
      setUser(userInfo.data.user);
      setUserInitials(getInitailsFromUser(userInfo.data.user));
    }
    getUserInfo();
  }, [urlParams.id]);

  const updateUser = async () => {
    const response = await patch(`users/${urlParams.id}`, updatedProfile);
  };

  const handleSaveButtonClick = async () => {
    await updateUser();
  };

  const userDisplayName = (user) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const cohortDisplayName = (cohortId) => {
    return `Cohort ${cohortId}`;
  };

  const getInitailsFromUser = (user) => {
    const firstInital = user.firstName.slice(0, 1);
    const lastInital = user.lastName.slice(0, 1);
    return `${firstInital}${lastInital}`;
  };

  const handleFirstNameChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, firstName: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const handleCohortIdChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, cohortId: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const handleGitHubUrlChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, githubUrl: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const handleEmailChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, email: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const handleRoleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, role: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const handleLastNameChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, lastName: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

  const hanleBioChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, bio: e.target.value });
    if (e.target.value === "") {
      console.log("Please input information");
    }
  };

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
              <hr className="hr-line" />
              <div className="basic-info-content info-grid">
                <h4 className="padding-title">Basic info</h4>
                <br />
                <p>Photo</p>
                <div className="profile-icon">
                  <p>{userInitials}</p>
                </div>
              </div>
              <small className="padding-field-name">First Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder={user.firstName}
                onChange={handleFirstNameChange}
              ></textarea>
              <small className="padding-field-name">Last Name*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder={user.lastName}
                onChange={handleLastNameChange}
              ></textarea>
              <small className="padding-field-name">Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder={userDisplayName(user)}
              ></textarea>
              <small className="padding-field-name">GitHub Username*</small>
              <textarea
                rows=""
                cols="40"
                className="textarea-small"
                placeholder={user.githubUrl}
                onChange={handleGitHubUrlChange}
              ></textarea>
            </div>

            <div className="training-info">
              <hr className="hr-line" />
              <h4 className="padding-title">Training info</h4>
              <div className="training-info-content info-grid">
                <small className="padding-field-name">Role*</small>
                <div className="training-info">
                  {loggedInUser.role === 'TEACHER' ? (
                    <textarea
                      rows="1"
                      cols="40"
                      className="textarea-small"
                      placeholder={user.role}
                      onChange={handleRoleChange}
                    ></textarea>
                  ) : (
                    <textarea
                      rows="1"
                      cols="40"
                      className="textarea-small"
                      disabled
                      placeholder={user.role}
                    ></textarea>
                  )
                  }
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
                  {loggedInUser.role === 'TEACHER' ? (
                      <textarea
                        rows=""
                        cols="40"
                        className="textarea-small"
                        placeholder={user.cohortId}
                        onChange={handleCohortIdChange}
                      ></textarea>
                    ) : (
                      <textarea
                        rows=""
                        cols="40"
                        disabled
                        className="textarea-small"
                        placeholder={cohortDisplayName(user.cohortId)}
                      ></textarea>
                  )}
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
              <hr className="hr-line" />
              <div className="contact-info-content info-grid">
                <h4 className="padding-title">Contact info</h4>
                <div className="padding-top"></div>
                <small className="padding-field-name">Email*</small>
                <textarea
                  rows=""
                  cols="40"
                  className="textarea-small"
                  placeholder={user.email}
                  onChange={handleEmailChange}
                ></textarea>
                <div className="padding"></div>
                <small className="padding-field-name">Mobile*</small>
                <textarea
                  cols="40"
                  className="textarea-small"
                  placeholder="07890 123456"
                ></textarea>
                <div className="padding"></div>
                <div className="padding"></div>
                {userId === user.id && (
                  <>
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
                        <EyeIcon className="eye-icon" />
                      </div>
                    </div>
                  </>
                )}
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
                  spellCheck="false"
                  placeholder={user.bio}
                  onChange={hanleBioChange}
                ></textarea>
                <small>0/300</small>
              </div>

              <div className="button-container">
                <button type="button" class="button offwhite">
                  Cancel
                </button>
                <button
                  type="button"
                  className="button blue"
                  onClick={handleSaveButtonClick}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};
export default EditProfile;

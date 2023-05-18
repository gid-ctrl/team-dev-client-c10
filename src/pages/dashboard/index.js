import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import "./style.css";
import { get } from "../../service/apiClient";

const Dashboard = ({ name, userInitials }) => {
  const [searchVal, setSearchVal] = useState("");
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [triggerUpdate, setTriggerUpdate] = useState(false)

  useEffect(() => {
    get("users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);


  const onChange = (e) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    setShowResults(true);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();
	// Create a function to run on user interaction
	const showModal = () => {
		// Use setModal to set the header of the modal and the component the modal should render
		setModal("Create a post", <CreatePostModal triggerUpdate = {triggerUpdate} setTriggerUpdate = {setTriggerUpdate} />); // CreatePostModal is just a standard React component, nothing special

  // Create a function to run on user interaction
 
    openModal();
  };
  const filteredUsers = users.filter(
    (user) =>
      user.firstName &&
      user.lastName &&
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchVal.toLowerCase())
  );
    
  
  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts triggerUpdate={triggerUpdate} setTriggerUpdate = {setTriggerUpdate} />
      </main>

      <aside>
        <Card>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              name="Search"
              onChange={onChange}
            />

            <br />

            {showResults && (
              <div className="dropdown">
                {(() => {
                  if (filteredUsers.length === 0) {
                    return (
                      <>
                        <h5>People</h5>
                        <hr className="line" />
                        <br />

                        <p>No users Found</p>
                        <Button text={"Edit"} />
                      </>
                    );
                  } else if (filteredUsers.length >= 2) {
                    return (
                      <>
                        <h5>People</h5>
                        <hr className="line" />
                        <br />
                        {filteredUsers.map((user) => (
                          <div className="nameSearch" key={user.id}>
                            {user.firstName.length !== 0 && (
                              <>
                                <div className="profile-icon" id="align">
                                  {user.firstName?.[0]}
                                  {user.lastName?.[0]}
                                </div>
                                <div className="name-tag-role">
                                  <p id="searched-name">
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <div className="role">
                                    {user.role[0]}
                                    {user.role.toLowerCase().slice(1)}
                                  </div>
                                </div>
                                <div className="edit-icon">
                                  <p>...</p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                        <Button text={"See all results"}></Button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <h5>People</h5>
                        <hr className="line" />
                        <br />
                        {filteredUsers.map((user) => (
                          <div className="nameSearch" key={user.id}>
                            {user.firstName.length !== 0 && (
                              <>
                                <div className="profile-icon" id="align">
                                  {user.firstName?.[0]}
                                  {user.lastName?.[0]}
                                </div>
                                <div className="name-tag-role">
                                  <p id="searched-name">
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <div className="role">
                                    {user.role[0]}
                                    {user.role.toLowerCase().slice(1)}
                                  </div>
                                </div>
                                <div className="edit-icon">
                                  <p>...</p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    );
                  }
                })()}
              </div>
            )}
          </form>
        </Card>
        <Card>
          <h4>My Cohort</h4>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import "./style.css";

const Dashboard = ({ name, userInitials }) => {
  const [searchVal, setSearchVal] = useState("");
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(false);
//   const [filteredUsers, setFilteredUsers] =useState([])



  useEffect(() => {
    fetch(`https://team-dev-backend-api-c9.fly.dev/users`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDMyNTU1NCwiZXhwIjoxNjg0NDExOTU0fQ.NhxsXHYZlFvYCO2PXqQD2D6Jbz7I6NCwS-UjrY3NXoU",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        JSON.stringify(json);
        console.log(json);
        setUsers(json.data.users);
		// setFilteredUsers(json.data.users)
      });
  }, []);

  const onChange = (e) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    setShowResults(true);
    console.log(searchVal);
	
	// if (searchVal.length === 0) {
	// 	setFilteredUsers(users);
	// } else {

	// 	const filteredUsers = users.filter(
	// 		(user) =>
	// 		  user.firstName &&
	// 		  user.lastName &&
	// 		  `${user.firstName} ${user.lastName}`
	// 			.toLowerCase()
	// 			.includes(searchVal.toLowerCase())
	// 	  );
	// 	setFilteredUsers(filteredUsers);
	// }
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal("Create a post", <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
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
  
  
console.log('filtered users',filteredUsers, filteredUsers.length);

  if(filteredUsers.length === 0) {

		console.log('no users found')

  }
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

        <Posts />
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

    {showResults && (
      <div className="dropdown">
        {(() => {
          if (filteredUsers.length === 0) {
            return <Button text={"Edit"} />;
		}
			else if(filteredUsers.length > 9) {
				console.log('users > 10');
			}
           else {
            return filteredUsers.map((user) => (
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
                  </>
                )}
              </div>
            ));
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

import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import jwt_decode from "jwt-decode";
import { get } from "../../service/apiClient";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/_buttons.css"
import "./style.css";
import ProfileCircle from "../../components/profileCircle"


const Dashboard = () => {
	const [searchVal, setSearchVal] = useState('');
	const [triggerUpdate, setTriggerUpdate] = useState(false)
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({})
	const [userInitials, setUserInitials] = useState("")
	const [userName, setUserName] = useState("")
	const [showResults, setShowResults] = useState(false);
	const { token } = useAuth()
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [id, setId] =useState('hidden')
  
  useEffect(() => {
    get("users").then((response) => {
      setUsers(response.data.users);
    });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const { userId } = jwt_decode(token);
      const res = await get(`users/${userId}`);
      const user = res.data.user;
      setCurrentUser(user);
      setUserName(`${user.firstName} ${user.lastName?.[0]}`);
      setUserInitials(`${user.firstName?.[0]}${user.lastName?.[0]}`);
    };
    fetchData();
  }, [token, setCurrentUser]);

  const onChange = (e) => {
    const searchVal = e.target.value;
    setSearchVal(searchVal);
    setShowResults(true);

  };

  const handleFormFocus = () => {
    setIsFormFocused(true);
    setShowResults(true)
    setId('')

  };
  
  const handleFormMouseDown = (e) => {
    if (!e.target.closest('form')) {
      setIsFormFocused(false);
      setShowResults(false);
    }

  }

  useEffect(() => {
    document.addEventListener('mousedown', handleFormMouseDown);
  }, [])


  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();
  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal(
      "Create a post",
      <CreatePostModal
        triggerUpdate={triggerUpdate}
        setTriggerUpdate={setTriggerUpdate}
        userName={userName}
        userInitials={userInitials}
      />
    ); // CreatePostModal is just a standard React component, nothing special

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
							<p>{userInitials}</p>
						</div>
						<Button text="What's on your mind?" onClick={showModal} />
					</div>
				</Card>
        <Posts triggerUpdate={triggerUpdate} setTriggerUpdate = {setTriggerUpdate} currentUser={currentUser}/>
      </main>

      <aside>
        <Card>
          <form 
          onSubmit={(e) => e.preventDefault()} 
          onMouseDown={handleFormMouseDown}
          onFocus={handleFormFocus}
          >
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              name="Search"
              onChange={onChange}
              placeholder='Search for people'
            />
            <br />
            {isFormFocused && (
               <Card id={id}>
               {showResults && (
                 <div className="dropdown">
                   {(() => {
                     if (filteredUsers.length === 0) {
                       return (
                         <>
                           <h5>People</h5>
                           <hr className="line" />
                           <br />
                           <p>Sorry, no results found.</p>
                           <p>Try changing your search term.</p>
                           <br/>                     
                             <Link to={'/search'}><Button text={"Edit search"} classes="button offwhite"/>
                             </Link>
                           
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
                                <ProfileCircle id="search-element" initials= {`${user.firstName?.[0]}${user.lastName?.[0]}`} />
                                   <div id="post-user-name">
                                     <p>
                                       {user.firstName} {user.lastName}
                                     </p>
                                     <small>
                                       {user.role[0]}
                                       {user.role.toLowerCase().slice(1)}
                                     </small>
                                   </div>
                                   <div className="edit-icon">
                                     <p>...</p>
                                   </div>
                                  
                                 </>
                               )}
                             </div>
                           ))}
                           <br/>
                           <Link to={'/search'}><Button text={"See all results"} classes="button offwhite"></Button></Link>
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
                                 <ProfileCircle id="search-element" initials= {`${user.firstName?.[0]}${user.lastName?.[0]}`} />
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
       
           </Card>
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

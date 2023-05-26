import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import CohortList from "../../components/cohortList";
import jwt_decode from "jwt-decode"
import { get } from "../../service/apiClient";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../styles/_buttons.css"
import "./style.css";
import ProfileButton from "../../components/profileButton";
import Form from "../../components/form";



const Dashboard = () => {
	const [searchVal, setSearchVal] = useState('');
	const [triggerUpdate, setTriggerUpdate] = useState(false)
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({})
	const [currentUserInitials, setCurrentUserInitials] = useState("")
	const [currentUserName, setCurrentUserName] = useState("")
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
		const { userId } = jwt_decode(token)
		const res = await get(`users/${userId}`)
		const user = res.data.user
		setCurrentUser(user)
		setCurrentUserName(`${user.firstName} ${user.lastName?.[0]}`)
		setCurrentUserInitials(`${user.firstName?.[0]}${user.lastName?.[0]}`)
	}
	fetchData()
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

  const { openModal, setModal } = useModal();
	const showModal = () => {
		setModal("Create a post", <CreatePostModal triggerUpdate = {triggerUpdate} setTriggerUpdate = {setTriggerUpdate} currentUserName = {currentUserName} currentUserInitials = {currentUserInitials} />);

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

  const students = users.filter(
    (user) => 
    user.role === "STUDENT")
  
	return (
		<>
			<main>
				<Card>
					<div className="create-post-input">
						<div className="profile-icon">
							<p>{currentUserInitials}</p>
						</div>
						<Button text="What's on your mind?" onClick={showModal} />
					</div>
				</Card>
        <Posts triggerUpdate={triggerUpdate}
        setTriggerUpdate = {setTriggerUpdate}
        currentUserName={currentUserName}
        currentUserInitials={currentUserInitials}
        currentUser={currentUser} />
      </main>

      <aside>
        <Card>
          <Form 
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
                     } else if (filteredUsers.length >= 10) {
                       return (
                         <>
                           <h5>People</h5>
                           <hr className="line" />
                           <br />
                           {filteredUsers.map((user) => (
                             <div className="nameSearch" key={user.id}>
                               {user.firstName.length !== 0 && (
                                 <>
                                <ProfileButton id={user.id} initials= {`${user.firstName?.[0]}${user.lastName?.[0]}`} />
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
                                 <ProfileButton id={user.id} initials= {`${user.firstName?.[0]}${user.lastName?.[0]}`} />
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
            </Form>
            </Card>
           
        {currentUser.role === "STUDENT" && (
          <Card>
            <CohortList 
              currentUser = {currentUser}
              users = {users}/>
          </Card>)}

        {currentUser.role === "TEACHER" && (
          <>
          <Card>
            <p>List of Cohorts</p>
          </Card>
          <Card>
          <h4>Students</h4>
          <hr className="line"/>
          {students.map((user) => (
                             <div className="nameSearch" key={user.id}>
                               {user.firstName.length !== 0 && (
                                 <>
                                 <ProfileButton id={user.id} initials= {`${user.firstName?.[0]}${user.lastName?.[0]}`} />
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
                           <br/>
                           <hr className="line"/>
                           <br/>
                            <Link to={'/search'}><Button text={"All students"} classes="button offwhite"></Button></Link>
          
          </Card>
          <Card>
            <p>List of teachers</p>
          </Card>
          </>)}
        
      </aside>
    </>
  );
};

export default Dashboard;

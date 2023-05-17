import { useEffect, useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import Button from "../../components/button";
import Card from "../../components/card";
import CreatePostModal from "../../components/createPostModal";
import TextInput from "../../components/form/textInput";
import Posts from "../../components/posts";
import useModal from "../../hooks/useModal";
import "./style.css";

const Dashboard = () => {
	const [searchVal, setSearchVal] = useState('');
	const [users, setUsers] = useState([])

	const onChange = (e) => {
		const searchVal = e.target.value
		setSearchVal(searchVal);
		console.log(searchVal)
		

	};

	useEffect(() => {
		fetch(`https://team-dev-backend-api-c9.fly.dev/users`, {
			headers: {
				Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4NDMyNTU1NCwiZXhwIjoxNjg0NDExOTU0fQ.NhxsXHYZlFvYCO2PXqQD2D6Jbz7I6NCwS-UjrY3NXoU'
			}
	})
		.then((res) => res.json())
		.then(json => console.log('yay', JSON.stringify(json)))
	}, [])

	  

	// Use the useModal hook to get the openModal and setModal functions
	const { openModal, setModal } = useModal();

	// Create a function to run on user interaction
	const showModal = () => {
		// Use setModal to set the header of the modal and the component the modal should render
		setModal("Create a post", <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

		// Open the modal!
		openModal();
	};

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

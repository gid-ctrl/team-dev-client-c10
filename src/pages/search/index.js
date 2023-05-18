import TextInput from "../../components/form/textInput";
import { useState, useEffect } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import "./search.css";
import BackButton from "../../components/backbutton"
import { getUsers } from "../../service/apiClient"
import SearchResults from "../../components/searchResults"


function SearchPage () {
    // create a state hook that will store the fetched data.
    const [formData, setFormData] = useState('')
    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    

    useEffect(() => {
        getUsers().then(setUsers)
        
    }, [])
   
    useEffect(() => {
        getUsers().then(setResults)
    }, [])
    
   
    
    // create the onChange event listener that will log the text being entered in the field.
    const onChange = (event) => {
        
        
        setFormData(event.target.value)
        
        const filtered = users.map(object => {
            object["fullName"] = `${object.firstName.toLowerCase()} ${object.lastName.toLowerCase()}`
            return object
        }).filter((object) => {
            
            return object.fullName.includes(event.target.value.toLowerCase())
            
        })
        
        setResults(filtered)
        
    }
    

    // THIS IS THE ARRAY THAT CONTAINS THE INFORMATION OF THE LIST TO BE RENDERED!
    console.log(results)

    return (
        <>

        <div className="parent">
            <BackButton />
            <h1>Search Results</h1>
            <section className="searchparent">
                <div className="">
                    <form onSubmit={(e) => e.preventDefault()}>
                    <TextInput
                    value={formData}
                    onChange={onChange}
                    name={'searchusers'}
                    label={'Search Results'}
                    type="text"
                    icon={<SearchIcon />}/>
                    </form>
                </div>
            </section>

            <section className="resultsparent">
                <div className="resultslist">
                <p>People</p>
                    <ul>
                        <li>
                            <div>
                                <img className="userpicture" src="https://cdn.discordapp.com/attachments/878744167507951619/1087346433885224991/image.png" alt="" height="55px"></img>
                            </div>
                            <div>
                                <h4>Kate Baker</h4>
                                <p>Software Developer, Cohort 3</p>
                            </div>
                            <div className="profiles">Profile</div>
                            <div className="profiles">. . .</div>
                        </li>
                        <li> 
                            <div>
                                <img className="userpicture" src="https://cdn.discordapp.com/attachments/878744167507951619/1087346433885224991/image.png" alt="" height="55px"></img>
                            </div>
                            <div>
                                <h4>Kate Baker</h4>
                                <p>Software Developer, Cohort 3</p>
                            </div>
                            <div className="profiles">Profile</div>
                            <div className="profiles">. . .</div>
                        </li>

                        <li> 
                            <div>
                                <img className="userpicture" src="https://cdn.discordapp.com/attachments/878744167507951619/1087346433885224991/image.png" alt="" height="55px"></img>
                            </div>
                            <div>
                                <h4>Kate Baker</h4>
                                <p>Software Developer, Cohort 3</p>
                            </div>
                            <div className="profiles">Profile</div>
                            <div className="profiles">. . .</div>
                        </li>
                        <li> 
                            <div>
                                <img className="userpicture" src="https://cdn.discordapp.com/attachments/878744167507951619/1087346433885224991/image.png" alt="" height="55px"></img>
                            </div>
                            <div>
                                <h4>Kate Baker</h4>
                                <p>Software Developer, Cohort 3</p>
                            </div>
                            <div className="profiles">Profile</div>
                            <div className="profiles">. . .</div>
                        </li>
                        <li> 
                            <div>
                                <img className="userpicture" src="https://cdn.discordapp.com/attachments/878744167507951619/1087346433885224991/image.png" alt="" height="55px"></img>
                            </div>
                            <div>
                                <h4>Kate Baker</h4>
                                <p>Software Developer, Cohort 3</p>
                            </div>
                            <div className="profiles">Profile</div>
                            <div className="profiles">. . .</div>
                        </li>

                    </ul>
                </div>
            </section>
            <SearchResults />
        </div>
        </>

    )
}

export default SearchPage
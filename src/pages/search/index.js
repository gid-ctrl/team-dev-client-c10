import TextInput from "../../components/form/textInput";
import { useState, useEffect } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import "./search.css";
import BackButton from "../../components/backbutton"
import { getUsers } from "../../service/apiClient"
import { Link } from "react-router-dom";

function SearchPage () {
    // create a state hook that will store the fetched data.
    const [formData, setFormData] = useState('')
    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    const [showMore, setShowMore] = useState(false)
    

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
        console.log(filtered)
        
        setResults(filtered)
        
    }

    const onSubmit = (event) => {
        event.preventDefault()
        getUsers().then(setUsers)
        getUsers().then(setResults)
        setFormData('')
    


    
    }

    const focusShowMore = () => {
        setShowMore(true)
    }

    const blurShowMore = () => {
        setShowMore(false)
    }
    

    return (
        <>

        <div className="parent">
            <BackButton />
            <h1>Search Results</h1>
            <section className="searchparent">
                <div className="">
                    {formData.length !== 0 
                    ? (<form onSubmit={onSubmit}>
                    <TextInput
                    value={formData}
                    onChange={onChange}
                    name={'searchusers'}
                    type="text"
                    icon={<SearchIcon />}/>

                    <button className="button">
                        X
                    </button>
                    
                    </form>) : (
                        <form onSubmit={onSubmit}>
                        <TextInput
                        value={formData}
                        onChange={onChange}
                        name={'searchusers'}
                        type="text"
                        icon={<SearchIcon />}/>
                        
                        </form>
                    )}

                </div>
            </section>

            <section className="resultsparent">
                <div className="resultslist">
                <p>People</p>
                    <ul>
                        {results.map((obj, index) => {
                        return (
                            <li key={index}>
                                <div className="profile-icon search-picture">
                                    <p>{obj.firstName[0]}{obj.lastName[0]}</p>
                                </div>
                                <div>
                                    <h4>{obj.firstName} {obj.lastName}</h4>

                                    {obj.cohortId !== null
                                        ? <p className="extrainfo">{obj.role}, Cohort {obj.cohortId}</p>
                                        : <p className="extrainfo">{obj.role}</p>
                                    }
                                
                                </div>
                                <Link to='/' className="profiles">Profile</Link>
                                {/* Requires link to profile page */}
                                <button className="edit-icon" onFocus={focusShowMore} onBlur={blurShowMore}>
                                    ...
                                </button>
                                {showMore && <div><Link to='/' className="profiles">Profile</Link></div>}
                            </li>
            )
            
        })}                            
                    </ul>
                </div>
            </section>
        </div>
        </>

    )
}

export default SearchPage
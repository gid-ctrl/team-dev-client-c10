import TextInput from "../../components/form/textInput";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import "./search.css";
import BackButton from "../../components/backbutton"
import { getUsers } from "../../service/apiClient"
import { Link } from "react-router-dom";
import CrossBlackIcon from "../../assets/icons/crossBlackIcon";
import ProfileIcon from "../../assets/icons/profileIcon";
import useAuth from "../../hooks/useAuth";

function SearchPage () {
    
    
    const [formData, setFormData] = useState('')
    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    const [showMore, setShowMore] = useState(-1)
    const [userRole, setUserRole] = useState('')
    const ref = useRef(null)
    const { userId } = useAuth()

    useEffect(() => {
        getUsers()
        .then(data => {
            setUsers(data)
            setResults(data)
            const currentUser = data.find(user => user.id === userId)
            if (currentUser) {
                setUserRole(currentUser.role.toLowerCase())
            }
        })
        
    }, [])
   
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true)
    }, [])


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

    const onSubmit = (event) => {
        event.preventDefault()
        getUsers()
        .then(data => {
            setUsers(data)
            setResults(data)
        })
        setFormData('')
    }

    
    const clickShowMore = (index) => {
        if (showMore === index) {
            setShowMore(-1)
        } else {
            setShowMore(index)
        }
    }
    
    const handleClickOutside = (e) => {
        if (ref.current !== null && !ref.current.contains(e.target)) {
                setShowMore(-1)
            }
        }

    return (
        <>  
            <div className={`parent parent-${userRole}`}>
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

                        <button className="clearbutton">
                            <CrossBlackIcon/>
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
                        <p className="results-header">People</p>
                        <hr  className="hr-search"/>
                        <ul>
                            {results.map((obj, index) => {
                                return (
                                    <li key={index} className={`user-${userRole}`}>
                                        <div className="profile-icon search-picture">
                                            <p>{obj.firstName[0]}{obj.lastName[0]}</p>
                                        </div>
                                        <div className="profile-info">
                                            <h4>{obj.firstName} {obj.lastName}</h4>

                                            {obj.cohortId !== null
                                                ? <p className="extrainfo">{obj.role}, Cohort {obj.cohortId}</p>
                                                : <p className="extrainfo">{obj.role}</p>
                                            }
                                        </div>
                                        <button className="sr-button profile-btn"><Link to={`/profile/${obj.id}`} className="profiles">Profile</Link></button>
                                        { 
                                            userRole === 'teacher' && (
                                                <div className='teacher-buttons'>
                                                    <button className="sr-button">Add note</button>
                                                    <button className="sr-button">Move to cohort</button>
                                                </div >
                                            )
                                        }
                                        <button id="search-more" onClick={() => clickShowMore(index)} >...</button>
                                        {showMore === index && (<div className="showmore" ref={ref}><Link to={`/profile/${obj.id}`} className="dropprofiles"><div className="dropicon"><ProfileIcon /></div><div className="droptext">Profile</div></Link></div>)}
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
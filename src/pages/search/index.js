
import SearchIcon from "../../assets/icons/searchIcon";
import TextInput from "../../components/form/textInput";
import { useState, useEffect } from 'react'
import { getUsers } from "../../service/apiClient"




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


        // render the input text field with props.
        <TextInput value={formData} onChange={onChange} name={'searchusers'} label={'Search Results'} type="text" icon={<SearchIcon />}/>
    )
}

export default SearchPage
import TextInput from "../../components/form/textInput";
import { useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";
import "./search.css";


function SearchPage () {
const [searchVal, setSearchVal] = useState('');

const onChange = (e) => {
    setSearchVal(e.target.value);
};

    return (
        <>

        <div className="parent">
            <h1>Search Results</h1>
            <section className="searchparent">
                <div className="">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextInput
                            icon={<SearchIcon />}
                            value={searchVal}
                            name="Search"
                            onChange={onChange}
                        />
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
        </div>
        </>
    )
}

export default SearchPage
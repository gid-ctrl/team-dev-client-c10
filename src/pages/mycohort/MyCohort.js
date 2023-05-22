import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon";
import Card from "../../components/card";
import ProfileCircle from "../../components/profileCircle";
import { useState, useEffect } from "react";
import { get } from "../../service/apiClient";
import Username from "./Username";
import Teacher from "./Teacher";

// const initialState = { id: "", courseId: null, users: [] };

export default function MyCohort() {
  const [cohorts, setCohorts] = useState([]);

  const endpoint = `users`;

  useEffect(() => {
    get(endpoint)
    .then(item => {
        setCohorts(item.data.users)
    })
}, []);
console.log('cohorts: ', cohorts)
  return (
    <>
      <main>
        <Card>
          <h4>My Cohort</h4>

          <div className="soft-ware-dev">
            <ProfileCircle
              initials={<SquareBracketsIcon color="white" scale="scale(1.4)" />}
            />
            <div>
              <span>Software Development, Cohort 10</span>
              <p>January 2023 - June 2023</p>
            </div>
          </div>

          <div className="user-display-grid">
            {
                cohorts.map((item, index) => {
                    if(item.role === 'STUDENT'){
                    return <Username key={index} firstName={item.firstName} lastName={item.lastName}/>}
                })
            }
          </div>
        </Card>
      </main>
      <aside>
        <Card>
          <div className="teacher-bar">
            <h4>Teachers</h4>
            {
                cohorts.map((item, index) => {
                    if(item.role === 'TEACHER'){
                    return <Teacher key={index} bio={item.bio} firstName={item.firstName} lastName={item.lastName}/>}
                })
            }
          </div>
        </Card>
        <Card>
          <h4>My Exercise</h4>
          <div className="myexercises">
            <div>Modules:</div>
            <div>2/7 completed</div>
            <div>Units:</div>
            <div>4/10 completed</div>
            <div>Exercises:</div>
            <div>34/58 completed</div>
          </div>
          <button>See Exercises</button>
        </Card>
      </aside>
    </>
  );
}

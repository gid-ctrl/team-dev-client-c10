import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon";
import Card from "../../components/card";
import ProfileCircle from "../../components/profileCircle";
import { useState, useEffect } from "react";
import { get } from "../../service/apiClient";
import Students from "./Students";
import Teachers from "./Teachers";



export default function MyCohort() {
  const [cohorts, setCohorts] = useState([]);

  const endpoint = `users`;
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  useEffect(() => {
    get(endpoint).then((item) => {
      setCohorts(item.data.users);
    });
  }, []);

  return (
    <>
      <main>
        <Card>
          <h4>My Cohort</h4>

          <div className="soft-ware-dev">
            <ProfileCircle newColor={randomColor}
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
                    return <Students key={index} firstName={item.firstName} lastName={item.lastName}/>}
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
                    return <Teachers key={index} bio={item.bio} firstName={item.firstName} lastName={item.lastName}/>}
                })
            }

          </div>
        </Card>
        <Card>
          <section className="exercise-tab">
            <h3>My Exercise</h3>
            <div className="myexercises">
              <p>Modules:</p>
              <p>2/7 completed</p>
              <p>Units:</p>
              <p>4/10 completed</p>
              <p>Exercises:</p>
              <p>34/58 completed</p>
            </div>
            <br />
            <button className="excercise-button">See Exercises</button>
          </section>
        </Card>
      </aside>
    </>
  );
}

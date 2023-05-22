import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon";
import Card from "../../components/card";
import ProfileCircle from "../../components/profileCircle";
import { useState, useEffect } from "react";
import { get } from "../../service/apiClient";

export default function MyCohort() {
  const [cohorts, setCohorts] = useState([]);

  // 1. Create a bunch of users using the sign-up form
  // 2. Use this route in insomnia to get a list of all users so you can get all of their ID's: https://supreme-bassoon-7v7v8r2.pages.github.io/#tag/user/operation/getAllUsers
  // 3. Use the login route in insomnia using the teacher login details to get a teacher auth token: https://supreme-bassoon-7v7v8r2.pages.github.io/#tag/user/operation/loginUser
  // 4. Use this update user route on every user you created and assign their cohortId to 1, put the teacher's auth token in the Authorization header: https://supreme-bassoon-7v7v8r2.pages.github.io/#tag/user/operation/userUpdate

  // That will make sure all of your new users are assigned to cohort 1

  // const endpoint = `cohorts/1/users`;
  const endpoint = "users";

  useEffect(() => {
    get(endpoint).then((response) => {
      return setCohorts(response.data.users);
    });
  }, []);

  console.log("cohortsData", cohorts);

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
              <p>Januart 2023 - June 2023</p>
            </div>
          </div>

          <div className="user-display-grid">
            <section className="post-details user-display">
              <ProfileCircle initials="K9" />
              <p>Joe Bloggs</p>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>

            <section className="post-details user-display">
              <ProfileCircle initials="K9" />
              <p>Joe Bloggs</p>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>

            <section className="post-details user-display">
              <ProfileCircle initials="K9" />
              <p>Joe Bloggs</p>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>

            <section className="post-details user-display">
              <ProfileCircle initials="K9" />
              <p>Joe Bloggs</p>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>
          </div>
        </Card>
      </main>
      <aside>
        <Card>
          <div className="teacher-bar">
            <h4>Teachers</h4>
            <section className="post-details ">
              <ProfileCircle />

              <div className="teacher-info">
                <span>Software Development, Cohort 10</span>
                <p>Software Development</p>
              </div>

              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>
            <section className="post-details user-display">
              <ProfileCircle />

              <div className="teacher-info">
                <span>Software Development, Cohort 10</span>
                <p>Software Development</p>
              </div>

              <div className="edit-icon">
                <p>...</p>
              </div>
            </section>
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

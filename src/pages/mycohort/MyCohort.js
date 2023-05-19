import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon";
import Card from "../../components/card";
import ProfileCircle from "../../components/profileCircle";
import { useState, useEffect } from "react";
import { get } from "../../service/apiClient";

const initialState = { id: "", courseId: null, users: [] };

export default function MyCohort() {
  const [cohorts, setCohorts] = useState(initialState);

  const endpoint = `cohorts/1/users`;

  useEffect(() => {
    get(endpoint).then((data) => {
      console.log("cohortsData", cohorts.data.users[0]);
      return setCohorts(data);
    });
  }, []);

  // console.log("cohorts", cohorts);
  // console.log("cohortsData", cohorts.data.users[0]);
  // console.log("cohortData", cohorts.data.users);

  return (
    <>
      {console.log("cohortsData", cohorts.data.users[0])}
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

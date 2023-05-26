import Card from "../../components/card";
import { useState, useEffect} from "react";
import { get } from "../../service/apiClient";

const initialstate = { data: {name: ""}}
const module1 =  {data: {module1: []}} 
const module2 = {data: {module2: []}} 
export default function Students() {
  
  const[courses, setCourses] = useState(initialstate)
  const[modules, setModules] = useState(module1)
  const[modules2, setModules2] = useState(module2)
  const[units, setUnits] = useState([])
  

  useEffect(() => {
    get("courses/1").then((item) => {
      setCourses(item);
    });
    get("modules/1").then((item) => {
      setModules(item);
    });
    get("modules/2").then((item) => {
      setModules2(item);
    });
  }, []);
console.log("modules", modules )

// console.log("courses name", courses.data.name)
  return (
    <>
      <main>
        <Card>
          <h2>My Exercises</h2>
          <div className="exercise-card">
            <section className="course-info">
              <p>Course</p>
              <p>{courses.data.name}</p>
            </section>
            <section className="module-section">
              <article>{modules.data.name}</article>
              <article>{modules2.data.name}</article>
            </section>
            <section className="right-section">
              <article> Exercises</article>
            </section>
          </div>
        </Card>
      </main>
    </>
  );
}

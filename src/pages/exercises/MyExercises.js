import Card from "../../components/card";

export default function Students() {
  return (
    <>
      <main>
        <Card>
          <h2>My Exercises</h2>
          <div className="exercise-card">
            <section className="course-info">
              <p>Course</p>
              <p>Software Development</p>
            </section>
            <section className="module-section">
              <article> Module 1</article>
              <article> Module 2</article>
              <article> Module 3</article>
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

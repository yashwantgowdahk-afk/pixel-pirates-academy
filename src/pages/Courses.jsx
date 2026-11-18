import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/courses`);

        if (!response.ok) {
          throw new Error("Unable to load courses");
        }

        const data = await response.json();

        const publishedCourses = Array.isArray(data)
          ? data.filter(
              (course) =>
                !course.status || course.status === "published"
            )
          : [];

        setCourses(publishedCourses);
      } catch (err) {
        console.error(err);
        setError(
          "Courses could not be loaded. Make sure your backend is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <main className="courses-page">
      <style>{`
        .courses-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 15% 12%, rgba(0,210,255,0.10), transparent 25%),
            radial-gradient(circle at 90% 25%, rgba(110,80,255,0.09), transparent 25%),
            #050607;
          color: #fff;
        }

        .courses-page * {
          box-sizing: border-box;
        }

        .courses-shell {
          width: min(1200px, calc(100% - 32px));
          margin: 0 auto;
          padding: 90px 0 100px;
        }

        .courses-hero {
          position: relative;
          padding: 70px 30px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(18px);
          margin-bottom: 40px;
        }

        .courses-hero::after {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          right: -170px;
          top: -160px;
          border: 1px solid rgba(0,210,255,0.10);
          border-radius: 50%;
          box-shadow:
            0 0 0 35px rgba(0,210,255,0.025),
            0 0 0 70px rgba(0,210,255,0.018);
          pointer-events: none;
        }

        .courses-kicker {
          color: #89ebff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .courses-hero h1 {
          margin: 16px 0 14px;
          max-width: 850px;
          font-size: clamp(45px, 7vw, 82px);
          line-height: 0.95;
          letter-spacing: -0.06em;
        }

        .courses-hero h1 span {
          color: #83e9ff;
        }

        .courses-hero p {
          margin: 0;
          max-width: 700px;
          color: rgba(255,255,255,0.64);
          font-size: 16px;
          line-height: 1.8;
        }

        .courses-flow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 26px;
        }

        .courses-flow span {
          padding: 8px 11px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.62);
          font-size: 11px;
          letter-spacing: 0.05em;
        }

        .courses-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 18px;
        }

        .courses-heading h2 {
          margin: 0;
          font-size: 24px;
        }

        .courses-count {
          color: rgba(255,255,255,0.4);
          font-size: 13px;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border-radius: 23px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.015)
            );
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .course-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0,210,255,0.28);
        }

        .course-cover {
          position: relative;
          height: 195px;
          overflow: hidden;
          background:
            linear-gradient(
              145deg,
              rgba(0,210,255,0.12),
              rgba(120,80,255,0.08)
            );
        }

        .course-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .course-card:hover .course-cover img {
          transform: scale(1.055);
        }

        .course-cover-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: #92ecff;
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.04em;
          background:
            linear-gradient(
              135deg,
              rgba(0,210,255,0.06),
              rgba(120,80,255,0.07)
            );
        }

        .course-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(2,4,5,0.65);
          color: #a2efff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .course-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 22px;
        }

        .course-category {
          color: #81e7ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .course-title {
          margin: 8px 0 9px;
          font-size: 23px;
          line-height: 1.18;
          letter-spacing: -0.025em;
        }

        .course-description {
          margin: 0;
          color: rgba(255,255,255,0.59);
          font-size: 14px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          overflow: hidden;
        }

        .course-data {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 18px 0 20px;
        }

        .course-data-pill {
          padding: 8px 9px;
          border-radius: 9px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.62);
          font-size: 11px;
        }

        .course-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 45px;
          margin-top: auto;
          padding: 0 15px;
          border-radius: 12px;
          border: 1px solid rgba(0,210,255,0.22);
          background: rgba(0,210,255,0.08);
          color: #91edff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 750;
          transition: 0.25s ease;
        }

        .course-button:hover {
          background: rgba(0,210,255,0.14);
          border-color: rgba(0,210,255,0.34);
        }

        .courses-state {
          padding: 55px 24px;
          text-align: center;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          color: rgba(255,255,255,0.58);
        }

        .courses-state strong {
          display: block;
          margin-bottom: 8px;
          color: #fff;
          font-size: 19px;
        }

        .courses-error {
          color: #ffb7b7;
          border-color: rgba(255,80,80,0.18);
          background: rgba(255,80,80,0.035);
        }

        @media (max-width: 1020px) {
          .courses-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .courses-shell {
            width: min(100% - 20px, 1200px);
            padding: 55px 0 70px;
          }

          .courses-hero {
            padding: 45px 20px;
            border-radius: 23px;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .courses-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 7px;
          }
        }
      `}</style>

      <div className="courses-shell">
        <section className="courses-hero">
          <div className="courses-kicker">TECHNOLOGY MISSIONS</div>

          <h1>
            Learn the tools.
            <br />
            <span>Build the future.</span>
          </h1>

          <p>
            Explore practical technology courses designed around understanding,
            hands-on practice, projects, experimentation and showcasing what
            you build.
          </p>

          <div className="courses-flow">
            <span>UNDERSTAND</span>
            <span>PRACTICE</span>
            <span>BUILD</span>
            <span>EXPERIMENT</span>
            <span>SHOWCASE</span>
          </div>
        </section>

        <section>
          <div className="courses-heading">
            <h2>Available Courses</h2>
            <div className="courses-count">
              {loading ? "Loading..." : `${courses.length} course(s)`}
            </div>
          </div>

          {loading && (
            <div className="courses-state">
              Loading courses from the academy database...
            </div>
          )}

          {!loading && error && (
            <div className="courses-state courses-error">
              {error}
            </div>
          )}

          {!loading && !error && courses.length === 0 && (
            <div className="courses-state">
              <strong>No published courses yet.</strong>
              Courses added and published from the admin panel will appear
              here automatically.
            </div>
          )}

          {!loading && !error && courses.length > 0 && (
            <div className="courses-grid">
              {courses.map((course) => {
                const courseId = course?._id;

                return (
                  <article className="course-card" key={courseId}>
                    <div className="course-cover">
                      <div className="course-tag">
                        {course.difficulty || "Practical"}
                      </div>

                      {course.image ? (
                        <img
                          src={course.image}
                          alt={course.title || "Course"}
                        />
                      ) : (
                        <div className="course-cover-placeholder">
                          {course.title
                            ? course.title
                                .split(" ")
                                .slice(0, 2)
                                .map((word) => word.charAt(0))
                                .join("")
                                .toUpperCase()
                            : "PP"}
                        </div>
                      )}
                    </div>

                    <div className="course-content">
                      <div className="course-category">
                        {course.category || "Technology"}
                      </div>

                      <h3 className="course-title">
                        {course.title || "Untitled Course"}
                      </h3>

                      <p className="course-description">
                        {course.description ||
                          "A practical learning experience focused on building real technology skills."}
                      </p>

                      <div className="course-data">
                        {course.duration && (
                          <span className="course-data-pill">
                            Duration: {course.duration}
                          </span>
                        )}

                        {Array.isArray(course.modules) && (
                          <span className="course-data-pill">
                            {course.modules.length} Modules
                          </span>
                        )}

                        {course.status && (
                          <span className="course-data-pill">
                            {course.status}
                          </span>
                        )}
                      </div>

                      {courseId ? (
                        <Link
                          className="course-button"
                          to={`/courses/${encodeURIComponent(courseId)}`}
                        >
                          Open Course →
                        </Link>
                      ) : (
                        <div
                          className="course-button"
                          style={{
                            opacity: 0.45,
                            cursor: "not-allowed",
                          }}
                        >
                          Course ID unavailable
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Courses;
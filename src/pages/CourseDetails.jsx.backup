import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API = "http://10.190.128.140:5000/api";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      if (!id) {
        setError("Course ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API}/courses/${encodeURIComponent(id)}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Course not found.");
          }

          throw new Error("Unable to load course details.");
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
          throw new Error("Invalid course data received.");
        }

        setCourse(data);
      } catch (err) {
        console.error("Course details error:", err);
        setError(
          err.message || "Course details could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <main className="course-details-page">
        <style>{`
          .course-details-page {
            min-height: 100vh;
            background: #050607;
            color: #fff;
            padding: 100px 20px;
          }

          .course-details-state {
            width: min(900px, 100%);
            margin: 0 auto;
            padding: 65px 25px;
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.025);
            text-align: center;
            color: rgba(255,255,255,0.6);
          }
        `}</style>

        <div className="course-details-state">
          Loading course details...
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="course-details-page">
        <style>{`
          .course-details-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at 20% 10%, rgba(0,210,255,0.08), transparent 25%),
              #050607;
            color: #fff;
            padding: 100px 20px;
          }

          .course-details-state {
            width: min(900px, 100%);
            margin: 0 auto;
            padding: 65px 25px;
            border-radius: 24px;
            border: 1px solid rgba(255,90,90,0.16);
            background: rgba(255,70,70,0.035);
            text-align: center;
          }

          .course-details-state h1 {
            margin: 0 0 12px;
            font-size: 30px;
          }

          .course-details-state p {
            margin: 0;
            color: rgba(255,255,255,0.58);
            line-height: 1.7;
          }

          .course-back {
            display: inline-flex;
            margin-top: 25px;
            min-height: 44px;
            align-items: center;
            padding: 0 16px;
            border-radius: 11px;
            background: rgba(0,210,255,0.08);
            border: 1px solid rgba(0,210,255,0.21);
            color: #8cecff;
            text-decoration: none;
            font-size: 13px;
          }
        `}</style>

        <div className="course-details-state">
          <h1>Course unavailable</h1>

          <p>
            {error ||
              "The requested course could not be loaded from the academy database."}
          </p>

          <Link className="course-back" to="/courses">
            ← Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const modules = Array.isArray(course.modules) ? course.modules : [];
  const objectives = Array.isArray(course.objectives)
    ? course.objectives
    : [];
  const activities = Array.isArray(course.practicalActivities)
    ? course.practicalActivities
    : [];
  const resources = Array.isArray(course.resources)
    ? course.resources
    : [];

  return (
    <main className="course-details-page">
      <style>{`
        .course-details-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 10%, rgba(0,210,255,0.11), transparent 24%),
            radial-gradient(circle at 88% 12%, rgba(120,90,255,0.09), transparent 22%),
            #050607;
          color: #f6f8fa;
          padding: 85px 0 100px;
        }

        .course-details-shell {
          width: min(1160px, calc(100% - 32px));
          margin: 0 auto;
        }

        .course-back {
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.68);
          text-decoration: none;
          font-size: 13px;
          transition: 0.2s ease;
        }

        .course-back:hover {
          color: #fff;
          border-color: rgba(0,210,255,0.24);
          background: rgba(0,210,255,0.07);
        }

        .course-details-hero {
          display: grid;
          grid-template-columns: 1.18fr 0.82fr;
          gap: 30px;
          margin-top: 20px;
          padding: 32px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.018)
            );
          overflow: hidden;
        }

        .course-detail-kicker {
          color: #86eaff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .course-details-hero h1 {
          margin: 14px 0 15px;
          font-size: clamp(42px, 6vw, 70px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .course-detail-description {
          margin: 0;
          max-width: 720px;
          color: rgba(255,255,255,0.62);
          font-size: 16px;
          line-height: 1.8;
        }

        .course-facts {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 24px;
        }

        .course-fact {
          padding: 9px 11px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.68);
          font-size: 12px;
        }

        .course-hero-image {
          min-height: 270px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(0,210,255,0.12),
              rgba(120,90,255,0.09)
            );
        }

        .course-hero-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .course-sections {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .course-panel {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          background: rgba(255,255,255,0.025);
          padding: 23px;
        }

        .course-panel h2 {
          margin: 0 0 17px;
          font-size: 21px;
          letter-spacing: -0.02em;
        }

        .course-list {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .course-list li {
          position: relative;
          padding: 12px 13px 12px 36px;
          border-radius: 12px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          line-height: 1.55;
        }

        .course-list li::before {
          content: "✓";
          position: absolute;
          left: 13px;
          top: 12px;
          color: #82eaff;
          font-weight: 800;
        }

        .modules-section {
          margin-top: 20px;
        }

        .module-card {
          padding: 21px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
        }

        .module-card + .module-card {
          margin-top: 13px;
        }

        .module-top {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .module-number {
          display: grid;
          place-items: center;
          flex: 0 0 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(0,210,255,0.08);
          border: 1px solid rgba(0,210,255,0.18);
          color: #8cecff;
          font-size: 12px;
          font-weight: 800;
        }

        .module-title {
          margin: 0;
          font-size: 18px;
        }

        .module-description {
          margin: 5px 0 0;
          color: rgba(255,255,255,0.53);
          font-size: 13px;
          line-height: 1.6;
        }

        .topic-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .topic-pill {
          padding: 8px 10px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.66);
          font-size: 12px;
        }

        .course-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 20px;
          padding: 25px;
          border-radius: 22px;
          border: 1px solid rgba(0,210,255,0.14);
          background:
            linear-gradient(
              135deg,
              rgba(0,210,255,0.07),
              rgba(255,255,255,0.025)
            );
        }

        .course-cta h2 {
          margin: 0 0 7px;
          font-size: 23px;
        }

        .course-cta p {
          margin: 0;
          color: rgba(255,255,255,0.55);
          font-size: 13px;
        }

        .course-register {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 17px;
          border-radius: 12px;
          text-decoration: none;
          background: #f4f7f9;
          color: #060708;
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        .course-empty {
          color: rgba(255,255,255,0.45);
          font-size: 13px;
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .course-details-hero,
          .course-sections {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .course-details-page {
            padding: 55px 0 70px;
          }

          .course-details-shell {
            width: min(100% - 20px, 1160px);
          }

          .course-details-hero {
            padding: 21px;
            border-radius: 22px;
          }

          .course-panel,
          .module-card,
          .course-cta {
            padding: 18px;
          }

          .course-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .course-register {
            width: 100%;
          }
        }
      `}</style>

      <div className="course-details-shell">
        <Link to="/courses" className="course-back">
          ← Back to all courses
        </Link>

        <section className="course-details-hero">
          <div>
            <div className="course-detail-kicker">
              {course.category || "Technology Mission"}
            </div>

            <h1>{course.title || "Course"}</h1>

            <p className="course-detail-description">
              {course.description ||
                "A practical learning programme built around understanding, practice and real-world projects."}
            </p>

            <div className="course-facts">
              {course.difficulty && (
                <div className="course-fact">
                  Difficulty: {course.difficulty}
                </div>
              )}

              {course.duration && (
                <div className="course-fact">
                  Duration: {course.duration}
                </div>
              )}

              <div className="course-fact">
                Modules: {modules.length}
              </div>
            </div>
          </div>

          <div className="course-hero-image">
            {course.image ? (
              <img
                src={course.image}
                alt={course.title || "Course"}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 270,
                  display: "grid",
                  placeItems: "center",
                  color: "#8cecff",
                  fontSize: 42,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, rgba(0,210,255,0.08), rgba(120,90,255,0.08))",
                }}
              >
                PP
              </div>
            )}
          </div>
        </section>

        <div className="course-sections">
          <section className="course-panel">
            <h2>Learning Objectives</h2>

            {objectives.length > 0 ? (
              <ul className="course-list">
                {objectives.map((objective, index) => (
                  <li key={index}>
                    {typeof objective === "object"
                      ? objective.title ||
                        objective.description ||
                        JSON.stringify(objective)
                      : objective}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="course-empty">
                Objectives will appear here when published by the admin.
              </div>
            )}
          </section>

          <section className="course-panel">
            <h2>Practical Activities</h2>

            {activities.length > 0 ? (
              <ul className="course-list">
                {activities.map((activity, index) => (
                  <li key={index}>
                    {typeof activity === "object"
                      ? activity.title ||
                        activity.description ||
                        JSON.stringify(activity)
                      : activity}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="course-empty">
                Practical activities will appear here when added by the
                admin.
              </div>
            )}
          </section>
        </div>

        <section className="course-panel modules-section">
          <h2>Course Modules</h2>

          {modules.length === 0 ? (
            <div className="course-empty">
              No modules have been published for this course yet.
            </div>
          ) : (
            modules.map((module, moduleIndex) => {
              const topics = Array.isArray(module?.topics)
                ? module.topics
                : [];

              return (
                <article
                  className="module-card"
                  key={module?._id || moduleIndex}
                >
                  <div className="module-top">
                    <div className="module-number">
                      {String(moduleIndex + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <h3 className="module-title">
                        {module?.title ||
                          `Module ${moduleIndex + 1}`}
                      </h3>

                      {module?.description && (
                        <p className="module-description">
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {topics.length > 0 && (
                    <div className="topic-list">
                      {topics.map((topic, topicIndex) => (
                        <span
                          className="topic-pill"
                          key={topic?._id || topicIndex}
                        >
                          {typeof topic === "object"
                            ? topic.title ||
                              topic.description ||
                              `Topic ${topicIndex + 1}`
                            : topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {topics.length === 0 && (
                    <div
                      style={{
                        marginTop: 15,
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                      }}
                    >
                      Topics will be added here from the admin panel.
                    </div>
                  )}
                </article>
              );
            })
          )}
        </section>

        {resources.length > 0 && (
          <section className="course-panel" style={{ marginTop: 20 }}>
            <h2>Resources</h2>

            <ul className="course-list">
              {resources.map((resource, index) => (
                <li key={index}>
                  {typeof resource === "object"
                    ? resource.title ||
                      resource.description ||
                      JSON.stringify(resource)
                    : resource}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="course-cta">
          <div>
            <h2>Ready to start building?</h2>
            <p>
              Continue your journey with Pixel Pirates Academy.
            </p>
          </div>

          <Link
            className="course-register"
            to={`/register?course=${encodeURIComponent(
              course.title || ""
            )}`}
          >
            Register for this course →
          </Link>
        </section>
      </div>
    </main>
  );
}

export default CourseDetails;
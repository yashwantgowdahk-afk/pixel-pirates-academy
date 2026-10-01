import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/projects`);

        if (!response.ok) {
          throw new Error("Unable to load projects");
        }

        const data = await response.json();

        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Projects loading error:", err);
        setError("Unable to load the project archive.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <main className="projects-page">

      {/* HERO */}

      <section className="projects-hero">

        <div className="projects-hero-grid"></div>

        <p className="projects-eyebrow">
          PROJECT LAB / DATABASE ONLINE
        </p>

        <h1>
          PROJECT
          <br />
          <span>LAB.</span>
        </h1>

        <p className="projects-intro">
          Ideas are only the beginning. Build something,
          experiment with technology and create something
          you can actually demonstrate.
        </p>

      </section>


      {/* ARCHIVE */}

      <section className="projects-archive">

        <div className="projects-archive-header">

          <div>
            <p>
              BUILD ARCHIVE / PUBLISHED PROJECTS
            </p>

            <h2>
              SELECTED
              <br />
              <span>EXPERIMENTS.</span>
            </h2>
          </div>

          <div className="projects-count">
            <strong>
              {String(projects.length).padStart(2, "0")}
            </strong>

            <span>
              PROJECTS
              <br />
              ONLINE
            </span>
          </div>

        </div>


        {loading && (
          <div className="projects-state">
            LOADING PROJECT ARCHIVE...
          </div>
        )}


        {!loading && error && (
          <div className="projects-state projects-error">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="projects-state">
              NO PUBLISHED PROJECTS YET.
            </div>
          )}


        {!loading &&
          !error &&
          projects.length > 0 && (

            <div className="projects-grid">

              {projects.map((project, index) => (

                <article
                  className="project-card-dynamic"
                  key={project._id}
                >

                  <div className="project-card-top">

                    <span>
                      PROJECT {String(index + 1).padStart(3, "0")}
                    </span>

                    <span>
                      {project.category || "EXPERIMENT"}
                    </span>

                  </div>


                  {project.image && (
                    <div className="project-card-image">

                      <img
                        src={project.image}
                        alt={project.title}
                      />

                    </div>
                  )}


                  <div className="project-card-content">

                    <p className="project-code">
                      PX-
                      {String(index + 1).padStart(3, "0")}
                    </p>

                    <h3>
                      {project.title}
                    </h3>

                    <p className="project-description">
                      {project.description ||
                        "A Pixel Pirates Academy project built through practical experimentation."}
                    </p>


                    {Array.isArray(project.technologies) &&
                      project.technologies.length > 0 && (

                        <div className="project-tech-list">

                          {project.technologies
                            .slice(0, 6)
                            .map((technology, techIndex) => (
                              <span key={techIndex}>
                                {technology}
                              </span>
                            ))}

                        </div>

                    )}


                    <div className="project-card-links">

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GITHUB ↗
                        </a>
                      )}

                      {project.liveDemoUrl && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          LIVE DEMO ↗
                        </a>
                      )}

                      {!project.githubUrl &&
                        !project.liveDemoUrl && (
                          <span>
                            PROJECT RECORD
                          </span>
                        )}

                    </div>

                  </div>


                  <div className="project-status">

                    <span>
                      STATUS
                    </span>

                    <strong>
                      {(project.status || "published")
                        .toUpperCase()}
                    </strong>

                  </div>

                </article>

              ))}

            </div>

        )}

      </section>


      {/* METHOD */}

      <section className="projects-method">

        <p>
          PROJECT PHILOSOPHY
        </p>

        <h2>
          FROM
          <br />
          <span>THOUGHT</span>
          <br />
          TO THING.
        </h2>

        <div className="projects-method-grid">

          <div>
            <span>01</span>
            <strong>THINK</strong>
            <p>
              Identify an idea, problem or opportunity.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>DESIGN</strong>
            <p>
              Plan the system and experiment with possible solutions.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>BUILD</strong>
            <p>
              Turn the concept into a working prototype.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>BREAK</strong>
            <p>
              Test the system, find problems and improve it.
            </p>
          </div>

          <div>
            <span>05</span>
            <strong>SHOW</strong>
            <p>
              Present the result and showcase what was built.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="projects-final-cta">

        <p>
          THE NEXT PROJECT COULD BE YOURS.
        </p>

        <h2>
          BUILD
          <br />
          <span>WHAT'S NEXT.</span>
        </h2>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          START YOUR JOURNEY ↗
        </button>

      </section>

    </main>
  );
}

export default Projects;
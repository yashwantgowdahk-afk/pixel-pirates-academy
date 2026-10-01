import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "AI/ML",
    description: "",
    image: "",
    technologies: "",
    videoUrl: "",
    githubUrl: "",
    liveDemoUrl: "",
    status: "draft",
    order: 1,
  });

  const token = localStorage.getItem("pixelPiratesAdminToken");

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/projects`);

      if (!response.ok) {
        throw new Error("Unable to load projects");
      }

      const data = await response.json();

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Projects loading error:", error);
      setMessage("Unable to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      category: "AI/ML",
      description: "",
      image: "",
      technologies: "",
      videoUrl: "",
      githubUrl: "",
      liveDemoUrl: "",
      status: "draft",
      order: projects.length + 1,
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      order: Number(form.order) || 1,
    };

    try {
      const url = editingId
        ? `${API}/projects/${editingId}`
        : `${API}/projects`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save project"
        );
      }

      setMessage(
        editingId
          ? "Project updated successfully."
          : "Project created successfully."
      );

      resetForm();
      await loadProjects();
    } catch (error) {
      console.error("Project save error:", error);
      setMessage(error.message);
    }
  };

  const editProject = (project) => {
    setEditingId(project._id);

    setForm({
      title: project.title || "",
      slug: project.slug || "",
      category: project.category || "AI/ML",
      description: project.description || "",
      image: project.image || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      videoUrl: project.videoUrl || "",
      githubUrl: project.githubUrl || "",
      liveDemoUrl: project.liveDemoUrl || "",
      status: project.status || "draft",
      order: project.order || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const archiveProject = async (id) => {
    const confirmed = window.confirm(
      "Archive this project?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Unable to archive project"
        );
      }

      setMessage("Project archived successfully.");
      await loadProjects();
    } catch (error) {
      console.error("Archive project error:", error);
      setMessage(error.message);
    }
  };

  return (
    <main className="admin-crud-page">

      <header className="admin-crud-header">

        <div>
          <p>PIXEL PIRATES / ADMIN / 002</p>

          <h1>
            PROJECT
            <br />
            <span>CONTROL.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Create, edit, publish and archive academy
            projects without changing website code.
          </p>
        </div>

        <button
          type="button"
          className="admin-back-button"
          onClick={() => {
            window.location.href = "/admin";
          }}
        >
          ← COMMAND CENTER
        </button>

      </header>


      {message && (
        <div className="admin-empty-state">
          <strong>{message}</strong>
        </div>
      )}


      <section className="admin-crud-form-section">

        <div className="admin-section-heading">

          <div>
            <span>
              {editingId
                ? "EDIT PROJECT"
                : "NEW PROJECT"}
            </span>

            <h2>
              PROJECT DETAILS
            </h2>
          </div>

        </div>


        <form
          className="admin-crud-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>PROJECT TITLE</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: AI Study Assistant"
                required
              />
            </div>


            <div className="admin-form-group">
              <label>SLUG</label>

              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="ai-study-assistant"
              />
            </div>


            <div className="admin-form-group">
              <label>CATEGORY</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option>AI/ML</option>
                <option>Web</option>
                <option>IoT</option>
                <option>Automation</option>
                <option>Innovation</option>
              </select>
            </div>


            <div className="admin-form-group">
              <label>DISPLAY ORDER</label>

              <input
                name="order"
                type="number"
                min="1"
                value={form.order}
                onChange={handleChange}
              />
            </div>


            <div className="admin-form-group admin-form-full">
              <label>DESCRIPTION</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe what this project does..."
              />
            </div>


            <div className="admin-form-group admin-form-full">
              <label>TECHNOLOGIES</label>

              <input
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Python"
              />

              <small>
                Separate technologies with commas.
              </small>
            </div>


            <div className="admin-form-group admin-form-full">
              <label>PROJECT IMAGE URL</label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
              />
            </div>


            <div className="admin-form-group">
              <label>VIDEO URL</label>

              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="Video URL"
              />
            </div>


            <div className="admin-form-group">
              <label>GITHUB URL</label>

              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="GitHub repository URL"
              />
            </div>


            <div className="admin-form-group">
              <label>LIVE DEMO URL</label>

              <input
                name="liveDemoUrl"
                value={form.liveDemoUrl}
                onChange={handleChange}
                placeholder="Live website URL"
              />
            </div>


            <div className="admin-form-group">
              <label>STATUS</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

          </div>


          <div className="admin-form-actions">

            <button
              type="submit"
              className="admin-primary-button"
            >
              {editingId
                ? "UPDATE PROJECT →"
                : "CREATE PROJECT →"}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-secondary-button"
                onClick={resetForm}
              >
                CANCEL
              </button>
            )}

          </div>

        </form>

      </section>


      <section className="admin-records-section">

        <div className="admin-section-heading">

          <div>
            <span>DATABASE</span>

            <h2>
              PROJECT RECORDS
            </h2>
          </div>

          <strong>
            {projects.length}
          </strong>

        </div>


        {loading ? (
          <div className="admin-empty-state">
            <strong>
              LOADING PROJECTS...
            </strong>
          </div>
        ) : projects.length === 0 ? (
          <div className="admin-empty-state">
            <strong>
              NO PROJECTS YET
            </strong>

            <p>
              Create your first project above.
            </p>
          </div>
        ) : (
          <div className="admin-record-list">

            {projects.map((project) => (

              <article
                className="admin-record-item"
                key={project._id}
              >

                <div>

                  <span>
                    {project.category || "PROJECT"}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description ||
                      "No description added."}
                  </p>

                </div>


                <div className="admin-record-meta">

                  <strong>
                    {project.status?.toUpperCase() ||
                      "DRAFT"}
                  </strong>

                  <span>
                    ORDER {project.order || 1}
                  </span>

                </div>


                <div className="admin-record-actions">

                  <button
                    type="button"
                    onClick={() => editProject(project)}
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      archiveProject(project._id)
                    }
                  >
                    ARCHIVE
                  </button>

                </div>

              </article>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default AdminProjects;
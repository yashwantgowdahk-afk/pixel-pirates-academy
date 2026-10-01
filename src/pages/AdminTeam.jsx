import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

const EMPTY_FORM = {
  name: "",
  role: "",
  branch: "",
  background: "",
  bio: "",
  photo: "",
  skills: "",
  projects: "",
  achievements: "",
  certifications: "",
  linkedin: "",
  instagram: "",
  github: "",
  introVideo: "",
  model3d: "",
  status: "published",
  order: 1,
};

function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const loadMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/team`);

      if (!response.ok) {
        throw new Error("Unable to load team");
      }

      const data = await response.json();

      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Team loading error:", error);
      setMessage("Unable to load team records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setMessage(
        "Image is too large. Please choose an image under 8 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        photo: reader.result,
      }));

      setMessage("Photo selected successfully.");
    };

    reader.onerror = () => {
      setMessage("Unable to read the selected photo.");
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      order: members.length + 1,
    });

    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    const payload = {
      ...form,

      skills: form.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      projects: form.projects
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      achievements: form.achievements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      certifications: form.certifications
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      order: Number(form.order) || 1,
    };

    try {
      const response = await fetch(
        editingId
          ? `${API}/team/${editingId}`
          : `${API}/team`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save team member"
        );
      }

      setMessage(
        editingId
          ? "Team member updated successfully."
          : "Team member created successfully."
      );

      resetForm();
      await loadMembers();
    } catch (error) {
      console.error("Team save error:", error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const editMember = (member) => {
    setEditingId(member._id);

    setForm({
      name: member.name || "",
      role: member.role || "",
      branch: member.branch || "",
      background: member.background || "",
      bio: member.bio || "",
      photo: member.photo || "",

      skills: Array.isArray(member.skills)
        ? member.skills.join(", ")
        : "",

      projects: Array.isArray(member.projects)
        ? member.projects.join(", ")
        : "",

      achievements: Array.isArray(member.achievements)
        ? member.achievements.join(", ")
        : "",

      certifications: Array.isArray(
        member.certifications
      )
        ? member.certifications.join(", ")
        : "",

      linkedin: member.linkedin || "",
      instagram: member.instagram || "",
      github: member.github || "",
      introVideo: member.introVideo || "",
      model3d: member.model3d || "",
      status: member.status || "published",
      order: member.order || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const archiveMember = async (id) => {
    const confirmed = window.confirm(
      "Archive this team member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/team/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to archive team member"
        );
      }

      setMessage("Team member archived.");
      await loadMembers();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <main className="admin-crud-page">

      {/* HEADER */}

      <header className="admin-crud-header">

        <div>
          <p>PIXEL PIRATES / ADMIN / TEAM</p>

          <h1>
            DIGITAL
            <br />
            <span>CREW.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Manage team identities, photos, skills,
            projects and professional links.
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


      {/* MESSAGE */}

      {message && (
        <div className="admin-empty-state">
          <strong>{message}</strong>
        </div>
      )}


      {/* FORM */}

      <section className="admin-crud-form-section">

        <div className="admin-section-heading">
          <div>
            <span>
              {editingId
                ? "EDIT TEAM MEMBER"
                : "NEW TEAM MEMBER"}
            </span>

            <h2>
              PROFILE DETAILS
            </h2>
          </div>
        </div>


        <form
          className="admin-crud-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">


            {/* NAME */}

            <div className="admin-form-group">
              <label>NAME</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Team member name"
                required
              />
            </div>


            {/* ROLE */}

            <div className="admin-form-group">
              <label>ROLE</label>

              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Team role"
                required
              />
            </div>


            {/* BRANCH */}

            <div className="admin-form-group">
              <label>BRANCH / BACKGROUND</label>

              <input
                name="branch"
                value={form.branch}
                onChange={handleChange}
                placeholder="Academic background"
              />
            </div>


            {/* ORDER */}

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


            {/* PHOTO UPLOAD */}

            <div className="admin-form-group admin-form-full">

              <label>
                TEAM MEMBER PHOTO
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />

              <small>
                Choose a JPG, PNG or WebP image under 8 MB.
              </small>

              {form.photo && (
                <div
                  style={{
                    marginTop: "18px",
                    width: "180px",
                    height: "220px",
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                    overflow: "hidden",
                    background: "#0b0e13",
                  }}
                >
                  <img
                    src={form.photo}
                    alt="Team member preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}

            </div>


            {/* BIO */}

            <div className="admin-form-group admin-form-full">

              <label>BIO</label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows="5"
                placeholder="Short professional biography"
              />

            </div>


            {/* SKILLS */}

            <div className="admin-form-group admin-form-full">

              <label>SKILLS</label>

              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="Python, AI, Web Development"
              />

              <small>
                Separate skills with commas.
              </small>

            </div>


            {/* PROJECTS */}

            <div className="admin-form-group admin-form-full">

              <label>PROJECTS</label>

              <input
                name="projects"
                value={form.projects}
                onChange={handleChange}
                placeholder="Project 1, Project 2"
              />

            </div>


            {/* ACHIEVEMENTS */}

            <div className="admin-form-group admin-form-full">

              <label>ACHIEVEMENTS</label>

              <input
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                placeholder="Achievement 1, Achievement 2"
              />

            </div>


            {/* CERTIFICATIONS */}

            <div className="admin-form-group admin-form-full">

              <label>CERTIFICATIONS</label>

              <input
                name="certifications"
                value={form.certifications}
                onChange={handleChange}
                placeholder="Certification 1, Certification 2"
              />

            </div>


            {/* LINKEDIN */}

            <div className="admin-form-group">

              <label>LINKEDIN</label>

              <input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />

            </div>


            {/* GITHUB */}

            <div className="admin-form-group">

              <label>GITHUB</label>

              <input
                name="github"
                value={form.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />

            </div>


            {/* INSTAGRAM */}

            <div className="admin-form-group">

              <label>INSTAGRAM</label>

              <input
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="Instagram URL"
              />

            </div>


            {/* VIDEO */}

            <div className="admin-form-group">

              <label>INTRO VIDEO</label>

              <input
                name="introVideo"
                value={form.introVideo}
                onChange={handleChange}
                placeholder="Video URL"
              />

            </div>


            {/* 3D MODEL */}

            <div className="admin-form-group">

              <label>3D MODEL</label>

              <input
                name="model3d"
                value={form.model3d}
                onChange={handleChange}
                placeholder="GLB / GLTF URL"
              />

            </div>


            {/* STATUS */}

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


          {/* ACTIONS */}

          <div className="admin-form-actions">

            <button
              type="submit"
              className="admin-primary-button"
              disabled={saving}
            >
              {saving
                ? "SAVING..."
                : editingId
                ? "UPDATE MEMBER →"
                : "CREATE MEMBER →"}
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


      {/* RECORDS */}

      <section className="admin-records-section">

        <div className="admin-section-heading">

          <div>
            <span>DATABASE</span>

            <h2>
              TEAM RECORDS
            </h2>
          </div>

          <strong>
            {members.length}
          </strong>

        </div>


        {loading ? (
          <div className="admin-empty-state">
            <strong>
              LOADING TEAM...
            </strong>
          </div>

        ) : members.length === 0 ? (
          <div className="admin-empty-state">
            <strong>
              NO TEAM MEMBERS YET
            </strong>
          </div>

        ) : (
          <div className="admin-record-list">

            {members.map((member) => (

              <article
                className="admin-record-item"
                key={member._id}
              >

                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginRight: "18px",
                    }}
                  />
                )}

                <div>

                  <span>
                    {member.role || "TEAM"}
                  </span>

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    {member.bio ||
                      "No biography added yet."}
                  </p>

                </div>

                <div className="admin-record-meta">

                  <strong>
                    {member.status?.toUpperCase() ||
                      "DRAFT"}
                  </strong>

                  <span>
                    ORDER {member.order || 1}
                  </span>

                </div>

                <div className="admin-record-actions">

                  <button
                    type="button"
                    onClick={() =>
                      editMember(member)
                    }
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      archiveMember(member._id)
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

export default AdminTeam;
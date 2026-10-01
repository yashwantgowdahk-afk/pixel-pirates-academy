import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

const EMPTY_FORM = {
  title: "",
  studentOrTeam: "",
  eventName: "",
  date: "",
  organization: "",
  image: "",
  certificate: "",
  description: "",
  videoUrl: "",
  relatedProject: "",
  status: "draft",
  order: 1,
};

function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const loadAchievements = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        `${API}/achievements`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load achievements"
        );
      }

      const data = await response.json();

      setAchievements(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Achievement loading error:",
        error
      );

      setMessage(
        "Unable to load achievement records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievements();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage(
        "Please select an image file."
      );
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setMessage(
        "Achievement photo must be under 4 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }));

      setMessage(
        "Achievement photo selected."
      );
    };

    reader.onerror = () => {
      setMessage(
        "Unable to read achievement photo."
      );
    };

    reader.readAsDataURL(file);
  };

  const handleCertificateUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const isImage =
      file.type.startsWith("image/");

    const isPdf =
      file.type === "application/pdf";

    if (!isImage && !isPdf) {
      setMessage(
        "Certificate must be an image or PDF."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage(
        "Certificate must be under 5 MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        certificate: reader.result,
      }));

      setMessage(
        "Certificate selected."
      );
    };

    reader.onerror = () => {
      setMessage(
        "Unable to read certificate."
      );
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      order: achievements.length + 1,
    });

    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        editingId
          ? `${API}/achievements/${editingId}`
          : `${API}/achievements`,
        {
          method: editingId
            ? "PUT"
            : "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,
            order:
              Number(form.order) || 1,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save achievement"
        );
      }

      setMessage(
        editingId
          ? "Achievement updated successfully."
          : "Achievement created successfully."
      );

      resetForm();

      await loadAchievements();
    } catch (error) {
      console.error(
        "Achievement save error:",
        error
      );

      setMessage(
        error.message
      );
    } finally {
      setSaving(false);
    }
  };

  const editAchievement = (
    achievement
  ) => {
    setEditingId(
      achievement._id
    );

    setForm({
      title:
        achievement.title || "",

      studentOrTeam:
        achievement.studentOrTeam || "",

      eventName:
        achievement.eventName || "",

      date:
        achievement.date || "",

      organization:
        achievement.organization || "",

      image:
        achievement.image || "",

      certificate:
        achievement.certificate || "",

      description:
        achievement.description || "",

      videoUrl:
        achievement.videoUrl || "",

      relatedProject:
        achievement.relatedProject || "",

      status:
        achievement.status ||
        "draft",

      order:
        achievement.order || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const archiveAchievement = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Archive this achievement?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API}/achievements/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to archive achievement"
        );
      }

      setMessage(
        "Achievement archived."
      );

      await loadAchievements();
    } catch (error) {
      console.error(error);

      setMessage(
        error.message
      );
    }
  };

  return (
    <main className="admin-crud-page">

      {/* HEADER */}

      <header className="admin-crud-header">

        <div>

          <p>
            PIXEL PIRATES / ADMIN / ACHIEVEMENTS
          </p>

          <h1>
            PROOF OF
            <br />
            <span>BUILDING.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Manage achievement records,
            photos and certificates.
          </p>

        </div>

        <button
          type="button"
          className="admin-back-button"
          onClick={() => {
            window.location.href =
              "/admin";
          }}
        >
          ← COMMAND CENTER
        </button>

      </header>


      {/* MESSAGE */}

      {message && (
        <div className="admin-empty-state">
          <strong>
            {message}
          </strong>
        </div>
      )}


      {/* FORM */}

      <section className="admin-crud-form-section">

        <div className="admin-section-heading">

          <div>

            <span>
              {editingId
                ? "EDIT ACHIEVEMENT"
                : "NEW ACHIEVEMENT"}
            </span>

            <h2>
              ACHIEVEMENT DETAILS
            </h2>

          </div>

        </div>


        <form
          className="admin-crud-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>
                ACHIEVEMENT TITLE
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Achievement title"
                required
              />
            </div>


            <div className="admin-form-group">
              <label>
                STUDENT / TEAM
              </label>

              <input
                name="studentOrTeam"
                value={form.studentOrTeam}
                onChange={handleChange}
                placeholder="Student or team"
              />
            </div>


            <div className="admin-form-group">
              <label>
                EVENT
              </label>

              <input
                name="eventName"
                value={form.eventName}
                onChange={handleChange}
                placeholder="Competition or event"
              />
            </div>


            <div className="admin-form-group">
              <label>
                DATE
              </label>

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>


            <div className="admin-form-group">
              <label>
                ORGANIZATION
              </label>

              <input
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Organization"
              />
            </div>


            <div className="admin-form-group">
              <label>
                DISPLAY ORDER
              </label>

              <input
                name="order"
                type="number"
                min="1"
                value={form.order}
                onChange={handleChange}
              />
            </div>


            {/* PHOTO */}

            <div className="admin-form-group admin-form-full">

              <label>
                ACHIEVEMENT PHOTO
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <small>
                Upload the achievement or event photo.
              </small>

              {form.image && (
                <img
                  src={form.image}
                  alt="Achievement preview"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "500px",
                    height: "280px",
                    objectFit: "cover",
                    marginTop: "16px",
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              )}

            </div>


            {/* CERTIFICATE */}

            <div className="admin-form-group admin-form-full">

              <label>
                CERTIFICATE
              </label>

              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={
                  handleCertificateUpload
                }
              />

              <small>
                Upload the certificate as an image or PDF.
              </small>

              {form.certificate && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "18px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background:
                      "rgba(255,255,255,0.03)",
                  }}
                >

                  <strong>
                    CERTIFICATE ATTACHED ✓
                  </strong>

                  {form.certificate.startsWith(
                    "data:image/"
                  ) && (
                    <img
                      src={form.certificate}
                      alt="Certificate preview"
                      style={{
                        display: "block",
                        width: "100%",
                        maxWidth: "600px",
                        marginTop: "16px",
                      }}
                    />
                  )}

                  {form.certificate.startsWith(
                    "data:application/pdf"
                  ) && (
                    <p
                      style={{
                        marginTop: "12px",
                        color:
                          "rgba(255,255,255,0.55)",
                      }}
                    >
                      PDF certificate attached.
                    </p>
                  )}

                </div>
              )}

            </div>


            {/* DESCRIPTION */}

            <div className="admin-form-group admin-form-full">

              <label>
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the achievement..."
              />

            </div>


            <div className="admin-form-group">

              <label>
                VIDEO URL
              </label>

              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="Video URL"
              />

            </div>


            <div className="admin-form-group">

              <label>
                RELATED PROJECT
              </label>

              <input
                name="relatedProject"
                value={form.relatedProject}
                onChange={handleChange}
                placeholder="Related project ID"
              />

            </div>


            <div className="admin-form-group">

              <label>
                STATUS
              </label>

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
              disabled={saving}
            >
              {saving
                ? "SAVING..."
                : editingId
                ? "UPDATE ACHIEVEMENT →"
                : "CREATE ACHIEVEMENT →"}
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

            <span>
              DATABASE
            </span>

            <h2>
              ACHIEVEMENT RECORDS
            </h2>

          </div>

          <strong>
            {achievements.length}
          </strong>

        </div>


        {loading ? (
          <div className="admin-empty-state">
            <strong>
              LOADING ACHIEVEMENTS...
            </strong>
          </div>

        ) : achievements.length === 0 ? (
          <div className="admin-empty-state">

            <strong>
              NO ACHIEVEMENTS YET
            </strong>

            <p>
              Add an achievement above.
            </p>

          </div>

        ) : (
          <div className="admin-record-list">

            {achievements.map(
              (achievement) => (

                <article
                  className="admin-record-item"
                  key={achievement._id}
                >

                  {achievement.image && (
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      style={{
                        width: "90px",
                        height: "70px",
                        objectFit: "cover",
                        marginRight: "18px",
                      }}
                    />
                  )}

                  <div>

                    <span>
                      {achievement.eventName ||
                        "ACHIEVEMENT"}
                    </span>

                    <h3>
                      {achievement.title}
                    </h3>

                    <p>
                      {achievement.studentOrTeam ||
                        ""}
                    </p>

                  </div>


                  <div className="admin-record-meta">

                    <strong>
                      {(
                        achievement.status ||
                        "draft"
                      ).toUpperCase()}
                    </strong>

                    <span>
                      {achievement.certificate
                        ? "CERTIFICATE ✓"
                        : "NO CERTIFICATE"}
                    </span>

                  </div>


                  <div className="admin-record-actions">

                    <button
                      type="button"
                      onClick={() =>
                        editAchievement(
                          achievement
                        )
                      }
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        archiveAchievement(
                          achievement._id
                        )
                      }
                    >
                      ARCHIVE
                    </button>

                  </div>

                </article>

              )
            )}

          </div>
        )}

      </section>

    </main>
  );
}

export default AdminAchievements;
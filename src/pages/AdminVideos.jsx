import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

const emptyForm = {
  title: "",
  thumbnail: "",
  description: "",
  videoUrl: "",
  embedUrl: "",
  date: "",
  category: "project-demo",
  status: "published",
  order: 1,
};

function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const categories = [
    {
      value: "academy-intro",
      label: "Academy Intro",
    },
    {
      value: "founder-intro",
      label: "Founder Intro",
    },
    {
      value: "project-demo",
      label: "Project Demo",
    },
    {
      value: "workshop",
      label: "Workshop",
    },
    {
      value: "student-project",
      label: "Student Project",
    },
    {
      value: "event-highlight",
      label: "Event Highlight",
    },
    {
      value: "tutorial",
      label: "Tutorial",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/videos/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load admin video records."
        );
      }

      const data = await response.json();

      setVideos(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Unable to load videos."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleThumbnailUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select an image file for the thumbnail."
      );
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setError(
        "Thumbnail must be smaller than 4MB."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        thumbnail: reader.result,
      }));

      setError("");
    };

    reader.onerror = () => {
      setError(
        "The thumbnail could not be read."
      );
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Video title is required.");
      return;
    }

    if (
      !form.videoUrl.trim() &&
      !form.embedUrl.trim()
    ) {
      setError(
        "Add either a direct video URL or an embed URL."
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const url = editingId
        ? `${API}/videos/admin/${editingId}`
        : `${API}/videos/admin`;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          description:
            form.description.trim(),
          videoUrl:
            form.videoUrl.trim(),
          embedUrl:
            form.embedUrl.trim(),
          date: form.date.trim(),
          order: Number(form.order) || 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save the video."
        );
      }

      setMessage(
        editingId
          ? "Video updated successfully."
          : "Video created successfully."
      );

      resetForm();

      await loadVideos();
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Unable to save the video."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (video) => {
    setEditingId(video._id);

    setForm({
      title: video.title || "",
      thumbnail: video.thumbnail || "",
      description:
        video.description || "",
      videoUrl:
        video.videoUrl || "",
      embedUrl:
        video.embedUrl || "",
      date: video.date || "",
      category:
        video.category || "project-demo",
      status:
        video.status || "published",
      order: video.order || 1,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleArchive = async (id) => {
    const confirmed = window.confirm(
      "Archive this video?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API}/videos/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to archive video."
        );
      }

      setMessage(
        "Video archived successfully."
      );

      if (editingId === id) {
        resetForm();
      }

      await loadVideos();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Unable to archive video."
      );
    }
  };

  const publishedCount = videos.filter(
    (video) =>
      video.status === "published"
  ).length;

  const draftCount = videos.filter(
    (video) =>
      video.status === "draft"
  ).length;

  return (
    <main className="admin-videos-page">
      <style>{`
        .admin-videos-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(0,215,255,0.08),
              transparent 25%
            ),
            #050607;
          color: #f4f7f9;
        }

        .admin-videos-page *,
        .admin-videos-page *::before,
        .admin-videos-page *::after {
          box-sizing: border-box;
        }

        .admin-videos-shell {
          width: min(1200px, calc(100% - 34px));
          margin: 0 auto;
          padding: 35px 0 80px;
        }

        .admin-videos-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 24px;
        }

        .admin-videos-kicker {
          color: #82eaff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        .admin-videos-top h1 {
          margin: 9px 0 8px;
          font-size: clamp(35px, 5vw, 58px);
          line-height: 0.97;
          letter-spacing: -0.055em;
        }

        .admin-videos-top h1 span {
          color: #82eaff;
        }

        .admin-videos-top p {
          max-width: 650px;
          margin: 0;
          color: rgba(255,255,255,0.52);
          font-size: 13px;
          line-height: 1.7;
        }

        .admin-videos-back {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 41px;
          padding: 0 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.62);
          text-decoration: none;
          font-size: 10px;
          white-space: nowrap;
        }

        .admin-videos-back:hover {
          color: #fff;
          border-color: rgba(0,215,255,0.24);
        }

        .admin-videos-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 22px;
        }

        .admin-video-stat {
          padding: 16px;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
        }

        .admin-video-stat small {
          display: block;
          color: rgba(255,255,255,0.33);
          font-family: monospace;
          font-size: 9px;
        }

        .admin-video-stat strong {
          display: block;
          margin-top: 7px;
          color: #85eaff;
          font-family: monospace;
          font-size: 16px;
        }

        .admin-videos-layout {
          display: grid;
          grid-template-columns: minmax(340px, 0.9fr) minmax(0, 1.1fr);
          gap: 18px;
          align-items: start;
        }

        .admin-video-panel {
          padding: 22px;
          border-radius: 21px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
        }

        .admin-video-panel h2 {
          margin: 0 0 5px;
          font-size: 21px;
          letter-spacing: -0.03em;
        }

        .admin-video-panel-subtitle {
          margin: 0 0 19px;
          color: rgba(255,255,255,0.42);
          font-size: 11px;
          line-height: 1.6;
        }

        .admin-video-field {
          margin-bottom: 13px;
        }

        .admin-video-field label {
          display: block;
          margin-bottom: 6px;
          color: rgba(255,255,255,0.48);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .admin-video-field input,
        .admin-video-field textarea,
        .admin-video-field select {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          background: rgba(255,255,255,0.035);
          color: #fff;
          outline: none;
          font-family: inherit;
          font-size: 12px;
        }

        .admin-video-field input,
        .admin-video-field select {
          min-height: 43px;
          padding: 0 12px;
        }

        .admin-video-field textarea {
          min-height: 95px;
          padding: 11px 12px;
          resize: vertical;
          line-height: 1.55;
        }

        .admin-video-field input:focus,
        .admin-video-field textarea:focus,
        .admin-video-field select:focus {
          border-color: rgba(0,215,255,0.30);
          box-shadow: 0 0 0 3px rgba(0,215,255,0.05);
        }

        .admin-video-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .admin-video-upload {
          display: block;
          padding: 15px;
          border-radius: 13px;
          border: 1px dashed rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.02);
        }

        .admin-video-upload input {
          border: 0;
          background: transparent;
          padding: 0;
          min-height: auto;
        }

        .admin-thumbnail-preview {
          margin-top: 11px;
          width: 100%;
          max-height: 180px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .admin-video-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 17px;
        }

        .admin-video-button {
          min-height: 43px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid rgba(0,215,255,0.22);
          background: rgba(0,215,255,0.08);
          color: #8cecff;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
        }

        .admin-video-button:hover {
          background: rgba(0,215,255,0.13);
        }

        .admin-video-button.secondary {
          border-color: rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.63);
        }

        .admin-video-button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .admin-video-message {
          margin-bottom: 15px;
          padding: 11px 13px;
          border-radius: 10px;
          border: 1px solid rgba(0,215,255,0.16);
          background: rgba(0,215,255,0.05);
          color: #90eaff;
          font-size: 11px;
        }

        .admin-video-error {
          margin-bottom: 15px;
          padding: 11px 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,80,80,0.18);
          background: rgba(255,80,80,0.04);
          color: #ffbaba;
          font-size: 11px;
        }

        .admin-video-list {
          display: grid;
          gap: 11px;
        }

        .admin-video-record {
          display: grid;
          grid-template-columns: 135px minmax(0, 1fr);
          gap: 14px;
          padding: 13px;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
        }

        .admin-video-record-thumb {
          position: relative;
          height: 88px;
          overflow: hidden;
          border-radius: 10px;
          background: #080a0b;
        }

        .admin-video-record-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .admin-video-record-no-image {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.20);
          font-family: monospace;
          font-size: 12px;
        }

        .admin-video-status {
          position: absolute;
          left: 7px;
          top: 7px;
          padding: 5px 7px;
          border-radius: 999px;
          background: rgba(0,0,0,0.65);
          color: #8cecff;
          font-family: monospace;
          font-size: 8px;
        }

        .admin-video-record-content {
          min-width: 0;
        }

        .admin-video-record-content h3 {
          margin: 0;
          font-size: 15px;
          line-height: 1.3;
        }

        .admin-video-record-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 7px;
        }

        .admin-video-meta-pill {
          padding: 5px 7px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.43);
          font-size: 8px;
        }

        .admin-video-record-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 10px;
        }

        .admin-small-button {
          min-height: 32px;
          padding: 0 9px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.62);
          cursor: pointer;
          font-size: 9px;
          font-weight: 700;
        }

        .admin-small-button:hover {
          color: #fff;
          border-color: rgba(0,215,255,0.22);
        }

        .admin-small-button.archive:hover {
          color: #ffb9b9;
          border-color: rgba(255,80,80,0.20);
        }

        .admin-video-empty {
          padding: 50px 20px;
          border: 1px dashed rgba(255,255,255,0.09);
          border-radius: 16px;
          text-align: center;
          color: rgba(255,255,255,0.42);
          font-family: monospace;
          font-size: 10px;
        }

        @media (max-width: 950px) {
          .admin-videos-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
          .admin-videos-shell {
            width: min(100% - 20px, 1200px);
            padding-top: 20px;
          }

          .admin-videos-top {
            flex-direction: column;
          }

          .admin-videos-stats {
            grid-template-columns: 1fr;
          }

          .admin-video-row {
            grid-template-columns: 1fr;
          }

          .admin-video-record {
            grid-template-columns: 1fr;
          }

          .admin-video-record-thumb {
            height: 170px;
          }
        }
      `}</style>

      <div className="admin-videos-shell">

        <div className="admin-videos-top">
          <div>
            <div className="admin-videos-kicker">
              ADMIN / MEDIA CONTROL
            </div>

            <h1>
              Video <span>Command.</span>
            </h1>

            <p>
              Add, edit, publish and archive academy videos.
              Published records automatically become available
              on the public Video Lab and homepage.
            </p>
          </div>

          <a
            href="/admin"
            className="admin-videos-back"
          >
            ← Command Center
          </a>
        </div>

        <div className="admin-videos-stats">

          <div className="admin-video-stat">
            <small>TOTAL RECORDS</small>
            <strong>{videos.length}</strong>
          </div>

          <div className="admin-video-stat">
            <small>PUBLISHED</small>
            <strong>{publishedCount}</strong>
          </div>

          <div className="admin-video-stat">
            <small>DRAFTS</small>
            <strong>{draftCount}</strong>
          </div>

        </div>

        {message && (
          <div className="admin-video-message">
            {message}
          </div>
        )}

        {error && (
          <div className="admin-video-error">
            {error}
          </div>
        )}

        <div className="admin-videos-layout">

          {/* FORM */}

          <section className="admin-video-panel">

            <h2>
              {editingId
                ? "Edit Video"
                : "Add Video"}
            </h2>

            <p className="admin-video-panel-subtitle">
              Create a video record for the academy media
              library.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="admin-video-field">
                <label>Video Title *</label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Project demo / workshop / intro"
                />
              </div>

              <div className="admin-video-field">
                <label>Description</label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what this video shows..."
                />
              </div>

              <div className="admin-video-field">
                <label>Thumbnail</label>

                <div className="admin-video-upload">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />

                  {form.thumbnail && (
                    <img
                      className="admin-thumbnail-preview"
                      src={form.thumbnail}
                      alt="Video thumbnail preview"
                    />
                  )}

                </div>
              </div>

              <div className="admin-video-field">
                <label>Direct Video URL</label>

                <input
                  type="url"
                  name="videoUrl"
                  value={form.videoUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="admin-video-field">
                <label>Embed URL</label>

                <input
                  type="url"
                  name="embedUrl"
                  value={form.embedUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div className="admin-video-row">

                <div className="admin-video-field">
                  <label>Category</label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categories.map(
                      (category) => (
                        <option
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="admin-video-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="published">
                      Published
                    </option>

                    <option value="draft">
                      Draft
                    </option>

                    <option value="archived">
                      Archived
                    </option>
                  </select>
                </div>

              </div>

              <div className="admin-video-row">

                <div className="admin-video-field">
                  <label>Date</label>

                  <input
                    type="text"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    placeholder="2026-09-29"
                  />
                </div>

                <div className="admin-video-field">
                  <label>Display Order</label>

                  <input
                    type="number"
                    name="order"
                    min="1"
                    value={form.order}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="admin-video-actions">

                <button
                  type="submit"
                  className="admin-video-button"
                  disabled={saving}
                >
                  {saving
                    ? "SAVING..."
                    : editingId
                    ? "UPDATE VIDEO"
                    : "ADD VIDEO"}
                </button>

                <button
                  type="button"
                  className="admin-video-button secondary"
                  onClick={resetForm}
                >
                  CLEAR
                </button>

              </div>

            </form>
          </section>

          {/* VIDEO LIST */}

          <section className="admin-video-panel">

            <h2>
              Video Records
            </h2>

            <p className="admin-video-panel-subtitle">
              Manage the videos already stored in the academy
              database.
            </p>

            {loading ? (
              <div className="admin-video-empty">
                LOADING VIDEO DATABASE...
              </div>
            ) : videos.length === 0 ? (
              <div className="admin-video-empty">
                NO VIDEO RECORDS YET.
              </div>
            ) : (
              <div className="admin-video-list">

                {videos.map((video) => (
                  <article
                    className="admin-video-record"
                    key={video._id}
                  >

                    <div className="admin-video-record-thumb">

                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={
                            video.title ||
                            "Video thumbnail"
                          }
                        />
                      ) : (
                        <div className="admin-video-record-no-image">
                          VIDEO
                        </div>
                      )}

                      <div className="admin-video-status">
                        {video.status ||
                          "unknown"}
                      </div>

                    </div>

                    <div className="admin-video-record-content">

                      <h3>
                        {video.title ||
                          "Untitled Video"}
                      </h3>

                      <div className="admin-video-record-meta">

                        <span className="admin-video-meta-pill">
                          {video.category ||
                            "OTHER"}
                        </span>

                        <span className="admin-video-meta-pill">
                          ORDER {video.order || 1}
                        </span>

                        {video.date && (
                          <span className="admin-video-meta-pill">
                            {video.date}
                          </span>
                        )}

                      </div>

                      <div className="admin-video-record-actions">

                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() =>
                            handleEdit(video)
                          }
                        >
                          EDIT
                        </button>

                        <button
                          type="button"
                          className="admin-small-button archive"
                          onClick={() =>
                            handleArchive(
                              video._id
                            )
                          }
                        >
                          ARCHIVE
                        </button>

                      </div>

                    </div>

                  </article>
                ))}

              </div>
            )}

          </section>

        </div>

      </div>
    </main>
  );
}

export default AdminVideos;
import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  videoUrl: "",
  category: "classes",
  status: "published",
  order: 1,
};

function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const loadGallery = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/gallery`);

      if (!response.ok) {
        throw new Error("Unable to load gallery");
      }

      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gallery loading error:", error);
      setMessage("Unable to load gallery records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
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

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be under 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        image: reader.result,
      }));

      setMessage("Gallery image selected.");
    };

    reader.onerror = () => {
      setMessage("Unable to read image.");
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      order: items.length + 1,
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
          ? `${API}/gallery/${editingId}`
          : `${API}/gallery`,
        {
          method: editingId ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...form,
            order: Number(form.order) || 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save gallery item"
        );
      }

      setMessage(
        editingId
          ? "Gallery item updated successfully."
          : "Gallery item created successfully."
      );

      resetForm();
      await loadGallery();
    } catch (error) {
      console.error("Gallery save error:", error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const editItem = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title || "",
      description: item.description || "",
      image: item.image || "",
      videoUrl: item.videoUrl || "",
      category: item.category || "classes",
      status: item.status || "published",
      order: item.order || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const archiveItem = async (id) => {
    const confirmed = window.confirm(
      "Archive this gallery item?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/gallery/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to archive gallery item"
        );
      }

      setMessage("Gallery item archived.");
      await loadGallery();
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <main className="admin-crud-page">

      <header className="admin-crud-header">

        <div>
          <p>
            PIXEL PIRATES / ADMIN / GALLERY
          </p>

          <h1>
            MEDIA
            <br />
            <span>ARCHIVE.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Upload and manage academy photos,
            demonstrations, workshops, competitions
            and project moments.
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
                ? "EDIT GALLERY ITEM"
                : "NEW GALLERY ITEM"}
            </span>

            <h2>
              MEDIA DETAILS
            </h2>
          </div>

        </div>


        <form
          className="admin-crud-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>TITLE</label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Workshop moment"
                required
              />
            </div>


            <div className="admin-form-group">
              <label>CATEGORY</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="classes">Classes</option>
                <option value="workshops">Workshops</option>
                <option value="hackathons">Hackathons</option>
                <option value="projects">Projects</option>
                <option value="events">Events</option>
                <option value="team">Team</option>
                <option value="certificates">Certificates</option>
                <option value="demonstrations">
                  Demonstrations
                </option>
                <option value="other">Other</option>
              </select>
            </div>


            <div className="admin-form-group admin-form-full">

              <label>IMAGE</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <small>
                Select an image under 5 MB.
              </small>

              {form.image && (
                <img
                  src={form.image}
                  alt="Gallery preview"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "500px",
                    height: "280px",
                    objectFit: "cover",
                    marginTop: "16px",
                  }}
                />
              )}

            </div>


            <div className="admin-form-group admin-form-full">

              <label>DESCRIPTION</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe this gallery moment..."
              />

            </div>


            <div className="admin-form-group">

              <label>VIDEO URL</label>

              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="Optional video URL"
              />

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


            <div className="admin-form-group">

              <label>STATUS</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>

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
                ? "UPDATE GALLERY →"
                : "CREATE GALLERY ITEM →"}
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
              GALLERY RECORDS
            </h2>
          </div>

          <strong>
            {items.length}
          </strong>

        </div>


        {loading ? (
          <div className="admin-empty-state">
            <strong>
              LOADING GALLERY...
            </strong>
          </div>
        ) : items.length === 0 ? (
          <div className="admin-empty-state">
            <strong>
              NO GALLERY ITEMS YET
            </strong>

            <p>
              Upload your first gallery image above.
            </p>
          </div>
        ) : (
          <div className="admin-record-list">

            {items.map((item) => (

              <article
                className="admin-record-item"
                key={item._id}
              >

                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "110px",
                      height: "75px",
                      objectFit: "cover",
                      marginRight: "18px",
                    }}
                  />
                )}

                <div>

                  <span>
                    {(item.category || "other")
                      .toUpperCase()}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description ||
                      "No description added."}
                  </p>

                </div>


                <div className="admin-record-meta">

                  <strong>
                    {(item.status || "draft").toUpperCase()}
                  </strong>

                  <span>
                    ORDER {item.order || 1}
                  </span>

                </div>


                <div className="admin-record-actions">

                  <button
                    type="button"
                    onClick={() => editItem(item)}
                  >
                    EDIT
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      archiveItem(item._id)
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

export default AdminGallery;
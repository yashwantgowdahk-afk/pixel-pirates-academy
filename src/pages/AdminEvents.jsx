import { useEffect, useState } from "react";

import API from "../api";

const EMPTY_FORM = {
  name: "",
  date: "",
  time: "",
  location: "",
  description: "",
  organizer: "",
  poster: "",
  registrationUrl: "",
  status: "upcoming",
  order: 1,
};

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const loadEvents = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API}/events`);

      if (!response.ok) {
        throw new Error("Unable to load events");
      }

      const data = await response.json();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Events loading error:", error);
      setMessage("Unable to load event records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePosterUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image poster.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setMessage("Poster must be under 4 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        poster: reader.result,
      }));

      setMessage("Event poster selected.");
    };

    reader.onerror = () => {
      setMessage("Unable to read the poster.");
    };

    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({
      ...EMPTY_FORM,
      order: events.length + 1,
    });

    setEditingId(null);
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const url = editingId
        ? `${API}/events/${editingId}`
        : `${API}/events`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          order: Number(form.order) || 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save event"
        );
      }

      setMessage(
        editingId
          ? "Event updated successfully."
          : "Event created successfully."
      );

      resetForm();
      await loadEvents();
    } catch (error) {
      console.error("Event save error:", error);
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const editEvent = (eventRecord) => {
    setEditingId(eventRecord._id);

    setForm({
      name: eventRecord.name || "",
      date: eventRecord.date || "",
      time: eventRecord.time || "",
      location: eventRecord.location || "",
      description: eventRecord.description || "",
      organizer: eventRecord.organizer || "",
      poster: eventRecord.poster || "",
      registrationUrl: eventRecord.registrationUrl || "",
      status: eventRecord.status || "upcoming",
      order: eventRecord.order || 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const completeEvent = async (id) => {
    const confirmed = window.confirm(
      "Mark this event as completed?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/events/${id}`,
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
          data.message || "Unable to complete event"
        );
      }

      setMessage("Event marked as completed.");
      await loadEvents();
    } catch (error) {
      console.error("Complete event error:", error);
      setMessage(error.message);
    }
  };

  return (
    <main className="admin-crud-page">

      {/* HEADER */}

      <header className="admin-crud-header">

        <div>

          <p>
            PIXEL PIRATES / ADMIN / EVENTS
          </p>

          <h1>
            EVENT
            <br />
            <span>CONTROL.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Create and manage workshops,
            competitions, demonstrations and academy events.
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


      {/* EVENT FORM */}

      <section className="admin-crud-form-section">

        <div className="admin-section-heading">

          <div>

            <span>
              {editingId
                ? "EDIT EVENT"
                : "NEW EVENT"}
            </span>

            <h2>
              EVENT DETAILS
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
              <label>EVENT NAME</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Event name"
                required
              />
            </div>


            {/* ORGANIZER */}

            <div className="admin-form-group">
              <label>ORGANIZER</label>

              <input
                name="organizer"
                value={form.organizer}
                onChange={handleChange}
                placeholder="Organizer"
              />
            </div>


            {/* DATE */}

            <div className="admin-form-group">
              <label>DATE</label>

              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>


            {/* TIME */}

            <div className="admin-form-group">
              <label>TIME</label>

              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
              />
            </div>


            {/* LOCATION */}

            <div className="admin-form-group admin-form-full">
              <label>LOCATION</label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Event location"
              />
            </div>


            {/* DESCRIPTION */}

            <div className="admin-form-group admin-form-full">
              <label>DESCRIPTION</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the event..."
              />
            </div>


            {/* POSTER */}

            <div className="admin-form-group admin-form-full">

              <label>EVENT POSTER</label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
              />

              <small>
                Upload the official event poster.
              </small>

              {form.poster && (
                <img
                  src={form.poster}
                  alt="Event poster preview"
                  style={{
                    display: "block",
                    width: "100%",
                    maxWidth: "450px",
                    height: "280px",
                    objectFit: "cover",
                    marginTop: "16px",
                    border:
                      "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              )}

            </div>


            {/* REGISTRATION URL */}

            <div className="admin-form-group admin-form-full">

              <label>
                REGISTRATION URL
              </label>

              <input
                name="registrationUrl"
                value={form.registrationUrl}
                onChange={handleChange}
                placeholder="Registration page URL"
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
                <option value="upcoming">
                  Upcoming
                </option>

                <option value="registration-open">
                  Registration Open
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>

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
                ? "UPDATE EVENT →"
                : "CREATE EVENT →"}
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


      {/* EVENT RECORDS */}

      <section className="admin-records-section">

        <div className="admin-section-heading">

          <div>

            <span>
              DATABASE
            </span>

            <h2>
              EVENT RECORDS
            </h2>

          </div>

          <strong>
            {events.length}
          </strong>

        </div>


        {loading ? (

          <div className="admin-empty-state">
            <strong>
              LOADING EVENTS...
            </strong>
          </div>

        ) : events.length === 0 ? (

          <div className="admin-empty-state">

            <strong>
              NO EVENTS YET
            </strong>

            <p>
              Create your first event above.
            </p>

          </div>

        ) : (

          <div className="admin-record-list">

            {events.map((eventRecord) => (

              <article
                className="admin-record-item"
                key={eventRecord._id}
              >

                {eventRecord.poster && (
                  <img
                    src={eventRecord.poster}
                    alt={eventRecord.name}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      marginRight: "18px",
                    }}
                  />
                )}


                <div>

                  <span>
                    {eventRecord.location ||
                      "ACADEMY EVENT"}
                  </span>

                  <h3>
                    {eventRecord.name}
                  </h3>

                  <p>
                    {eventRecord.date || ""}
                    {eventRecord.time
                      ? ` • ${eventRecord.time}`
                      : ""}
                  </p>

                </div>


                <div className="admin-record-meta">

                  <strong>
                    {(
                      eventRecord.status ||
                      "upcoming"
                    ).toUpperCase()}
                  </strong>

                  <span>
                    ORDER {eventRecord.order || 1}
                  </span>

                </div>


                <div className="admin-record-actions">

                  <button
                    type="button"
                    onClick={() =>
                      editEvent(eventRecord)
                    }
                  >
                    EDIT
                  </button>

                  {eventRecord.status !==
                    "completed" && (
                    <button
                      type="button"
                      onClick={() =>
                        completeEvent(
                          eventRecord._id
                        )
                      }
                    >
                      COMPLETE
                    </button>
                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default AdminEvents;
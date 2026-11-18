import { useEffect, useState } from "react";

import API from "../api";

function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("pixelPiratesAdminToken");

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/registrations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load registrations");
      }

      const data = await response.json();

      setRegistrations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Registration loading error:", err);
      setError("Unable to load student applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API}/registrations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Unable to update registration");
      }

      await loadRegistrations();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Unable to update status.");
    }
  };

  const deleteRegistration = async (id) => {
    const confirmed = window.confirm(
      "Delete this registration?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API}/registrations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete registration");
      }

      await loadRegistrations();
    } catch (err) {
      console.error("Delete registration error:", err);
      alert("Unable to delete registration.");
    }
  };

  return (
    <main className="admin-crud-page">

      <header className="admin-crud-header">
        <div>
          <p>PIXEL PIRATES / ADMIN / 010</p>

          <h1>
            REGISTRATION
            <br />
            <span>CONTROL.</span>
          </h1>

          <p className="admin-crud-subtitle">
            Manage student applications received through
            the academy registration system.
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

      <section className="admin-record-toolbar">
        <div>
          <span>APPLICATIONS</span>
          <strong>{registrations.length}</strong>
        </div>

        <button
          type="button"
          onClick={loadRegistrations}
        >
          REFRESH ↻
        </button>
      </section>

      {loading && (
        <div className="admin-empty-state">
          <strong>LOADING APPLICATIONS...</strong>
        </div>
      )}

      {!loading && error && (
        <div className="admin-empty-state">
          <strong>{error}</strong>

          <button
            type="button"
            onClick={loadRegistrations}
          >
            RETRY
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        registrations.length === 0 && (
          <div className="admin-empty-state">
            <strong>NO REGISTRATIONS YET</strong>

            <p>
              New student applications will appear here.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        registrations.length > 0 && (
          <section className="admin-record-grid">

            {registrations.map((registration) => (
              <article
                className="admin-registration-card"
                key={registration._id}
              >

                <div className="admin-registration-top">
                  <span>
                    APPLICATION /{" "}
                    {registration._id
                      .slice(-6)
                      .toUpperCase()}
                  </span>

                  <select
                    value={registration.status || "new"}
                    onChange={(event) =>
                      updateStatus(
                        registration._id,
                        event.target.value
                      )
                    }
                  >
                    <option value="new">NEW</option>

                    <option value="contacted">
                      CONTACTED
                    </option>

                    <option value="enrolled">
                      ENROLLED
                    </option>

                    <option value="closed">
                      CLOSED
                    </option>
                  </select>
                </div>

                <h2>
                  {registration.fullName ||
                    "Unnamed Student"}
                </h2>

                <p className="admin-registration-course">
                  {registration.course ||
                    "Course not selected"}
                </p>

                <div className="admin-registration-details">

                  <div>
                    <span>EMAIL</span>
                    <strong>
                      {registration.email || "—"}
                    </strong>
                  </div>

                  <div>
                    <span>PHONE</span>
                    <strong>
                      {registration.phone || "—"}
                    </strong>
                  </div>

                  <div>
                    <span>INSTITUTION</span>
                    <strong>
                      {registration.schoolOrCollege ||
                        "—"}
                    </strong>
                  </div>

                  <div>
                    <span>CLASS / YEAR</span>
                    <strong>
                      {registration.classOrYear || "—"}
                    </strong>
                  </div>

                </div>

                {registration.message && (
                  <div className="admin-registration-message">
                    <span>MESSAGE</span>
                    <p>
                      {registration.message}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() =>
                    deleteRegistration(
                      registration._id
                    )
                  }
                >
                  DELETE APPLICATION
                </button>

              </article>
            ))}

          </section>
        )}

    </main>
  );
}

export default AdminRegistrations;
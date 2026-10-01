import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://10.190.128.140:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      localStorage.setItem(
        "pixelPiratesAdminToken",
        data.token
      );

      localStorage.setItem(
        "pixelPiratesAdmin",
        JSON.stringify(data.admin)
      );

      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      <div className="admin-login-grid"></div>

      <div className="admin-login-glow admin-login-glow-one"></div>
      <div className="admin-login-glow admin-login-glow-two"></div>

      <div className="admin-login-topbar">

        <div>
          PIXEL PIRATES ACADEMY
        </div>

        <div>
          ADMIN SYSTEM / 001
        </div>

      </div>


      <section className="admin-login-card">

        <div className="admin-login-status">

          <span></span>

          SECURE ADMIN ACCESS

        </div>


        <div className="admin-login-logo">

          <div className="admin-login-logo-ring"></div>

          <span>PP</span>

        </div>


        <p className="admin-login-overline">
          PIXEL PIRATES / CONTROL SYSTEM
        </p>


        <h1>
          ENTER
          <br />
          <span>THE COMMAND CENTER.</span>
        </h1>


        <p className="admin-login-description">
          Manage academy content, courses, projects,
          achievements, events, team profiles,
          registrations and media.
        </p>


        <form
          className="admin-login-form"
          onSubmit={handleLogin}
        >

          <label>
            ADMIN EMAIL

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@pixelpiratesacademy.com"
              required
              autoComplete="email"
            />

          </label>


          <label>
            PASSWORD

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter admin password"
              required
              autoComplete="current-password"
            />

          </label>


          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading
              ? "AUTHENTICATING..."
              : "ENTER COMMAND CENTER"}

            <span>
              →
            </span>

          </button>

        </form>


        <div className="admin-login-footer">

          <span>
            ENCRYPTED SESSION
          </span>

          <span>
            JWT AUTH
          </span>

          <span>
            SYSTEM ONLINE
          </span>

        </div>

      </section>


      <div className="admin-login-bottom">

        <span>
          PP / ADMIN
        </span>

        <div></div>

        <span>
          AUTHORIZED PERSONNEL ONLY
        </span>

      </div>

    </main>
  );
}

export default AdminLogin;

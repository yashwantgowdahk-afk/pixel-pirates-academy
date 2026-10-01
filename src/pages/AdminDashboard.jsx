import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const adminEmail =
    localStorage.getItem("pixelPiratesAdmin") ||
    "admin@pixelpiratesacademy.com";

  const handleLogout = () => {
    localStorage.removeItem("pixelPiratesAdminToken");
    localStorage.removeItem("pixelPiratesAdmin");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const sections = [
    {
      title: "Homepage",
      description: "Manage the main academy landing page.",
      path: "/admin",
      icon: "⌂",
    },
    {
      title: "Courses",
      description: "Create and manage academy courses.",
      path: "/admin/courses",
      icon: "▣",
    },
    {
      title: "Projects",
      description: "Manage student projects and demos.",
      path: "/admin/projects",
      icon: "◈",
    },
    {
      title: "Achievements",
      description: "Manage awards, certificates and milestones.",
      path: "/admin/achievements",
      icon: "★",
    },
    {
      title: "Events",
      description: "Manage academy events and registrations.",
      path: "/admin/events",
      icon: "◷",
    },
    {
      title: "Team",
      description: "Manage individual team profiles.",
      path: "/admin/team",
      icon: "◎",
    },
    {
      title: "Gallery",
      description: "Upload and manage academy media.",
      path: "/admin/gallery",
      icon: "▧",
    },
    {
      title: "Videos",
      description: "Add and manage the academy video library.",
      path: "/admin/videos",
      icon: "▶",
      featured: true,
    },
    {
      title: "Registrations",
      description: "Manage student registration submissions.",
      path: "/admin/registrations",
      icon: "▤",
    },
  ];

  return (
    <main className="admin-dashboard-v2">
      <style>{`
        .admin-dashboard-v2 {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 12% 5%,
              rgba(0,215,255,0.08),
              transparent 25%
            ),
            #050607;
          color: #f4f7f9;
        }

        .admin-dashboard-v2 *,
        .admin-dashboard-v2 *::before,
        .admin-dashboard-v2 *::after {
          box-sizing: border-box;
        }

        .admin-dashboard-shell {
          width: min(1250px, calc(100% - 34px));
          margin: 0 auto;
          padding: 35px 0 75px;
        }

        .admin-command-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 20px 22px;
          margin-bottom: 25px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(14px);
        }

        .admin-brand {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .admin-brand-mark {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          border: 1px solid rgba(0,215,255,0.22);
          background: rgba(0,215,255,0.07);
          color: #8cecff;
          font-size: 16px;
          font-weight: 900;
        }

        .admin-brand small {
          display: block;
          color: rgba(255,255,255,0.38);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .admin-brand strong {
          display: block;
          margin-top: 4px;
          font-size: 17px;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .admin-email {
          display: none;
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(255,255,255,0.43);
          font-family: monospace;
          font-size: 10px;
        }

        .admin-logout {
          min-height: 40px;
          padding: 0 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,80,80,0.17);
          background: rgba(255,80,80,0.04);
          color: #ffb7b7;
          cursor: pointer;
          font-size: 10px;
          font-weight: 800;
        }

        .admin-command-hero {
          position: relative;
          padding: 35px;
          margin-bottom: 22px;
          border-radius: 25px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.015)
            );
        }

        .admin-command-hero h1 {
          margin: 10px 0;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .admin-command-hero h1 span {
          color: #83e9ff;
        }

        .admin-command-hero p {
          max-width: 650px;
          margin: 0;
          color: rgba(255,255,255,0.55);
          font-size: 14px;
          line-height: 1.7;
        }

        .admin-kicker {
          color: #83e9ff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        .admin-status-strip {
          display: grid;
          grid-template-columns: repeat(4, minmax(0,1fr));
          gap: 10px;
          margin-bottom: 30px;
        }

        .admin-status-box {
          padding: 16px;
          border-radius: 15px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
        }

        .admin-status-box small {
          display: block;
          color: rgba(255,255,255,0.33);
          font-family: monospace;
          font-size: 9px;
        }

        .admin-status-box strong {
          display: block;
          margin-top: 7px;
          color: #8cecff;
          font-family: monospace;
          font-size: 12px;
        }

        .admin-section-heading {
          margin-bottom: 15px;
        }

        .admin-section-heading small {
          color: #82e9ff;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
        }

        .admin-section-heading h2 {
          margin: 7px 0 0;
          font-size: 24px;
        }

        .admin-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 14px;
        }

        .admin-section-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 190px;
          padding: 20px;
          border-radius: 19px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.045),
              rgba(255,255,255,0.012)
            );
          text-decoration: none;
          color: #fff;
          transition: 0.25s ease;
        }

        .admin-section-card:hover {
          transform: translateY(-5px);
          border-color: rgba(0,215,255,0.25);
        }

        .admin-section-card.featured {
          border-color: rgba(0,215,255,0.24);
          background:
            linear-gradient(
              145deg,
              rgba(0,215,255,0.075),
              rgba(255,255,255,0.018)
            );
        }

        .admin-card-number {
          position: absolute;
          top: 13px;
          right: 13px;
          color: rgba(255,255,255,0.20);
          font-family: monospace;
          font-size: 9px;
        }

        .admin-card-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: #8cecff;
          font-size: 17px;
          margin-bottom: 18px;
        }

        .admin-section-card h3 {
          margin: 0;
          font-size: 17px;
        }

        .admin-section-card p {
          margin: 8px 0 0;
          color: rgba(255,255,255,0.47);
          font-size: 11px;
          line-height: 1.6;
        }

        .admin-card-open {
          margin-top: auto;
          padding-top: 15px;
          color: #82e9ff;
          font-family: monospace;
          font-size: 9px;
        }

        .admin-dashboard-footer {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 9px;
        }

        @media (min-width: 760px) {
          .admin-email {
            display: block;
          }
        }

        @media (max-width: 800px) {
          .admin-status-strip {
            grid-template-columns: repeat(2, minmax(0,1fr));
          }

          .admin-card-grid {
            grid-template-columns: repeat(2, minmax(0,1fr));
          }
        }

        @media (max-width: 560px) {
          .admin-dashboard-shell {
            width: min(100% - 20px,1250px);
            padding-top: 20px;
          }

          .admin-command-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .admin-status-strip,
          .admin-card-grid {
            grid-template-columns: 1fr;
          }

          .admin-dashboard-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="admin-dashboard-shell">

        <header className="admin-command-header">
          <div className="admin-brand">
            <div className="admin-brand-mark">
              PP
            </div>

            <div>
              <small>PIXEL PIRATES</small>
              <strong>Academy Command Center</strong>
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-email">
              {adminEmail}
            </div>

            <button
              type="button"
              className="admin-logout"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
        </header>

        <section className="admin-command-hero">
          <div className="admin-kicker">
            ADMIN / CONTROL PANEL
          </div>

          <h1>
            Manage the
            <br />
            <span>academy.</span>
          </h1>

          <p>
            Manage courses, projects, achievements,
            events, team profiles, gallery, videos
            and registrations from one command center.
          </p>
        </section>

        <section className="admin-status-strip">

          <div className="admin-status-box">
            <small>AUTHENTICATION</small>
            <strong>JWT ACTIVE</strong>
          </div>

          <div className="admin-status-box">
            <small>DATABASE</small>
            <strong>MONGODB ONLINE</strong>
          </div>

          <div className="admin-status-box">
            <small>API</small>
            <strong>LOCAL : 5000</strong>
          </div>

          <div className="admin-status-box">
            <small>CMS MODE</small>
            <strong>LIVE CONTROL</strong>
          </div>

        </section>

        <section>

          <div className="admin-section-heading">
            <small>01 / CONTENT MANAGEMENT</small>
            <h2>Academy sections</h2>
          </div>

          <div className="admin-card-grid">

            {sections.map((section, index) => (
              <Link
                key={section.title}
                to={section.path}
                className={`admin-section-card ${
                  section.featured ? "featured" : ""
                }`}
              >

                <div className="admin-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="admin-card-icon">
                  {section.icon}
                </div>

                <h3>
                  {section.title}
                </h3>

                <p>
                  {section.description}
                </p>

                <span className="admin-card-open">
                  OPEN SECTION →
                </span>

              </Link>
            ))}

          </div>

        </section>

        <footer className="admin-dashboard-footer">
          <span>
            PIXEL PIRATES ACADEMY / ADMIN SYSTEM
          </span>

          <span>
            DATABASE CONNECTED
          </span>
        </footer>

      </div>
    </main>
  );
}

export default AdminDashboard;
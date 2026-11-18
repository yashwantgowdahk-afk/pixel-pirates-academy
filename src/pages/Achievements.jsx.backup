import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://10.190.128.140:5000/api";

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/achievements`);

        if (!response.ok) {
          throw new Error("Unable to load achievements");
        }

        const data = await response.json();
        setAchievements(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Achievements could not be loaded right now.");
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, []);

  return (
    <main className="achievements-page">
      <style>{`
        .achievements-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 15% 10%, rgba(0, 210, 255, 0.10), transparent 28%),
            radial-gradient(circle at 85% 30%, rgba(84, 90, 255, 0.10), transparent 28%),
            #060708;
          color: #f5f7fa;
          overflow: hidden;
        }

        .achievements-page * {
          box-sizing: border-box;
        }

        .achievements-container {
          width: min(1200px, calc(100% - 32px));
          margin: 0 auto;
          padding: 90px 0 100px;
        }

        .achievements-hero {
          position: relative;
          padding: 72px 30px;
          margin-bottom: 44px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 30px;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.015)
            );
          backdrop-filter: blur(18px);
        }

        .achievements-hero::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          top: -120px;
          right: -80px;
          background: rgba(0, 210, 255, 0.08);
          filter: blur(10px);
        }

        .achievements-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 8px 13px;
          border: 1px solid rgba(0, 210, 255, 0.25);
          border-radius: 999px;
          color: #8aeaff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: rgba(0, 210, 255, 0.05);
        }

        .achievements-kicker-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6fe7ff;
          box-shadow: 0 0 14px rgba(111,231,255,0.9);
        }

        .achievements-title {
          margin: 20px 0 14px;
          max-width: 780px;
          font-size: clamp(42px, 7vw, 82px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 800;
        }

        .achievements-title span {
          color: #7ee7ff;
        }

        .achievements-subtitle {
          max-width: 730px;
          margin: 0;
          color: rgba(255,255,255,0.68);
          font-size: 17px;
          line-height: 1.8;
        }

        .achievements-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .achievement-meta-pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
          font-size: 13px;
        }

        .achievements-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin: 0 2px 18px;
        }

        .achievements-status h2 {
          margin: 0;
          font-size: 22px;
        }

        .achievements-count {
          color: rgba(255,255,255,0.45);
          font-size: 13px;
        }

        .achievements-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .achievement-card {
          position: relative;
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          background: rgba(255,255,255,0.035);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .achievement-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0, 210, 255, 0.26);
          background: rgba(255,255,255,0.055);
        }

        .achievement-image-wrap {
          position: relative;
          height: 235px;
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              rgba(0,210,255,0.09),
              rgba(255,255,255,0.02)
            );
        }

        .achievement-image {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .achievement-card:hover .achievement-image {
          transform: scale(1.05);
        }

        .achievement-image-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.3);
          font-size: 54px;
          font-weight: 800;
          background:
            linear-gradient(
              135deg,
              rgba(0,210,255,0.07),
              rgba(120,90,255,0.07)
            );
        }

        .achievement-number {
          position: absolute;
          top: 15px;
          left: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 42px;
          height: 32px;
          padding: 0 10px;
          border-radius: 999px;
          background: rgba(4,6,8,0.72);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          color: #a7efff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .achievement-content {
          padding: 22px;
        }

        .achievement-category {
          display: inline-block;
          margin-bottom: 11px;
          color: #86eaff;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.13em;
        }

        .achievement-card h3 {
          margin: 0;
          font-size: 22px;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }

        .achievement-student {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.58);
          font-size: 14px;
        }

        .achievement-info {
          display: grid;
          gap: 9px;
          margin-top: 17px;
          padding-top: 17px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .achievement-info-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          color: rgba(255,255,255,0.55);
          font-size: 13px;
        }

        .achievement-info-row strong {
          color: rgba(255,255,255,0.86);
          text-align: right;
          font-weight: 600;
        }

        .achievement-description {
          margin: 17px 0 0;
          color: rgba(255,255,255,0.62);
          font-size: 14px;
          line-height: 1.65;
        }

        .achievement-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 19px;
        }

        .achievement-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 15px;
          border-radius: 12px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.045);
          color: #fff;
          font-size: 13px;
          font-weight: 650;
          transition: 0.25s ease;
        }

        .achievement-link:hover {
          border-color: rgba(0,210,255,0.3);
          background: rgba(0,210,255,0.08);
        }

        .achievement-link.primary {
          background: rgba(0,210,255,0.10);
          border-color: rgba(0,210,255,0.24);
          color: #94ebff;
        }

        .achievement-empty,
        .achievement-error,
        .achievement-loading {
          padding: 55px 24px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
          background: rgba(255,255,255,0.03);
          text-align: center;
          color: rgba(255,255,255,0.6);
        }

        .achievement-empty strong {
          display: block;
          margin-bottom: 9px;
          color: #fff;
          font-size: 20px;
        }

        .achievement-error {
          color: #ffb4b4;
          border-color: rgba(255,90,90,0.18);
          background: rgba(255,70,70,0.04);
        }

        @media (max-width: 980px) {
          .achievements-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 680px) {
          .achievements-container {
            width: min(100% - 20px, 1200px);
            padding: 55px 0 70px;
          }

          .achievements-hero {
            padding: 45px 20px;
            border-radius: 23px;
          }

          .achievements-title {
            font-size: clamp(40px, 13vw, 65px);
          }

          .achievements-subtitle {
            font-size: 15px;
            line-height: 1.65;
          }

          .achievements-grid {
            grid-template-columns: 1fr;
          }

          .achievement-image-wrap {
            height: 220px;
          }

          .achievements-status {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }
        }
      `}</style>

      <div className="achievements-container">
        <section className="achievements-hero">
          <div className="achievements-kicker">
            <span className="achievements-kicker-dot"></span>
            PROOF OF BUILDING
          </div>

          <h1 className="achievements-title">
            Achievements that <span>tell the story.</span>
          </h1>

          <p className="achievements-subtitle">
            A living record of hackathons, competitions, workshops,
            certifications, project showcases and milestones from Pixel
            Pirates Academy.
          </p>

          <div className="achievements-meta">
            <div className="achievement-meta-pill">
              {achievements.length} Published Records
            </div>

            <div className="achievement-meta-pill">
              Learning → Building → Showcasing
            </div>
          </div>
        </section>

        <section>
          <div className="achievements-status">
            <h2>Milestones</h2>
            <div className="achievements-count">
              {loading
                ? "Loading..."
                : `${achievements.length} achievement${
                    achievements.length === 1 ? "" : "s"
                  }`}
            </div>
          </div>

          {loading && (
            <div className="achievement-loading">
              Loading achievement records...
            </div>
          )}

          {!loading && error && (
            <div className="achievement-error">{error}</div>
          )}

          {!loading && !error && achievements.length === 0 && (
            <div className="achievement-empty">
              <strong>No achievements published yet.</strong>
              New achievement records added from the admin panel will appear
              here automatically.
            </div>
          )}

          {!loading && !error && achievements.length > 0 && (
            <div className="achievements-grid">
              {achievements.map((achievement, index) => (
                <article className="achievement-card" key={achievement._id}>
                  <div className="achievement-image-wrap">
                    {achievement.image ? (
                      <img
                        className="achievement-image"
                        src={achievement.image}
                        alt={achievement.title || "Achievement"}
                      />
                    ) : (
                      <div className="achievement-image-placeholder">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    )}

                    <div className="achievement-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="achievement-content">
                    <div className="achievement-category">
                      {achievement.eventName || "Academy Achievement"}
                    </div>

                    <h3>{achievement.title || "Achievement"}</h3>

                    {achievement.studentOrTeam && (
                      <p className="achievement-student">
                        {achievement.studentOrTeam}
                      </p>
                    )}

                    <div className="achievement-info">
                      {achievement.organization && (
                        <div className="achievement-info-row">
                          <span>Organization</span>
                          <strong>{achievement.organization}</strong>
                        </div>
                      )}

                      {achievement.date && (
                        <div className="achievement-info-row">
                          <span>Date</span>
                          <strong>{achievement.date}</strong>
                        </div>
                      )}
                    </div>

                    {achievement.description && (
                      <p className="achievement-description">
                        {achievement.description}
                      </p>
                    )}

                    <div className="achievement-actions">
                      {achievement.certificate && (
                        <a
                          className="achievement-link primary"
                          href={achievement.certificate}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Certificate
                        </a>
                      )}

                      {achievement.videoUrl && (
                        <a
                          className="achievement-link"
                          href={achievement.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Watch Video
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div style={{ marginTop: 40 }}>
          <Link
            to="/"
            style={{
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            ← Back to Pixel Pirates Academy
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Achievements;
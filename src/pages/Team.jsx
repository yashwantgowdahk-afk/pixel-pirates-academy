import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/team`);

        if (!response.ok) {
          throw new Error("Failed to load team members");
        }

        const data = await response.json();

        setTeam(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <main className="team-page-v2">
      <style>{`
        .team-page-v2 {
          min-height: 100vh;
          background: #050607;
          color: #f4f7f9;
          overflow: hidden;
        }

        .team-page-v2 *,
        .team-page-v2 *::before,
        .team-page-v2 *::after {
          box-sizing: border-box;
        }

        .team-wrap {
          width: min(1220px, calc(100% - 34px));
          margin: 0 auto;
          padding: 90px 0 110px;
        }

        /* -------------------------------------------------
           HERO
        ------------------------------------------------- */

        .team-intro {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
          gap: 30px;
          align-items: stretch;
          margin-bottom: 45px;
        }

        .team-intro-main {
          position: relative;
          min-height: 420px;
          padding: 58px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.09);
          background:
            radial-gradient(
              circle at 82% 18%,
              rgba(0, 218, 255, 0.10),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.015)
            );
          overflow: hidden;
        }

        .team-intro-main::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          right: -210px;
          bottom: -240px;
          border: 1px solid rgba(112,220,255,0.12);
          border-radius: 50%;
          box-shadow:
            0 0 0 35px rgba(112,220,255,0.025),
            0 0 0 70px rgba(112,220,255,0.018);
          pointer-events: none;
        }

        .team-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #7ee8ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .team-eyebrow-line {
          width: 34px;
          height: 1px;
          background: #72e4ff;
        }

        .team-intro-main h1 {
          position: relative;
          z-index: 1;
          margin: 20px 0 18px;
          max-width: 780px;
          font-size: clamp(48px, 7vw, 88px);
          line-height: 0.91;
          letter-spacing: -0.065em;
          font-weight: 850;
        }

        .team-intro-main h1 span {
          color: #7de8ff;
        }

        .team-intro-main p {
          position: relative;
          z-index: 1;
          max-width: 650px;
          margin: 0;
          color: rgba(255,255,255,0.58);
          font-size: 16px;
          line-height: 1.8;
        }

        .team-name-strip {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 30px;
        }

        .team-name-strip span {
          padding: 9px 11px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.70);
          font-size: 11px;
        }

        /* -------------------------------------------------
           SIDE SYSTEM PANEL
        ------------------------------------------------- */

        .team-system {
          position: relative;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 32px;
          padding: 25px;
          background: #0a0c0e;
          overflow: hidden;
        }

        .team-system-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .team-system-title {
          font-family: monospace;
          color: rgba(255,255,255,0.50);
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .team-online {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #86ecff;
          font-family: monospace;
          font-size: 10px;
        }

        .team-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #86ecff;
          box-shadow: 0 0 13px rgba(134,236,255,0.85);
        }

        .team-system-big {
          margin-top: 34px;
          color: #fff;
          font-size: 48px;
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 800;
        }

        .team-system-label {
          margin-top: 8px;
          color: rgba(255,255,255,0.40);
          font-family: monospace;
          font-size: 11px;
        }

        .team-system-list {
          display: grid;
          gap: 10px;
          margin-top: 35px;
        }

        .team-system-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 15px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .team-system-row span:first-child {
          color: rgba(255,255,255,0.44);
          font-family: monospace;
          font-size: 11px;
        }

        .team-system-row span:last-child {
          color: rgba(255,255,255,0.78);
          font-family: monospace;
          font-size: 11px;
        }

        /* -------------------------------------------------
           SECTION HEADER
        ------------------------------------------------- */

        .team-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 22px;
        }

        .team-section-head-left small {
          display: block;
          margin-bottom: 7px;
          color: #7ee8ff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .team-section-head h2 {
          margin: 0;
          font-size: 31px;
          letter-spacing: -0.04em;
        }

        .team-section-count {
          color: rgba(255,255,255,0.38);
          font-family: monospace;
          font-size: 11px;
        }

        /* -------------------------------------------------
           MEMBER GRID
        ------------------------------------------------- */

        .team-grid-v2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .member-card-v2 {
          position: relative;
          display: grid;
          grid-template-columns: 235px minmax(0, 1fr);
          min-height: 360px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 26px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.012)
            );
          transition:
            transform 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease;
        }

        .member-card-v2:hover {
          transform: translateY(-8px);
          border-color: rgba(102,224,255,0.27);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.075),
              rgba(255,255,255,0.018)
            );
        }

        .member-photo-v2 {
          position: relative;
          min-width: 0;
          min-height: 360px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 22%,
              rgba(0,214,255,0.18),
              transparent 30%
            ),
            #080a0b;
        }

        .member-photo-v2 img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.55s ease;
        }

        .member-card-v2:hover .member-photo-v2 img {
          transform: scale(1.045);
        }

        .member-photo-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.10),
              rgba(0,0,0,0.04) 45%,
              rgba(0,0,0,0.58)
            );
          pointer-events: none;
        }

        .member-index {
          position: absolute;
          z-index: 2;
          top: 14px;
          left: 14px;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(4,6,7,0.70);
          border: 1px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(12px);
          color: #91edff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.09em;
        }

        .member-dossier {
          position: absolute;
          z-index: 2;
          bottom: 15px;
          left: 15px;
          right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 10px;
        }

        .member-dossier-label {
          color: rgba(255,255,255,0.46);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .member-dossier-id {
          margin-top: 3px;
          color: rgba(255,255,255,0.92);
          font-family: monospace;
          font-size: 11px;
        }

        .member-initials {
          display: grid;
          place-items: center;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(5,7,8,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(12px);
          color: #8deaff;
          font-size: 12px;
          font-weight: 800;
        }

        .member-content-v2 {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 25px;
        }

        .member-role-v2 {
          color: #80e8ff;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .member-content-v2 h3 {
          margin: 9px 0 4px;
          font-size: 29px;
          line-height: 1.05;
          letter-spacing: -0.045em;
        }

        .member-branch-v2 {
          color: rgba(255,255,255,0.38);
          font-family: monospace;
          font-size: 11px;
        }

        .member-bio-v2 {
          margin: 20px 0 0;
          color: rgba(255,255,255,0.57);
          font-size: 13px;
          line-height: 1.7;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          overflow: hidden;
        }

        .member-skills-v2 {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 17px;
        }

        .member-skill-v2 {
          padding: 7px 9px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.63);
          font-size: 10px;
        }

        .member-actions-v2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding-top: 22px;
        }

        .member-links-v2 {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .member-link-v2 {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 10px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.60);
          text-decoration: none;
          font-size: 10px;
          transition: 0.2s ease;
        }

        .member-link-v2:hover {
          color: #fff;
          background: rgba(255,255,255,0.06);
          border-color: rgba(0,213,255,0.25);
        }

        .member-profile-button {
          min-height: 40px;
          padding: 0 13px;
          border-radius: 10px;
          border: 1px solid rgba(0,215,255,0.22);
          background: rgba(0,215,255,0.07);
          color: #91ebff;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
          transition: 0.25s ease;
        }

        .member-profile-button:hover {
          background: rgba(0,215,255,0.14);
        }

        /* -------------------------------------------------
           STATES
        ------------------------------------------------- */

        .team-state-v2 {
          padding: 70px 25px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          background: rgba(255,255,255,0.025);
          text-align: center;
          color: rgba(255,255,255,0.55);
        }

        .team-state-v2 strong {
          display: block;
          margin-bottom: 8px;
          color: #fff;
          font-size: 20px;
        }

        .team-state-error-v2 {
          color: #ffb8b8;
          border-color: rgba(255,80,80,0.17);
          background: rgba(255,80,80,0.035);
        }

        /* -------------------------------------------------
           MODAL
        ------------------------------------------------- */

        .member-modal-bg {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(12px);
        }

        .member-modal {
          width: min(880px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 28px;
          background: #090b0d;
          box-shadow: 0 30px 90px rgba(0,0,0,0.65);
        }

        .member-modal-top {
          display: grid;
          grid-template-columns: 210px minmax(0, 1fr);
          gap: 23px;
          padding: 23px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .member-modal-photo {
          height: 245px;
          overflow: hidden;
          border-radius: 19px;
          background: #0b0d0f;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .member-modal-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-modal-no-photo {
          height: 100%;
          display: grid;
          place-items: center;
          color: #81e9ff;
          font-size: 54px;
          font-weight: 800;
        }

        .member-modal-main {
          position: relative;
          padding-right: 45px;
        }

        .member-modal-role {
          color: #80e8ff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .member-modal-main h3 {
          margin: 9px 0 5px;
          font-size: 40px;
          line-height: 1;
          letter-spacing: -0.055em;
        }

        .member-modal-branch {
          color: rgba(255,255,255,0.40);
          font-family: monospace;
          font-size: 11px;
        }

        .member-modal-close {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          color: #fff;
          cursor: pointer;
          font-size: 19px;
        }

        .member-modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          padding: 24px;
        }

        .member-detail-box {
          padding: 18px;
          border-radius: 17px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
        }

        .member-detail-box.full {
          grid-column: 1 / -1;
        }

        .member-detail-box h4 {
          margin: 0 0 10px;
          color: #82eaff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .member-detail-box p {
          margin: 0;
          color: rgba(255,255,255,0.61);
          font-size: 13px;
          line-height: 1.7;
          white-space: pre-line;
        }

        .member-detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .member-detail-tag {
          padding: 7px 9px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.64);
          font-size: 10px;
        }

        @media (max-width: 1050px) {
          .team-intro {
            grid-template-columns: 1fr;
          }

          .team-grid-v2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .team-wrap {
            width: min(100% - 20px, 1220px);
            padding: 55px 0 75px;
          }

          .team-intro-main {
            min-height: auto;
            padding: 40px 22px;
            border-radius: 23px;
          }

          .team-system {
            border-radius: 23px;
          }

          .team-grid-v2 {
            gap: 16px;
          }

          .member-card-v2 {
            grid-template-columns: 1fr;
          }

          .member-photo-v2 {
            min-height: 340px;
            height: 340px;
          }

          .member-content-v2 {
            padding: 21px;
          }

          .member-actions-v2 {
            align-items: flex-start;
            flex-direction: column;
          }

          .member-profile-button {
            width: 100%;
          }

          .member-modal-top {
            grid-template-columns: 1fr;
          }

          .member-modal-photo {
            height: 300px;
          }

          .member-modal-main {
            padding-right: 0;
          }

          .member-modal-body {
            grid-template-columns: 1fr;
          }

          .member-detail-box.full {
            grid-column: auto;
          }
        }

        @media (max-width: 460px) {
          .team-section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 7px;
          }

          .team-intro-main h1 {
            font-size: 44px;
          }

          .member-content-v2 h3 {
            font-size: 25px;
          }

          .member-modal-main h3 {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="team-wrap">

        {/* =================================================
            TEAM INTRO
        ================================================= */}

        <section className="team-intro">

          <div className="team-intro-main">
            <div className="team-eyebrow">
              <span className="team-eyebrow-line"></span>
              PIXEL PIRATES / PEOPLE
            </div>

            <h1>
              The minds
              <br />
              behind the <span>build.</span>
            </h1>

            <p>
              Meet the people building Pixel Pirates Academy.
              Explore each team member's profile, technical interests,
              projects, achievements and professional journey.
            </p>

            <div className="team-name-strip">
              {team.map((member) => (
                <span key={member._id}>
                  {member.name}
                </span>
              ))}
            </div>
          </div>

          <aside className="team-system">
            <div className="team-system-header">
              <span className="team-system-title">
                TEAM_DATABASE
              </span>

              <span className="team-online">
                <span className="team-online-dot"></span>
                ONLINE
              </span>
            </div>

            <div className="team-system-big">
              {team.length}
            </div>

            <div className="team-system-label">
              PUBLIC TEAM PROFILES
            </div>

            <div className="team-system-list">
              <div className="team-system-row">
                <span>PROFILE_MODE</span>
                <span>INDIVIDUAL</span>
              </div>

              <div className="team-system-row">
                <span>PHOTO_SYSTEM</span>
                <span>ACTIVE</span>
              </div>

              <div className="team-system-row">
                <span>PROFILE_VIEW</span>
                <span>ENABLED</span>
              </div>

              <div className="team-system-row">
                <span>DATA_SOURCE</span>
                <span>MONGODB</span>
              </div>
            </div>
          </aside>

        </section>

        {/* =================================================
            MEMBERS
        ================================================= */}

        <section>

          <div className="team-section-head">
            <div className="team-section-head-left">
              <small>01 / PEOPLE</small>
              <h2>Meet the team</h2>
            </div>

            <div className="team-section-count">
              {loading
                ? "LOADING"
                : `${team.length} PROFILE${team.length === 1 ? "" : "S"}`}
            </div>
          </div>

          {loading && (
            <div className="team-state-v2">
              Loading team profiles...
            </div>
          )}

          {!loading && error && (
            <div className="team-state-v2 team-state-error-v2">
              {error}
            </div>
          )}

          {!loading && !error && team.length === 0 && (
            <div className="team-state-v2">
              <strong>No published team profiles yet.</strong>

              Team members added from the admin panel will
              automatically appear here.
            </div>
          )}

          {!loading && !error && team.length > 0 && (
            <div className="team-grid-v2">

              {team.map((member, index) => {

                const skills = Array.isArray(member.skills)
                  ? member.skills.filter(Boolean)
                  : [];

                return (
                  <article
                    className="member-card-v2"
                    key={member._id}
                  >

                    {/* PHOTO */}

                    <div className="member-photo-v2">

                      <div className="member-index">
                        PROFILE_{String(index + 1).padStart(2, "0")}
                      </div>

                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name || "Team member"}
                        />
                      ) : (
                        <div className="member-initials">
                          {getInitials(member.name)}
                        </div>
                      )}

                      <div className="member-photo-overlay"></div>

                      <div className="member-dossier">
                        <div>
                          <div className="member-dossier-label">
                            PERSON_ID
                          </div>

                          <div className="member-dossier-id">
                            {member._id}
                          </div>
                        </div>

                        <div className="member-initials">
                          {getInitials(member.name)}
                        </div>
                      </div>

                    </div>

                    {/* PROFILE CONTENT */}

                    <div className="member-content-v2">

                      <div className="member-role-v2">
                        {member.role || "TEAM MEMBER"}
                      </div>

                      <h3>
                        {member.name || "Team Member"}
                      </h3>

                      {member.branch && (
                        <div className="member-branch-v2">
                          {member.branch}
                        </div>
                      )}

                      {member.bio && (
                        <p className="member-bio-v2">
                          {member.bio}
                        </p>
                      )}

                      {skills.length > 0 && (
                        <div className="member-skills-v2">
                          {skills.slice(0, 7).map((skill, skillIndex) => (
                            <span
                              className="member-skill-v2"
                              key={`${skill}-${skillIndex}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="member-actions-v2">

                        <div className="member-links-v2">

                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="member-link-v2"
                            >
                              LinkedIn
                            </a>
                          )}

                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noreferrer"
                              className="member-link-v2"
                            >
                              GitHub
                            </a>
                          )}

                          {member.instagram && (
                            <a
                              href={member.instagram}
                              target="_blank"
                              rel="noreferrer"
                              className="member-link-v2"
                            >
                              Instagram
                            </a>
                          )}

                        </div>

                        <button
                          type="button"
                          className="member-profile-button"
                          onClick={() =>
                            setSelectedMember(member)
                          }
                        >
                          Open Profile →
                        </button>

                      </div>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

        </section>
      </div>

      {/* =================================================
          PROFILE MODAL
      ================================================= */}

      {selectedMember && (
        <div
          className="member-modal-bg"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMember(null);
            }
          }}
        >

          <div className="member-modal">

            <div className="member-modal-top">

              <div className="member-modal-photo">

                {selectedMember.photo ? (
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name || "Team member"}
                  />
                ) : (
                  <div className="member-modal-no-photo">
                    {getInitials(selectedMember.name)}
                  </div>
                )}

              </div>

              <div className="member-modal-main">

                <button
                  type="button"
                  className="member-modal-close"
                  onClick={() => setSelectedMember(null)}
                >
                  ×
                </button>

                <div className="member-modal-role">
                  {selectedMember.role || "TEAM MEMBER"}
                </div>

                <h3>
                  {selectedMember.name}
                </h3>

                {selectedMember.branch && (
                  <div className="member-modal-branch">
                    {selectedMember.branch}
                  </div>
                )}

              </div>

            </div>

            <div className="member-modal-body">

              {selectedMember.bio && (
                <div className="member-detail-box full">
                  <h4>Biography</h4>

                  <p>
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {selectedMember.background && (
                <div className="member-detail-box">
                  <h4>Background</h4>

                  <p>
                    {selectedMember.background}
                  </p>
                </div>
              )}

              {Array.isArray(selectedMember.skills) &&
                selectedMember.skills.length > 0 && (
                  <div className="member-detail-box">
                    <h4>Technical Skills</h4>

                    <div className="member-detail-tags">
                      {selectedMember.skills
                        .filter(Boolean)
                        .map((skill, index) => (
                          <span
                            className="member-detail-tag"
                            key={`${skill}-${index}`}
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {Array.isArray(selectedMember.projects) &&
                selectedMember.projects.length > 0 && (
                  <div className="member-detail-box">
                    <h4>Projects</h4>

                    <p>
                      {selectedMember.projects.join(" • ")}
                    </p>
                  </div>
                )}

              {Array.isArray(selectedMember.achievements) &&
                selectedMember.achievements.length > 0 && (
                  <div className="member-detail-box">
                    <h4>Achievements</h4>

                    <p>
                      {selectedMember.achievements.join(" • ")}
                    </p>
                  </div>
                )}

              {Array.isArray(selectedMember.certifications) &&
                selectedMember.certifications.length > 0 && (
                  <div className="member-detail-box full">
                    <h4>Certifications</h4>

                    <p>
                      {selectedMember.certifications.join(" • ")}
                    </p>
                  </div>
                )}

              {(selectedMember.linkedin ||
                selectedMember.github ||
                selectedMember.instagram ||
                selectedMember.introVideo) && (
                <div className="member-detail-box full">
                  <h4>Professional Links</h4>

                  <div className="member-links-v2">

                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="member-link-v2"
                      >
                        LinkedIn
                      </a>
                    )}

                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noreferrer"
                        className="member-link-v2"
                      >
                        GitHub
                      </a>
                    )}

                    {selectedMember.instagram && (
                      <a
                        href={selectedMember.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="member-link-v2"
                      >
                        Instagram
                      </a>
                    )}

                    {selectedMember.introVideo && (
                      <a
                        href={selectedMember.introVideo}
                        target="_blank"
                        rel="noreferrer"
                        className="member-link-v2"
                      >
                        Intro Video
                      </a>
                    )}

                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </main>
  );
}

export default Team;
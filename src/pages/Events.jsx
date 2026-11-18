import { useEffect, useState } from "react";

import API from "../api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/events`);

        if (!response.ok) {
          throw new Error("Unable to load events");
        }

        const data = await response.json();

        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Events loading error:", err);
        setError("Unable to load the events archive.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const formatDate = (value) => {
    if (!value) return "TBA";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    return (status || "upcoming")
      .replaceAll("-", " ")
      .replaceAll("_", " ")
      .toUpperCase();
  };

  return (
    <main className="pp-events-page">
      <style>{`
        .pp-events-page {
          min-height: 100vh;
          background: #050608;
          color: #f5f7f9;
          overflow-x: hidden;
        }

        .pp-events-page *,
        .pp-events-page *::before,
        .pp-events-page *::after {
          box-sizing: border-box;
        }

        .pp-events-container {
          width: min(1180px, calc(100% - 34px));
          margin: 0 auto;
        }

        /* ================= HERO ================= */

        .pp-events-hero {
          position: relative;
          isolation: isolate;
          min-height: 610px;
          display: flex;
          align-items: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background:
            radial-gradient(
              circle at 75% 42%,
              rgba(82, 220, 255, 0.09),
              transparent 26%
            ),
            radial-gradient(
              circle at 20% 75%,
              rgba(120, 130, 255, 0.06),
              transparent 25%
            ),
            #050608;
        }

        .pp-events-hero-grid {
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: 0.45;
          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );
          background-size: 46px 46px;
          mask-image: linear-gradient(
            to bottom,
            black 0%,
            rgba(0,0,0,0.55) 65%,
            transparent 100%
          );
        }

        .pp-events-hero-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          right: -140px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background: rgba(0, 190, 255, 0.055);
          filter: blur(60px);
          pointer-events: none;
          z-index: -1;
        }

        .pp-events-hero-content {
          position: relative;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 110px 17px 85px;
        }

        .pp-events-eyebrow {
          margin: 0 0 22px;
          color: #82e9ff;
          font-family: monospace;
          font-size: 11px;
          line-height: 1.4;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          overflow-wrap: anywhere;
        }

        .pp-events-hero-title {
          width: 100%;
          max-width: 850px;
          margin: 0;
          font-size: clamp(48px, 8vw, 102px);
          line-height: 0.88;
          letter-spacing: -0.065em;
          font-weight: 900;
          text-transform: uppercase;
          overflow-wrap: normal;
          word-break: normal;
        }

        .pp-events-hero-title span {
          display: block;
          color: #82e9ff;
        }

        .pp-events-hero-description {
          width: min(650px, 100%);
          margin: 28px 0 0;
          color: rgba(255,255,255,0.58);
          font-size: 15px;
          line-height: 1.75;
        }

        .pp-events-hero-line {
          width: min(520px, 100%);
          height: 1px;
          margin-top: 34px;
          background: linear-gradient(
            90deg,
            rgba(130,233,255,0.75),
            rgba(130,233,255,0)
          );
        }

        /* ================= ARCHIVE ================= */

        .pp-events-archive {
          padding: 95px 0 110px;
        }

        .pp-events-archive-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 30px;
          align-items: end;
          margin-bottom: 48px;
        }

        .pp-events-archive-kicker {
          margin: 0 0 14px;
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .pp-events-archive-title {
          margin: 0;
          font-size: clamp(42px, 6vw, 76px);
          line-height: 0.92;
          letter-spacing: -0.06em;
          font-weight: 850;
        }

        .pp-events-archive-title span {
          color: #82e9ff;
        }

        .pp-events-count {
          display: flex;
          align-items: flex-end;
          gap: 13px;
          padding: 14px 0 3px;
          white-space: nowrap;
        }

        .pp-events-count strong {
          font-family: monospace;
          font-size: 44px;
          line-height: 1;
          color: #82e9ff;
        }

        .pp-events-count span {
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 9px;
          line-height: 1.4;
          letter-spacing: 0.1em;
        }

        /* ================= STATES ================= */

        .pp-events-state {
          display: grid;
          place-items: center;
          min-height: 230px;
          padding: 30px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          background: rgba(255,255,255,0.025);
          color: rgba(255,255,255,0.42);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
        }

        .pp-events-error {
          color: #ff9d9d;
          border-color: rgba(255,100,100,0.18);
        }

        /* ================= EVENT GRID ================= */

        .pp-events-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .pp-event-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,0.035),
              rgba(255,255,255,0.018)
            );
          transition:
            transform 180ms ease,
            border-color 180ms ease;
        }

        .pp-event-card:hover {
          transform: translateY(-3px);
          border-color: rgba(130,233,255,0.22);
        }

        .pp-event-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          min-width: 0;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.38);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
        }

        .pp-event-card-top span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .pp-event-status {
          color: #82e9ff;
          text-align: right;
        }

        /* ================= POSTER ================= */

        .pp-event-poster {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #090b0d;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .pp-event-poster img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pp-event-poster-empty {
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.16);
          font-family: monospace;
          font-size: 34px;
          letter-spacing: 0.08em;
        }

        /* ================= CONTENT ================= */

        .pp-event-card-content {
          min-width: 0;
          padding: 23px;
        }

        .pp-event-code {
          margin: 0 0 10px;
          color: #82e9ff;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.13em;
        }

        .pp-event-title {
          margin: 0;
          max-width: 100%;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 0.96;
          letter-spacing: -0.045em;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .pp-event-description {
          max-width: 100%;
          margin: 15px 0 0;
          color: rgba(255,255,255,0.57);
          font-size: 13px;
          line-height: 1.7;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* ================= META ================= */

        .pp-event-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-left: 1px solid rgba(255,255,255,0.07);
        }

        .pp-event-meta-item {
          min-width: 0;
          padding: 14px;
          border-right: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .pp-event-meta-item span {
          display: block;
          margin-bottom: 7px;
          color: rgba(255,255,255,0.3);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.13em;
        }

        .pp-event-meta-item strong {
          display: block;
          min-width: 0;
          color: rgba(255,255,255,0.82);
          font-size: 12px;
          line-height: 1.45;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* ================= BOTTOM ================= */

        .pp-event-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          min-width: 0;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .pp-event-card-bottom > span {
          min-width: 0;
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.12em;
          overflow-wrap: anywhere;
        }

        .pp-event-register {
          flex: 0 0 auto;
          color: #82e9ff;
          font-family: monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-decoration: none;
        }

        .pp-event-register:hover {
          text-decoration: underline;
        }

        /* ================= PHILOSOPHY ================= */

        .pp-events-philosophy {
          position: relative;
          overflow: hidden;
          padding: 105px 17px;
          border-top: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: #07090b;
        }

        .pp-events-philosophy::before {
          content: "PP";
          position: absolute;
          right: 4%;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.025);
          font-size: clamp(150px, 24vw, 330px);
          line-height: 1;
          font-weight: 900;
          pointer-events: none;
        }

        .pp-events-philosophy p {
          margin: 0 0 18px;
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .pp-events-philosophy h2 {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0;
          font-size: clamp(45px, 7vw, 86px);
          line-height: 0.9;
          letter-spacing: -0.06em;
          font-weight: 850;
        }

        .pp-events-philosophy h2 span {
          color: #82e9ff;
        }

        /* ================= CTA ================= */

        .pp-events-cta {
          padding: 105px 17px 120px;
          text-align: center;
          background: #050608;
        }

        .pp-events-cta > p {
          margin: 0 0 16px;
          color: rgba(255,255,255,0.34);
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
        }

        .pp-events-cta h2 {
          margin: 0;
          font-size: clamp(48px, 8vw, 96px);
          line-height: 0.88;
          letter-spacing: -0.06em;
          font-weight: 900;
        }

        .pp-events-cta h2 span {
          color: #82e9ff;
        }

        .pp-events-cta button {
          margin-top: 30px;
          min-height: 46px;
          padding: 0 22px;
          border: 1px solid rgba(130,233,255,0.35);
          border-radius: 9px;
          background: rgba(130,233,255,0.07);
          color: #f5f7f9;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
        }

        .pp-events-cta button:hover {
          background: rgba(130,233,255,0.12);
        }

        /* ================= TABLET ================= */

        @media (max-width: 860px) {
          .pp-events-grid {
            grid-template-columns: 1fr;
          }

          .pp-events-archive-header {
            grid-template-columns: 1fr;
            align-items: start;
          }

          .pp-events-count {
            justify-content: flex-start;
          }
        }

        /* ================= MOBILE ================= */

        @media (max-width: 620px) {
          .pp-events-container {
            width: min(100% - 24px, 1180px);
          }

          .pp-events-hero {
            min-height: 500px;
          }

          .pp-events-hero-content {
            padding: 85px 12px 65px;
          }

          .pp-events-eyebrow {
            font-size: 8px;
          }

          .pp-events-hero-title {
            font-size: clamp(45px, 15vw, 72px);
            line-height: 0.9;
          }

          .pp-events-hero-description {
            font-size: 13px;
          }

          .pp-events-archive {
            padding: 70px 0 80px;
          }

          .pp-events-archive-title {
            font-size: clamp(38px, 13vw, 58px);
          }

          .pp-event-card-content {
            padding: 18px;
          }

          .pp-event-title {
            font-size: clamp(27px, 9vw, 40px);
          }

          .pp-event-meta-grid {
            grid-template-columns: 1fr;
          }

          .pp-event-card-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .pp-event-register {
            margin-top: 2px;
          }

          .pp-events-philosophy,
          .pp-events-cta {
            padding-left: 12px;
            padding-right: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-event-card {
            transition: none;
          }

          .pp-event-card:hover {
            transform: none;
          }
        }
      `}</style>

      {/* ================= HERO ================= */}

      <section className="pp-events-hero">
        <div className="pp-events-hero-grid"></div>
        <div className="pp-events-hero-glow"></div>

        <div className="pp-events-hero-content">
          <p className="pp-events-eyebrow">
            PIXEL PIRATES ACADEMY / EVENTS COMMAND
          </p>

          <h1 className="pp-events-hero-title">
            ENTER THE
            <span>ARENA.</span>
          </h1>

          <p className="pp-events-hero-description">
            Workshops, competitions, demonstrations and technology events
            created by the academy.
          </p>

          <div className="pp-events-hero-line"></div>
        </div>
      </section>

      {/* ================= ARCHIVE ================= */}

      <section className="pp-events-archive">
        <div className="pp-events-container">

          <div className="pp-events-archive-header">
            <div>
              <p className="pp-events-archive-kicker">
                EVENT DATABASE / PUBLISHED RECORDS
              </p>

              <h2 className="pp-events-archive-title">
                UPCOMING
                <br />
                <span>MISSIONS.</span>
              </h2>
            </div>

            <div className="pp-events-count">
              <strong>
                {String(events.length).padStart(2, "0")}
              </strong>

              <span>
                EVENTS
                <br />
                ONLINE
              </span>
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="pp-events-state">
              LOADING EVENT DATABASE...
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="pp-events-state pp-events-error">
              {error}
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            events.length === 0 && (
              <div className="pp-events-state">
                NO PUBLISHED EVENTS YET.
              </div>
            )}

          {/* EVENTS */}

          {!loading &&
            !error &&
            events.length > 0 && (
              <div className="pp-events-grid">

                {events.map((event, index) => (
                  <article
                    className="pp-event-card"
                    key={event._id}
                  >

                    {/* CARD HEADER */}

                    <div className="pp-event-card-top">
                      <span>
                        EVENT{" "}
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="pp-event-status">
                        {formatStatus(event.status)}
                      </span>
                    </div>

                    {/* POSTER */}

                    {event.poster ? (
                      <div className="pp-event-poster">
                        <img
                          src={event.poster}
                          alt={event.name || "Academy event poster"}
                        />
                      </div>
                    ) : (
                      <div className="pp-event-poster pp-event-poster-empty">
                        PP
                      </div>
                    )}

                    {/* CONTENT */}

                    <div className="pp-event-card-content">

                      <p className="pp-event-code">
                        PX-EVENT-
                        {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="pp-event-title">
                        {event.name || "Untitled Event"}
                      </h3>

                      <p className="pp-event-description">
                        {event.description ||
                          "Pixel Pirates Academy event."}
                      </p>

                      {/* META */}

                      <div className="pp-event-meta-grid">

                        <div className="pp-event-meta-item">
                          <span>DATE</span>
                          <strong>
                            {formatDate(event.date)}
                          </strong>
                        </div>

                        <div className="pp-event-meta-item">
                          <span>TIME</span>
                          <strong>
                            {event.time || "TBA"}
                          </strong>
                        </div>

                        <div className="pp-event-meta-item">
                          <span>LOCATION</span>
                          <strong>
                            {event.location || "TBA"}
                          </strong>
                        </div>

                        <div className="pp-event-meta-item">
                          <span>ORGANIZER</span>
                          <strong>
                            {event.organizer || "Academy"}
                          </strong>
                        </div>

                      </div>

                      {/* BOTTOM */}

                      <div className="pp-event-card-bottom">

                        <span>
                          {formatStatus(event.status)}
                        </span>

                        {event.registrationUrl && (
                          <a
                            className="pp-event-register"
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            REGISTER ↗
                          </a>
                        )}

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            )}

        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}

      <section className="pp-events-philosophy">
        <div className="pp-events-container">

          <p>
            PIXEL PIRATES / EVENT PHILOSOPHY
          </p>

          <h2>
            LEARN.
            <br />
            <span>COMPETE.</span>
            <br />
            SHOWCASE.
          </h2>

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="pp-events-cta">

        <p>
          YOUR NEXT EVENT COULD BE THE START.
        </p>

        <h2>
          JOIN THE
          <br />
          <span>MISSION.</span>
        </h2>

        <button
          type="button"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          START YOUR JOURNEY ↗
        </button>

      </section>

    </main>
  );
}

export default Events;
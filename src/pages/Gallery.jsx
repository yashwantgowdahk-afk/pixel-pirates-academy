import { useEffect, useState } from "react";

import API from "../api";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = [
    { value: "all", label: "All Media" },
    { value: "classes", label: "Classes" },
    { value: "workshops", label: "Workshops" },
    { value: "hackathons", label: "Hackathons" },
    { value: "projects", label: "Projects" },
    { value: "events", label: "Events" },
    { value: "team", label: "Team" },
    { value: "certificates", label: "Certificates" },
    { value: "demonstrations", label: "Demonstrations" },
  ];

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/gallery`);

        if (!response.ok) {
          throw new Error("Unable to load gallery");
        }

        const data = await response.json();

        setGallery(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Gallery could not be loaded right now.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filteredGallery =
    filter === "all"
      ? gallery
      : gallery.filter((item) => item.category === filter);

  return (
    <main className="gallery-page-v2">
      <style>{`
        .gallery-page-v2 {
          min-height: 100vh;
          background:
            radial-gradient(circle at 12% 8%, rgba(0, 220, 255, 0.10), transparent 25%),
            radial-gradient(circle at 88% 18%, rgba(110, 90, 255, 0.09), transparent 24%),
            #050607;
          color: #f4f7f9;
          overflow: hidden;
        }

        .gallery-page-v2 *,
        .gallery-page-v2 *::before,
        .gallery-page-v2 *::after {
          box-sizing: border-box;
        }

        .gallery-shell {
          width: min(1220px, calc(100% - 34px));
          margin: 0 auto;
          padding: 90px 0 110px;
        }

        /* HERO */

        .gallery-hero {
          position: relative;
          min-height: 420px;
          padding: 62px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.09);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.015)
            );
          overflow: hidden;
          margin-bottom: 40px;
        }

        .gallery-hero::before {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          right: -170px;
          top: -190px;
          border-radius: 50%;
          border: 1px solid rgba(111,226,255,0.13);
          box-shadow:
            0 0 0 40px rgba(111,226,255,0.025),
            0 0 0 80px rgba(111,226,255,0.015);
        }

        .gallery-hero::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(111,226,255,0.32),
              transparent
            );
        }

        .gallery-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #80e9ff;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .gallery-eyebrow-line {
          width: 30px;
          height: 1px;
          background: #80e9ff;
        }

        .gallery-hero h1 {
          position: relative;
          z-index: 1;
          margin: 19px 0 17px;
          max-width: 820px;
          font-size: clamp(50px, 7vw, 90px);
          line-height: 0.91;
          letter-spacing: -0.065em;
          font-weight: 850;
        }

        .gallery-hero h1 span {
          color: #7fe8ff;
        }

        .gallery-hero p {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0;
          color: rgba(255,255,255,0.58);
          font-size: 16px;
          line-height: 1.8;
        }

        .gallery-stats {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 29px;
        }

        .gallery-stat {
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.68);
          font-family: monospace;
          font-size: 10px;
        }

        /* FILTERS */

        .gallery-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .gallery-section-title small {
          display: block;
          margin-bottom: 6px;
          color: #80e9ff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .gallery-section-title h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .gallery-filter-count {
          color: rgba(255,255,255,0.39);
          font-family: monospace;
          font-size: 10px;
        }

        .gallery-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .gallery-filter {
          min-height: 40px;
          padding: 0 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          color: rgba(255,255,255,0.58);
          cursor: pointer;
          font-size: 11px;
          transition: 0.22s ease;
        }

        .gallery-filter:hover {
          color: #fff;
          border-color: rgba(0,215,255,0.20);
          background: rgba(0,215,255,0.05);
        }

        .gallery-filter.active {
          color: #8cecff;
          border-color: rgba(0,215,255,0.27);
          background: rgba(0,215,255,0.09);
        }

        /* GRID */

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-auto-rows: 245px;
          gap: 14px;
        }

        .gallery-card {
          position: relative;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          background: #090b0d;
          cursor: pointer;
        }

        .gallery-card:nth-child(5n + 1) {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-card:nth-child(7n + 3) {
          grid-row: span 2;
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition:
            transform 0.5s ease,
            filter 0.5s ease;
        }

        .gallery-card:hover img {
          transform: scale(1.055);
          filter: brightness(0.78);
        }

        .gallery-placeholder {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          min-height: 100%;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(0,215,255,0.12),
              transparent 32%
            ),
            #090b0d;
          color: rgba(255,255,255,0.19);
          font-family: monospace;
          font-size: 32px;
          font-weight: 800;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 18px;
          background:
            linear-gradient(
              to top,
              rgba(0,0,0,0.82),
              rgba(0,0,0,0.13) 58%,
              transparent
            );
          opacity: 0;
          transition: opacity 0.28s ease;
        }

        .gallery-card:hover .gallery-overlay,
        .gallery-card:focus-within .gallery-overlay {
          opacity: 1;
        }

        .gallery-category {
          margin-bottom: 6px;
          color: #82e9ff;
          font-family: monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .gallery-overlay h3 {
          margin: 0;
          font-size: 17px;
          line-height: 1.2;
        }

        .gallery-overlay p {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.58);
          font-size: 11px;
          line-height: 1.45;
        }

        .gallery-video-badge {
          position: absolute;
          top: 13px;
          right: 13px;
          padding: 7px 9px;
          border-radius: 999px;
          background: rgba(0,0,0,0.62);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          font-family: monospace;
          font-size: 9px;
          backdrop-filter: blur(10px);
        }

        /* STATES */

        .gallery-state {
          padding: 70px 25px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          text-align: center;
          color: rgba(255,255,255,0.55);
        }

        .gallery-state strong {
          display: block;
          margin-bottom: 8px;
          color: #fff;
          font-size: 20px;
        }

        .gallery-error {
          color: #ffb8b8;
          border-color: rgba(255,75,75,0.17);
          background: rgba(255,75,75,0.035);
        }

        /* MODAL */

        .gallery-modal-bg {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,0.84);
          backdrop-filter: blur(13px);
        }

        .gallery-modal {
          width: min(1050px, 100%);
          max-height: 91vh;
          overflow: auto;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 25px;
          background: #080a0c;
          box-shadow: 0 30px 100px rgba(0,0,0,0.65);
        }

        .gallery-modal-media {
          position: relative;
          min-height: 380px;
          background: #030404;
        }

        .gallery-modal-media img {
          width: 100%;
          max-height: 65vh;
          object-fit: contain;
          display: block;
          margin: 0 auto;
        }

        .gallery-modal-close {
          position: absolute;
          z-index: 3;
          top: 14px;
          right: 14px;
          width: 42px;
          height: 42px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.60);
          color: #fff;
          cursor: pointer;
          font-size: 19px;
          backdrop-filter: blur(12px);
        }

        .gallery-modal-info {
          padding: 23px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .gallery-modal-info small {
          color: #81e9ff;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .gallery-modal-info h3 {
          margin: 8px 0 9px;
          font-size: 27px;
          letter-spacing: -0.035em;
        }

        .gallery-modal-info p {
          margin: 0;
          color: rgba(255,255,255,0.57);
          font-size: 13px;
          line-height: 1.7;
        }

        .gallery-video-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          margin-top: 17px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid rgba(0,215,255,0.22);
          background: rgba(0,215,255,0.07);
          color: #8cecff;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
        }

        @media (max-width: 1000px) {
          .gallery-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .gallery-shell {
            width: min(100% - 20px, 1220px);
            padding: 55px 0 75px;
          }

          .gallery-hero {
            min-height: auto;
            padding: 42px 22px;
            border-radius: 23px;
          }

          .gallery-controls {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: 190px;
          }

          .gallery-card:nth-child(5n + 1) {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gallery-card:nth-child(7n + 3) {
            grid-row: span 1;
          }

          .gallery-overlay {
            opacity: 1;
          }

          .gallery-modal-media {
            min-height: 260px;
          }
        }

        @media (max-width: 430px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 235px;
          }

          .gallery-card:nth-child(5n + 1) {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>

      <div className="gallery-shell">

        <section className="gallery-hero">
          <div className="gallery-eyebrow">
            <span className="gallery-eyebrow-line"></span>
            PIXEL PIRATES / MEDIA LAB
          </div>

          <h1>
            Moments worth
            <br />
            <span>showcasing.</span>
          </h1>

          <p>
            Explore classes, workshops, hackathons, project demonstrations,
            events, team activities and the moments that document the Pixel
            Pirates journey.
          </p>

          <div className="gallery-stats">
            <div className="gallery-stat">
              {gallery.length} MEDIA RECORDS
            </div>

            <div className="gallery-stat">
              ADMIN CONTROLLED
            </div>

            <div className="gallery-stat">
              LIVE DATABASE
            </div>
          </div>
        </section>

        <section>

          <div className="gallery-controls">
            <div className="gallery-section-title">
              <small>01 / MEDIA</small>
              <h2>Gallery</h2>
            </div>

            <div className="gallery-filter-count">
              SHOWING {filteredGallery.length} / {gallery.length}
            </div>
          </div>

          <div className="gallery-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                className={`gallery-filter ${
                  filter === category.value ? "active" : ""
                }`}
                onClick={() => setFilter(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="gallery-state">
              Loading gallery records...
            </div>
          )}

          {!loading && error && (
            <div className="gallery-state gallery-error">
              {error}
            </div>
          )}

          {!loading && !error && filteredGallery.length === 0 && (
            <div className="gallery-state">
              <strong>No gallery media yet.</strong>

              Published images added through the Admin Gallery will appear
              here automatically.
            </div>
          )}

          {!loading && !error && filteredGallery.length > 0 && (
            <div className="gallery-grid">

              {filteredGallery.map((item) => (
                <article
                  className="gallery-card"
                  key={item._id}
                  tabIndex="0"
                  role="button"
                  onClick={() => setActiveItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveItem(item);
                    }
                  }}
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || "Gallery item"}
                    />
                  ) : (
                    <div className="gallery-placeholder">
                      MEDIA
                    </div>
                  )}

                  {item.videoUrl && (
                    <div className="gallery-video-badge">
                      VIDEO
                    </div>
                  )}

                  <div className="gallery-overlay">

                    <div className="gallery-category">
                      {item.category || "Media"}
                    </div>

                    <h3>
                      {item.title || "Untitled Media"}
                    </h3>

                    {item.description && (
                      <p>
                        {item.description}
                      </p>
                    )}

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>
      </div>

      {activeItem && (
        <div
          className="gallery-modal-bg"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveItem(null);
            }
          }}
        >

          <div className="gallery-modal">

            <div className="gallery-modal-media">

              <button
                type="button"
                className="gallery-modal-close"
                onClick={() => setActiveItem(null)}
              >
                ×
              </button>

              {activeItem.image ? (
                <img
                  src={activeItem.image}
                  alt={activeItem.title || "Gallery item"}
                />
              ) : (
                <div className="gallery-placeholder">
                  MEDIA
                </div>
              )}

            </div>

            <div className="gallery-modal-info">

              <small>
                {activeItem.category || "MEDIA"}
              </small>

              <h3>
                {activeItem.title || "Gallery Item"}
              </h3>

              {activeItem.description && (
                <p>
                  {activeItem.description}
                </p>
              )}

              {activeItem.videoUrl && (
                <a
                  className="gallery-video-link"
                  href={activeItem.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Video →
                </a>
              )}

            </div>

          </div>

        </div>
      )}
    </main>
  );
}

export default Gallery;
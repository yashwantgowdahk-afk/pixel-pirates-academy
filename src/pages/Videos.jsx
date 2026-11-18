import { useEffect, useState } from "react";

import API from "../api";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = [
    { value: "all", label: "All Videos" },
    { value: "academy-intro", label: "Academy Intro" },
    { value: "founder-intro", label: "Founder Intros" },
    { value: "project-demo", label: "Project Demos" },
    { value: "workshop", label: "Workshops" },
    { value: "student-project", label: "Student Projects" },
    { value: "event-highlight", label: "Event Highlights" },
    { value: "tutorial", label: "Tutorials" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/videos`);

        if (!response.ok) {
          throw new Error("Unable to load videos");
        }

        const data = await response.json();

        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(
          "Videos could not be loaded right now."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter(
          (video) => video.category === filter
        );

  const getCategoryLabel = (value) => {
    const category = categories.find(
      (item) => item.value === value
    );

    return category ? category.label : "Video";
  };

  const getVideoSource = (video) => {
    if (video.embedUrl) {
      return video.embedUrl;
    }

    if (video.videoUrl) {
      return video.videoUrl;
    }

    return "";
  };

  return (
    <main className="videos-page-v2">
      <style>{`
        .videos-page-v2 {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 12% 8%,
              rgba(0, 215, 255, 0.10),
              transparent 25%
            ),
            radial-gradient(
              circle at 88% 20%,
              rgba(110, 90, 255, 0.09),
              transparent 24%
            ),
            #050607;
          color: #f4f7f9;
          overflow: hidden;
        }

        .videos-page-v2 *,
        .videos-page-v2 *::before,
        .videos-page-v2 *::after {
          box-sizing: border-box;
        }

        .videos-shell {
          width: min(1220px, calc(100% - 34px));
          margin: 0 auto;
          padding: 90px 0 110px;
        }

        /* HERO */

        .videos-hero {
          position: relative;
          padding: 62px;
          min-height: 420px;
          border-radius: 32px;
          border: 1px solid rgba(255,255,255,0.09);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.06),
              rgba(255,255,255,0.015)
            );
          overflow: hidden;
          margin-bottom: 42px;
        }

        .videos-hero::before {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          right: -170px;
          top: -190px;
          border-radius: 50%;
          border: 1px solid rgba(113,228,255,0.12);
          box-shadow:
            0 0 0 38px rgba(113,228,255,0.025),
            0 0 0 76px rgba(113,228,255,0.015);
          pointer-events: none;
        }

        .videos-hero::after {
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
              rgba(113,228,255,0.30),
              transparent
            );
        }

        .videos-eyebrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #82eaff;
          font-family: monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }

        .videos-eyebrow-line {
          width: 32px;
          height: 1px;
          background: #82eaff;
        }

        .videos-hero h1 {
          position: relative;
          z-index: 1;
          margin: 20px 0 17px;
          max-width: 850px;
          font-size: clamp(50px, 7vw, 90px);
          line-height: 0.91;
          letter-spacing: -0.065em;
          font-weight: 850;
        }

        .videos-hero h1 span {
          color: #82eaff;
        }

        .videos-hero p {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0;
          color: rgba(255,255,255,0.59);
          font-size: 16px;
          line-height: 1.8;
        }

        .videos-stats {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 28px;
        }

        .videos-stat {
          padding: 9px 12px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.035);
          color: rgba(255,255,255,0.67);
          font-family: monospace;
          font-size: 10px;
        }

        /* CONTROL */

        .videos-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 20px;
        }

        .videos-section-head small {
          display: block;
          margin-bottom: 7px;
          color: #82eaff;
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .videos-section-head h2 {
          margin: 0;
          font-size: 28px;
          letter-spacing: -0.04em;
        }

        .videos-count {
          color: rgba(255,255,255,0.38);
          font-family: monospace;
          font-size: 10px;
        }

        .videos-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 23px;
        }

        .videos-filter {
          min-height: 40px;
          padding: 0 13px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          color: rgba(255,255,255,0.57);
          cursor: pointer;
          font-size: 11px;
          transition: 0.22s ease;
        }

        .videos-filter:hover {
          color: #fff;
          border-color: rgba(0,215,255,0.21);
          background: rgba(0,215,255,0.05);
        }

        .videos-filter.active {
          color: #8cecff;
          border-color: rgba(0,215,255,0.28);
          background: rgba(0,215,255,0.09);
        }

        /* GRID */

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .video-card {
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.014)
            );
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .video-card:hover {
          transform: translateY(-7px);
          border-color: rgba(0,215,255,0.27);
        }

        .video-thumbnail {
          position: relative;
          height: 210px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 35%,
              rgba(0,215,255,0.12),
              transparent 32%
            ),
            #080a0c;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition:
            transform 0.5s ease,
            filter 0.5s ease;
        }

        .video-card:hover .video-thumbnail img {
          transform: scale(1.055);
          filter: brightness(0.72);
        }

        .video-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,0.18);
          font-family: monospace;
          font-size: 32px;
          font-weight: 800;
          letter-spacing: 0.05em;
          background:
            linear-gradient(
              145deg,
              rgba(0,215,255,0.06),
              rgba(110,80,255,0.07)
            );
        }

        .video-play {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 58px;
          height: 58px;
          transform: translate(-50%, -50%);
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(0,0,0,0.58);
          border: 1px solid rgba(255,255,255,0.17);
          color: #fff;
          font-size: 17px;
          backdrop-filter: blur(12px);
          transition: 0.25s ease;
        }

        .video-card:hover .video-play {
          background: rgba(0,215,255,0.13);
          border-color: rgba(0,215,255,0.32);
          color: #91edff;
        }

        .video-category-badge {
          position: absolute;
          left: 13px;
          top: 13px;
          padding: 7px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(0,0,0,0.58);
          color: #8cecff;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .video-content {
          padding: 20px;
        }

        .video-content h3 {
          margin: 0;
          font-size: 20px;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .video-content p {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.56);
          font-size: 13px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          overflow: hidden;
        }

        .video-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-top: 17px;
        }

        .video-date {
          color: rgba(255,255,255,0.35);
          font-family: monospace;
          font-size: 9px;
        }

        .video-open {
          min-height: 38px;
          padding: 0 11px;
          border: 1px solid rgba(0,215,255,0.21);
          border-radius: 10px;
          background: rgba(0,215,255,0.07);
          color: #8cecff;
          cursor: pointer;
          font-size: 10px;
          font-weight: 800;
        }

        .video-open:hover {
          background: rgba(0,215,255,0.13);
        }

        /* STATES */

        .videos-state {
          padding: 70px 24px;
          border-radius: 23px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
          text-align: center;
          color: rgba(255,255,255,0.55);
        }

        .videos-state strong {
          display: block;
          margin-bottom: 8px;
          color: #fff;
          font-size: 20px;
        }

        .videos-error {
          color: #ffb8b8;
          border-color: rgba(255,80,80,0.18);
          background: rgba(255,80,80,0.035);
        }

        /* MODAL */

        .video-modal-bg {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,0.84);
          backdrop-filter: blur(12px);
        }

        .video-modal {
          width: min(1000px, 100%);
          max-height: 90vh;
          overflow: auto;
          border-radius: 25px;
          border: 1px solid rgba(255,255,255,0.10);
          background: #080a0c;
          box-shadow: 0 30px 100px rgba(0,0,0,0.68);
        }

        .video-modal-player {
          position: relative;
          background: #020304;
          min-height: 350px;
        }

        .video-iframe {
          width: 100%;
          min-height: 500px;
          border: 0;
          display: block;
        }

        .video-modal-close {
          position: absolute;
          z-index: 4;
          top: 13px;
          right: 13px;
          width: 42px;
          height: 42px;
          border-radius: 11px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(0,0,0,0.65);
          color: #fff;
          cursor: pointer;
          font-size: 19px;
          backdrop-filter: blur(10px);
        }

        .video-modal-info {
          padding: 23px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .video-modal-info small {
          color: #82eaff;
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .video-modal-info h3 {
          margin: 8px 0 10px;
          font-size: 29px;
          letter-spacing: -0.04em;
        }

        .video-modal-info p {
          margin: 0;
          color: rgba(255,255,255,0.57);
          font-size: 13px;
          line-height: 1.7;
        }

        .video-direct-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 43px;
          margin-top: 18px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid rgba(0,215,255,0.22);
          background: rgba(0,215,255,0.07);
          color: #8cecff;
          text-decoration: none;
          font-size: 11px;
          font-weight: 800;
        }

        @media (max-width: 1030px) {
          .videos-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 720px) {
          .videos-shell {
            width: min(100% - 20px, 1220px);
            padding: 55px 0 75px;
          }

          .videos-hero {
            min-height: auto;
            padding: 42px 22px;
            border-radius: 23px;
          }

          .videos-section-head {
            align-items: flex-start;
            flex-direction: column;
            gap: 7px;
          }

          .videos-grid {
            grid-template-columns: 1fr;
          }

          .video-thumbnail {
            height: 225px;
          }

          .video-iframe {
            min-height: 300px;
          }
        }
      `}</style>

      <div className="videos-shell">

        <section className="videos-hero">

          <div className="videos-eyebrow">
            <span className="videos-eyebrow-line"></span>
            PIXEL PIRATES / VIDEO LAB
          </div>

          <h1>
            See the work.
            <br />
            <span>Watch the journey.</span>
          </h1>

          <p>
            Watch academy introductions, project demonstrations,
            workshops, student builds, event highlights and practical
            technology sessions from Pixel Pirates Academy.
          </p>

          <div className="videos-stats">
            <div className="videos-stat">
              {videos.length} VIDEO RECORDS
            </div>

            <div className="videos-stat">
              DATABASE CONNECTED
            </div>

            <div className="videos-stat">
              ADMIN CONTROLLED
            </div>
          </div>

        </section>

        <section>

          <div className="videos-section-head">

            <div>
              <small>01 / MEDIA</small>
              <h2>Video Library</h2>
            </div>

            <div className="videos-count">
              SHOWING {filteredVideos.length} / {videos.length}
            </div>

          </div>

          <div className="videos-filters">

            {categories.map((category) => (
              <button
                type="button"
                key={category.value}
                className={`videos-filter ${
                  filter === category.value
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setFilter(category.value)
                }
              >
                {category.label}
              </button>
            ))}

          </div>

          {loading && (
            <div className="videos-state">
              Loading video records...
            </div>
          )}

          {!loading && error && (
            <div className="videos-state videos-error">
              {error}
            </div>
          )}

          {!loading &&
            !error &&
            filteredVideos.length === 0 && (
              <div className="videos-state">

                <strong>
                  No videos published yet.
                </strong>

                Published videos added through the
                Admin Videos panel will cd C:\Users\yashw\pixel-pirates-academy\backend
node resetAdminPassword.jsear here
                automatically.

              </div>
            )}

          {!loading &&
            !error &&
            filteredVideos.length > 0 && (
              <div className="videos-grid">

                {filteredVideos.map((video) => {

                  const source = getVideoSource(video);

                  return (
                    <article
                      className="video-card"
                      key={video._id}
                    >

                      <div className="video-thumbnail">

                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={
                              video.title ||
                              "Video thumbnail"
                            }
                          />
                        ) : (
                          <div className="video-placeholder">
                            VIDEO
                          </div>
                        )}

                        <div className="video-category-badge">
                          {getCategoryLabel(
                            video.category
                          )}
                        </div>

                        <div className="video-play">
                          ▶
                        </div>

                      </div>

                      <div className="video-content">

                        <h3>
                          {video.title ||
                            "Untitled Video"}
                        </h3>

                        {video.description && (
                          <p>
                            {video.description}
                          </p>
                        )}

                        <div className="video-footer">

                          <div className="video-date">
                            {video.date || "ACADEMY MEDIA"}
                          </div>

                          <button
                            type="button"
                            className="video-open"
                            onClick={() =>
                              setSelectedVideo(video)
                            }
                          >
                            WATCH →
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

      {selectedVideo && (
        <div
          className="video-modal-bg"
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedVideo(null);
            }
          }}
        >

          <div className="video-modal">

            <div className="video-modal-player">

              <button
                type="button"
                className="video-modal-close"
                onClick={() =>
                  setSelectedVideo(null)
                }
              >
                ×
              </button>

              {selectedVideo.embedUrl ? (
                <iframe
                  className="video-iframe"
                  src={selectedVideo.embedUrl}
                  title={
                    selectedVideo.title ||
                    "Pixel Pirates video"
                  }
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : selectedVideo.videoUrl ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  style={{
                    width: "100%",
                    display: "block",
                    maxHeight: "70vh",
                  }}
                />
              ) : (
                <div className="videos-state">
                  <strong>
                    Video source unavailable
                  </strong>
                  This video does not have an embed URL
                  or direct video URL yet.
                </div>
              )}

            </div>

            <div className="video-modal-info">

              <small>
                {getCategoryLabel(
                  selectedVideo.category
                )}
              </small>

              <h3>
                {selectedVideo.title ||
                  "Video"}
              </h3>

              {selectedVideo.description && (
                <p>
                  {selectedVideo.description}
                </p>
              )}

              {selectedVideo.videoUrl && (
                <a
                  className="video-direct-link"
                  href={selectedVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Video Directly →
                </a>
              )}

            </div>

          </div>

        </div>
      )}
    </main>
  );
}

export default Videos;
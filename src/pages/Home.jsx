import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pixel-pirates-logo.jpeg";
import "../App.css";

import API from "../api";

function Home() {
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const endpoints = [
          "courses",
          "projects",
          "achievements",
          "events",
          "team",
          "gallery",
          "videos",
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${API}/${endpoint}`)
          )
        );

        const data = await Promise.all(
          responses.map(async (response) => {
            if (!response.ok) return [];

            const json = await response.json();

            return Array.isArray(json) ? json : [];
          })
        );

        const published = (items) =>
          items.filter(
            (item) =>
              !item?.status ||
              item.status === "published"
          );

        if (!mounted) return;

        setCourses(published(data[0]));
        setProjects(published(data[1]));
        setAchievements(published(data[2]));
        setEvents(published(data[3]));
        setTeam(published(data[4]));
        setGallery(published(data[5]));
        setVideos(published(data[6]));
      } catch (error) {
        console.error(
          "Pixel Pirates home loading error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="pp-new-home">

      <style>{`

        /* =====================================================
           RESET / PAGE
           ===================================================== */

        .pp-new-home {
          --cyan: #82e9ff;
          --white: #f4f7f8;
          --muted: rgba(255,255,255,.52);
          --soft: rgba(255,255,255,.34);
          --line: rgba(255,255,255,.08);
          --panel: rgba(255,255,255,.025);

          width: 100%;
          min-height: 100vh;

          margin: 0;
          padding: 0;

          background: #050607;
          color: var(--white);

          overflow-x: hidden;
        }

        .pp-new-home *,
        .pp-new-home *::before,
        .pp-new-home *::after {
          box-sizing: border-box;
        }

        .pp-container {
          width: min(
            1220px,
            calc(100% - 34px)
          );

          margin: 0 auto;
        }

        .pp-section {
          position: relative;

          padding: 110px 0;
        }

        .pp-label {
          display: inline-flex;

          align-items: center;

          gap: 10px;

          color: var(--cyan);

          font-family: monospace;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: .16em;

          text-transform: uppercase;
        }

        .pp-label::before {
          content: "";

          width: 30px;

          height: 1px;

          background: var(--cyan);
        }

        .pp-title {
          margin: 18px 0 14px;

          max-width: 820px;

          font-size:
            clamp(
              44px,
              6.6vw,
              82px
            );

          line-height: .91;

          letter-spacing: -.065em;

          font-weight: 900;
        }

        .pp-title span {
          color: var(--cyan);
        }

        .pp-description {
          max-width: 680px;

          margin: 0;

          color: var(--muted);

          font-size: 15px;

          line-height: 1.8;
        }


        /* =====================================================
           HERO
           ===================================================== */

        .pp-new-hero {
          position: relative;

          min-height: 850px;

          display: flex;

          align-items: center;

          overflow: hidden;

          background:
            radial-gradient(
              circle at 70% 45%,
              rgba(0,215,255,.12),
              transparent 28%
            ),
            radial-gradient(
              circle at 92% 18%,
              rgba(108,88,255,.10),
              transparent 25%
            ),
            #050607;
        }

        .pp-new-hero::before {
          content: "";

          position: absolute;

          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.025) 1px,
              transparent 1px
            );

          background-size: 48px 48px;

          mask-image:
            linear-gradient(
              to bottom,
              rgba(0,0,0,.92),
              transparent 90%
            );

          pointer-events: none;
        }

        .pp-new-hero-grid {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            minmax(0, 1.04fr)
            minmax(460px, .96fr);

          align-items: center;

          gap: 35px;

          width: min(
            1220px,
            calc(100% - 34px)
          );

          margin: 0 auto;

          padding-top: 35px;
        }

        .pp-hero-copy {
          min-width: 0;

          max-width: 720px;
        }

        .pp-live-pill {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          min-height: 35px;

          padding: 0 12px;

          border:
            1px solid
            rgba(
              0,
              215,
              255,
              .20
            );

          border-radius: 999px;

          background:
            rgba(
              0,
              215,
              255,
              .055
            );

          color: #8cecff;

          font-family: monospace;

          font-size: 8px;

          letter-spacing: .11em;
        }

        .pp-live-pill i {
          width: 6px;

          height: 6px;

          border-radius: 50%;

          background: var(--cyan);

          box-shadow:
            0 0 12px
            rgba(
              130,
              233,
              255,
              .90
            );
        }

        .pp-hero-kicker {
          margin-top: 20px;

          color:
            rgba(
              255,
              255,
              255,
              .38
            );

          font-family: monospace;

          font-size: 9px;

          letter-spacing: .11em;

          line-height: 1.7;
        }

        .pp-hero-title {
          margin: 19px 0;

          font-size:
            clamp(
              60px,
              7.8vw,
              106px
            );

          line-height: .84;

          letter-spacing: -.08em;

          font-weight: 950;
        }

        .pp-hero-title span {
          color: var(--cyan);
        }

        .pp-hero-main-text {
          max-width: 640px;

          margin: 0;

          color:
            rgba(
              255,
              255,
              255,
              .65
            );

          font-size: 17px;

          line-height: 1.75;
        }

        .pp-hero-main-text strong {
          color: #fff;
        }

        .pp-hero-subtext {
          max-width: 620px;

          margin:
            10px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              .39
            );

          font-size: 13px;

          line-height: 1.7;
        }

        .pp-hero-buttons {
          display: flex;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 28px;
        }

        .pp-button-primary,
        .pp-button-secondary {
          min-height: 46px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding:
            0 16px;

          border-radius: 11px;

          text-decoration: none;

          font-size: 10px;

          font-weight: 850;

          transition:
            transform .25s ease,
            border-color .25s ease,
            background .25s ease;
        }

        .pp-button-primary {
          color: #050607;

          background: #f3f6f8;
        }

        .pp-button-secondary {
          color:
            rgba(
              255,
              255,
              255,
              .72
            );

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .10
            );

          background:
            rgba(
              255,
              255,
              255,
              .035
            );
        }

        .pp-button-primary:hover,
        .pp-button-secondary:hover {
          transform:
            translateY(-2px);
        }

        .pp-button-secondary:hover {
          border-color:
            rgba(
              0,
              215,
              255,
              .25
            );

          color: #fff;
        }

        .pp-stat-row {
          display: flex;

          flex-wrap: wrap;

          gap: 28px;

          margin-top: 38px;
        }

        .pp-stat strong {
          display: block;

          color: #8cecff;

          font-family: monospace;

          font-size: 22px;
        }

        .pp-stat span {
          display: block;

          margin-top: 5px;

          color:
            rgba(
              255,
              255,
              255,
              .30
            );

          font-family: monospace;

          font-size: 7px;

          letter-spacing: .10em;
        }


        /* =====================================================
           TECHNOLOGY CORE
           ===================================================== */

        .pp-tech-core {
          position: relative;

          width: 520px;

          height: 520px;

          margin: 0 auto;

          flex-shrink: 0;
        }

        .pp-core-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          pointer-events: none;
        }

        .pp-core-ring.one {
          width: 100%;
          height: 100%;

          border:
            1px solid
            rgba(
              130,
              233,
              255,
              .16
            );
        }

        .pp-core-ring.two {
          width: 78%;
          height: 78%;

          border:
            1px dashed
            rgba(
              130,
              233,
              255,
              .12
            );
        }

        .pp-core-ring.three {
          width: 53%;
          height: 53%;

          border:
            1px solid
            rgba(
              130,
              233,
              255,
              .20
            );
        }

        .pp-core-glow {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 46%;
          height: 46%;

          transform:
            translate(
              -50%,
              -50%
            );

          border-radius: 50%;

          background:
            rgba(
              0,
              215,
              255,
              .08
            );

          filter:
            blur(34px);
        }

        .pp-core-logo {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 154px;
          height: 154px;

          transform:
            translate(
              -50%,
              -50%
            );

          z-index: 30;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 9px;

          border-radius: 27px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .12
            );

          background:
            rgba(
              4,
              7,
              9,
              .95
            );

          box-shadow:
            0 0 55px
            rgba(
              0,
              215,
              255,
              .12
            );

          overflow: hidden;
        }

        .pp-core-logo img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: contain;
        }

        .pp-tech-node {
          position: absolute;

          z-index: 40;

          width: 86px;
          height: 60px;

          display: flex;

          align-items: center;

          justify-content: center;

          flex-direction: column;

          gap: 4px;

          padding: 7px;

          border-radius: 14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .10
            );

          background:
            rgba(
              4,
              8,
              10,
              .95
            );

          backdrop-filter:
            blur(14px);

          box-shadow:
            0 12px 30px
            rgba(
              0,
              0,
              0,
              .35
            );
        }

        .pp-tech-node strong {
          color:
            #85eaff;

          font-family:
            monospace;

          font-size:
            15px;

          line-height:
            1;
        }

        .pp-tech-node span {
          color:
            rgba(
              255,
              255,
              255,
              .34
            );

          font-family:
            monospace;

          font-size:
            5px;

          letter-spacing:
            .05em;

          white-space:
            nowrap;
        }

        .pp-node-ai {
          left:
            50%;

          top:
            0;

          transform:
            translateX(-50%);
        }

        .pp-node-ml {
          right:
            0;

          top:
            20%;
        }

        .pp-node-web {
          right:
            0;

          bottom:
            20%;
        }

        .pp-node-iot {
          left:
            50%;

          bottom:
            0;

          transform:
            translateX(-50%);
        }

        .pp-node-code {
          left:
            0;

          bottom:
            20%;
        }

        .pp-node-bot {
          left:
            0;

          top:
            20%;
        }


        /* =====================================================
           COURSE / PROJECT CARDS
           ===================================================== */

        .pp-grid-3 {
          display:
            grid;

          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );

          gap:
            16px;

          margin-top:
            34px;
        }

        .pp-card {
          overflow:
            hidden;

          border:
            1px solid
            var(--line);

          border-radius:
            20px;

          background:
            var(--panel);

          transition:
            transform .25s ease,
            border-color .25s ease;
        }

        .pp-card:hover {
          transform:
            translateY(-5px);

          border-color:
            rgba(
              130,
              233,
              255,
              .20
            );
        }

        .pp-card-visual {
          height:
            175px;

          display:
            grid;

          place-items:
            center;

          background:
            radial-gradient(
              circle,
              rgba(
                0,
                215,
                255,
                .10
              ),
              transparent 62%
            ),
            #090b0c;
        }

        .pp-card-visual img {
          width:
            100%;

          height:
            100%;

          display:
            block;

          object-fit:
            cover;
        }

        .pp-placeholder {
          color:
            rgba(
              255,
              255,
              255,
              .16
            );

          font-family:
            monospace;

          font-weight:
            900;

          font-size:
            28px;
        }

        .pp-card-body {
          padding:
            18px;
        }

        .pp-card-tag {
          color:
            var(--cyan);

          font-family:
            monospace;

          font-size:
            8px;

          letter-spacing:
            .12em;

          text-transform:
            uppercase;
        }

        .pp-card h3 {
          margin:
            8px 0;

          font-size:
            20px;

          line-height:
            1.2;
        }

        .pp-card p {
          margin:
            0;

          color:
            rgba(
              255,
              255,
              255,
              .46
            );

          font-size:
            12px;

          line-height:
            1.65;
        }

        .pp-card-link {
          display:
            inline-flex;

          margin-top:
            14px;

          color:
            #8cecff;

          text-decoration:
            none;

          font-family:
            monospace;

          font-size:
            9px;

          font-weight:
            800;
        }


        /* =====================================================
           BLUEPRINT / METHOD
           ===================================================== */

        .pp-blueprint {
          background:
            linear-gradient(
              180deg,
              #060708,
              #090b0d
            );

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              .05
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              .05
            );
        }

        .pp-blueprint-boxes {
          display:
            grid;

          grid-template-columns:
            1fr 1fr;

          gap:
            15px;

          margin-top:
            35px;
        }

        .pp-blueprint-box {
          padding:
            26px;

          border-radius:
            18px;

          border:
            1px solid
            var(--line);

          background:
            rgba(
              255,
              255,
              255,
              .025
            );
        }

        .pp-blueprint-box h3 {
          margin:
            0 0 10px;

          font-size:
            19px;
        }

        .pp-blueprint-box p {
          margin:
            0;

          color:
            rgba(
              255,
              255,
              255,
              .49
            );

          line-height:
            1.7;

          font-size:
            13px;
        }

        .pp-methods {
          display:
            grid;

          grid-template-columns:
            repeat(
              5,
              1fr
            );

          gap:
            9px;

          margin-top:
            15px;
        }

        .pp-method {
          min-height:
            130px;

          padding:
            15px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .07
            );

          border-radius:
            15px;

          background:
            rgba(
              255,
              255,
              255,
              .02
            );
        }

        .pp-method.active {
          border-color:
            rgba(
              0,
              215,
              255,
              .20
            );

          background:
            rgba(
              0,
              215,
              255,
              .045
            );
        }

        .pp-method small {
          color:
            var(--cyan);

          font-family:
            monospace;

          font-size:
            8px;
        }

        .pp-method h4 {
          margin:
            13px 0 7px;

          font-size:
            14px;
        }

        .pp-method p {
          margin:
            0;

          color:
            rgba(
              255,
              255,
              255,
              .38
            );

          font-size:
            10px;

          line-height:
            1.55;
        }


        /* =====================================================
           EVENTS
           ===================================================== */

        .pp-events-list {
          display:
            grid;

          gap:
            10px;

          margin-top:
            30px;
        }

        .pp-event {
          display:
            grid;

          grid-template-columns:
            120px
            minmax(0,1fr)
            auto;

          gap:
            18px;

          align-items:
            center;

          padding:
            18px;

          border:
            1px solid
            var(--line);

          border-radius:
            16px;

          background:
            rgba(
              255,
              255,
              255,
              .022
            );
        }

        .pp-event-date strong {
          display:
            block;

          color:
            var(--cyan);

          font-family:
            monospace;

          font-size:
            12px;
        }

        .pp-event-date span {
          color:
            rgba(
              255,
              255,
              255,
              .27
            );

          font-family:
            monospace;

          font-size:
            7px;
        }

        .pp-event-main h3 {
          margin:
            0;

          font-size:
            17px;
        }

        .pp-event-main p {
          margin:
            5px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              .40
            );

          font-size:
            11px;
        }

        .pp-event-status {
          color:
            rgba(
              255,
              255,
              255,
              .40
            );

          font-family:
            monospace;

          font-size:
            8px;

          text-transform:
            uppercase;
        }


        /* =====================================================
           TEAM
           ===================================================== */

        .pp-team-grid {
          display:
            grid;

          grid-template-columns:
            repeat(
              4,
              minmax(
                0,
                1fr
              )
            );

          gap:
            14px;

          margin-top:
            32px;
        }

        .pp-team-card {
          overflow:
            hidden;

          border-radius:
            18px;

          border:
            1px solid
            var(--line);

          background:
            rgba(
              255,
              255,
              255,
              .025
            );
        }

        .pp-team-photo {
          height:
            260px;

          background:
            #090b0d;

          display:
            grid;

          place-items:
            center;
        }

        .pp-team-photo img {
          width:
            100%;

          height:
            100%;

          display:
            block;

          object-fit:
            cover;
        }

        .pp-team-placeholder {
          color:
            rgba(
              255,
              255,
              255,
              .18
            );

          font-family:
            monospace;

          font-size:
            34px;

          font-weight:
            900;
        }

        .pp-team-info {
          padding:
            15px;
        }

        .pp-team-role {
          color:
            var(--cyan);

          font-family:
            monospace;

          font-size:
            8px;

          letter-spacing:
            .10em;

          text-transform:
            uppercase;
        }

        .pp-team-info h3 {
          margin:
            7px 0 0;

          font-size:
            17px;
        }

        .pp-team-info p {
          margin:
            5px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              .36
            );

          font-size:
            10px;
        }


        /* =====================================================
           MEDIA
           ===================================================== */

        .pp-media-grid {
          display:
            grid;

          grid-template-columns:
            1.1fr
            .9fr;

          gap:
            16px;

          margin-top:
            32px;
        }

        .pp-media-panel {
          overflow:
            hidden;

          border-radius:
            20px;

          border:
            1px solid
            var(--line);

          background:
            rgba(
              255,
              255,
              255,
              .025
            );
        }

        .pp-media-head {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          padding:
            15px 17px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              .06
            );
        }

        .pp-media-head strong {
          color:
            var(--cyan);

          font-family:
            monospace;

          font-size:
            9px;

          letter-spacing:
            .10em;
        }

        .pp-media-head span {
          color:
            rgba(
              255,
              255,
              255,
              .27
            );

          font-family:
            monospace;

          font-size:
            8px;
        }

        .pp-gallery {
          display:
            grid;

          grid-template-columns:
            1.4fr
            .8fr
            .8fr;

          grid-template-rows:
            120px
            120px;

          gap:
            7px;

          padding:
            9px;
        }

        .pp-gallery-item {
          position:
            relative;

          overflow:
            hidden;

          border-radius:
            10px;

          background:
            #080a0b;
        }

        .pp-gallery-item:first-child {
          grid-row:
            1 / 3;
        }

        .pp-gallery-item img {
          width:
            100%;

          height:
            100%;

          object-fit:
            cover;

          display:
            block;

          transition:
            transform .35s ease;
        }

        .pp-gallery-item:hover img {
          transform:
            scale(1.05);
        }

        .pp-gallery-title {
          position:
            absolute;

          left:
            0;

          right:
            0;

          bottom:
            0;

          padding:
            24px 8px 7px;

          background:
            linear-gradient(
              to top,
              rgba(
                0,
                0,
                0,
                .78
              ),
              transparent
            );

          color:
            #fff;

          font-size:
            8px;
        }

        .pp-video-grid {
          display:
            grid;

          grid-template-columns:
            1.35fr
            .65fr;

          gap:
            8px;

          padding:
            9px;
        }

        .pp-feature-video,
        .pp-side-video {
          position:
            relative;

          display:
            block;

          overflow:
            hidden;

          border-radius:
            10px;

          background:
            #080a0b;

          min-width:
            0;

          text-decoration:
            none;
        }

        .pp-feature-video {
          min-height:
            250px;
        }

        .pp-side-video {
          min-height:
            77px;
        }

        .pp-feature-video img,
        .pp-side-video img {
          width:
            100%;

          height:
            100%;

          display:
            block;

          object-fit:
            cover;
        }

        .pp-play {
          position:
            absolute;

          left:
            50%;

          top:
            50%;

          transform:
            translate(
              -50%,
              -50%
            );

          width:
            46px;

          height:
            46px;

          display:
            grid;

          place-items:
            center;

          border-radius:
            50%;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              .14
            );

          background:
            rgba(
              0,
              0,
              0,
              .62
            );

          color:
            #fff;

          font-size:
            13px;
        }

        .pp-video-side {
          display:
            grid;

          grid-template-rows:
            repeat(
              3,
              1fr
            );

          gap:
            7px;
        }

        .pp-video-name {
          position:
            absolute;

          left:
            7px;

          right:
            7px;

          bottom:
            6px;

          color:
            #fff;

          font-size:
            7px;

          white-space:
            nowrap;

          overflow:
            hidden;

          text-overflow:
            ellipsis;

          text-shadow:
            0 1px 6px
            rgba(
              0,
              0,
              0,
              .9
            );
        }


        /* =====================================================
           CTA
           ===================================================== */

        .pp-final-cta {
          position:
            relative;

          text-align:
            center;

          padding:
            130px 0;

          background:
            radial-gradient(
              circle at center,
              rgba(
                0,
                215,
                255,
                .08
              ),
              transparent 32%
            );
        }

        .pp-final-cta h2 {
          max-width:
            850px;

          margin:
            17px auto;

          font-size:
            clamp(
              54px,
              8vw,
              100px
            );

          line-height:
            .86;

          letter-spacing:
            -.07em;
        }

        .pp-final-cta h2 span {
          color:
            var(--cyan);
        }

        .pp-final-cta p {
          max-width:
            600px;

          margin:
            0 auto;

          color:
            rgba(
              255,
              255,
              255,
              .46
            );

          line-height:
            1.7;

          font-size:
            14px;
        }

        .pp-cta-buttons {
          display:
            flex;

          justify-content:
            center;

          flex-wrap:
            wrap;

          gap:
            10px;

          margin-top:
            26px;
        }


        /* =====================================================
           FOOTER
           ===================================================== */

        .pp-footer {
          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              .07
            );

          background:
            #030405;

          padding:
            30px 0;
        }

        .pp-footer-row {
          display:
            flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap:
            20px;
        }

        .pp-footer-brand strong {
          display:
            block;

          font-size:
            11px;

          letter-spacing:
            .08em;
        }

        .pp-footer-brand span {
          display:
            block;

          margin-top:
            6px;

          color:
            rgba(
              255,
              255,
              255,
              .30
            );

          font-family:
            monospace;

          font-size:
            7px;
        }

        .pp-footer-links {
          display:
            flex;

          flex-wrap:
            wrap;

          gap:
            14px;
        }

        .pp-footer-links a {
          color:
            rgba(
              255,
              255,
              255,
              .39
            );

          text-decoration:
            none;

          font-family:
            monospace;

          font-size:
            8px;
        }

        .pp-footer-links a:hover {
          color:
            var(--cyan);
        }


        /* =====================================================
           EMPTY / LOADING
           ===================================================== */

        .pp-empty-box {
          min-height:
            160px;

          display:
            grid;

          place-items:
            center;

          padding:
            25px;

          border:
            1px dashed
            rgba(
              255,
              255,
              255,
              .10
            );

          border-radius:
            17px;

          color:
            rgba(
              255,
              255,
              255,
              .30
            );

          font-family:
            monospace;

          font-size:
            9px;

          text-align:
            center;
        }


        /* =====================================================
           RESPONSIVE
           ===================================================== */

        @media (max-width: 1120px) {

          .pp-new-hero-grid {
            grid-template-columns:
              1fr
              460px;
          }

          .pp-tech-core {
            width:
              460px;

            height:
              460px;
          }

          .pp-grid-3 {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }

          .pp-team-grid {
            grid-template-columns:
              repeat(
                2,
                minmax(
                  0,
                  1fr
                )
              );
          }

          .pp-methods {
            grid-template-columns:
              repeat(
                3,
                1fr
              );
          }
        }


        @media (max-width: 900px) {

          .pp-new-hero {
            min-height:
              auto;

            padding:
              115px 0 80px;
          }

          .pp-new-hero-grid {
            grid-template-columns:
              1fr;

            gap:
              70px;
          }

          .pp-hero-copy {
            max-width:
              800px;
          }

          .pp-tech-core {
            margin:
              0 auto;
          }

          .pp-blueprint-boxes,
          .pp-media-grid {
            grid-template-columns:
              1fr;
          }

          .pp-event {
            grid-template-columns:
              100px
              minmax(
                0,
                1fr
              );
          }

          .pp-event-status {
            display:
              none;
          }
        }


        @media (max-width: 680px) {

          .pp-container,
          .pp-new-hero-grid {
            width:
              calc(
                100% - 20px
              );
          }

          .pp-section {
            padding:
              78px 0;
          }

          .pp-new-hero {
            padding:
              100px 0 65px;
          }

          .pp-hero-title {
            font-size:
              55px;
          }

          .pp-hero-main-text {
            font-size:
              15px;
          }

          .pp-tech-core {
            width:
              350px;

            height:
              350px;
          }

          .pp-core-logo {
            width:
              108px;

            height:
              108px;

            border-radius:
              20px;
          }

          .pp-tech-node {
            width:
              64px;

            height:
              48px;

            border-radius:
              11px;
          }

          .pp-tech-node strong {
            font-size:
              11px;
          }

          .pp-tech-node span {
            font-size:
              4px;
          }

          .pp-grid-3,
          .pp-team-grid {
            grid-template-columns:
              1fr;
          }

          .pp-methods {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }

          .pp-gallery {
            grid-template-columns:
              1fr 1fr;

            grid-template-rows:
              135px
              135px
              135px;
          }

          .pp-gallery-item:first-child {
            grid-column:
              1 / 3;

            grid-row:
              1 / 2;
          }

          .pp-video-grid {
            grid-template-columns:
              1fr;
          }

          .pp-feature-video {
            min-height:
              240px;
          }

          .pp-video-side {
            grid-template-columns:
              repeat(
                3,
                1fr
              );

            grid-template-rows:
              95px;
          }

          .pp-footer-row {
            flex-direction:
              column;

            align-items:
              flex-start;
          }
        }


        @media (max-width: 400px) {

          .pp-hero-title {
            font-size:
              48px;
          }

          .pp-tech-core {
            width:
              300px;

            height:
              300px;
          }

          .pp-core-logo {
            width:
              88px;

            height:
              88px;
          }

          .pp-tech-node {
            width:
              55px;

            height:
              43px;
          }

          .pp-tech-node strong {
            font-size:
              9px;
          }

          .pp-tech-node span {
            font-size:
              3.5px;
          }

          .pp-methods {
            grid-template-columns:
              1fr;
          }

          .pp-event {
            grid-template-columns:
              1fr;
          }

          .pp-event-date span {
            display:
              none;
          }
        }

      `}</style>


      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="pp-new-hero">

        <div className="pp-new-hero-grid">


          {/* HERO CONTENT */}

          <div className="pp-hero-copy">

            <div className="pp-live-pill">
              <i></i>
              ACADEMY CORE ONLINE
            </div>


            <div className="pp-hero-kicker">
              LEARN / BUILD / EXPERIMENT /
              COMPETE / SHOWCASE
            </div>


            <h1 className="pp-hero-title">

              BUILD

              <br />

              <span>
                THE TECHNOLOGY
              </span>

              <br />

              YOU IMAGINE.

            </h1>


            <p className="pp-hero-main-text">

              We don't just teach technology.

              <strong>
                {" "}We build with it.
              </strong>

            </p>


            <p className="pp-hero-subtext">

              Explore AI, machine learning,
              web development, programming,
              IoT and automation through
              practical learning and real projects.

            </p>


            <div className="pp-hero-buttons">

              <a
                href="#courses"
                className="pp-button-primary"
              >
                EXPLORE TECHNOLOGY →
              </a>


              <Link
                to="/projects"
                className="pp-button-secondary"
              >
                VIEW PROJECT LAB
              </Link>

            </div>


            <div className="pp-stat-row">

              <div className="pp-stat">

                <strong>
                  05
                </strong>

                <span>
                  LEARNING STAGES
                </span>

              </div>


              <div className="pp-stat">

                <strong>
                  08+
                </strong>

                <span>
                  TECH DOMAINS
                </span>

              </div>


              <div className="pp-stat">

                <strong>
                  {courses.length}
                </strong>

                <span>
                  PUBLISHED COURSES
                </span>

              </div>

            </div>

          </div>


          {/* TECHNOLOGY CORE */}

          <div className="pp-tech-core">

            <div className="pp-core-ring one"></div>
            <div className="pp-core-ring two"></div>
            <div className="pp-core-ring three"></div>

            <div className="pp-core-glow"></div>


            <div className="pp-tech-node pp-node-ai">

              <strong>
                AI
              </strong>

              <span>
                INTELLIGENCE
              </span>

            </div>


            <div className="pp-tech-node pp-node-ml">

              <strong>
                ML
              </strong>

              <span>
                LEARNING
              </span>

            </div>


            <div className="pp-tech-node pp-node-web">

              <strong>
                &lt;/&gt;
              </strong>

              <span>
                WEB
              </span>

            </div>


            <div className="pp-tech-node pp-node-iot">

              <strong>
                IoT
              </strong>

              <span>
                CONNECTED
              </span>

            </div>


            <div className="pp-tech-node pp-node-code">

              <strong>
                {`{ }`}
              </strong>

              <span>
                CODE
              </span>

            </div>


            <div className="pp-tech-node pp-node-bot">

              <strong>
                BOT
              </strong>

              <span>
                AUTOMATION
              </span>

            </div>


            <div className="pp-core-logo">

              <img
                src={logo}
                alt="Pixel Pirates Academy"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BLUEPRINT
          ===================================================== */}

      <section
        className="pp-section pp-blueprint"
        id="about"
      >

        <div className="pp-container">

          <div className="pp-label">
            TECHNOLOGY BLUEPRINT
          </div>


          <h2 className="pp-title">

            TECHNOLOGY IS NOT

            <br />

            SOMETHING TO{" "}

            <span>
              MEMORIZE.
            </span>

          </h2>


          <p className="pp-description">

            Pixel Pirates Academy is a
            practical, student-focused
            technology learning initiative
            built around learning by doing.

            Students explore modern technology
            through projects, experimentation,
            teamwork and competitions.

          </p>


          <div className="pp-blueprint-boxes">

            <div className="pp-blueprint-box">

              <h3>
                From curiosity to creation.
              </h3>

              <p>

                Understand the fundamentals.
                Practice the concepts.
                Build something real.
                Experiment with ideas.
                Improve what you create.
                Then showcase it.

              </p>

            </div>


            <div className="pp-blueprint-box">

              <h3>
                The academy loop.
              </h3>

              <p>

                A learning environment
                designed around practical
                exposure, project work and
                technology experimentation
                instead of theory alone.

              </p>

            </div>

          </div>


          <div className="pp-methods">

            {[
              [
                "01",
                "LEARN",
                "Understand the fundamentals."
              ],
              [
                "02",
                "BUILD",
                "Turn concepts into working projects."
              ],
              [
                "03",
                "EXPERIMENT",
                "Try tools, ideas and technology."
              ],
              [
                "04",
                "COMPETE",
                "Take ideas into challenges."
              ],
              [
                "05",
                "SHOWCASE",
                "Present what you create."
              ]
            ].map(
              (item, index) => (

                <div
                  className={
                    `pp-method ${
                      index === 4
                        ? "active"
                        : ""
                    }`
                  }
                  key={item[1]}
                >

                  <small>
                    {item[0]}
                  </small>

                  <h4>
                    {item[1]}
                  </h4>

                  <p>
                    {item[2]}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          COURSES
          ===================================================== */}

      <section
        className="pp-section"
        id="courses"
      >

        <div className="pp-container">

          <div className="pp-label">
            TECHNOLOGY MISSIONS
          </div>


          <h2 className="pp-title">

            EXPLORE.

            <br />

            <span>
              CREATE.
            </span>

          </h2>


          <p className="pp-description">

            Practical courses managed
            directly through the academy
            administration system.

          </p>


          {loading ? (

            <div className="pp-empty-box">

              LOADING COURSE SYSTEM...

            </div>

          ) : courses.length === 0 ? (

            <div className="pp-empty-box">

              NO PUBLISHED COURSES YET.

            </div>

          ) : (

            <div className="pp-grid-3">

              {courses
                .slice(0, 6)
                .map((course) => (

                  <article
                    className="pp-card"
                    key={course._id}
                  >

                    <div className="pp-card-body">

                      <div className="pp-card-tag">
                        {course.category ||
                          "TECHNOLOGY"}
                      </div>


                      <h3>
                        {course.title}
                      </h3>


                      <p>

                        {course.description ||
                          "Practical technology learning designed around building and experimentation."}

                      </p>


                      <Link
                        to={`/courses/${course._id}`}
                        className="pp-card-link"
                      >
                        OPEN COURSE →
                      </Link>

                    </div>

                  </article>

                ))}

            </div>

          )}


          <div
            style={{
              marginTop: 22
            }}
          >

            <Link
              to="/courses"
              className="pp-button-secondary"
            >
              VIEW ALL COURSES →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROJECTS
          ===================================================== */}

      <section
        className="pp-section"
        id="projects"
        style={{
          background:
            "#07090b"
        }}
      >

        <div className="pp-container">

          <div className="pp-label">
            PROJECT LAB
          </div>


          <h2 className="pp-title">

            DON'T JUST

            <br />

            <span>
              LEARN IT.
            </span>

            <br />

            BUILD IT.

          </h2>


          <p className="pp-description">

            Projects turn concepts
            into practical technology.

          </p>


          {projects.length === 0 ? (

            <div className="pp-empty-box">

              NO PUBLISHED PROJECTS YET.

            </div>

          ) : (

            <div className="pp-grid-3">

              {projects
                .slice(0, 3)
                .map((project) => (

                  <article
                    className="pp-card"
                    key={project._id}
                  >

                    <div className="pp-card-visual">

                      {project.image ? (

                        <img
                          src={project.image}
                          alt={
                            project.title ||
                            "Project"
                          }
                        />

                      ) : (

                        <div className="pp-placeholder">
                          BUILD
                        </div>

                      )}

                    </div>


                    <div className="pp-card-body">

                      <div className="pp-card-tag">
                        {
                          project.category ||
                          "PROJECT"
                        }
                      </div>


                      <h3>
                        {project.title}
                      </h3>


                      <p>

                        {
                          project.description ||
                          "A technology project built through practical experimentation."
                        }

                      </p>


                      <Link
                        to="/projects"
                        className="pp-card-link"
                      >
                        EXPLORE PROJECT →
                      </Link>

                    </div>

                  </article>

                ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          ACHIEVEMENTS
          ===================================================== */}

      <section
        className="pp-section"
        id="achievements"
      >

        <div className="pp-container">

          <div className="pp-label">
            PROOF OF BUILDING
          </div>


          <h2 className="pp-title">

            SHOW WHAT YOU

            <br />

            <span>
              BUILT.
            </span>

          </h2>


          <p className="pp-description">

            Published achievements,
            competitions, certifications,
            workshops and milestones.

          </p>


          {achievements.length === 0 ? (

            <div className="pp-empty-box">

              NO PUBLISHED ACHIEVEMENTS YET.

            </div>

          ) : (

            <div className="pp-grid-3">

              {achievements
                .slice(0, 3)
                .map((achievement) => (

                  <article
                    className="pp-card"
                    key={
                      achievement._id
                    }
                  >

                    <div className="pp-card-visual">

                      {achievement.image ? (

                        <img
                          src={
                            achievement.image
                          }
                          alt={
                            achievement.title ||
                            "Achievement"
                          }
                        />

                      ) : (

                        <div className="pp-placeholder">
                          AWARD
                        </div>

                      )}

                    </div>


                    <div className="pp-card-body">

                      <div className="pp-card-tag">

                        {
                          achievement.eventName ||
                          "ACHIEVEMENT"
                        }

                      </div>


                      <h3>
                        {achievement.title}
                      </h3>


                      <p>

                        {
                          achievement.description ||
                          achievement.studentOrTeam ||
                          "Published academy achievement."
                        }

                      </p>

                    </div>

                  </article>

                ))}

            </div>

          )}


          <div
            style={{
              marginTop: 22
            }}
          >

            <Link
              to="/achievements"
              className="pp-button-secondary"
            >
              VIEW ACHIEVEMENTS →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          EVENTS
          ===================================================== */}

      <section
        className="pp-section"
        id="events"
        style={{
          background:
            "#07090b"
        }}
      >

        <div className="pp-container">

          <div className="pp-label">
            EVENTS / MISSIONS
          </div>


          <h2 className="pp-title">

            WHAT'S

            <br />

            <span>
              HAPPENING.
            </span>

          </h2>


          {events.length === 0 ? (

            <div className="pp-empty-box">

              NO PUBLISHED EVENTS YET.

            </div>

          ) : (

            <div className="pp-events-list">

              {events
                .slice(0, 4)
                .map((event) => (

                  <article
                    className="pp-event"
                    key={event._id}
                  >

                    <div className="pp-event-date">

                      <strong>
                        {
                          event.date ||
                          "--"
                        }
                      </strong>

                      <span>
                        EVENT DATE
                      </span>

                    </div>


                    <div className="pp-event-main">

                      <h3>
                        {event.name}
                      </h3>

                      <p>

                        {
                          event.location ||
                          event.description ||
                          "Academy event"
                        }

                      </p>

                    </div>


                    <div className="pp-event-status">

                      {
                        event.status ||
                        "UPCOMING"
                      }

                    </div>

                  </article>

                ))}

            </div>

          )}


          <div
            style={{
              marginTop: 22
            }}
          >

            <Link
              to="/events"
              className="pp-button-secondary"
            >
              VIEW ALL EVENTS →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          TEAM
          ===================================================== */}

      <section
        className="pp-section"
        id="team"
      >

        <div className="pp-container">

          <div className="pp-label">
            THE DIGITAL CREW
          </div>


          <h2 className="pp-title">

            THE

            <br />

            <span>
              CREW.
            </span>

          </h2>


          <p className="pp-description">

            Meet the people behind
            Pixel Pirates Academy.

          </p>


          {team.length === 0 ? (

            <div className="pp-empty-box">

              NO PUBLISHED TEAM PROFILES YET.

            </div>

          ) : (

            <div className="pp-team-grid">

              {team
                .slice(0, 4)
                .map((member) => (

                  <article
                    className="pp-team-card"
                    key={member._id}
                  >

                    <div
                      className="pp-team-photo"
                    >

                      {member.photo ? (

                        <img
                          src={member.photo}
                          alt={
                            member.name ||
                            "Team member"
                          }
                        />

                      ) : (

                        <div
                          className="pp-team-placeholder"
                        >

                          {
                            (
                              member.name ||
                              "PP"
                            )
                              .slice(0, 2)
                              .toUpperCase()
                          }

                        </div>

                      )}

                    </div>


                    <div
                      className="pp-team-info"
                    >

                      <div
                        className="pp-team-role"
                      >

                        {
                          member.role ||
                          "TEAM MEMBER"
                        }

                      </div>


                      <h3>
                        {member.name}
                      </h3>


                      <p>

                        {
                          member.branch ||
                          "Pixel Pirates Academy"
                        }

                      </p>

                    </div>

                  </article>

                ))}

            </div>

          )}


          <div
            style={{
              marginTop: 22
            }}
          >

            <Link
              to="/team"
              className="pp-button-secondary"
            >
              MEET THE TEAM →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          MEDIA LAB
          ===================================================== */}

      <section
        className="pp-section"
        id="media"
        style={{
          background:
            "#07090b"
        }}
      >

        <div className="pp-container">

          <div className="pp-label">
            MEDIA LAB
          </div>


          <h2 className="pp-title">

            SEE THE WORK.

            <br />

            <span>
              WATCH THE JOURNEY.
            </span>

          </h2>


          <p className="pp-description">

            Latest academy photos
            and videos from the admin
            media system.

          </p>


          <div className="pp-media-grid">


            {/* GALLERY */}

            <div className="pp-media-panel">

              <div className="pp-media-head">

                <strong>
                  GALLERY
                </strong>

                <span>
                  {
                    String(
                      gallery.length
                    ).padStart(
                      2,
                      "0"
                    )
                  }
                </span>

              </div>


              {gallery.length === 0 ? (

                <div
                  className="pp-empty-box"
                  style={{
                    margin: 9
                  }}
                >
                  NO PUBLISHED GALLERY
                  MEDIA YET.
                </div>

              ) : (

                <div className="pp-gallery">

                  {gallery
                    .slice(0, 5)
                    .map((item) => (

                      <Link
                        to="/gallery"
                        className="pp-gallery-item"
                        key={item._id}
                      >

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={
                              item.title ||
                              "Gallery image"
                            }
                          />

                        ) : (

                          <div
                            className="pp-placeholder"
                          >
                            MEDIA
                          </div>

                        )}


                        <div
                          className="pp-gallery-title"
                        >
                          {
                            item.title ||
                            "Gallery"
                          }
                        </div>

                      </Link>

                    ))}

                </div>

              )}


              <div
                style={{
                  padding:
                    "0 17px 17px"
                }}
              >

                <Link
                  to="/gallery"
                  className="pp-card-link"
                >
                  VIEW FULL GALLERY →
                </Link>

              </div>

            </div>


            {/* VIDEOS */}

            <div className="pp-media-panel">

              <div className="pp-media-head">

                <strong>
                  VIDEO LAB
                </strong>

                <span>
                  {
                    String(
                      videos.length
                    ).padStart(
                      2,
                      "0"
                    )
                  }
                </span>

              </div>


              {videos.length === 0 ? (

                <div
                  className="pp-empty-box"
                  style={{
                    margin: 9
                  }}
                >
                  NO PUBLISHED VIDEOS YET.
                </div>

              ) : (

                <div className="pp-video-grid">

                  <Link
                    to="/videos"
                    className="pp-feature-video"
                  >

                    {videos[0].thumbnail ? (

                      <img
                        src={
                          videos[0].thumbnail
                        }
                        alt={
                          videos[0].title ||
                          "Featured video"
                        }
                      />

                    ) : (

                      <div
                        className="pp-placeholder"
                        style={{
                          height:
                            "100%",
                          minHeight:
                            250,

                          display:
                            "grid",

                          placeItems:
                            "center"
                        }}
                      >
                        VIDEO
                      </div>

                    )}


                    <div className="pp-play">
                      ▶
                    </div>


                    <div className="pp-video-name">
                      {
                        videos[0].title ||
                        "Featured Video"
                      }
                    </div>

                  </Link>


                  <div
                    className="pp-video-side"
                  >

                    {videos
                      .slice(1, 4)
                      .map((video) => (

                        <Link
                          to="/videos"
                          className="pp-side-video"
                          key={video._id}
                        >

                          {video.thumbnail ? (

                            <img
                              src={
                                video.thumbnail
                              }
                              alt={
                                video.title ||
                                "Video"
                              }
                            />

                          ) : (

                            <div
                              className="pp-placeholder"
                              style={{
                                height:
                                  "100%",

                                display:
                                  "grid",

                                placeItems:
                                  "center",

                                fontSize:
                                  14
                              }}
                            >
                              VIDEO
                            </div>

                          )}


                          <div
                            className="pp-video-name"
                          >
                            {
                              video.title ||
                              "Video"
                            }
                          </div>

                        </Link>

                      ))}

                  </div>

                </div>

              )}


              <div
                style={{
                  padding:
                    "0 17px 17px"
                }}
              >

                <Link
                  to="/videos"
                  className="pp-card-link"
                >
                  VIEW VIDEO LAB →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}

      <section
        className="pp-final-cta"
        id="register"
      >

        <div className="pp-container">

          <div className="pp-label">
            ACCESS THE ACADEMY
          </div>


          <h2>

            READY TO

            <br />

            <span>
              BUILD?
            </span>

          </h2>


          <p>

            Start your journey into
            practical technology learning,
            projects, experimentation
            and showcasing.

          </p>


          <div className="pp-cta-buttons">

            <Link
              to="/register"
              className="pp-button-primary"
            >
              REGISTER NOW →
            </Link>


            <Link
              to="/courses"
              className="pp-button-secondary"
            >
              EXPLORE COURSES
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="pp-footer">

        <div className="pp-container">

          <div className="pp-footer-row">

            <div className="pp-footer-brand">

              <strong>
                PIXEL PIRATES ACADEMY
              </strong>

              <span>
                LEARN / BUILD /
                EXPERIMENT /
                COMPETE / SHOWCASE
              </span>

            </div>


            <div className="pp-footer-links">

              <Link to="/about">
                ABOUT
              </Link>

              <Link to="/courses">
                COURSES
              </Link>

              <Link to="/projects">
                PROJECTS
              </Link>

              <Link to="/achievements">
                ACHIEVEMENTS
              </Link>

              <Link to="/events">
                EVENTS
              </Link>

              <Link to="/gallery">
                GALLERY
              </Link>

              <Link to="/videos">
                VIDEOS
              </Link>

              <Link to="/team">
                TEAM
              </Link>

              <Link to="/register">
                REGISTER
              </Link>

            </div>

          </div>

        </div>

      </footer>

    </main>
  );
}

export default Home;
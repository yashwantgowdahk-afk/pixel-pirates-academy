import { useEffect, useState } from "react";

import API from "../../../api";

const configs = {
  projects: {
    endpoint: "projects",
    eyebrow: "PIXEL PIRATES / PROJECT LAB",
    title: "PROJECT",
    accent: "LAB.",
    description:
      "Explore projects built through experimentation, technology and practical learning.",
    name: (item) => item.title,
    category: (item) => item.category,
    text: (item) => item.description,
    tags: (item) => item.technologies || [],
  },

  achievements: {
    endpoint: "achievements",
    eyebrow: "PIXEL PIRATES / PROOF OF BUILDING",
    title: "PROOF OF",
    accent: "BUILDING.",
    description:
      "Achievements, competitions, milestones and moments that document the academy journey.",
    name: (item) => item.title,
    category: (item) => item.eventName || item.organization,
    text: (item) => item.description,
    tags: (item) => [
      item.studentOrTeam,
      item.organization,
    ].filter(Boolean),
  },

  events: {
    endpoint: "events",
    eyebrow: "PIXEL PIRATES / EVENTS",
    title: "ENTER THE",
    accent: "ARENA.",
    description:
      "Workshops, competitions, demonstrations and technology events.",
    name: (item) => item.name,
    category: (item) => item.status,
    text: (item) => item.description,
    tags: (item) => [
      item.date,
      item.location,
      item.organizer,
    ].filter(Boolean),
  },

  team: {
    endpoint: "team",
    eyebrow: "PIXEL PIRATES / DIGITAL CREW",
    title: "THE DIGITAL",
    accent: "CREW.",
    description:
      "Meet the people building, experimenting and growing Pixel Pirates Academy.",
    name: (item) => item.name,
    category: (item) => item.role,
    text: (item) => item.bio,
    tags: (item) => item.skills || [],
  },

  gallery: {
    endpoint: "gallery",
    eyebrow: "PIXEL PIRATES / MEDIA ARCHIVE",
    title: "VISUAL",
    accent: "ARCHIVE.",
    description:
      "Classes, workshops, projects, competitions and academy moments.",
    name: (item) => item.title,
    category: (item) => item.category,
    text: (item) => item.description,
    tags: (item) => [],
  },

  videos: {
    endpoint: "videos",
    eyebrow: "PIXEL PIRATES / MEDIA LAB",
    title: "WATCH THE",
    accent: "JOURNEY.",
    description:
      "Project demonstrations, workshops, tutorials and academy stories.",
    name: (item) => item.title,
    category: (item) => item.category,
    text: (item) => item.description,
    tags: (item) => [],
  },
};

function PublicCollection({ type }) {
  const config = configs[type];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(
          `${API}/${config.endpoint}`
        );

        const data = await response.json();

        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(
          `${type} loading error:`,
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, [config.endpoint, type]);

  return (
    <main className="public-collection-page">

      <section className="public-collection-hero">

        <p>{config.eyebrow}</p>

        <h1>
          {config.title}
          <br />
          <span>{config.accent}</span>
        </h1>

        <div className="public-collection-intro">
          {config.description}
        </div>

      </section>


      <section className="public-collection-content">

        <div className="public-collection-counter">
          <span>DATABASE / PUBLISHED</span>
          <strong>
            {String(items.length).padStart(2, "0")}
          </strong>
        </div>


        {loading && (
          <div className="collection-state">
            LOADING DATABASE...
          </div>
        )}


        {!loading && items.length === 0 && (
          <div className="collection-state">
            NO PUBLISHED RECORDS YET.
          </div>
        )}


        {!loading && items.length > 0 && (
          <div className="public-collection-grid">

            {items.map((item, index) => {

              const tags = config.tags(item);

              return (
                <article
                  className="public-collection-card"
                  key={item._id}
                >

                  <div className="collection-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {item.image && (
                    <div className="collection-card-image">
                      <img
                        src={item.image}
                        alt={config.name(item)}
                      />
                    </div>
                  )}

                  {item.photo && !item.image && (
                    <div className="collection-card-image">
                      <img
                        src={item.photo}
                        alt={config.name(item)}
                      />
                    </div>
                  )}

                  {item.thumbnail && !item.image && !item.photo && (
                    <div className="collection-card-image">
                      <img
                        src={item.thumbnail}
                        alt={config.name(item)}
                      />
                    </div>
                  )}

                  <p className="collection-card-category">
                    {config.category(item) || "ACADEMY"}
                  </p>

                  <h2>
                    {config.name(item)}
                  </h2>

                  <p className="collection-card-description">
                    {config.text(item) ||
                      "Pixel Pirates Academy record."}
                  </p>

                  {tags.length > 0 && (
                    <div className="collection-card-tags">
                      {tags.slice(0, 6).map(
                        (tag, tagIndex) => (
                          <span key={tagIndex}>
                            {typeof tag === "object"
                              ? tag.title
                              : tag}
                          </span>
                        )
                      )}
                    </div>
                  )}

                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GITHUB ↗
                    </a>
                  )}

                  {item.liveDemoUrl && (
                    <a
                      href={item.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LIVE DEMO ↗
                    </a>
                  )}

                </article>
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}

export default PublicCollection;
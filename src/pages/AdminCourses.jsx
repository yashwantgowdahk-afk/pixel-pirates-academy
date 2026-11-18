import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";

const emptyModule = () => ({
  title: "",
  description: "",
  order: 0,
  topics: [],
  objectives: [],
  activities: [],
  project: "",
  status: "draft",
});

const emptyCourse = () => ({
  title: "",
  slug: "",
  description: "",
  image: "",
  category: "",
  difficulty: "Beginner",
  duration: "",
  objectives: [],
  practicalActivities: [],
  resources: [],
  modules: [],
  status: "draft",
  order: 0,
});

function AdminCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyCourse());

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem(
    "pixelPiratesAdminToken"
  );

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
  `${API}/courses/admin/all`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load courses"
        );
      }

      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    loadCourses();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const createSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug:
        editingId
          ? current.slug
          : createSlug(value),
    }));
  };

  const addArrayItem = (field) => {
    setForm((current) => ({
      ...current,
      [field]: [
        ...current[field],
        "",
      ],
    }));
  };

  const updateArrayItem = (
    field,
    index,
    value
  ) => {
    setForm((current) => {
      const updated = [...current[field]];

      updated[index] = value;

      return {
        ...current,
        [field]: updated,
      };
    });
  };

  const removeArrayItem = (
    field,
    index
  ) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));
  };

  const addModule = () => {
    setForm((current) => ({
      ...current,
      modules: [
        ...current.modules,
        {
          ...emptyModule(),
          order: current.modules.length + 1,
        },
      ],
    }));
  };

  const updateModule = (
    moduleIndex,
    field,
    value
  ) => {
    setForm((current) => {
      const modules = [...current.modules];

      modules[moduleIndex] = {
        ...modules[moduleIndex],
        [field]: value,
      };

      return {
        ...current,
        modules,
      };
    });
  };

  const removeModule = (moduleIndex) => {
    setForm((current) => ({
      ...current,
      modules: current.modules.filter(
        (_, index) =>
          index !== moduleIndex
      ),
    }));
  };

  const addModuleTopic = (
    moduleIndex
  ) => {
    setForm((current) => {
      const modules = [...current.modules];

      modules[moduleIndex] = {
        ...modules[moduleIndex],
        topics: [
          ...modules[moduleIndex].topics,
          {
            title: "",
            description: "",
            order:
              modules[moduleIndex]
                .topics.length + 1,
          },
        ],
      };

      return {
        ...current,
        modules,
      };
    });
  };

  const updateModuleTopic = (
    moduleIndex,
    topicIndex,
    field,
    value
  ) => {
    setForm((current) => {
      const modules = [...current.modules];

      const topics = [
        ...modules[moduleIndex].topics,
      ];

      topics[topicIndex] = {
        ...topics[topicIndex],
        [field]: value,
      };

      modules[moduleIndex] = {
        ...modules[moduleIndex],
        topics,
      };

      return {
        ...current,
        modules,
      };
    });
  };

  const removeModuleTopic = (
    moduleIndex,
    topicIndex
  ) => {
    setForm((current) => {
      const modules = [...current.modules];

      modules[moduleIndex] = {
        ...modules[moduleIndex],
        topics:
          modules[moduleIndex].topics.filter(
            (_, index) =>
              index !== topicIndex
          ),
      };

      return {
        ...current,
        modules,
      };
    });
  };

  const resetForm = () => {
    setForm(emptyCourse());
    setEditingId(null);
    setMessage("");
    setError("");
  };

  const editCourse = (course) => {
    setForm({
      ...emptyCourse(),
      ...course,
      objectives:
        course.objectives || [],
      practicalActivities:
        course.practicalActivities || [],
      resources:
        course.resources || [],
      modules:
        course.modules || [],
    });

    setEditingId(course._id);

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const saveCourse = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Course title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const method = editingId
        ? "PUT"
        : "POST";

      const url = editingId
        ? `${API}/courses/${editingId}`
        : `${API}/courses`;

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to save course"
        );
      }

      setMessage(
        editingId
          ? "Course updated successfully."
          : "Course created successfully."
      );

      resetForm();

      await loadCourses();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const archiveCourse = async (id) => {
    const confirmed =
      window.confirm(
        "Archive this course?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `${API}/courses/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to archive course"
        );
      }

      setMessage(
        "Course archived successfully."
      );

      await loadCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  const moveCourse = async (
    course,
    direction
  ) => {
    const currentIndex =
      courses.findIndex(
        (item) =>
          item._id === course._id
      );

    if (currentIndex === -1) {
      return;
    }

    const targetIndex =
      direction === "up"
        ? currentIndex - 1
        : currentIndex + 1;

    if (
      targetIndex < 0 ||
      targetIndex >= courses.length
    ) {
      return;
    }

    const targetCourse =
      courses[targetIndex];

    try {
      setError("");

      await Promise.all([
        fetch(
          `${API}/courses/${course._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              order:
                targetCourse.order ?? targetIndex,
            }),
          }
        ),

        fetch(
          `${API}/courses/${targetCourse._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            body: JSON.stringify({
              order:
                course.order ?? currentIndex,
            }),
          }
        ),
      ]);

      await loadCourses();

      setMessage(
        "Course order updated."
      );
    } catch (err) {
      setError(
        "Unable to reorder courses."
      );
    }
  };

  return (
    <div className="admin-crud-page">

      <div className="admin-crud-topbar">

        <div>
          <span>
            PIXEL PIRATES / ADMIN
          </span>

          <h1>
            COURSE CONTROL
          </h1>
        </div>

        <button
          className="admin-back-button"
          onClick={() =>
            navigate("/admin")
          }
        >
          ← COMMAND CENTER
        </button>

      </div>


      <div className="admin-crud-layout">

        {/* FORM */}

        <section className="admin-editor-panel">

          <div className="admin-editor-heading">

            <div>
              <span>
                {editingId
                  ? "EDITING COURSE"
                  : "NEW COURSE"}
              </span>

              <h2>
                {editingId
                  ? "UPDATE MISSION"
                  : "CREATE MISSION"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="admin-cancel-button"
              >
                CANCEL
              </button>
            )}

          </div>


          {message && (
            <div className="admin-success-message">
              {message}
            </div>
          )}

          {error && (
            <div className="admin-error-message">
              {error}
            </div>
          )}


          <form onSubmit={saveCourse}>

            <div className="admin-form-grid">

              <label>
                COURSE TITLE

                <input
                  value={form.title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value
                    )
                  }
                  placeholder="Course title"
                  required
                />
              </label>


              <label>
                SLUG

                <input
                  value={form.slug}
                  onChange={(event) =>
                    updateField(
                      "slug",
                      event.target.value
                    )
                  }
                  placeholder="course-slug"
                />
              </label>


              <label>
                CATEGORY

                <input
                  value={form.category}
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value
                    )
                  }
                  placeholder="Technology category"
                />
              </label>


              <label>
                DIFFICULTY

                <select
                  value={form.difficulty}
                  onChange={(event) =>
                    updateField(
                      "difficulty",
                      event.target.value
                    )
                  }
                >
                  <option>
                    Beginner
                  </option>

                  <option>
                    Intermediate
                  </option>

                  <option>
                    Advanced
                  </option>
                </select>
              </label>


              <label>
                DURATION

                <input
                  value={form.duration}
                  onChange={(event) =>
                    updateField(
                      "duration",
                      event.target.value
                    )
                  }
                  placeholder="Example: 8 weeks"
                />
              </label>


              <label>
                DISPLAY ORDER

                <input
                  type="number"
                  value={form.order}
                  onChange={(event) =>
                    updateField(
                      "order",
                      Number(
                        event.target.value
                      )
                    )
                  }
                />
              </label>


              <label>
                STATUS

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value
                    )
                  }
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>

                  <option value="archived">
                    Archived
                  </option>
                </select>
              </label>


              <label>
                IMAGE URL

                <input
                  value={form.image}
                  onChange={(event) =>
                    updateField(
                      "image",
                      event.target.value
                    )
                  }
                  placeholder="Course image URL"
                />
              </label>

            </div>


            <label className="admin-full-field">
              DESCRIPTION

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                rows="5"
                placeholder="Course description"
              />
            </label>


            {/* OBJECTIVES */}

            <div className="admin-array-section">

              <div className="admin-array-heading">

                <div>
                  <span>
                    COURSE OBJECTIVES
                  </span>

                  <small>
                    Add learning objectives.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "objectives"
                    )
                  }
                >
                  + ADD
                </button>

              </div>

              {form.objectives.map(
                (item, index) => (
                  <div
                    className="admin-array-row"
                    key={`objective-${index}`}
                  >

                    <input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem(
                          "objectives",
                          index,
                          event.target.value
                        )
                      }
                      placeholder={`Objective ${
                        index + 1
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "objectives",
                          index
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>


            {/* ACTIVITIES */}

            <div className="admin-array-section">

              <div className="admin-array-heading">

                <div>
                  <span>
                    PRACTICAL ACTIVITIES
                  </span>

                  <small>
                    Hands-on activities for the course.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "practicalActivities"
                    )
                  }
                >
                  + ADD
                </button>

              </div>

              {form.practicalActivities.map(
                (item, index) => (
                  <div
                    className="admin-array-row"
                    key={`activity-${index}`}
                  >

                    <input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem(
                          "practicalActivities",
                          index,
                          event.target.value
                        )
                      }
                      placeholder={`Activity ${
                        index + 1
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "practicalActivities",
                          index
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>


            {/* RESOURCES */}

            <div className="admin-array-section">

              <div className="admin-array-heading">

                <div>
                  <span>
                    RESOURCES
                  </span>

                  <small>
                    Add links, references or resource names.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addArrayItem(
                      "resources"
                    )
                  }
                >
                  + ADD
                </button>

              </div>

              {form.resources.map(
                (item, index) => (
                  <div
                    className="admin-array-row"
                    key={`resource-${index}`}
                  >

                    <input
                      value={item}
                      onChange={(event) =>
                        updateArrayItem(
                          "resources",
                          index,
                          event.target.value
                        )
                      }
                      placeholder={`Resource ${
                        index + 1
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeArrayItem(
                          "resources",
                          index
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>


            {/* MODULES */}

            <div className="admin-array-section">

              <div className="admin-array-heading">

                <div>
                  <span>
                    MODULES / SYLLABUS
                  </span>

                  <small>
                    Build the course structure dynamically.
                  </small>
                </div>

                <button
                  type="button"
                  onClick={addModule}
                >
                  + ADD MODULE
                </button>

              </div>


              {form.modules.map(
                (module, moduleIndex) => (

                  <div
                    className="admin-module-editor"
                    key={`module-${moduleIndex}`}
                  >

                    <div className="admin-module-editor-top">

                      <strong>
                        MODULE{" "}
                        {moduleIndex + 1}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          removeModule(
                            moduleIndex
                          )
                        }
                      >
                        REMOVE
                      </button>

                    </div>


                    <div className="admin-form-grid">

                      <label>
                        MODULE TITLE

                        <input
                          value={module.title}
                          onChange={(event) =>
                            updateModule(
                              moduleIndex,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder="Module title"
                        />
                      </label>


                      <label>
                        MODULE ORDER

                        <input
                          type="number"
                          value={
                            module.order
                          }
                          onChange={(event) =>
                            updateModule(
                              moduleIndex,
                              "order",
                              Number(
                                event.target.value
                              )
                            )
                          }
                        />
                      </label>


                      <label>
                        MODULE STATUS

                        <select
                          value={
                            module.status
                          }
                          onChange={(event) =>
                            updateModule(
                              moduleIndex,
                              "status",
                              event.target.value
                            )
                          }
                        >
                          <option value="draft">
                            Draft
                          </option>

                          <option value="published">
                            Published
                          </option>

                          <option value="archived">
                            Archived
                          </option>
                        </select>
                      </label>

                    </div>


                    <label className="admin-full-field">
                      MODULE DESCRIPTION

                      <textarea
                        value={
                          module.description
                        }
                        onChange={(event) =>
                          updateModule(
                            moduleIndex,
                            "description",
                            event.target.value
                          )
                        }
                        rows="3"
                        placeholder="Module description"
                      />
                    </label>


                    {/* TOPICS */}

                    <div className="admin-subsection">

                      <div className="admin-array-heading">

                        <div>
                          <span>
                            TOPICS
                          </span>

                          <small>
                            Module topics.
                          </small>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            addModuleTopic(
                              moduleIndex
                            )
                          }
                        >
                          + ADD TOPIC
                        </button>

                      </div>


                      {module.topics.map(
                        (
                          topic,
                          topicIndex
                        ) => (

                          <div
                            className="admin-topic-editor"
                            key={`topic-${topicIndex}`}
                          >

                            <div className="admin-topic-number">
                              {topicIndex + 1}
                            </div>

                            <div>

                              <input
                                value={
                                  topic.title
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateModuleTopic(
                                    moduleIndex,
                                    topicIndex,
                                    "title",
                                    event.target
                                      .value
                                  )
                                }
                                placeholder="Topic title"
                              />

                              <textarea
                                value={
                                  topic.description
                                }
                                onChange={(
                                  event
                                ) =>
                                  updateModuleTopic(
                                    moduleIndex,
                                    topicIndex,
                                    "description",
                                    event.target
                                      .value
                                  )
                                }
                                rows="2"
                                placeholder="Topic description"
                              />

                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeModuleTopic(
                                  moduleIndex,
                                  topicIndex
                                )
                              }
                            >
                              ×
                            </button>

                          </div>

                        )
                      )}

                    </div>


                    {/* MODULE OBJECTIVES */}

                    <div className="admin-subsection">

                      <div className="admin-array-heading">

                        <div>
                          <span>
                            MODULE OBJECTIVES
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [
                              ...module.objectives,
                              "",
                            ];

                            updateModule(
                              moduleIndex,
                              "objectives",
                              updated
                            );
                          }}
                        >
                          + ADD
                        </button>

                      </div>


                      {module.objectives.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            className="admin-array-row"
                            key={`module-objective-${index}`}
                          >

                            <input
                              value={item}
                              onChange={(
                                event
                              ) => {
                                const updated = [
                                  ...module.objectives,
                                ];

                                updated[index] =
                                  event.target.value;

                                updateModule(
                                  moduleIndex,
                                  "objectives",
                                  updated
                                );
                              }}
                              placeholder="Module objective"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const updated =
                                  module.objectives.filter(
                                    (
                                      _,
                                      itemIndex
                                    ) =>
                                      itemIndex !==
                                      index
                                  );

                                updateModule(
                                  moduleIndex,
                                  "objectives",
                                  updated
                                );
                              }}
                            >
                              ×
                            </button>

                          </div>

                        )
                      )}

                    </div>


                    {/* MODULE ACTIVITIES */}

                    <div className="admin-subsection">

                      <div className="admin-array-heading">

                        <div>
                          <span>
                            MODULE ACTIVITIES
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [
                              ...module.activities,
                              "",
                            ];

                            updateModule(
                              moduleIndex,
                              "activities",
                              updated
                            );
                          }}
                        >
                          + ADD
                        </button>

                      </div>


                      {module.activities.map(
                        (
                          item,
                          index
                        ) => (

                          <div
                            className="admin-array-row"
                            key={`module-activity-${index}`}
                          >

                            <input
                              value={item}
                              onChange={(
                                event
                              ) => {
                                const updated = [
                                  ...module.activities,
                                ];

                                updated[index] =
                                  event.target.value;

                                updateModule(
                                  moduleIndex,
                                  "activities",
                                  updated
                                );
                              }}
                              placeholder="Module activity"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const updated =
                                  module.activities.filter(
                                    (
                                      _,
                                      itemIndex
                                    ) =>
                                      itemIndex !==
                                      index
                                  );

                                updateModule(
                                  moduleIndex,
                                  "activities",
                                  updated
                                );
                              }}
                            >
                              ×
                            </button>

                          </div>

                        )
                      )}

                    </div>


                    <label className="admin-full-field">
                      MODULE PROJECT

                      <input
                        value={
                          module.project
                        }
                        onChange={(event) =>
                          updateModule(
                            moduleIndex,
                            "project",
                            event.target.value
                          )
                        }
                        placeholder="Module project"
                      />
                    </label>

                  </div>

                )
              )}

            </div>


            <button
              type="submit"
              disabled={saving}
              className="admin-save-button"
            >
              {saving
                ? "SAVING..."
                : editingId
                ? "UPDATE COURSE"
                : "CREATE COURSE"}

              <span>
                →
              </span>
            </button>

          </form>

        </section>


        {/* COURSE LIST */}

        <section className="admin-course-list">

          <div className="admin-editor-heading">

            <div>
              <span>
                DATABASE / COURSES
              </span>

              <h2>
                COURSE RECORDS
              </h2>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="admin-new-button"
            >
              + NEW COURSE
            </button>

          </div>


          {loading ? (
            <div className="admin-loading-box">
              LOADING COURSE DATABASE...
            </div>
          ) : courses.length === 0 ? (
            <div className="admin-loading-box">
              NO COURSES CREATED YET.
              <br />
              CREATE YOUR FIRST COURSE.
            </div>
          ) : (
            <div className="admin-course-records">

              {courses.map(
                (course, index) => (

                  <article
                    className="admin-course-record"
                    key={course._id}
                  >

                    <div className="admin-course-record-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>


                    <div className="admin-course-record-main">

                      <div className="admin-course-record-top">

                        <span>
                          {course.category ||
                            "COURSE"}
                        </span>

                        <span
                          className={`course-status-${course.status}`}
                        >
                          {course.status}
                        </span>

                      </div>


                      <h3>
                        {course.title}
                      </h3>


                      <p>
                        {course.description ||
                          "No description added."}
                      </p>


                      <div className="admin-course-meta">

                        <span>
                          {course.difficulty}
                        </span>

                        <span>
                          {course.duration ||
                            "NO DURATION"}
                        </span>

                        <span>
                          MODULES{" "}
                          {
                            course.modules
                              ?.length || 0
                          }
                        </span>

                      </div>

                    </div>


                    <div className="admin-course-actions">

                      <button
                        type="button"
                        onClick={() =>
                          moveCourse(
                            course,
                            "up"
                          )
                        }
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          moveCourse(
                            course,
                            "down"
                          )
                        }
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          editCourse(course)
                        }
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          archiveCourse(
                            course._id
                          )
                        }
                      >
                        ARCHIVE
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>
          )}

        </section>

      </div>

    </div>
  );
}

export default AdminCourses;
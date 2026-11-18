import { useEffect, useState } from "react";

const API = "http://10.190.128.140:5000/api";

function Register() {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);

  const selectedCourse =
    new URLSearchParams(window.location.search).get("course") || "";

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    schoolOrCollege: "",
    classOrYear: "",
    phone: "",
    email: "",
    course: selectedCourse,
    previousProgrammingExperience: "",
    batch: "",
    parentGuardianName: "",
    parentGuardianPhone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch(`${API}/courses`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (err) {
        console.error("Courses loading error:", err);
      } finally {
        setLoadingCourses(false);
      }
    }

    loadCourses();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`${API}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit registration"
        );
      }

      setSuccess(
        "Registration submitted successfully."
      );

      setForm({
        fullName: "",
        age: "",
        schoolOrCollege: "",
        classOrYear: "",
        phone: "",
        email: "",
        course: selectedCourse,
        previousProgrammingExperience: "",
        batch: "",
        parentGuardianName: "",
        parentGuardianPhone: "",
        message: "",
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="register-page">

      <section className="register-hero">
        <p>PIXEL PIRATES ACADEMY / ACCESS PORTAL</p>

        <h1>
          START YOUR
          <br />
          <span>JOURNEY.</span>
        </h1>

        <p>
          Learn. Build. Experiment. Compete. Showcase.
        </p>
      </section>

      <section className="register-workspace">

        <div className="register-side-panel">
          <p>ACADEMY APPLICATION</p>

          <h2>
            ENTER THE
            <br />
            <span>MISSION.</span>
          </h2>

          <p>
            Tell us about yourself and the technology
            you want to explore.
          </p>
        </div>

        <div className="register-form-panel">

          {success && (
            <div className="register-success">
              {success}
            </div>
          )}

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="register-field-grid">

              <div className="register-field">
                <label>FULL NAME</label>

                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="register-field">
                <label>AGE</label>

                <input
                  name="age"
                  type="number"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Your age"
                />
              </div>

            </div>

            <div className="register-field-grid">

              <div className="register-field">
                <label>EMAIL</label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="register-field">
                <label>PHONE</label>

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </div>

            </div>

            <div className="register-field-grid">

              <div className="register-field">
                <label>SCHOOL / COLLEGE</label>

                <input
                  name="schoolOrCollege"
                  type="text"
                  value={form.schoolOrCollege}
                  onChange={handleChange}
                  placeholder="Institution"
                />
              </div>

              <div className="register-field">
                <label>CLASS / YEAR</label>

                <input
                  name="classOrYear"
                  type="text"
                  value={form.classOrYear}
                  onChange={handleChange}
                  placeholder="Example: 1st Year"
                />
              </div>

            </div>

            <div className="register-field-grid">

              <div className="register-field">
                <label>COURSE</label>

                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    {loadingCourses
                      ? "Loading courses..."
                      : "Select course"}
                  </option>

                  {courses.map((course) => (
                    <option
                      key={course._id}
                      value={course.title}
                    >
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="register-field">
                <label>BATCH</label>

                <input
                  name="batch"
                  type="text"
                  value={form.batch}
                  onChange={handleChange}
                  placeholder="Preferred batch"
                />
              </div>

            </div>

            <div className="register-field">

              <label>PREVIOUS EXPERIENCE</label>

              <textarea
                name="previousProgrammingExperience"
                value={form.previousProgrammingExperience}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us about your previous experience..."
              />

            </div>

            <div className="register-field-grid">

              <div className="register-field">
                <label>GUARDIAN NAME</label>

                <input
                  name="parentGuardianName"
                  type="text"
                  value={form.parentGuardianName}
                  onChange={handleChange}
                  placeholder="Parent / guardian"
                />
              </div>

              <div className="register-field">
                <label>GUARDIAN PHONE</label>

                <input
                  name="parentGuardianPhone"
                  type="tel"
                  value={form.parentGuardianPhone}
                  onChange={handleChange}
                  placeholder="Guardian phone"
                />
              </div>

            </div>

            <div className="register-field">

              <label>WHAT DO YOU WANT TO BUILD?</label>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us what you want to learn or build..."
              />

            </div>

            <button
              type="submit"
              disabled={submitting}
              className="register-submit"
            >
              {submitting
                ? "SUBMITTING..."
                : "SUBMIT APPLICATION →"}
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Register;
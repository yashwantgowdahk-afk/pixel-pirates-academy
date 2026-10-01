import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Videos from "./pages/Videos";
import Register from "./pages/Register";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourses from "./pages/AdminCourses";
import AdminProjects from "./pages/AdminProjects";
import AdminAchievements from "./pages/AdminAchievements";
import AdminEvents from "./pages/AdminEvents";
import AdminTeam from "./pages/AdminTeam";
import AdminGallery from "./pages/AdminGallery";
import AdminVideos from "./pages/AdminVideos";
import AdminRegistrations from "./pages/AdminRegistrations";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("pixelPiratesAdminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function PublicLayout() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute>
            <AdminCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <AdminProjects />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/achievements"
        element={
          <ProtectedRoute>
            <AdminAchievements />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <AdminEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/team"
        element={
          <ProtectedRoute>
            <AdminTeam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <AdminGallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/videos"
        element={
          <ProtectedRoute>
            <AdminVideos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/registrations"
        element={
          <ProtectedRoute>
            <AdminRegistrations />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return <AdminRoutes />;
  }

  return <PublicLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
import { lazy } from "react";
import { Navigate } from "react-router-dom";


const FullLayout = lazy(() => import("./layouts/FullLayout/FullLayout.js"));
const PastQuestionForm = lazy(() => import("./pages/dashboard/studentDashboard/PastQuestionForm.jsx"));
const PastQuestions = lazy(() => import("./pages/dashboard/studentDashboard/PastQuestions.jsx"));
const SearchPage = lazy(() => import("./pages/StudentShare/SearchPage.jsx"));
const ChatPage = lazy(() => import("./pages/StudentShare/ChatPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/auth/Login.jsx"));
const RegistrationPage = lazy(() => import("./pages/auth/RegistrationPage.jsx"));
const StudentTable = lazy(() => import("./pages/dashboard/studentDashboard/StudentTable.jsx"));
const CourseTable = lazy(() => import("./pages/dashboard/studentDashboard/CourseTable.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.js"));
const Dashboard = lazy(() => import("./pages/dashboard/studentDashboard/Dashboard.jsx"));
const LecturerDashboard = lazy(() => import("./pages/dashboard/LecturerDashboard/LecturerDashboard.jsx"));
const AddCourse = lazy(() => import("./pages/dashboard/LecturerDashboard/AddCourse.jsx"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/chat/:email", element: <ChatPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/studentTable", element: <StudentTable /> },
      { path: "/courseTable", element: <CourseTable /> },
      { path: "/add-course", element: <AddCourse /> },
      { path: "/register", element: <RegistrationPage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/add-pastquestion", element: <PastQuestionForm /> },
      { path: "/pastquestion", element: <PastQuestions /> },
      { path: "/lecturer-dashboard", element: <LecturerDashboard /> },
    ],
  },
];
export default ThemeRoutes;

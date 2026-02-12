import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { Login } from "./features/auth/Login";
import { IssueDashboard } from "./features/issues/IssueDashboard";
import { useAuthStore } from "./features/auth/useAuthStore";
import { Register } from "./features/auth/Register";

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={token ? <IssueDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
      {/* Configuration for Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Router>
  );
}

export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { IssueDashboard } from "./features/issues/IssueDashboard";
// // import { Toaster } from "@/components/ui/toaster"; // For notifications

// const Layout = ({ children }: { children: React.ReactNode }) => (
//   <div className="min-h-screen bg-slate-50/50">
//     <nav className="border-b bg-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <span className="text-xl font-bold text-primary">IssueTracker.io</span>
//         <div className="flex gap-4 items-center">
//           <span className="text-sm text-muted-foreground">
//             Associate Engineer
//           </span>
//         </div>
//       </div>
//     </nav>
//     <main className="container mx-auto py-8">{children}</main>
//   </div>
// );

// function App() {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />

//           <Route path="/dashboard" element={<IssueDashboard />} />

//           {/* We will add /login and /register here next */}
//         </Routes>
//       </Layout>
//       {/* <Toaster /> Bonus: For success/error feedback */}
//     </Router>
//   );
// }

// export default App;

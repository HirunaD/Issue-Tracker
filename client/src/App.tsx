import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { IssueDashboard } from './features/issues/IssueDashboard';
// import { Toaster } from "@/components/ui/toaster"; // For notifications

// A simple Layout component for professional spacing
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50/50">
    <nav className="border-b bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-xl font-bold text-primary">IssueTracker.io</span>
        {/* Placeholder for Auth Navigation */}
        <div className="flex gap-4 items-center">
          <span className="text-sm text-muted-foreground">Associate Engineer</span>
        </div>
      </div>
    </nav>
    <main className="container mx-auto py-8">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default Route redirects to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* The Issue Management Hub [cite: 8] */}
          <Route path="/dashboard" element={<IssueDashboard />} />
          
          {/* We will add /login and /register here next */}
        </Routes>
      </Layout>
      {/* <Toaster /> Bonus: For success/error feedback */}
    </Router>
  );
}

export default App;
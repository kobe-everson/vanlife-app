import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      {/* Header: */}
      <header className="bg-gray-300 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Vanlio</h1>
            <nav className="space-x-4">
              <Link
                to="/login"
                className="text-gray-900 px-4 py-2 rounded-md hover:bg-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-900 px-4 py-2 rounded-md hover:bg-blue-600 font-medium"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>
      {/* Main content: */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">{children}</div>
      </main>
      {/* Footer: */}
      <footer className="bg-gray-300 border-t">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center gray-900 text-sm">
            © 2026 Vanlio. Take freedom by the balls.
          </p>
        </div>
      </footer>
    </div>
  );
}

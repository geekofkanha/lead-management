import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import {
  DashboardIcon,
  LogoutIcon,
  UserCircleIcon,
  CogIcon,
} from "../components/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-8 h-8 rounded-lg flex items-center justify-center">
                <DashboardIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  LeadManager
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Sales Dashboard</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/")
                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <DashboardIcon className="w-4 h-4" />
                <span>Overview</span>
              </Link>

              {/* User Menu */}
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <UserCircleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Admin</span>
                </button>

                <button className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <CogIcon className="w-5 h-5" />
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                >
                  <LogoutIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-6 h-6 rounded flex items-center justify-center">
                <DashboardIcon className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                LeadManager
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

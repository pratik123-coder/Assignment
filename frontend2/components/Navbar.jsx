
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
  // Retrieve user from local storage
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const { logout } = useLogout();
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-orange-400">Froker</Link>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={user.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to='/write' className="justify-between">
                  Write Blog
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li>
                <button
                  onClick={logout}
                  className="btn btn-secondary"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/signup" className="btn btn-ghost">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

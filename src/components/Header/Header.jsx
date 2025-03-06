import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  console.log(authStatus); // ✅ Corrected Debug Log

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-4 bg-gray-700 shadow-md text-white">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div>
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 hover:bg-gray-600 rounded transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button for Authenticated Users */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;

import { NavLinks } from "../lib/constants";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-700">
      <div className="flex h-screen items-center px-4 py-16 text-white">
        <ul className="flex w-full flex-col items-center justify-center gap-8">
          {NavLinks.map(({ href, label, icon: Icon }) => (
            <li key={href} className="">
              <Link
                to={href}
                className="flex items-center justify-center rounded-full border border-gray-600 p-2"
              >
                <span className="sr-only">{label}</span>
                <Icon className="h-9 w-9 text-blue-500" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

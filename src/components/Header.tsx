import UserButton from "./UserButton";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const Header = () => {
  return (
    <header className="flex justify-between bg-gray-600 px-16 py-2">
      <h1 className="text-center text-2xl font-bold lowercase">Bubblio</h1>
      <div className="flex items-center gap-2">
        <UserButton />
        <button
          onClick={() => signOut(auth)}
          className="rounded-md bg-blue-300 p-2 text-sm"
        >
          Sign out
        </button>
      </div>
    </header>
  );
};

export default Header;

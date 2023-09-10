import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

const UserButton = () => {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="flex items-center">
      <img
        src={user.photoURL || "/hacker.png"}
        alt="User avatar"
        className="mr-2 h-10 w-10 rounded-full"
      />
      <span>{user.displayName}</span>
    </div>
  );
};

export default UserButton;

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
        className="h-8 w-8 rounded-full"
      />
      <span className="sr-only">{user.displayName}</span>
    </div>
  );
};

export default UserButton;

import { AuthStatus, avatars } from "../lib/constants";

import { selectAuthStatus, selectUser } from "../features/User/userSlice";
import { useAppSelector } from "../lib/hooks";
import { Link } from "react-router-dom";

const UserButton = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const currentUser = useAppSelector(selectUser);

  if (authStatus !== AuthStatus.SignedIn) return null;

  return (
    <Link to="/profile" className="flex items-center">
      <img
        src={avatars[currentUser!.avatarId]}
        alt={currentUser!.name}
        className="h-9 w-9 rounded-full"
      />
      <span className="sr-only">{currentUser!.name}</span>
    </Link>
  );
};

export default UserButton;

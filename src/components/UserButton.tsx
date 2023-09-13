import { AuthStatus, avatars } from "../lib/constants";

import { selectAuthStatus, selectUser } from "../features/User/userSlice";
import { useAppSelector } from "../lib/hooks";

const UserButton = () => {
  const authStatus = useAppSelector(selectAuthStatus);
  const currentUser = useAppSelector(selectUser);

  if (authStatus !== AuthStatus.SignedIn) return null;

  return (
    <div className="flex items-center">
      <img
        src={avatars[currentUser!.avatarId]}
        alt={currentUser!.name}
        className="h-9 w-9 rounded-full"
      />
      <span className="sr-only">{currentUser!.name}</span>
    </div>
  );
};

export default UserButton;

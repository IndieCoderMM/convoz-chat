import { auth } from "../lib/firebase";
import { avatars } from "../lib/constants";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { queryUserById } from "../lib/actions";
import { UserInterface } from "../common.types";

const UserButton = () => {
  if (!auth.currentUser) return null;

  const [docArray, loading] = useCollectionData(
    queryUserById(auth.currentUser!.uid),
  );

  if (loading) return null;

  const user = docArray?.[0] as UserInterface;

  console.log(user);
  return (
    <div className="flex items-center">
      <img
        src={avatars[user?.avatarId]}
        alt="User avatar"
        className="h-9 w-9 rounded-full"
      />
      <span className="sr-only">{user?.name}</span>
    </div>
  );
};

export default UserButton;

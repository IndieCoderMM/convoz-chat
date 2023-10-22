import { signInWithPopup } from "firebase/auth";
import { auth, provider, usersRef } from "../lib/firebase";
import { UserInterface } from "../common.types";
import { addDoc } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { queryAllUsers } from "../lib/firestore-utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignInButton = () => {
  const [users] = useCollectionDataOnce(queryAllUsers());
  const navigate = useNavigate();
  const existingUser = (currentUserId: string | undefined) =>
    users?.some((user) => user.id === currentUserId);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);

      if (!existingUser(auth.currentUser?.uid)) {
        // Add user to firestore if they don't exist
        const user: UserInterface = {
          id: auth.currentUser!.uid,
          name: auth.currentUser!.displayName!,
          email: auth.currentUser!.email!,
          bio: "",
          role: "user",
          avatarId: 0,
          createdAt: Date.now(),
          channels: [],
        };

        await addDoc(usersRef, user);
      }

      navigate("/");
      toast.success("Signed in successfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      type="button"
      className="cursor-pointer rounded-full bg-white px-8 py-4 text-xl hover:opacity-80"
      onClick={signIn}
    >
      Sign in
    </button>
  );
};

export default SignInButton;

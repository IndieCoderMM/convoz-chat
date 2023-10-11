import { signInWithPopup } from "firebase/auth";
import { auth, provider, usersRef } from "../lib/firebase";
import { UserInterface } from "../common.types";
import { addDoc } from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { queryAllUsers } from "../lib/firestore-utils";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../lib/hooks";
import { selectUser } from "../features/User/userSlice";
import { useEffect } from "react";

const SignIn = () => {
  const [users] = useCollectionDataOnce(queryAllUsers());
  const currentUser = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // navigatate back one page or home page
      navigate("/");
    }
  }, [currentUser, navigate]);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);

      if (users?.some((user) => user.id === auth.currentUser!.uid)) return;

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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="grid min-h-screen place-items-center">
      <button
        type="button"
        className="bg-blue-500 p-2 text-white"
        onClick={signIn}
      >
        Sign in
      </button>
    </section>
  );
};

export default SignIn;

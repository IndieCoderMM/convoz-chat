import { signInWithPopup } from "firebase/auth";
import { auth, provider, usersRef } from "../lib/firebase";
import { UserInterface } from "../common.types";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getDocIfExists, mapDocumentDataToUser } from "../lib/firestore-utils";
import { useAppDispatch } from "../lib/hooks";
import { setUser } from "../features/User/userSlice";

const SignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signIn = async () => {
    try {
      const resp = await signInWithPopup(auth, provider);

      if (!resp.user) {
        throw new Error("Something went wrong");
      }

      const { data, exists } = await getDocIfExists(usersRef, resp.user.uid);

      if (!exists || !data) {
        // Add user to firestore if they don't exist
        const currentUser = resp.user;
        const user: UserInterface = {
          id: currentUser!.uid,
          name: currentUser!.displayName!,
          email: currentUser!.email!,
          bio: "",
          role: "user",
          avatarId: 0,
          createdAt: Date.now(),
          channels: [],
        };

        // await addDoc(usersRef, user);
        await setDoc(doc(usersRef, user.id), user);

        dispatch(setUser(user));
        toast.success("Account created successfully");
      } else {
        const currentUser = mapDocumentDataToUser(data);
        dispatch(setUser(currentUser));
        toast.success("Signed in successfully");
      }

      navigate("/");
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

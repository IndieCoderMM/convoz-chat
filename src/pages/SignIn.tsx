import { signInWithPopup } from "firebase/auth";
import { auth, provider, usersRef } from "../lib/firebase";
import { UserInterface } from "../common.types";
import { addDoc } from "firebase/firestore";

const SignIn = () => {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log(auth.currentUser);

      const user: UserInterface = {
        id: auth.currentUser!.uid,
        name: auth.currentUser!.displayName!,
        email: auth.currentUser!.email!,
        bio: "",
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

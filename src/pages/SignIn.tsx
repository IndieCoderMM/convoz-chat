import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";

const SignIn = () => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
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

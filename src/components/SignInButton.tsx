import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../lib/firebase';

const SignInButton = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <button
      type="button"
      className="cursor-pointer rounded-full bg-white px-8 py-4 text-xl hover:opacity-80"
      onClick={() => signInWithGoogle()}
    >
      Sign in
    </button>
  );
};

export default SignInButton;

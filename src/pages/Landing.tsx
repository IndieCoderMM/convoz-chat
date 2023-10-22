import SignInButton from "../components/SignInButton";
import HeroBackground from "../assets/img/hero.png";
import { useAppSelector } from "../lib/hooks";
import { selectAuthStatus } from "../features/User/userSlice";
import { AuthStatus } from "../lib/constants";
import UserButton from "../components/UserButton";

const LandingPage = () => {
  const authStatus = useAppSelector(selectAuthStatus);

  return (
    <div>
      <header className="relative flex min-h-screen w-full flex-col bg-primary">
        <img
          src={HeroBackground}
          alt="hero"
          className="absolute inset-0 h-full w-auto object-contain"
        />
        <nav className="relative flex items-center justify-between px-4 py-2 sm:px-16 sm:py-4">
          <h1 className="text-4xl font-bold text-white">Convoz</h1>
          {authStatus === AuthStatus.SignedIn ? (
            <UserButton />
          ) : (
            <SignInButton />
          )}
        </nav>
        <div className="max-container relative flex-1 pt-16 ">
          <section className="flex w-full max-w-5xl flex-col">
            <h2 className="text-center text-[60px] font-bold uppercase text-white">
              Imagine a place ...
            </h2>
            <p className="text-center text-2xl text-white">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
              <button className="rounded-full bg-white px-8 py-4 text-xl font-bold text-primary">
                Download for Windows
              </button>
              <button className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-xl font-bold text-white">
                Open in your browser
              </button>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;

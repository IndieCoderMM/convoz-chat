import { useState } from "react";

import ChangeAvatar from "../features/User/ChangeAvatar";
import { selectUser } from "../features/User/userSlice";
import { avatars } from "../lib/constants";
import { useAppSelector } from "../lib/store";

const Profile = () => {
  const currentUser = useAppSelector(selectUser);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  return (
    <section className="px-16 py-8">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
        My Account
      </h1>
      <div className="w-full max-w-5xl space-y-4 rounded-md bg-dark-800 p-2 lg:rounded-xl lg:p-4">
        <header className="overflow-hidden rounded-md bg-indigo-500 lg:rounded-xl">
          <div className="h-40" />
          <div className="relative flex items-center justify-between bg-dark-700 p-2">
            <img
              src={avatars[currentUser?.avatarId ?? 0]}
              alt={currentUser?.name}
              className="absolute -top-10 h-24 w-24 rounded-full border border-white bg-dark-700 p-2"
            />
            <div className="ml-24 flex items-center p-4">
              <h2 className="text-2xl font-bold">{currentUser?.name}</h2>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => setOpenAvatarModal(true)}
            >
              Change Avatar
            </button>
          </div>
        </header>
        <div className="flex items-center justify-between pt-4">
          <h3 className="text-xl font-bold">Account Details</h3>
          <button type="button" className="btn">
            Edit
          </button>
        </div>
        <main className="rounded-md bg-dark-700 p-4 lg:rounded-xl">
          <div className="flex items-center justify-between p-1">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold">Username</h4>
              <p className="text-sm text-gray-400">{currentUser?.name}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-1">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold">Email</h4>
              <p className="text-sm text-gray-400">{currentUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-1">
            <div className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold">About Me</h4>
              <p className="text-sm text-gray-400">
                {currentUser?.bio.length === 0
                  ? "No information yet"
                  : currentUser?.bio}
              </p>
            </div>
          </div>
        </main>
      </div>
      {openAvatarModal && (
        <ChangeAvatar close={() => setOpenAvatarModal(false)} />
      )}
    </section>
  );
};

export default Profile;

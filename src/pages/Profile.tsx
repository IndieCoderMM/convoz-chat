import { useAppSelector } from "../lib/hooks";
import { selectUser } from "../features/User/userSlice";
import { avatars } from "../lib/constants";
import { useState } from "react";
import ChangeAvatar from "../features/User/ChangeAvatar";

const Profile = () => {
  const currentUser = useAppSelector(selectUser);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  return (
    <section className="p-2">
      <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
        My Account
      </h1>
      <div className="w-full max-w-5xl space-y-4 rounded-md bg-dark-800 p-2 lg:rounded-xl lg:p-4">
        <header className="overflow-hidden rounded-md bg-indigo-500 lg:rounded-xl">
          <div className="h-40" />
          <div className="relative flex items-center justify-between bg-dark-700 p-2">
            <div className="flex items-center">
              <img
                src={avatars[currentUser?.avatarId || 0]}
                alt=""
                className="h-24 w-24 rounded-full bg-dark-700 p-2"
              />
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
              <h4 className="text-lg font-semibold">Bio</h4>
              <p className="text-sm text-gray-400">
                {currentUser?.bio || "No information yet"}
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

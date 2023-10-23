import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

import { avatars } from '../../lib/constants';
import { usersRef } from '../../lib/firebase';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { cn } from '../../lib/tailwind-utils';
import { selectUser, updateAvatar } from './userSlice';

const ChangeAvatar = ({ close }: { close: () => void }) => {
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  if (!currentUser) return null;

  const handleSelect = (id: number) => {
    if (id === currentUser.avatarId) return;
    setSelectedAvatar(id);
  };

  const handleSave = async () => {
    if (
      !currentUser ||
      selectedAvatar === null ||
      selectedAvatar === currentUser.avatarId
    )
      return;

    dispatch(updateAvatar(selectedAvatar));

    try {
      await updateDoc(doc(usersRef, currentUser.id), {
        avatarId: selectedAvatar,
      });
      toast.success("Avatar updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update avatar");
    } finally {
      close();
    }
  };

  const AvatarList = avatars.map((avatar, id) => (
    <button key={avatar} type="button" onClick={() => handleSelect(id)}>
      <img
        src={avatar}
        alt="avatar"
        width={80}
        height={80}
        className={cn(
          "rounded-full",
          id === currentUser.avatarId
            ? "ring-4 ring-white"
            : "hover:ring-4 hover:ring-yellow-500",
          id === selectedAvatar && "ring-4 ring-yellow-500",
        )}
      />
    </button>
  ));

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black/60 backdrop-blur-md">
      <div className="relative left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-2 overflow-hidden rounded-md bg-dark-700 text-white">
        <header className="my-4 p-4">
          <h1 className="text-xl font-bold">Change Profile Avatar</h1>
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={() => close()}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </header>
        <ul className="flex flex-wrap items-center gap-4 p-4">{AvatarList}</ul>
        <div className="flex justify-end bg-dark-300 p-4">
          <button type="button" className="submit" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;

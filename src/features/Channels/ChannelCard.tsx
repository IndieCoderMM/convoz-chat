import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { HiUsers } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import { CheckBadge } from '../../assets/icons';
import { ChannelInterface } from '../../common.types';
import Tooltip from '../../components/Tooltip';
import { channelsRef } from '../../lib/firebase';
import { useAppSelector } from '../../lib/hooks';
import { selectUser } from '../User/userSlice';

const ChannelCard = (props: ChannelInterface) => {
  const currentUser = useAppSelector(selectUser);
  const { id, name, description, type, members } = props;
  const navigate = useNavigate();

  const isMember = currentUser && members.includes(currentUser.id);
  const isCreator = currentUser && currentUser.id === props.createdBy;

  const handleJoin = async () => {
    if (!currentUser || isMember) return;

    const channelRef = doc(channelsRef, id);
    try {
      await updateDoc(channelRef, {
        members: [...members, currentUser.id],
      });
      navigate(`/chat/channels/${id}`);
      toast.success("Joined channel successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to join channel");
    }
  };

  const handleDelete = async () => {
    if (!currentUser || !isCreator) return;

    const channelRef = doc(channelsRef, id);
    try {
      await deleteDoc(channelRef);
      toast.success("Deleted channel successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete channel");
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-dark-800">
      <div className="flex h-[200px] w-full items-center justify-center overflow-hidden bg-indigo-500">
        {/* <img
          src={ShapesBanner}
          alt="banner"
          className="h-auto w-full object-cover"
        /> */}
      </div>
      <div className="flex h-full flex-col gap-2 p-4 lg:py-8">
        <header className="flex items-center gap-1">
          <div className="group relative h-6 w-6">
            <img src={CheckBadge} alt="check badge" className="h-6 w-6" />
            <Tooltip
              text="Verified"
              position="bottom"
              variant="light"
              size="sm"
            />
          </div>
          <h2 className="text-lg font-medium capitalize sm:text-xl">
            {name.replace(/-/g, " ")}
          </h2>
          <span className="ml-auto text-sm capitalize text-gray-400">
            #{type}
          </span>
        </header>
        <p className="text-sm leading-relaxed text-gray-200">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <HiUsers size={20} />
            <span className="ml-2 text-sm text-gray-400">
              {members.length}
              {members.length === 1 ? " member" : " members"}
            </span>
          </div>
          {!isMember && (
            <button
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:brightness-110 lg:text-lg "
              type="button"
              onClick={handleJoin}
            >
              Join
            </button>
          )}
          {isCreator && (
            <button
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:brightness-110 lg:text-lg "
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;

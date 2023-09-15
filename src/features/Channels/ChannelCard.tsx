import { CheckBadge } from "../../assets/icons";
import { ShapesBanner } from "../../assets/img";
import { ChannelInterface } from "../../common.types";
import { useAppSelector } from "../../lib/hooks";
import { doc, updateDoc } from "firebase/firestore";
import { selectUser } from "../User/userSlice";
import { db } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const ChannelCard = (props: ChannelInterface) => {
  const currentUser = useAppSelector(selectUser);
  const { id, path, name, description, type, members } = props;
  const navigate = useNavigate();

  const isMember = currentUser && members.includes(currentUser.id);

  const handleJoin = async () => {
    if (!currentUser || isMember) return;

    const channelRef = doc(db, `channels`, path || "");

    await updateDoc(channelRef, {
      members: [...members, currentUser.id],
    });

    navigate(`/chat/channels/${id}`);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-dark-800">
      <div className="flex h-[200px] w-full items-center justify-center overflow-hidden">
        <img
          src={ShapesBanner}
          alt="banner"
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="flex h-full flex-col gap-2 p-4 lg:py-8">
        <header className="flex items-center gap-1">
          <img src={CheckBadge} alt="check badge" className="h-6 w-6" />
          <h2 className="text-lg font-medium capitalize sm:text-xl">
            {name.replace(/-/g, " ")}
          </h2>
          <span className="ml-auto text-sm capitalize text-gray-400">
            #{type}
          </span>
        </header>
        <p className="leading-relaxed text-gray-200">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-gray-400">
              {members.length}+ Members
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
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;

import { FaGithub, FaSignOutAlt, FaUsers } from "react-icons/fa";

import Tooltip from "../../components/Tooltip";

import type { Channel } from "../../schema";
import { useAppSelector } from "../../lib/store";
import { selectUser } from "../User/userSlice";
import { leaveChannel } from "../Channels/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = ({ channel }: { channel: Channel }) => {
  const currentUser = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleLeave = async () => {
    if (!currentUser) return;
    try {
      await leaveChannel(channel, currentUser.id);
      toast.success(`You have left #${channel.name}`, { icon: "👋" });
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to leave channel");
    }
  };

  return (
    <nav className="flex items-center justify-start border-b border-dark-800 p-2">
      <div className="flex flex-shrink-0">
        <span className="mr-1 font-bold text-dark-100">#</span>
        <p>{channel.name.toLowerCase()}</p>
      </div>

      <div className="mx-4 w-[1px] self-stretch bg-white/50" />
      <button
        type="button"
        className="group relative flex items-center justify-center gap-1 rounded-md p-2 text-sm text-white transition hover:bg-dark-300"
      >
        <FaUsers size={20} />
        <span className="font-bold">{channel.members.length}</span>
        <span className="text-xs text-gray-400">
          {channel.members.length === 1 ? "member" : "members"}
        </span>
        <Tooltip
          text="View Members"
          position="bottom"
          variant="dark"
          size="sm"
        />
      </button>
      <div className="flex w-full items-center justify-end">
        <button
          type="button"
          onClick={handleLeave}
          aria-label="Leave Channel"
          className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300"
        >
          <Tooltip
            text="Leave Channel"
            position="bottom"
            variant="dark"
            size="sm"
          />
          <FaSignOutAlt size={20} />
        </button>
        <div className="mx-2 w-[1px] self-stretch bg-white/50" />
        <a
          href="https://github.com/IndieCoderMM/convoz-chat"
          target="_blank"
          rel="noreferrer"
          className="group relative rounded-md p-2 text-sm text-white transition hover:bg-dark-300"
        >
          <Tooltip
            text="View Source"
            position="bottom"
            variant="dark"
            size="sm"
          />
          <FaGithub size={20} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

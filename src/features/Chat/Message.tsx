import dayjs from "dayjs";
import Relativetime from "dayjs/plugin/relativeTime";
import { BiUser } from "react-icons/bi";

import { avatars } from "../../lib/constants";

import type { Message } from "../../schema";
dayjs.extend(Relativetime);

const ChatMessage = (props: Message) => {
  const { text, createdAt, author } = props;

  return (
    <div className="flex w-full items-start gap-2">
      <div className="relative flex h-12 w-12 flex-shrink-0 items-center rounded-full bg-dark-800">
        <BiUser
          size={30}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400"
        />
        <img
          src={avatars[author?.avatarId ?? 0]}
          alt={author?.name}
          className="relative h-12 w-12 rounded-full"
        />
      </div>
      <div className="flex max-w-[60%] flex-col">
        <header className="flex items-baseline">
          <h3 className="text-lg font-medium text-indigo-400">
            {author?.name}
          </h3>
          <time className="ml-4 text-xs">{dayjs(createdAt).fromNow()}</time>
        </header>
        <p>{text}</p>
      </div>
    </div>
  );
};

export const ChatMessageSkeleton = () => {
  return (
    <div className="flex w-full items-start gap-2 ">
      <div className="h-12 w-12 animate-pulse rounded-full bg-dark-300" />
      <div className="flex flex-col space-y-1">
        <div className="h-[2ch] w-[12ch] animate-pulse rounded bg-dark-300" />
        <div className="h-[1ch] w-[20ch] animate-pulse rounded-sm bg-dark-200" />
        <div className="h-[1ch] w-[40ch] animate-pulse rounded-sm bg-dark-200" />
      </div>
    </div>
  );
};

export default ChatMessage;

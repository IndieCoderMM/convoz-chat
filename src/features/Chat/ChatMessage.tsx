import dayjs from 'dayjs';
import Relativetime from 'dayjs/plugin/relativeTime';
import { BiUser } from 'react-icons/bi';

import { avatars } from '../../lib/constants';

import type { MessageInterface } from "../../common.types";
dayjs.extend(Relativetime);

const ChatMessage = (props: MessageInterface) => {
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

export default ChatMessage;

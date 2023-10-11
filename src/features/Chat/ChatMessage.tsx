import { MessageInterface } from "../../common.types";
import { avatars } from "../../lib/constants";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { queryUserById } from "../../lib/firestore-utils";
import formatTimestamp from "../../lib/formatTimestamp";

const ChatMessage = (props: MessageInterface) => {
  const { text: message, createdAt: timestamp, createdBy: userId } = props;
  const [userDoc, loading] = useCollectionData(queryUserById(userId));
  if (loading) return null;

  const user = userDoc![0];

  return (
    <div className="flex w-full items-start gap-2">
      <div className="flex flex-shrink-0 items-center">
        <img
          src={avatars[user.avatarId]}
          alt={user.name}
          className="h-12 w-12 rounded-full"
        />
      </div>
      <div className="flex max-w-[60%] flex-col">
        <header className="flex items-baseline">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <time className="ml-4 text-xs">{formatTimestamp(timestamp)}</time>
        </header>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

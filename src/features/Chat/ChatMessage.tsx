import { MessageInterface } from "../../common.types";
import { avatars } from "../../lib/constants";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { queryUserById } from "../../lib/utils";

const ChatMessage = (props: MessageInterface) => {
  const { text: message, createdAt: timestamp, createdBy: userId } = props;
  const [userDoc, loading] = useCollectionData(queryUserById(userId));
  if (loading) return null;

  const user = userDoc![0];

  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-shrink-0 items-center">
        <img
          src={avatars[0]}
          alt="User avatar"
          className="h-12 w-12 rounded-full"
        />
        <span className="sr-only">{user.name}</span>
      </div>
      <div className="flex flex-col">
        <header className="flex flex-col justify-between">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <time>{timestamp}</time>
        </header>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

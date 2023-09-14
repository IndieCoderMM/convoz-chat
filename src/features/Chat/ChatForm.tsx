import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { MessageInterface } from "../../common.types";
import { addDoc } from "firebase/firestore";
import { messagesRef } from "../../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { mapDocumentDataToChannel, queryChannelById } from "../../lib/utils";
import { useAppSelector } from "../../lib/hooks";
import { selectUser } from "../User/userSlice";

type Props = {
  channelId: string;
};

const ChatForm = ({ channelId }: Props) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const currentUser = useAppSelector(selectUser);

  const [docArray] = useCollectionData(queryChannelById(channelId));
  const channel = mapDocumentDataToChannel(docArray?.[0]);

  const isDisabled =
    channel.type === "announcement" && currentUser?.role !== "admin";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageValue = messageRef.current?.value.trim();

    if (messageValue?.length === 0) return;

    const message: MessageInterface = {
      id: uuid(),
      channelId: channelId,
      createdBy: currentUser!.id,
      createdAt: Date.now(),
      text: messageValue!,
    };

    try {
      await addDoc(messagesRef, message);
      messageRef.current!.value = "";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-2 p-2"
      onSubmit={handleSubmit}
    >
      <input
        ref={messageRef}
        type="text"
        className="w-full rounded-md bg-dark-500 px-8 py-4 text-lg"
        placeholder={
          isDisabled
            ? "You cannot send messages to this channel"
            : "Type your message here"
        }
        disabled={isDisabled}
        maxLength={200}
      />
      <button
        className="min-w-[150px] rounded-md bg-primary p-4 font-medium text-white brightness-110 transition disabled:opacity-50"
        type="submit"
        disabled={isDisabled}
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;

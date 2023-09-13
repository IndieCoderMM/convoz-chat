import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { MessageInterface } from "../../common.types";
import { addDoc } from "firebase/firestore";
import { messagesRef } from "../../lib/firebase";

type Props = {
  channelId: string;
  userId: string;
};

const ChatForm = ({ channelId, userId }: Props) => {
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageValue = messageRef.current?.value.trim();

    if (messageValue?.length === 0) return;

    const message: MessageInterface = {
      id: uuid(),
      channelId: channelId,
      createdBy: userId,
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
        placeholder="Type a message"
        maxLength={200}
      />
      <button
        className="min-w-[150px] rounded-md bg-primary p-4 font-medium text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;

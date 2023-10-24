import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

import { channelsRef } from "../../lib/firebase";
import { useAppSelector } from "../../lib/store";
import { getChannelById } from "../Channels/channelsSlice";
import { selectUser } from "../User/userSlice";

import type { Message } from "../../schema";

type Props = {
  channelId: string;
};

const ChatForm = ({ channelId }: Props) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const currentUser = useAppSelector(selectUser);

  const channel = useAppSelector((state) => getChannelById(state, channelId));

  const isDisabled =
    !channel ||
    (channel.type === "announcement" && currentUser?.role !== "admin");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser || !channel) return;

    const messageValue = messageRef.current?.value.trim();

    if (messageValue?.length === 0) return;

    const message: Message = {
      id: uuid(),
      channelId,
      createdBy: currentUser.id,
      author: currentUser,
      createdAt: Date.now(),
      text: messageValue!,
    };

    try {
      await updateDoc(doc(channelsRef, channel.id), {
        messages: [...channel.messages, message],
      });
      messageRef.current!.value = "";
    } catch (err) {
      toast.error("Failed to send message");
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

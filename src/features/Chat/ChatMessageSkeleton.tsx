const ChatMessageSkeleton = () => {
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

export default ChatMessageSkeleton;

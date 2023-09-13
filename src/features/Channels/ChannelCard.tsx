import { ChannelInterface } from "../../common.types";

const ChannelCard = (props: ChannelInterface) => {
  const { name, description, type } = props;
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-1"></div>
      <h2 className="text-2xl font-semibold capitalize">
        {name.replace(/-/g, " ")}
      </h2>
      <p>{description}</p>
      <p>{type}</p>
    </div>
  );
};

export default ChannelCard;

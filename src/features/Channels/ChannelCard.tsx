import { ChannelInterface } from "../../common.types";

const ChannelCard = (props: ChannelInterface) => {
  const { id, name, description, type } = props;
  return (
    <div
      key={id}
      className="col-span-12 flex min-h-[200px] items-center justify-center rounded-md bg-dark-800 text-white sm:col-span-6 md:col-span-4"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-1"></div>
        <h2 className="text-2xl font-semibold capitalize">
          {name.replace(/-/g, " ")}
        </h2>
        <p>{description}</p>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default ChannelCard;

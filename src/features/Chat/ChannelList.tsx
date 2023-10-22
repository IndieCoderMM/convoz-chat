import { Link, useLocation } from "react-router-dom";
import { ChannelInterface, ChannelType } from "../../common.types";
import { cn } from "../../lib/tailwind-utils";
import { ChannelIcons } from "../../lib/constants";

type Props = {
  heading: string;
  channels: ChannelInterface[];
};

const Icon = ({ type }: { type: ChannelType }) => {
  if (!ChannelIcons[type]) return null;

  const Icon = ChannelIcons[type];
  return <Icon size={20} />;
};

const ChannelList = ({ heading, channels }: Props) => {
  const { pathname } = useLocation();
  const href = (id: string) => `/chat/channels/${id}`;

  return (
    <section className="p-4">
      <h2 className="text-xl font-medium capitalize">{heading}</h2>
      <ul className="flex flex-col gap-0.5 py-2">
        {channels.map(({ id, name, type }) => (
          <li
            key={id}
            className={cn(
              `cursor-pointer rounded transition-all hover:bg-gray-400/10`,
              pathname === href(id) ? "bg-gray-400/10" : "text-gray-300",
            )}
          >
            <Link to={href(id)} className="flex items-center gap-3 p-2 ">
              <Icon type={type} />
              <span>{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChannelList;

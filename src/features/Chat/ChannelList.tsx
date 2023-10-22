import { Link, useLocation } from "react-router-dom";
import { ChannelInterface, ChannelType } from "../../common.types";
import { cn } from "../../lib/tailwind-utils";
import { ChannelIcons } from "../../lib/constants";
import { BiChevronDown } from "react-icons/bi";

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
    <section className="">
      <header className="flex items-center px-2 pt-8">
        <BiChevronDown size={20} />
        <h2 className="text-light text-sm font-medium uppercase">{heading}</h2>
      </header>
      <ul className="flex flex-col gap-0.5 px-4 py-2">
        {channels.map(({ id, name, type }) => (
          <li
            key={id}
            className={cn(
              `cursor-pointer rounded transition-all hover:bg-gray-400/10 hover:text-white`,
              pathname === href(id)
                ? "bg-gray-400/10 text-white"
                : "text-gray-300",
            )}
          >
            <Link to={href(id)} className="flex items-center gap-3 p-2">
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

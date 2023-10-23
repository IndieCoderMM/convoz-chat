import { BiChevronDown } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

import { ChannelIcons } from '../../lib/constants';
import { cn } from '../../lib/tailwind-utils';

import type { ChannelInterface, ChannelType } from "../../common.types";

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
        <h2 className="text-sm font-medium uppercase text-light">{heading}</h2>
      </header>
      {channels.length === 0 && (
        <div className="w-full pl-8 pt-2">
          <p className="text-sm text-dark-200">No channels yet</p>
        </div>
      )}
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

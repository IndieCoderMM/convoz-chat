import { Link } from 'react-router-dom';

import { selectUser } from '../features/User/userSlice';
import { avatars } from '../lib/constants';
import { useAppSelector } from '../lib/store';

const UserButton = () => {
  const currentUser = useAppSelector(selectUser);

  return (
    <Link to="/profile" className="flex items-center">
      <img
        src={avatars[currentUser!.avatarId]}
        alt={currentUser!.name}
        className="h-9 w-9 rounded-full"
      />
      <span className="sr-only">{currentUser!.name}</span>
    </Link>
  );
};

export default UserButton;

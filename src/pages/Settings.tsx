import React from 'react';

import ToggleButton from '../components/ToggleButton';

interface SettingGroupProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

interface SettingProps {
  title: string;
  description: string;
}

const SettingGroup = ({ title, description, children }: SettingGroupProps) => {
  return (
    <div className="mb-4 overflow-hidden bg-dark-700 px-3 py-4 text-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-xl font-semibold leading-6 ">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-light">{description}</p>
      </div>
      <div className=" px-4 py-5 sm:p-0">
        <div className="divide-y divide-light">{children}</div>
      </div>
      <button
        className="rounded-md bg-primary px-4 py-3 text-center text-lg font-semibold text-white"
        disabled
      >
        Save Changes
      </button>
    </div>
  );
};

const Setting = ({ title, description }: SettingProps) => {
  return (
    <div className="flex items-start justify-between p-3 sm:px-6 sm:py-5">
      <div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="mt-1 text-sm text-light sm:col-span-2 sm:mt-0">
          {description}
        </p>
      </div>
      <ToggleButton />
    </div>
  );
};

const Settings = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-2xl font-bold">Alerts &amp; Notifications</h2>
      <SettingGroup
        title="Email Notifications"
        description="You can set up email notifications for certain events."
      >
        <Setting
          title="Platform Updates"
          description="Get notified when a new update is available."
        />
        <Setting
          title="New Members"
          description="Get notified when a new user joins"
        />
        <Setting
          title="New Messages"
          description="Get notified when a new message is received"
        />
        <Setting
          title="New Mentions"
          description="Get notified when you are mentioned in a message"
        />
      </SettingGroup>

      <h2 className="mb-4 text-2xl font-bold">Privacy</h2>
      <SettingGroup
        title="Privacy Settings"
        description="These settings control who can see your profile and messages."
      >
        <Setting
          title="Public Profile"
          description="Anyone can see your profile and messages"
        />
        <Setting
          title="Friends Only"
          description="Only your friends can see your profile and messages"
        />
        <Setting
          title="Private"
          description="Only you can see your profile and messages"
        />
      </SettingGroup>
    </div>
  );
};

export default Settings;

import React, { useState } from "react";
import CustomSelect from "../../components/CustomSelect";
import { useAppSelector } from "../../lib/store";
import { selectUser } from "../User/userSlice";
import { createChannel, editChannel } from "./utils";
import toast from "react-hot-toast";

import type { Channel } from "../../schema";

interface ChannelFormProps {
  onSuccess?: () => void;
  initialValues?: Channel;
}

type ChannelFormValues = Pick<Channel, "name" | "description" | "type">;

const ChannelForm: React.FC<ChannelFormProps> = ({
  onSuccess,
  initialValues,
}) => {
  const [form, setForm] = useState<ChannelFormValues>({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    type: initialValues?.type ?? "public",
  });
  const currentUser = useAppSelector(selectUser);

  const handleCreate = async ({
    name,
    description,
    type,
  }: ChannelFormValues) => {
    const newChannel = {
      name,
      description,
      type,
      createdBy: currentUser!.id,
    };

    try {
      await createChannel(newChannel);
      toast.success(`Created #${name}`, { icon: "🎉" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create channel", { icon: "☹️" });
    }
  };

  const handleEdit = async ({ name, description, type }: ChannelFormValues) => {
    if (!initialValues?.id) return;
    try {
      const newChannel = {
        ...initialValues,
        name,
        description,
        type,
      };

      await editChannel(newChannel);
      toast.success(`Channel updated`, { icon: "🎉" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to update channel", { icon: "☹️" });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;

    const name = form.name.trim().toLowerCase().replace(/\s+/g, "-");
    const description = form.description.trim();
    const type = form.type;

    if (initialValues?.id) {
      await handleEdit({ name, description, type });
    } else {
      await handleCreate({ name, description, type });
    }
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-2 ">
      <div className="flex flex-col gap-1 p-4">
        <label htmlFor="channel-name" className="label">
          Channel Name
        </label>
        <input
          type="text"
          id="channel-name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <label htmlFor="channel-description" className="label">
          Channel Description
        </label>
        <input
          type="text"
          id="channel-description"
          className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <CustomSelect
        label="Channel Type"
        id="channel-type"
        options={[
          { value: "public", label: "Public" },
          { value: "private", label: "Private" },
          ...(currentUser?.role === "admin"
            ? [
                { value: "static", label: "Static" },
                { value: "announcements", label: "Announcements" },
              ]
            : []),
        ]}
        value={form.type}
        setValue={(value: string) =>
          setForm({ ...form, type: value as "public" | "private" })
        }
      />
      <div className="flex justify-end bg-dark-300 p-4">
        <button type="submit" className="submit">
          {initialValues?.id ? "Save" : "Create"} Channel
        </button>
      </div>
    </form>
  );
};

export default ChannelForm;

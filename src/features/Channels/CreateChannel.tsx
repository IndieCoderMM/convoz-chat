import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

import CustomSelect from "../../components/CustomSelect";
import { useAppSelector } from "../../lib/store";
import { selectUser } from "../User/userSlice";
import { createChannel } from "./utils";

type Props = {
  close: () => void;
};

type FormData = {
  name: string;
  description: string;
  type: "public" | "private";
};

const CreateChannel = ({ close }: Props) => {
  const currentUser = useAppSelector(selectUser);

  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    type: "public",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const name = form.name.trim().toLowerCase().replace(/\s+/g, "-");
    const description = form.description.trim();

    const newChannel = {
      name,
      description,
      type: form.type,
      createdBy: currentUser.id,
    };

    try {
      await createChannel(newChannel);
      toast.success(`Channel ${name} created`, { icon: "🎉" });
      close();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create channel", { icon: "☹️" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black/60 backdrop-blur-md">
      <form
        onSubmit={handleSubmit}
        className="relative left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-2 overflow-hidden rounded-md bg-dark-700 text-white"
      >
        <header className="my-4 p-4">
          <h1 className="text-xl font-bold">Create a new channel</h1>
          <button
            type="button"
            className="absolute right-4 top-4"
            onClick={() => close()}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </header>
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
          ]}
          value={form.type}
          setValue={(value: string) =>
            setForm({ ...form, type: value as "public" | "private" })
          }
        />
        <div className="flex justify-end bg-dark-300 p-4">
          <button type="submit" className="submit">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel;

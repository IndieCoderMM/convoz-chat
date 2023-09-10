import { FaTimes } from "react-icons/fa";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { auth, channelsRef } from "../lib/firebase";
import { v4 as uuidv4 } from "uuid";

type Props = {
  close: () => void;
};

const CreateChannel = ({ close }: Props) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "public",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = form.name.trim().toLowerCase().replace(/\s+/g, "-");
    const description = form.description.trim();

    if (!name || !description) return;
    try {
      await addDoc(channelsRef, {
        id: uuidv4(),
        name,
        description,
        type: form.type,
        createdBy: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        members: [auth.currentUser?.uid],
      });
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 bg-black/80">
      <form
        onSubmit={handleSubmit}
        className="relative left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-2 overflow-hidden rounded-md bg-white text-black"
      >
        <h1 className="mb-4 p-4 text-xl font-bold">Create a new channel</h1>
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={() => close()}
        >
          <FaTimes className="h-6 w-6" />
        </button>
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
          setValue={(value) => setForm({ ...form, type: value })}
        />
        <div className="flex justify-end bg-gray-300 p-4">
          <button type="submit" className="submit">
            Create Channel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChannel;

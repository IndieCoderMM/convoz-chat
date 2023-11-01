import CustomSelect from "../../components/CustomSelect";
import { useAppSelector } from "../../lib/store";
import { selectUser } from "../User/userSlice";
import { createChannel, editChannel } from "./utils";
import toast from "react-hot-toast";

import { ChannelSchema, type Channel } from "../../schema";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";
import { getAllChannels } from "./channelsSlice";

interface ChannelFormProps {
  onSuccess?: () => void;
  initialValues?: Channel;
}

const ChannelFormValues = ChannelSchema.pick({
  name: true,
  description: true,
  type: true,
});

type ChannelFormValues = z.infer<typeof ChannelFormValues>;

const ChannelForm: React.FC<ChannelFormProps> = ({
  onSuccess,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ChannelFormValues>({
    resolver: zodResolver(ChannelFormValues),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      type: initialValues?.type ?? "public",
    },
  });
  const currentUser = useAppSelector(selectUser);

  // Get all the channel from the store
  const existingChannels = useAppSelector(getAllChannels);

  const handleCreate = async ({
    name,
    description,
    type,
  }: ChannelFormValues): Promise<boolean> => {
    if (!currentUser) return false;

    const newChannel = {
      name: name.toLowerCase().split(" ").join("-"),
      description,
      type,
      createdBy: currentUser.id,
    };

    try {
      // Check if the new name channel overlaps with any name channels in the array
      if (
        existingChannels.some((channel) => channel.name === newChannel.name)
      ) {
        // If there is a match, display a toast message to let the user know
        toast.error("Sorry! Name is already taken", { icon: "☹️" });
        return false;
      }
      await createChannel(newChannel);
      toast.success(`Congrats! Your channel is live`, { icon: "🎉" });
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong", { icon: "☹️" });
    }
    return false;
  };

  const handleEdit = async ({
    name,
    description,
    type,
  }: ChannelFormValues): Promise<boolean> => {
    if (!initialValues?.id) return false;
    try {
      const newChannel = {
        ...initialValues,
        name: name.toLowerCase().split(" ").join("-"),
        description,
        type,
      };

      // Check if the new channel name matches any channel name in the array
      if (
        existingChannels.some((channel) => channel.name === newChannel.name)
      ) {
        // If there is a match, display a toast message to let the user know
        toast.error("Sorry! Name is already taken", { icon: "☹️" });
        return false;
      }

      await editChannel(newChannel);
      toast.success(`Great! Your channel is updated`, { icon: "🎉" });

      return true;
    } catch (err) {
      console.error(err);
      if (err instanceof Error) toast.error(err.message, { icon: "☹️" });
      else toast.error("Oops! Something went wrong", { icon: "☹️" });
    }

    return false;
  };

  const onSubmit: SubmitHandler<ChannelFormValues> = async (data) => {
    let status = false;
    if (initialValues?.id) {
      status = await handleEdit(data);
    } else {
      status = await handleCreate(data);
    }

    if (status) onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-2 ">
      <div className="flex flex-col p-4">
        <label htmlFor="channel-name" className="label mb-1">
          Channel Name
        </label>
        <input type="text" className="input" {...register("name")} />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col p-4">
        <label htmlFor="channel-description" className="label mb-1">
          Channel Description
        </label>
        <input type="text" className="input" {...register("description")} />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <Controller
        name="type"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
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
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <div className="flex justify-end bg-dark-300 p-4">
        <button type="submit" className="submit" disabled={isSubmitting}>
          {initialValues?.id ? "Save" : "Create"} Channel
        </button>
      </div>
    </form>
  );
};

export default ChannelForm;

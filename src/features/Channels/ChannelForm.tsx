import React from "react";
import CustomSelect from "../../components/CustomSelect";
import { useAppSelector } from "../../lib/store";
import { selectUser } from "../User/userSlice";
import { createChannel, editChannel } from "./utils";
import toast from "react-hot-toast";

import { ChannelSchema, type Channel } from "../../schema";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";

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

  const handleCreate = async ({
    name,
    description,
    type,
  }: ChannelFormValues) => {
    if (!currentUser) return;

    const newChannel = {
      name: name.toLowerCase().split(" ").join("-"),
      description,
      type,
      createdBy: currentUser.id,
    };

    try {
      await createChannel(newChannel);
      toast.success(`Congrats! Your channel is live`, { icon: "🎉" });
    } catch (err) {
      console.error(err);
      toast.error("Oops! Something went wrong", { icon: "☹️" });
    }
  };

  const handleEdit = async ({ name, description, type }: ChannelFormValues) => {
    if (!initialValues?.id) return;
    try {
      const newChannel = {
        ...initialValues,
        name: name.toLowerCase().split(" ").join("-"),
        description,
        type,
      };

      await editChannel(newChannel);
      toast.success(`Great! Your channel is updated`, { icon: "🎉" });
    } catch (err) {
      console.error(err);
      if (err instanceof Error) toast.error(err.message, { icon: "☹️" });
      else toast.error("Oops! Something went wrong", { icon: "☹️" });
    }
  };

  const onSubmit: SubmitHandler<ChannelFormValues> = async (data) => {
    if (initialValues?.id) {
      await handleEdit(data);
    } else {
      await handleCreate(data);
    }
    onSuccess?.();
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

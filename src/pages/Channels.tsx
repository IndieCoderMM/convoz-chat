import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateChannel from "../components/CreateChannel";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, channelsRef } from "../lib/firebase";
import { query, where } from "firebase/firestore";

const Channels = () => {
  const [openForm, setOpenForm] = useState(false);
  const queryString = query(
    channelsRef,
    where("members", "array-contains", auth.currentUser?.uid),
  );
  const [value, loading, error] = useCollectionData(queryString);
  console.log(value);

  return (
    <section className="space-y-8 px-16 py-8">
      <h1 className="text-xl font-bold">Channels</h1>
      <p>
        Channels are where your members communicate. They&apos;re best when
        organized around a topic — #webdev, for example.
      </p>
      <div className="grid w-full grid-cols-12 gap-4">
        <div className="col-span-12 flex min-h-[300px] flex-col items-center justify-center rounded-md bg-gray-500/70 text-white sm:col-span-6 md:col-span-4">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 p-2"
            onClick={() => setOpenForm(true)}
          >
            <FaPlus className="h-6 w-6" />
          </button>
          <span>Create a channel</span>
        </div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {value &&
          value.map(({ id, name, description, type }) => (
            <div
              key={id}
              className="col-span-12 flex min-h-[200px] items-center justify-center rounded-md bg-gray-700/70 text-white sm:col-span-6 md:col-span-4"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 p-1"></div>
                <h2 className="text-2xl font-semibold capitalize">
                  {name.replace(/-/g, " ")}
                </h2>
                <p>{description}</p>
                <p>{type}</p>
              </div>
            </div>
          ))}
      </div>
      {openForm && <CreateChannel close={() => setOpenForm(false)} />}
    </section>
  );
};

export default Channels;

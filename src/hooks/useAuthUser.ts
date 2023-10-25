import Auth from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import { auth, usersRef } from "../lib/firebase";
import { getDocIfExists, mapDocToUser } from "../lib/firestore-utils";
import { User, UserSchema } from "../schema";

import type { CollectionReference } from "firebase/firestore";

const useAuthUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      setData(null);
    }

    if (!user || data) {
      return;
    }

    getDocIfExists(usersRef, user.uid)
      .then(async ({ exists, data: userData }) => {
        if (!exists) {
          // Create new user in firestore
          const newUser = await createNewUser(usersRef, user);
          setData(newUser);
          toast.success("New account created");
        } else {
          if (!userData) {
            throw new Error("User data not found");
          }
          setData(mapDocToUser(userData));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user data");
      });
  }, [user, data]);

  const createNewUser = async (ref: CollectionReference, user: Auth.User) => {
    const docRef = doc(ref, user.uid);
    const newUser = UserSchema.parse({
      id: user.uid,
      name: user.displayName!,
      email: user.email!,
      bio: "",
      role: "user",
      avatarId: 0,
      createdAt: Date.now(),
      channels: [],
    });
    await setDoc(docRef, newUser);

    return newUser;
  };

  return { user, data, loading, error };
};

export default useAuthUser;

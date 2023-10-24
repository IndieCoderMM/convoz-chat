import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

import { auth, usersRef } from "../lib/firebase";
import { mapDocToUser } from "../lib/firestore-utils";

import type { User } from "../schema";
import type { DocumentReference } from "firebase/firestore";
import type { User } from "firebase/auth";

const useAuthUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    if (!user && data) {
      setData(null);
    }

    if (!user) {
      return;
    }

    const userRef = doc(usersRef, user.uid);
    getDoc(userRef)
      .then(async (snap) => {
        if (!snap.exists()) {
          // Create new user in firestore
          const newUser = await createNewUser(userRef, user);
          setData(newUser);
          toast.success("New account created");
        } else {
          setData(mapDocToUser(snap.data()));
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error fetching user data");
      });
  }, [user, data]);

  const createNewUser = async (ref: DocumentReference, user: User) => {
    const newUser: User = {
      id: user.uid,
      name: user.displayName!,
      email: user.email!,
      bio: "",
      role: "user",
      avatarId: 0,
      createdAt: Date.now(),
      channels: [],
    };
    await setDoc(ref, newUser);

    return newUser;
  };

  return { user, data, loading, error };
};

export default useAuthUser;

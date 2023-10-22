import { useAppDispatch } from "../lib/hooks";
import { auth, usersRef } from "../lib/firebase";
import { useEffect } from "react";
import { getDocIfExists, mapDocumentDataToUser } from "../lib/firestore-utils";
import { setUser } from "../features/User/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";

const Auth = () => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storeUserData = async () => {
      if (!user) return;
      const { data, exists } = await getDocIfExists(usersRef, user.uid);
      if (exists && data) {
        const userData = mapDocumentDataToUser(data);
        dispatch(setUser(userData));
      }
    };

    storeUserData();
  }, [dispatch, user]);

  return null;
};

export default Auth;

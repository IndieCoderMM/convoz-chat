import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { mapDocumentDataToUser, queryUserById } from "../lib/firestore-utils";
import { selectUser, setUser } from "../features/User/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { onSnapshot } from "firebase/firestore";

const Auth = () => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  useEffect(() => {
    if (user?.uid) {
      const query = queryUserById(user.uid);
      onSnapshot(query, (snapshot) => {
        const userData = mapDocumentDataToUser(snapshot.docs[0].data());
        userData.path = snapshot.docs[0].id;
        dispatch(setUser(userData));
      });
    }
  }, [dispatch, user, currentUser]);

  return null;
};

export default Auth;

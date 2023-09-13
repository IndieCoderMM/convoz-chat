import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { mapDocumentDataToUser, queryUserById } from "../lib/utils";
import { selectUser, setUser } from "../features/User/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
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
        dispatch(setUser(userData));
      });
    }
  }, [dispatch, user]);

  if (!currentUser) return <Navigate to="/signin" replace />;

  console.log(currentUser);

  return null;
};

export default Auth;

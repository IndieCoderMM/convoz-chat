import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { mapDocumentDataToUser, queryUserById } from "../lib/utils";
import { selectUser, setUser } from "../features/User/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);

  const [userDoc] = useCollectionData(queryUserById(user?.uid || ""));

  useEffect(() => {
    if (userDoc && userDoc.length > 0) {
      const userData = mapDocumentDataToUser(userDoc[0]);
      dispatch(setUser(userData));
    }
  }, [dispatch, userDoc]);

  if (!currentUser) return <Navigate to="/signin" replace />;

  console.log(currentUser);

  return null;
};

export default Auth;

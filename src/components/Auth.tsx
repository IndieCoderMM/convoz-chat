import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { auth } from "../lib/firebase";
import { useEffect } from "react";
import { mapDocumentDataToUser, queryUserById } from "../lib/firestore-utils";
import { selectUser, setUser } from "../features/User/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

const Auth = () => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      const query = queryUserById(user.uid);
      onSnapshot(query, (snapshot) => {
        const userData = mapDocumentDataToUser(snapshot.docs[0].data());
        dispatch(setUser(userData));
      });
    }
    if (!user && !currentUser) {
      navigate("/signin");
    }
  }, [dispatch, user]);

  console.log(currentUser);

  return null;
};

export default Auth;

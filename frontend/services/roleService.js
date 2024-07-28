import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';
import { getAuth } from 'firebase/auth';

export const fetchUserData = async (setUserDetails) => {
  const auth = getAuth();
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User document not found");
      }
    } else {
      console.log("User is not logged in");
    }
  });
};

export const fetchUserRole = async (userId) => {
  try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
          return userDoc.data().role;
      } else {
          throw new Error("User document does not exist");
      }
  } catch (error) {
      console.error("Error fetching user role:", error);
      throw error;
  }
};

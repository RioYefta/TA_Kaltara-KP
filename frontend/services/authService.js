import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { getAuth } from 'firebase/auth';

export const fetchUserRole = async (user, router) => {
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    const userRole = userDoc.data().role;
    if (userRole !== 'admin') {
      router.push('/user/kehadiran');
    } else {
      router.push('/admin/kehadiran');
    }
  }
};

export const handleLogout = async () => {
    const auth = getAuth();
    try {
        await auth.signOut();
        window.location.href = "/";
        console.log("User Logged Out Successfully!");
    } catch (error) {
        console.error("Error Logging Out:", error.message);
    }
};

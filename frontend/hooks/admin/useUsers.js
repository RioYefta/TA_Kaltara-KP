import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from 'react-toastify';

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      toast.success("Pengguna berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Gagal menghapus pengguna!");
    }
  };

  const updateUserRole = async (id, newRole) => {
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, { role: newRole });
      setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, role: newRole } : user));
      toast.success("Role pengguna berhasil diubah!");
    } catch (error) {
      console.error("Error updating user role: ", error);
      toast.error("Gagal mengubah role pengguna!");
    }
  };

  return { users, setUsers, deleteUser, updateUserRole, fetchUsers };
};
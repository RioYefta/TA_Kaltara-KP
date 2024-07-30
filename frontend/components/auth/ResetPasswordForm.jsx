import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../firebase/config'; // Import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions

/**
 * Komponen ResetPasswordForm
 * Menangani tampilan dan interaksi untuk reset password pengguna.
 * 
 * - Menggunakan useRouter untuk navigasi.
 * - Mengelola input email dan memvalidasi keberadaan email di Firestore.
 * - Mengirim email reset password jika email terdaftar.
 * - Menampilkan notifikasi menggunakan toast untuk setiap tindakan yang berhasil atau gagal.
 */

const ResetPasswordForm = () => {
    const router = useRouter();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const emailInput = e.target.email;
        if (emailInput) {
            const emailVal = emailInput.value;
            try {
                // Check if email exists in Firestore
                const usersRef = collection(db, 'users'); // Adjust the collection name as per your setup
                const q = query(usersRef, where('email', '==', emailVal));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    toast.error("Email belum terdaftar.");
                } else {
                    await sendPasswordResetEmail(auth, emailVal);
                    toast.success("Cek email anda!");
                }
            } catch (err) {
                toast.error(`Error: ${err.message}`);
            }
        } else {
            toast.error("Email input not found");
        }
    };

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <ToastContainer />
            <form onSubmit={handleResetPassword}>
                <h1 className="text-3xl font-semibold">Reset Password</h1>
                <div className="mt-8">
                    <div>
                        <label className="text-lg font-medium">Email</label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Masukkan email anda"
                            name="email"
                            required
                        />
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-red-500 text-white text-lg font-bold">
                        Reset Password
                    </button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Sudah reset password anda?</p>
                    <button
                        className="text-red-500 text-base font-medium ml-2"
                        onClick={() => router.push('/')}
                    >
                        Masuk
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
import { useRouter } from 'next/navigation';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase/config';

const ResetPasswordForm = () => {
    const router = useRouter();

    const handleResetPassword = (e) => {
        e.preventDefault();
        const emailInput = e.target.email;
        if (emailInput) {
            const emailVal = emailInput.value;
            sendPasswordResetEmail(auth, emailVal)
                .then(() => {
                    toast.success("Cek email anda!");
                })
                .catch((err) => {
                    toast.error(`Error: ${err.code}`);
                });
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

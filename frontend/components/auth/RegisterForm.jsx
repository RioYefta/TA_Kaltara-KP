import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../../firebase/config';

const RegisterForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                    role: "user"
                });
            }
            toast.success("User Registered Successfully!", { position: "top-center" });
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        }
    };

    return (
        <div className="bg-white px-16 py-20 rounded-3xl border-2 border-gray-100">
            <form onSubmit={handleRegister}>
                <h1 className="text-3xl font-semibold">Daftar</h1>
                <div className="mt-8">
                    <div>
                        <label className="text-lg font-medium">Nama</label>
                        <input 
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Masukkan nama lengkap"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />    
                    </div>
                    <div>
                        <label className="text-lg font-medium">Email</label>
                        <input 
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Masukkan email anda"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />    
                    </div>
                    <div>
                        <label className="text-lg font-medium">Password</label>
                        <div className="relative w-full">
                            <input 
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                placeholder="Masukkan password anda"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? "text" : "password"}
                            />
                            <div 
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                    <button 
                        className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl bg-red-500 text-white text-lg font-bold"
                    >
                        Daftar
                    </button>
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Sudah punya akun?</p>
                    <button 
                        className="text-red-500 text-base font-medium ml-2"
                        onClick={() => router.push('/')}
                    >
                        Masuk
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default RegisterForm;

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from '../../firebase/config';
import { fetchUserRole } from '../../services/authService';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      fetchUserRole(currentUser, router);
      toast.success("Berhasil Masuk!", { position: "top-center" });
    } catch (error) {
      console.log(error.message);
      toast.error("Cek Kembali Email dan Password Anda!", { position: "bottom-center" });
    }
  };

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-20 rounded-3xl border-2 border-gray-100 w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl sm:text-3xl font-semibold">Masuk</h1>
        <div className="mt-6 sm:mt-8">
          <div>
            <label className="text-lg font-medium">Email</label>
            <input 
              className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
              placeholder="Masukkan email anda"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />    
          </div>
          <div className="mt-4 sm:mt-6">
            <label className="text-lg font-medium">Password</label>
            <div className="relative w-full">
              <input 
                className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
                placeholder="Masukkan password anda"
                name="password"
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
        <div className="mt-6 sm:mt-8 flex flex-col gap-y-4">
          <button 
            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all
            py-2 rounded-xl bg-red-500 text-white text-lg font-bold"
          >
            Masuk
          </button>
        </div>
        <div className="mt-4 sm:mt-6">
          <button 
            className="font-medium text-base text-red-500"
            onClick={() => router.push('/reset-password')}
          >
            Lupa password?
          </button>
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Belum punya akun?</p>
          <button 
            className="text-red-500 text-base font-medium ml-2"
            onClick={() => router.push('/register')}
          >
            Daftar
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default LoginForm;

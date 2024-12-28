import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router";
const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black text-black to-white p-4">
      <div className="w-full max-w-md  translate-y-[-50px] animate-[fadeIn_0.5s_ease-out_forwards]">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Sign in to your account
            </p>
          </div>

          <div className="p-6">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const checkLogin = await login({ email, password });
                console.log(checkLogin);
                if (checkLogin?.success === true) {
                  navigate("/user");
                }
              }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.currentTarget.value);
                      }}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from "react";
import { useNavigate } from "react-router";

type ContextAuth = {
  user: Access | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<
    | {
        success: boolean;
        error?: undefined;
      }
    | {
        success: boolean;
        error: unknown;
      }
  >;
  logout: () => void;
};

const AuthContext = createContext<ContextAuth>({
  user: null,
  login: async () => ({ success: false }),
  logout: () => {}
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export type Profile = {
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
};

type Access = Profile & { accessToken: string };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | Access>(null);
  // const navigate = useNavigate();
  const navigate = useNavigate();
  useEffect(() => {
    const validateToken = async () => {
      // if (!token) {
      //   logout();

      //   return;
      // }

      try {
        const response = await fetch("http://localhost:5003/api/refresh", {
          credentials: "include"
        });

        if (!response.ok) {
          logout();
          // throw new Error("Invalid token");
        }

        const data = await response.json();
        setUser(data);
        navigate("/user", { replace: true });

        // if (data.user) {
        //   setUser(data.user); // Update the user context if the token is valid
        // } else {
        //   logout(); // Token is invalid, so log out the user
        // }
      } catch (error) {
        logout();
        console.log(error);
        console.error("Token validation failed:", error);
        // logout(); // Log out on error
      }
    };

    validateToken();
  }, []);

  const login = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    try {
      console.log(email, password);
      const response = await fetch("http://localhost:5003/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      if (response.ok) {
        const userData = (await response.json()) as Access;
        console.log(userData);
        setUser(userData);

        return { success: true };
      } else {
        const error = await response.json();
        console.log(error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5003/api/user/logout", {
        credentials: "include"
      });
      //   console.log(res);
      setUser(null);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      navigate("/");
      console.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

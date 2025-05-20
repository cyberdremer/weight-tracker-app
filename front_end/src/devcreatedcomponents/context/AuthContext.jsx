import { createContext, useContext, useEffect, useState } from "react";
import { protectedGetRequest, logoutRequest } from "@/utils/requests";
import { InfoContext } from "./InfoContext";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setUser } = useContext(InfoContext);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // TODO rewrite login and logout to make calls to the server. authenticate and logout routes respectively

  

  const destroySession = async () => {
    try {
      const response = await logoutRequest();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setAuthed(false);
      
    } catch (error) {}
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await protectedGetRequest("/authenticate");
        if (response.error) {
          throw new Error(response.error.message);
        }
        const { fullname, height, id, isImperial, email, dateofbirth } = response.data.user;
        setUser({
          fullname: fullname,
          height: height,
          id: id,
          isImperial: isImperial,
          email: email,
          dateofbirth: dateofbirth
        });
        setAuthed(true);
      } catch (error) {
        setAuthed(false);
        setUser(null);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authed, destroySession, loading, error, setAuthed }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

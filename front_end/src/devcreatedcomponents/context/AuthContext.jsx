import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(() => {
    const storedAuth = localStorage.getItem("authed");
    return storedAuth === "true";
  });

  const logOut = () => {
    setAuthed(false);
    localStorage.setItem("authed", false);
  };

  const logIn = () => {
    setAuthed(true);
    localStorage.setItem("authed", true);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("authed");
    storedAuth === "true" ? setAuthed(true) : setAuthed(false);
  });

  return (
    <AuthContext.Provider value={{ authed, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

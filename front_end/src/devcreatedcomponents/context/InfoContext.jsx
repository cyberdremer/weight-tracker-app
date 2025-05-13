import { createContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    isImperial: false,
    height: 0,
  });

  const updateUser = (user) => {
    setUser({
      ...user,
      isImperial: user.isImperial,
      fullname: user.fullname,
      email: user.email,
      height: user.height,
    });
  };

  const clearUser = () => {
    setUser({
      fullname: "",
      isImperial: false,
      email: "",
      height: 0
    });
  };

  return (
    <InfoContext.Provider value={{ updateUser, clearUser, user }}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoContext, InfoProvider };

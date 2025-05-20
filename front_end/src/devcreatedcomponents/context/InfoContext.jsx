import { createContext, useState } from "react";

const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    isImperial: false,
    height: 0,
    dateofbirth: "",
  });

  const updateUser = (user) => {
    setUser({
      ...user,
      isImperial: user.isImperial,
      fullname: user.fullname,
      email: user.email,
      height: user.height,
      dateofbirth: user.dateofbirth,
    });
  };

  const clearUser = () => {
    setUser({
      fullname: "",
      isImperial: false,
      email: "",
      height: 0,
      dateofbirth: "",
    });
  };

  return (
    <InfoContext.Provider value={{ updateUser, clearUser, user, setUser }}>
      {children}
    </InfoContext.Provider>
  );
};

export { InfoContext, InfoProvider };

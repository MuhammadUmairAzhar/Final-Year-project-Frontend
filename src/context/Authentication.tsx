import React, { createContext } from "react";
import { UserModel } from "../components/models/user.model";
import { UserRoles } from "../components/enums/roles.enum";
import { axiosCommon } from "../global/axios";

type AuthContextType = {
  setAuthState(sessionToken: String, role: UserRoles): void;
  removeAuthState(): void;
  getAuthState(): string;
  getRole(): UserRoles;
  setRole(role: UserRoles): void;
};

export const AuthContext = createContext<AuthContextType>({
  setAuthState(sessionToken: String, role: UserRoles): void {},
  removeAuthState(): void {},
  getAuthState(): string { return "" },
  getRole(): UserRoles { return UserRoles.NONE },
  setRole(role: UserRoles): void {}
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({
  children,
  ...props
}: AuthContextProviderProps) => {

  const getAuthState = (): string => {
    try {
      const authDataString = localStorage.getItem("sessionToken");
      const authData: string = JSON.parse(authDataString || "")?.replaceAll('"', '');

      return authData;
    } catch (err) {
      console.log(err)
      return "";
    }
  };

  const setAuthState = (sessionToken: String, role: UserRoles) => {
    try {
      localStorage.setItem("sessionToken", JSON.stringify(sessionToken));
      localStorage.setItem("role", JSON.stringify(role));
    } catch (err) {
      console.log(err)
    }
  };

  const removeAuthState = async () => {
    try {
      localStorage.setItem("sessionToken", JSON.stringify(""));
      localStorage.setItem("role", JSON.stringify(0));
    } catch (err) {
      console.log(err)
    }
  };

  const setRole = (role: UserRoles) => {
    try {
      localStorage.setItem("role", JSON.stringify(role));
    } catch (err) {
      console.log(err)
    }
  };

  const getRole = (): UserRoles => {
    try {
      const roleDataString = localStorage.getItem("role");
      const roleData = JSON.parse(roleDataString || "");

      return roleData;
    } catch (err) {
      console.log(err)
      return UserRoles.NONE
    }
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuthState,
        removeAuthState,
        getAuthState,
        setRole,
        getRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

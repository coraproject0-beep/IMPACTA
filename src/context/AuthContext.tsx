"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface DriverUser {
  name: string;
  email: string;
  plate: string;
  policyNumber: string;
}

export interface InsurerUser {
  name: string;
  role: string;
  organization: string;
  email: string;
}

const DEFAULT_DRIVER: DriverUser = {
  name: "Matteo Bianchi",
  email: "matteo.bianchi@impacta-demo.eu",
  plate: "GF492XP",
  policyNumber: "AUR-8921-00412",
};

const DEFAULT_INSURER: InsurerUser = {
  name: "Elena Rostagno",
  role: "Senior Claims Adjuster",
  organization: "Aura Mutua Assicurazioni",
  email: "claims.ops@auramutua.it",
};

interface AuthContextType {
  isDriverAuthenticated: boolean;
  driverUser: DriverUser | null;
  loginDriver: (customUser?: Partial<DriverUser>) => void;
  logoutDriver: () => void;

  isInsurerAuthenticated: boolean;
  insurerUser: InsurerUser | null;
  loginInsurer: () => void;
  logoutInsurer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Initialize with seeded driver account for friction-free evaluation
  const [isDriverAuthenticated, setIsDriverAuthenticated] = useState<boolean>(true);
  const [driverUser, setDriverUser] = useState<DriverUser | null>(DEFAULT_DRIVER);

  const [isInsurerAuthenticated, setIsInsurerAuthenticated] = useState<boolean>(true);
  const [insurerUser, setInsurerUser] = useState<InsurerUser | null>(DEFAULT_INSURER);

  useEffect(() => {
    try {
      const driverStored = localStorage.getItem("impacta_driver_session");
      if (driverStored !== null) {
        if (driverStored === "false") {
          setIsDriverAuthenticated(false);
          setDriverUser(null);
        } else {
          setIsDriverAuthenticated(true);
          try {
            setDriverUser(JSON.parse(driverStored));
          } catch {
            setDriverUser(DEFAULT_DRIVER);
          }
        }
      }

      const insurerStored = localStorage.getItem("impacta_insurer_session");
      if (insurerStored !== null) {
        if (insurerStored === "false") {
          setIsInsurerAuthenticated(false);
          setInsurerUser(null);
        } else {
          setIsInsurerAuthenticated(true);
          try {
            setInsurerUser(JSON.parse(insurerStored));
          } catch {
            setInsurerUser(DEFAULT_INSURER);
          }
        }
      }
    } catch {
      // Storage restricted
    }
  }, []);

  const loginDriver = (customUser?: Partial<DriverUser>) => {
    const user = { ...DEFAULT_DRIVER, ...customUser };
    setIsDriverAuthenticated(true);
    setDriverUser(user);
    try {
      localStorage.setItem("impacta_driver_session", JSON.stringify(user));
    } catch {
      // Ignore
    }
  };

  const logoutDriver = () => {
    setIsDriverAuthenticated(false);
    setDriverUser(null);
    try {
      localStorage.setItem("impacta_driver_session", "false");
    } catch {
      // Ignore
    }
  };

  const loginInsurer = () => {
    setIsInsurerAuthenticated(true);
    setInsurerUser(DEFAULT_INSURER);
    try {
      localStorage.setItem("impacta_insurer_session", JSON.stringify(DEFAULT_INSURER));
    } catch {
      // Ignore
    }
  };

  const logoutInsurer = () => {
    setIsInsurerAuthenticated(false);
    setInsurerUser(null);
    try {
      localStorage.setItem("impacta_insurer_session", "false");
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isDriverAuthenticated,
        driverUser,
        loginDriver,
        logoutDriver,
        isInsurerAuthenticated,
        insurerUser,
        loginInsurer,
        logoutInsurer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      isDriverAuthenticated: true,
      driverUser: DEFAULT_DRIVER,
      loginDriver: () => {},
      logoutDriver: () => {},
      isInsurerAuthenticated: true,
      insurerUser: DEFAULT_INSURER,
      loginInsurer: () => {},
      logoutInsurer: () => {},
    };
  }
  return context;
}

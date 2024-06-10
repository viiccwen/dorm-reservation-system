import { useState, useEffect } from 'react';

export const getUser = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user") || null;
  } else {
    return null;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || null;
  } else {
    return null;
  }
};

export const setUser = (user: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", user);
  } else {
    return null;
  }
};

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  } else {
    return null;
  }
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  } else {
    return null;
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  } else {
    return null;
  }
};



export const useClientStorage = (key: string): string | null => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue);
    }
  }, [key]);

  return value;
};
import { createContext } from "react";

export const AppContext = createContext({
  userName: "Regina",
  setUserName: () => {},
  user: null,
  setUser: () => {},
  load: true,
  setLoad: () => {},
  scrollState: 10,
  setScrollState: () => {},
});

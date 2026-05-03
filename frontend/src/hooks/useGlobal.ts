import { useContext } from "react";
import GlobalContext from "../context/GlobalProvider";

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used inside GlobalProvider");
  return ctx;
};
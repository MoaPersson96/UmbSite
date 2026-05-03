import React from "react";
import ReactDOM from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GlobalProvider } from "./context/GlobalProvider";
import "./index.css";

console.log("🔥 ENTRY FILE LOADED");

const router = createRouter({
  routeTree,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </React.StrictMode>
);
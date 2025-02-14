import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes/routes";
import { Toaster } from "sonner";

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </AuthProvider>
  );
}

export default App;

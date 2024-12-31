import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/routes.tsx";
import { Toaster } from "react-hot-toast";
import GlobalProvider from "./provider/GlobalProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalProvider>
        <RouterProvider router={router}></RouterProvider>
        </GlobalProvider>
        <Toaster />
      </PersistGate>
    </Provider>
    </div>
  </StrictMode>
);

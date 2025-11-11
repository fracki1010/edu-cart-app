// src/App.tsx
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { AppRouter } from "./routes/AppRouter";
import './index.css'

export const App = () => {
  return (
    <HeroUIProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
      <ToastProvider />
          <AppRouter />
        </QueryClientProvider>
      </Provider>
    </HeroUIProvider>
  );
};

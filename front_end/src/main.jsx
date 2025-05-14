import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.jsx";
import { AuthProvider } from "./devcreatedcomponents/context/AuthContext.jsx";
import { InfoProvider } from "./devcreatedcomponents/context/InfoContext.jsx";
import App from "./App.jsx";
import "@fontsource-variable/inter/index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <AuthProvider>
       
          <App />
        
      </AuthProvider>
    </Provider>
  </StrictMode>
);

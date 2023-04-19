import App from "./App";
import { createRoot } from "react-dom/client";
import { UserContextProvider } from "./Context/UserContext";
import { ChatContextProvider } from "./Context/ChatContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <UserContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </UserContextProvider>
);

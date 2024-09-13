import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"
import { UserContextProvider } from "./context/UserContext.tsx"
import { TooltipProvider } from "./context/TooltipContext/index.tsx"
import { NotificationModalProvider } from "./context/NotificationModalContext/index.tsx"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <NotificationModalProvider>
          <UserContextProvider>
            <CatalogContextProvider>
              <Router />
            </CatalogContextProvider>
          </UserContextProvider>
        </NotificationModalProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App

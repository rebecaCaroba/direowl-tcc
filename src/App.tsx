import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"
import { UserContextProvider } from "./context/UserContext/index.tsx"
import { TooltipProvider } from "./context/TooltipContext/index.tsx"
import { NotificationModalProvider } from "./context/NotificationModalContext/index.tsx"
import { ScheduleContextProvider } from "./context/ScheduleContext/index.tsx"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <NotificationModalProvider>
          <UserContextProvider>
            <ScheduleContextProvider>
              <CatalogContextProvider>
                <Router />
              </CatalogContextProvider>
            </ScheduleContextProvider>
          </UserContextProvider>
        </NotificationModalProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App

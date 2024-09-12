import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"
import { UserContextProvider } from "./context/UserContext.tsx"
import { TooltipProvider } from "./context/TooltipContext/index.tsx"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <UserContextProvider>
          <CatalogContextProvider>
            <Router />
          </CatalogContextProvider>
        </UserContextProvider>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App

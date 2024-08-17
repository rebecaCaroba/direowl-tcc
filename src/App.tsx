import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"
import { UserContextProvider } from "./context/UserContext.tsx"
import { ModalMessageProvider } from "./context/ModalMessageContext/index.tsx"

function App() {
  return (
    <BrowserRouter>
      <ModalMessageProvider>
        <UserContextProvider>
          <CatalogContextProvider>
            <Router />
          </CatalogContextProvider>
        </UserContextProvider>
      </ModalMessageProvider>
    </BrowserRouter>
  )
}

export default App

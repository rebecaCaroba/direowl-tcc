import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"
import { UserContextProvider } from "./context/UserContext.tsx"

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <CatalogContextProvider>
          <Router />
        </CatalogContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { CatalogContextProvider } from "./context/CatalogContext"

function App() {
  return (
    <BrowserRouter>
      <CatalogContextProvider>
        <Router/>
      </CatalogContextProvider>
    </BrowserRouter>
  )
}

export default App

import { Count } from "./Count";
import "./style.scss";

export function Stopwatch() {
    return (
        <div className="stopwatch-container">
            <Count/>
            <button>Começar</button>
        </div>
        
    )
}
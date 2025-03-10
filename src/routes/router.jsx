import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login"
import { Gerar } from "../pages/gerar"
import { Visualizar } from "../pages/visualizar";
import { Home } from "../pages/home";

export default function Router() {
    
    return (
    
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/gerar" element={<Gerar />} />
                <Route path="/visualizar" element={<Visualizar />} />
            </Routes>
       </BrowserRouter>     
    )

}
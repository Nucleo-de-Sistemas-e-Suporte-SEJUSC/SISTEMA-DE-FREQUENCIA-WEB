import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login"
import { Gerar } from "../pages/gerar"
import { Visualizar } from "../pages/visualizar";
import { FrequenciaMensal } from "../pages/frequencia-mensal";
import { NotFound } from "../pages/not-found";

export default function Router() {
    
    return (
    
       <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/gerar" element={<Gerar />} />
                <Route path="/visualizar" element={<Visualizar />} />
                <Route path="/frequencia-mensal" element={<FrequenciaMensal />} />
                <Route path="/nao-encontrado" element={<NotFound />} />
            </Routes>
       </BrowserRouter>     
    )

}
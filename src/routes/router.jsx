import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login"
import { Visualizar } from "../pages/visualizar";
import { FrequenciaMensal } from "../pages/frequencia-mensal";
import { NotFound } from "../pages/not-found";
import { GerarServidores } from "../pages/gerar-servidores";
import { GerarEstagiarios } from "../pages/gerar-estagiarios";

export default function Router() {
    
    return (
    
       <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/servidores" element={<GerarServidores />} />
                <Route path="/estagiarios" element={<GerarEstagiarios />} />
                <Route path="/visualizar" element={<Visualizar />} />
                <Route path="/frequencia/mensal" element={<FrequenciaMensal />} />
                <Route path="/naoencontrado" element={<NotFound />} />
            </Routes>
       </BrowserRouter>     
    )

}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login"
import { Visualizar } from "../pages/visualizar";
import { FrequenciaMensal } from "../pages/frequencia-mensal";
import { NotFound } from "../pages/not-found";
import { GerarServidores } from "../pages/gerar-servidores";
import { GerarEstagiarios } from "../pages/gerar-estagiarios";
import { Arquivados } from "../pages/arquivados";
import { HistoricoAlteracao } from "../pages/historico-alteracao";
import { Historico } from "../pages/historico";

export default function Router() {
    
    return (
    
       <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/servidores" element={<GerarServidores />} />
                <Route path="/estagiarios" element={<GerarEstagiarios />} />
                <Route path="/visualizar" element={<Visualizar />} />
                <Route path="/frequencia/mensal" element={<FrequenciaMensal />} />
                <Route path="/arquivados" element={<Arquivados />} />
                <Route path="/naoencontrado" element={<NotFound />} />
                <Route path="/historico-alteracao" element={<HistoricoAlteracao />} />
                <Route path="/historico" element={<Historico />} />
            </Routes>
       </BrowserRouter>     
    )

}
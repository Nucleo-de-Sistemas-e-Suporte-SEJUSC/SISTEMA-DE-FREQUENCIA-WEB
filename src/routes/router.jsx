import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login"
import { FrequenciaMensal } from "../pages/frequencia-mensal";
import { NotFound } from "../pages/not-found";
import { GerarServidores } from "../pages/gerar-servidores";
import { GerarEstagiarios } from "../pages/gerar-estagiarios";
import { Arquivados } from "../pages/arquivados";
import { HistoricoAlteracao } from "../pages/historico-alteracao";
import { Historico } from "../pages/historico";
import { VisualizarServidor } from "../pages/visualizar-servidor";
import { VisualizarEstagiario } from "../pages/visualizar-estagiario";
import { Home } from "../pages/home";
import { ArquivadosAtivos } from "../pages/arquivados-ativos";
import { Ativos } from "../pages/ativos";
import { ControleDePonto } from "../pages/controle-de-ponto";

export default function Router() {
    
    return (
    
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/servidores" element={<GerarServidores />} />
                <Route path="/estagiarios" element={<GerarEstagiarios />} />
                <Route path="/visualizar/servidores" element={<VisualizarServidor />} />
                <Route path="/visualizar/estagiarios" element={<VisualizarEstagiario />} />
                <Route path="/frequencia/mensal" element={<FrequenciaMensal />} />
                <Route path="/arquivados" element={<Arquivados />} />
                <Route path="/arquivados-ativos" element={<ArquivadosAtivos />} />
                <Route path="/ativos" element={<Ativos />} />
                <Route path="/historico-alteracao" element={<HistoricoAlteracao />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/controle-de-ponto" element={<ControleDePonto />} />
                <Route path="/naoencontrado" element={<NotFound />} />
            </Routes>
       </BrowserRouter>     
    )

}
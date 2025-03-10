import { Header } from "../../components/header";
import { MainVisualizar } from "../../components/main-visualizar";
import { Navigation } from "../../components/navigation";

export function Visualizar() {
    return (
        <>
            <Header cabecalhoLogin={false} />
            <Navigation />

            <MainVisualizar />
        </>
    )
}
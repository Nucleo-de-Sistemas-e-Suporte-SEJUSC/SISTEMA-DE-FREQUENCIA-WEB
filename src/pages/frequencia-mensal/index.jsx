import { Header } from "../../components/header"
import { MainFrequenciaMensal } from "../../components/main-frequencia-mensal"
import { Navigation } from "../../components/navigation"

export function FrequenciaMensal() {
    return (
        <>
            <Header cabecalhoLogin={false} />
            <Navigation />

            <MainFrequenciaMensal />
        </>
    )
}
import "./header.css"

export function Header(props) {
    const {cabecalhoLogin, titulo } = props

    return (
        <header className={cabecalhoLogin ? "cabecalho__login" : "cabecalho__home"}>
            <section className="container__header">
                <h1 className="titulo">{ titulo }</h1>
            </section>
        </header>
    )
}


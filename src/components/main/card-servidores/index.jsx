import "./style.css"

export function CardServidores(props) {
    
    const { nome, quantidadeServidores, isChecked, onChecked, id  } = props

    return (
        <section className="card__servidores">
            <details className="card__details">
                <summary className="card__summary">{ nome }</summary>
                { quantidadeServidores > 0 && <p>{quantidadeServidores} Servidores</p> }
                { quantidadeServidores === 0 && <p>Nenhum servidor</p> }

                <div className="card__details__container__button">
                    <button className="card__details__historico__button card__details__button">Histórico</button>
                    <button className="card__details__atualizar__button card__details__button">Atualizar</button>
                    <button className="card__details__arquivar__button card__details__button">Arquivar</button>
                </div>
            </details>

            <div className="container-selecionar">
                <input 
                    type="checkbox" 
                    name="selecionar" 
                    id={`selecionar-${id}`} 
                    className="container-selecionar__input" 
                    checked={isChecked}
                    onChange={onChecked}
                />
                <div className="container-selecionar__label">
                    <p className={isChecked ? 'icon-check-visible' : 'icon-check-hidden'}>✔️</p>
                    <label htmlFor={`selecionar-${id}`}>
                        { isChecked ? "Selecionado" : "Selecionar" }
                    </label>
                </div>
            </div>
        </section>
    )
}
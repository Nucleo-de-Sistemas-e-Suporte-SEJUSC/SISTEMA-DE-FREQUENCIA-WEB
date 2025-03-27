import "./style.css"
import * as Dialog  from "@radix-ui/react-dialog";
import { FormFaltas } from "../formularios/form-faltas";

export function Faltas() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <p>Faltas</p>
                <form action="#" method="get">
                    <input type="text" name="falta" id="falta" className="input__falta" />
                </form>
                
                <details className={"card__details"}>
                    <summary className={"card__summary"}>MARCOS LUIZ PEREIRA DOS SANTOS - SETOR GTI</summary>

                    <div className={"card__details__container__button"}>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <button>Observação</button>
                            </Dialog.Trigger>

                            <FormFaltas />
                        </Dialog.Root>
                    </div>
                </details>  
            </Dialog.Content>
        </Dialog.Portal>
    )
}
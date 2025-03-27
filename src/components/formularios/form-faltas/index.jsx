import * as Dialog from "@radix-ui/react-dialog";

export function FormFaltas() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay  className="DialogOverlay" >
                <Dialog.Content className="DialogContent">
                    <form action="#">
                        <p>
                            AAA
                        </p>
                    </form>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}
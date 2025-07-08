import './style.css'

export function Modal({ onClick, children }) {
    return (
        <div
            onClick={onClick}
            className="modal-overlay">
            <section
                onClick={(event) => event.stopPropagation()}
                className="modal-container"
            >
                {children}
            </section>
        </div>
    )
}
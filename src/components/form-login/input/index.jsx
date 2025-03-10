import "./input.css"

export function Input(props) {
    return (
        <div className="container__input">
            <label htmlFor={props.for} className="label__form">{props.label}</label>
            <input 
                type="text" 
                name={props.for}
                i={props.for}
                placeholder={props.label}
                className="input__form"
            />
        </div>
    )
}

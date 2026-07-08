export default function AuthInput ({ 
    type,
    placeholder,
    id,
    name,
    value,
    onChange,
    labelText,
    forHtml
}) {
    return (
        <div className="inputContainer">
            <input
                className="authInput"
                type={ type }
                id={ id }
                placeholder={ placeholder }
                name={ name }
                value={ value }
                onChange={onChange} 
            />
            <label htmlFor={ forHtml }>{ labelText }</label>
        </div>
    )
}
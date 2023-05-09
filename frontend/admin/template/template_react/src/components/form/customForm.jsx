import { useState } from "react";
import { useDispatch } from "react-redux";

function CustomForm ({fields, onSubmit, action, showModalAction}) {
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    
    function handleFieldChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "roles") {
            console.log("hiiiiii aqui va el rol")
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: prevValues[name] ? [...prevValues[name], value] : [value]
            }));
        } else {
            setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        // To verify required fields
        const requiredFields = fields.filter(field => field.required);
        const filledRequiredFields = requiredFields.filter(field => formValues[field.name]);
        // When required fields are not filled
        if (filledRequiredFields.length !== requiredFields.length) {
            const errors = {};
            requiredFields.forEach(field => {
                if(!formValues[field.name]){
                    errors[field.name] = true;
                }
            })
            setFieldErrors(errors);
            return;
        }
        setFieldErrors({}); 
        console.log('valores', formValues)
        dispatch(action(formValues))
        dispatch(showModalAction(false))
    }
    
    return (
        <form>
            {fields.map((field) => (
                <div key={field.name} className="col">
                    <label className="form-label col-form-label" htmlFor={field.name}>{field.label}</label>
                    {
                        field.name !== "description" ? (
                            <input
                                className="form-control" 
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleFieldChange}
                                required={field.required}
                            />
                        ): 
                        (
                            <textarea
                                className="form-control"
                                style={{"resize": "none"}} 
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                value={formValues[field.name] || ''}
                                onChange={handleFieldChange}
                                required={field.required}
                            />
                        )
                    }
                    {fieldErrors[field.name] && <div className="invalid-feedback d-flex">Campo obligatorio</div>}
                </div>
            ))}
            <div className="modal-footer mt-5">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Guardar</button>
            </div>
        </form>
        
    )
}

export default CustomForm;
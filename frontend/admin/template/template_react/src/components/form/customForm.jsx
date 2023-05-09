import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTags from 'react-tag-autocomplete';

function CustomForm ({fields, onSubmit, action, showModalAction}) {
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [roles, setRoles] = useState([])

    function handleFieldChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "roles") {
            setRoles((prevRoles) => [...prevRoles, value]);
            setFormValues((prevValues) => ({ ...prevValues, [name]: roles }));
        } else {
            setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    }
    
    function handleAddition(role) {
        setRoles([...roles, role]);
        setFormValues((prevValues) => ({ ...prevValues, roles: [...roles, role] }));
    }
    
    function handleDelete(i) {
        const newRoles = roles.filter((role, index) => index !== i);
        setRoles(newRoles);
        setFormValues((prevValues) => ({ ...prevValues, roles: newRoles }));
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
        // Convert roles to a simple array of strings
        const rolesArray = roles.map(role => role.name);
        // Merge the original formValues with the roles array
        const valuesWithRoles = {...formValues, roles: rolesArray};
        console.log('valores', valuesWithRoles)
        dispatch(action(valuesWithRoles))
        dispatch(showModalAction(false))
    }
    
    return (
        <form>
            {fields.map((field) => (
                <div key={field.name} className="col">
                    <label className="form-label col-form-label" htmlFor={field.name}>{field.label}</label>
                    {
                        field.name !== "description" ? (
                            field.name !== "roles" ? (
                                <input
                                    className="form-control" 
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    value={formValues[field.name] || ''}
                                    onChange={handleFieldChange}
                                    required={field.required}
                                />
                            ) : (
                                <ReactTags 
                                    tags={roles}
                                    onDelete={handleDelete} 
                                    onAddition={handleAddition}
                                    allowNew={true}
                                    className="react-tags__selected-tag"  
                                />
                            )
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
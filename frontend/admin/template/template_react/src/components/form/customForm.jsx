import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImageChanged, selectPortfolioStudent, selectStudentId, setPortfolioStudent, selectEditForm, selectEditObjectId, setShowNotificationUpdateSuccess, setShowNotificationUpdateError, setShowNotificationUpdatePortfolioSuccess, setShowNotificationUpdatePortfolioError, setShowNotificationCreateSuccess, setShowNotificationCreateError } from "../../reducers/portfolioSlice";
import ReactTags from 'react-tag-autocomplete';
import { Store } from 'react-notifications-component';
import { monthsOptions } from "../../pages/user/portfolio/fields";
import "./customForm.css"
import { useEffect } from "react";

function CustomForm ({fields, onSubmit, action, showModalAction, initialValue, onUpdate, isAbout}) {
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});
    const [roles, setRoles] = useState([]);
    const [skills, setSkills] = useState([]);
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const studentId = useSelector(selectStudentId);
    const imageChanged = useSelector(selectImageChanged);
    const studentPortfolio = useSelector(selectPortfolioStudent);
    const isEditing = useSelector(selectEditForm);
    const editId = useSelector(selectEditObjectId);


    /**
     * Default options for warning, success and error messages
    */
    const defaultOptions = {
      container: 'bottom-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
    }

    let currentYear = new Date().getFullYear();    
    let earliestYear = 1970;     
    let yearOptions = []
    yearOptions.unshift({ label: "Presente", value: "Presente" });

    while (currentYear >= earliestYear) {      
      yearOptions.push({label: currentYear, value: currentYear})
      currentYear -= 1;    
    }

    // Edit case
    useEffect(() => {
      if(initialValue !== undefined) {
        const regex = /([a-zA-Z]+)\s+(\d{4})/;
        const monthInitials = {
          Jan: "Enero",
          Feb: "Febrero",
          Mar: "Marzo",
          Apr: "Abril",
          May: "Mayo",
          Jun: "Junio",
          Jul: "Julio",
          Aug: "Agosto",
          Sep: "Septiembre",
          Oct: "Octubre",
          Nov: "Noviembre",
          Dec: "Diciembre"
        };
        setFormValues(initialValue)
        if(initialValue.skills) {
          setSkills(initialValue.skills.map(skill => ({id: skill, name: skill})))
        }
        if(initialValue.roles) {
          setRoles(initialValue.roles.map(role => ({id: role, name:role})))
        }
        if(initialValue.start_date){
          if(initialValue.start_date.includes(" ")){
            const [month, year] = initialValue.start_date.split(" ");
            setStartMonth(month);
            setStartYear(year);
          } else {
            setStartYear(initialValue.start_date)
          }
        }
        if(initialValue.end_date){
          if(initialValue.end_date.includes(" ")){
            const [month, year] = initialValue.end_date.split(" ");
            setEndMonth(month);
            setEndYear(year);
          } else {
            setEndYear(initialValue.end_date)
          }
        }
        if(initialValue.issue_date){
          const match = initialValue.issue_date.match(regex);
          if (match) {
            const month = match[1]; 
            const year = match[2]; 
            setStartMonth(monthInitials[month])
            setStartYear(year)
          } else {
            setStartYear(initialValue.issue_date);
          }
        }
        if(initialValue.expiration_date){
          const match = initialValue.expiration_date.match(regex);
          if (match) {
            const month = match[1]; 
            const year = match[2]; 
            setEndMonth(monthInitials[month])
            setEndYear(year)
          } else {
            setEndYear(initialValue.expiration_date);
          }
        }
      }
    },[initialValue])
    
    function handleFieldChange(event){
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "roles") {
            setRoles((prevRoles) => [...prevRoles, value]);
            setFormValues((prevValues) => ({ ...prevValues, [name]: roles }));
        } 
        else if( name === "skills") {
            setSkills((prevSkills) => [...prevSkills, value]);
            setFormValues((prevValues) => ({ ...prevValues, [name]: skills }));
        }
        else {
            setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
        }
    }
    
    function handleAddition(value, isRole) {
      if (isRole) {
        setRoles([...roles, value]);
        setFormValues((prevValues) => ({ ...prevValues, roles: [...roles, value] }));
      } else {
        if (!skills.includes(value)) { // Verificar si el valor ya existe en la lista de skills
          setSkills([...skills, value]);
          setFormValues((prevValues) => ({ ...prevValues, skills: [...skills, value] }));
        } else {
          console.log('El valor ya existe en la lista de skills');
        }
      }
    }
    
    function handleDelete(i, isRole) {
        if(isRole) {
            const newRoles = roles.filter((role, index) => index !== i);
            setRoles(newRoles);
            setFormValues((prevValues) => ({ ...prevValues, roles: newRoles }));
        }
        else {
            const newSkills = skills.filter((skill, index) => index !== i);
            setSkills(newSkills);
            setFormValues((prevValues) => ({ ...prevValues, skills: newSkills }));
        }
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        // To verify required fields
        const requiredFields = fields.filter(field => field.required);
        const filledRequiredFields = requiredFields.filter(field => formValues[field.name]);
        const fieldWithStartDates = fields.filter(field => field.type === "start_date")
        const fieldWithEndDates = fields.filter(field => field.type === "end_date")
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
        if (skills.length > 0){
            const valuesWithSkills = {...formValues, skills: skills};
            dispatch(action(skills))
            setLoadingCreate(true)
            const response = await onSubmit(valuesWithSkills.skills, studentId)
            if(response !== undefined){
              setLoadingCreate(false)
              dispatch(setShowNotificationCreateError(true))
              Store.addNotification({
                title: "Error",
                message: "Error registrando la información",
                type: "danger",
                dismiss: {
                    duration: 3000,
                },
                ...defaultOptions
              })
            }
            else {
              setLoadingCreate(false)
              dispatch(setShowNotificationCreateSuccess(true))
              Store.addNotification({
                title: "Registro",
                message: "Información registrada",
                type: "success",
                dismiss: {
                    duration: 3000,
                },
                ...defaultOptions
              });
            }
            
        }
        else {
            if (fieldWithStartDates.length  > 0 || fieldWithEndDates > 0) {
                const valuesWithDates = {};
                fields.forEach(field => {
                    if (field.type === "start_date") {
                        const key = field.name === "issue_date" ? "issue_date" : "start_date";
                        valuesWithDates[key] = startMonth || startYear !== "" ? `${startMonth} ${startYear}` : "";
                    } else if (field.type === "end_date") {
                        const key = field.name === "expiration_date" ? "expiration_date" : "end_date";
                        valuesWithDates[key] = endMonth || endYear !== "" ? `${endMonth} ${endYear}` : "";
                    } else {
                        valuesWithDates[field.name] = formValues[field.name];
                    }
                });
                if(roles.length > 0) {
                    // Convert roles to a simple array of strings
                    const rolesArray = roles.map(role => role.name);
                    // Merge the original formValues with the roles array
                    const valuesWithRoles = {...valuesWithDates, roles: rolesArray};
                    if(isEditing && !isAbout){
                      const values  = {id: editId, updatedObject: valuesWithRoles}
                      valuesWithRoles.id = editId;
                      dispatch(action(values))
                      setLoadingUpdate(true)
                      const response = await onUpdate(studentId, editId, [valuesWithRoles]);
                      if(response.status === 200) {
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdateSuccess(true))
                        Store.addNotification({
                          title: "Actualizada",
                          message: "Información actualizada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      } 
                      else {
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdateError(true))
                        Store.addNotification({
                          title: "Error",
                          message: "Error actualizando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                    } else {
                      dispatch(action(valuesWithRoles))
                      setLoadingCreate(true)
                      const response = await onSubmit([valuesWithRoles], studentId)
                      if(response !== undefined){
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateError(true))
                        Store.addNotification({
                          title: "Error",
                          message: "Error registrando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        })
                      }
                      else {
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateSuccess(true))
                        Store.addNotification({
                          title: "Registro",
                          message: "Información registrada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                    }
                }
                else {
                    if(isEditing && !isAbout){
                      const values  = {id: editId, updatedObject: valuesWithDates}
                      valuesWithDates.id = editId;
                      dispatch(action(values))
                      setLoadingUpdate(true)
                      const response = await onUpdate(studentId, editId, [valuesWithDates])
                      if(response.status === 200) {
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdateSuccess(true))
                        Store.addNotification({
                          title: "Actualizada",
                          message: "Información actualizada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      } 
                      else {
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdateError(true))
                        Store.addNotification({
                          title: "Error",
                          message: "Error actualizando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                    } else {
                      dispatch(action(valuesWithDates))
                      setLoadingCreate(true)
                      const response = await onSubmit([valuesWithDates], studentId) 
                      if(response !== undefined){
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateError(true))
                        Store.addNotification({
                          title: "Error",
                          message: "Error registrando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        })
                      }
                      else {
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateSuccess(true))
                        Store.addNotification({
                          title: "Registro",
                          message: "Información registrada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                    }    
                }
            }
            else {
                fields.forEach(async field => {
                  const newPortfolioStudent = {...studentPortfolio, description: formValues.description}
                  dispatch(setPortfolioStudent(newPortfolioStudent))
                  dispatch(action(formValues))
                    if(field.specialField && !isAbout) {
                      setLoadingCreate(true)
                      const response = await onSubmit(newPortfolioStudent, imageChanged)
                      if(response !== undefined){
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateError(true))
                        Store.addNotification({
                          title: "Error",
                          message: "Error registrando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        })
                      }
                      else {
                        setLoadingCreate(false)
                        dispatch(setShowNotificationCreateSuccess(true))
                        Store.addNotification({
                          title: "Registro",
                          message: "Información registrada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                    }
                    if(field.specialField && isAbout){
                      setLoadingUpdate(true)
                      const response = await onUpdate(newPortfolioStudent, imageChanged)
                      if(response.status === 200){
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdatePortfolioSuccess(true));
                        Store.addNotification({
                          title: "Actualizada",
                          message: "Información actualizada",
                          type: "success",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        });
                      }
                      else {
                        setLoadingUpdate(false)
                        dispatch(setShowNotificationUpdatePortfolioError(true));
                        Store.addNotification({
                          title: "Error",
                          message: "Error actualizando la información",
                          type: "danger",
                          dismiss: {
                              duration: 3000,
                          },
                          ...defaultOptions
                        })
                      }
                    }
                })
                if(isEditing && !isAbout){
                  const values  = {id: editId, updatedObject: formValues}
                  formValues.id = editId;
                  dispatch(action(values))
                  setLoadingUpdate(true)
                  const response = await onUpdate(studentId, editId, [formValues])
                  if(response.status === 200) {
                    setLoadingUpdate(false)
                    dispatch(setShowNotificationUpdateSuccess(true))
                    Store.addNotification({
                      title: "Actualizada",
                      message: "Información actualizada",
                      type: "success",
                      dismiss: {
                          duration: 3000,
                      },
                      ...defaultOptions
                    });
                  } 
                  else {
                    setLoadingUpdate(false)
                    dispatch(setShowNotificationUpdateError(true))
                    Store.addNotification({
                      title: "Error",
                      message: "Error actualizando la información",
                      type: "danger",
                      dismiss: {
                          duration: 3000,
                      },
                      ...defaultOptions
                    })
                  }
                  dispatch(action(formValues))
                  setLoadingCreate(false)
                  const result = await onSubmit([formValues], studentId)
                  if(result !== undefined){
                    setLoadingCreate(true)
                    dispatch(setShowNotificationCreateError(true))
                    Store.addNotification({
                      title: "Error",
                      message: "Error registrando la información",
                      type: "danger",
                      dismiss: {
                          duration: 3000,
                      },
                      ...defaultOptions
                    })
                  }
                  else {
                    setLoadingCreate(true)
                    dispatch(setShowNotificationCreateSuccess(true))
                    Store.addNotification({
                      title: "Registro",
                      message: "Información registrada",
                      type: "success",
                      dismiss: {
                          duration: 3000,
                      },
                      ...defaultOptions
                    });
                  }
                }
            }
        }
        dispatch(showModalAction(false))
    }
    
    return (
        <form>
          {fields.map((field) => (
            <div key={field.name} className="col">
              <label className="form-label col-form-label" htmlFor={field.name}>
                {field.label}
              </label>
              {field.name !== "description" ? (
                field.name !== "roles" ? (
                  field.type === "start_date" ? (
                    <div className="row">
                        <div className="col flex">
                            <select
                                className="form-control"
                                name={field.name}
                                id={field.name}
                                value={startMonth || ''}
                                onChange={(e) => setStartMonth(e.target.value)}
                                >
                                <option value="">Selecciona el mes</option>
                                {monthsOptions?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <select
                                className="form-control"
                                name={field.name}
                                id={field.name}
                                value={startYear || ''}
                                onChange={(e) => setStartYear(e.target.value)}
                                >
                                <option value="">Selecciona el año</option>
                                {yearOptions?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                  ) : field.type === "end_date" ? (
                    <div className="row">
                        <div className="col flex">
                            <select
                                className="form-control"
                                name={field.name}
                                id={field.name}
                                value={endMonth || ''}
                                onChange={(e) => setEndMonth(e.target.value)}
                                >
                                <option value="">Selecciona el mes</option>
                                {monthsOptions?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col">
                            <select
                                className="form-control"
                                name={field.name}
                                id={field.name}
                                value={endYear || ''}
                                onChange={(e) => setEndYear(e.target.value)}
                                >
                                <option value="">Selecciona el año</option>
                                {yearOptions?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      className="form-control"
                      name={field.name}
                      id={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleFieldChange}
                      required={field.required}
                    >
                      <option value="">Selecciona una opción</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.name === "skills" ? (
                    <ReactTags
                      tags={skills}
                      onDelete={(i) => handleDelete(i, false)}
                      onAddition={(value) => {
                        if (!initialValue.skills) {
                          handleAddition(value, false);
                        }
                      }}
                      allowNew={!initialValue.skills}
                      className="react-tags__selected-tag"
                    />
                  ) : (
                    <input
                      className="form-control"
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formValues[field.name] || ''}
                      onChange={handleFieldChange}
                      required={field.required}
                    />
                  )
                ) : (
                  <ReactTags
                    tags={roles}
                    onDelete={(i) => handleDelete(i, true)}
                    onAddition={(value) => handleAddition(value, true)}
                    allowNew={true}
                    className="react-tags__selected-tag"
                  />
                )
              ) : (
                <textarea
                  className="form-control"
                  style={{
                    resize: "none",
                    height: "120px",
                    fontWeight: "400",
                  }}
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formValues[field.name] || ''}
                  onChange={handleFieldChange}
                  required={field.required}
                />
              )}
              {fieldErrors[field.name] && (
                <div className="invalid-feedback d-flex">Campo obligatorio</div>
              )}
            </div>
          ))}
          <div className="modal-footer mt-5">

            <button 
              type='submit' 
              onClick={handleSubmit}
              className="btn btn-success w-120px me-5px d-flex justify-content-center align-items-center" style={{"gap": "0.5rem"}}>
                Guardar
              {
                loadingCreate || loadingUpdate ? (
                  <div className="spinner-border" role="status" style={{"width": "1rem", "height": "1rem"}}>
                    <span className="sr-only">Loading...</span>
                  </div> 
                ) : null
              }
              </button>
          </div>
        </form>
      );
}

export default CustomForm;
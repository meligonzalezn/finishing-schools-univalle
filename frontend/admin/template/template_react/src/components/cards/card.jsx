import { useDispatch, useSelector } from "react-redux"
import "./styles/card.css"
import { selectShowNotificationDeleteError, selectShowNotificationDeleteSuccess, selectStudentId, setEditObject, setEditObjectId, setNotificationDeleteError, setNotificationDeleteSuccess } from "../../reducers/portfolioSlice"
import { ReactNotifications, Store } from 'react-notifications-component';

const CardPortfolio = ({ list, titleKey, timeKey, firstTimeKey, secondTimeKey, subtitleKey, descriptionKey, iconClass, workExperience, skills, isEdit, setShowModalAction, deleteAction, deleteFunction }) => {
    const dispatch = useDispatch()
    const studentId = useSelector(selectStudentId)
    const notificationDeleteSuccess = useSelector(selectShowNotificationDeleteSuccess)
    const notificationDeleteError = useSelector(selectShowNotificationDeleteError)

    /**
     * Default options for warning, success and error messages
     */
    const defaultOptions = {
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
    }

    const handleClickEdit = (id, info) => {
        dispatch(setEditObjectId(id))
        dispatch(setEditObject(info))
        dispatch(setShowModalAction(true))
    }

    const handleClickDelete = async (id) => {
        console.log("Deleting information with id:", id)
        dispatch(deleteAction(id));
        try {
          const response = await deleteFunction(studentId, id);
          console.log("Response deleting information:", response)
          if (response && response.status === 200) {
            dispatch(setNotificationDeleteSuccess(true));
            Store.addNotification({
              title: "Eliminado",
              message: "La información ha sido eliminada exitosamente",
              type: "success",
              dismiss: {
                duration: 3000,
              },
              ...defaultOptions,
            });
          } else {
            dispatch(setNotificationDeleteError(true));
            Store.addNotification({
              title: "Error",
              message: "Error eliminando la información",
              type: "danger",
              dismiss: {
                duration: 3000,
              },
              ...defaultOptions,
            });
          }
        } catch (error) {
          console.error("Error deleting information:", error);
          dispatch(setNotificationDeleteError(true));
          Store.addNotification({
            title: "Error",
            message: "Error eliminando la información",
            type: "danger",
            dismiss: {
              duration: 3000,
            },
            ...defaultOptions,
          });
        }
      };
      

    return (
        <div className="card border-0" >
            {
                workExperience ? 
                    list?.map((info, key) =>
                    <div key={key} className={isEdit ? "card-body py-0 d-flex align-items-start justify-content-between" : "card-body py-0"}> 
                        <div className="stepper d-flex flex-column ml-2" style={{"paddingLeft": "1rem"}}>
                            <div className="d-flex mb-1 gap-3">
                                <div className="d-flex flex-column pr-4 align-items-center">
                                    <div className="rounded-circle bg-gray-400 text-white mb-1" style={{"width": "0.5rem", "height": "0.6rem"}}></div>
                                    <div className="line h-100"></div>
                                </div>
                                <div className="mb-4 d-flex flex-column gap-1">
                                    <h6 data-testid="title-key" className="mb-0">{info[titleKey]}</h6>
                                    <small>{info[timeKey]}</small>
                                    <small className="card-text">
                                    {info[firstTimeKey] && info[secondTimeKey] ? 
                                        `${info[firstTimeKey]} - ${info[secondTimeKey]}` : 
                                        info[firstTimeKey] ? info[firstTimeKey] : 
                                        info[secondTimeKey] ? info[secondTimeKey] : null
                                    }
                                    </small>
                                    <p className="mb-1">{info[descriptionKey]}</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        {info["roles"]?.map((role, key) => (
                                            <div key={key}>
                                            <span className="badge bg-gray-500 me-2 mb-2 d-inline-block" style={{ fontSize: '12px', color:"#292929" }}>
                                                {role}
                                            </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            isEdit ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <button data-testid="delete-button" onClick={() => handleClickDelete(list[key]?.id)} className="border-0 bg-white"> 
                                       <i className="bi bi-trash3" style={{"fontSize": "1.2rem"}}></i>
                                    </button>
                                    <button data-testid="edit-button" onClick={() => handleClickEdit(list[key]?.id, info)} className="border-0 bg-white"> 
                                        <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i> 
                                    </button>
                                </div>  : null
                        }
                    </div>
                    )
                : 
                <div className="card-body">
                        {
                            skills ? 
                            <div className="d-flex align-items-start">
                                <div className="w-100">
                                    <div className="row row-cols-1 row-cols-md-4 g-3">
                                        {list?.map((skill, key) => (
                                            <div key={key} className="col">
                                            <span className="badge bg-gray-500 me-2 mb-2 d-flex flex-wrap align-items-center justify-content-between" style={{ fontSize: '12px', color:"#292929" }}>
                                                <span data-testid="skill-name" className="flex-grow-1">{skill.name}</span>
                                                <button data-testid="delete-skill" type="button" className="border-0 bg-gray-500 btn-sm" style={{color:"#292929"}} onClick={() => handleClickDelete(skill?.id)}>
                                                X
                                                </button>
                                            </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div> :
                            list?.map((info, key) => 
                            <div key={key} className="d-flex gap-4 align-items-start pb-3">
                                <i className={`bi bi-${iconClass} bg-gray-100 py-2 px-3`} style={{"fontSize": "1.5rem", "color": "gray", "borderRadius": "5px"}}></i>
                                <div>
                                    <div>
                                        <h6 data-testid="title-key" className="card-title mb-5px">{info[titleKey]}</h6>
                                        <small className="card-text">
                                        {info[firstTimeKey] && info[secondTimeKey] ? 
                                            `${info[firstTimeKey]} - ${info[secondTimeKey]}` : 
                                            info[firstTimeKey] ? info[firstTimeKey] : 
                                            info[secondTimeKey] ? info[secondTimeKey] : null
                                        }
                                        </small>
                                        <p data-testid="subtitle-key" className="p-0 mb-2">{info[subtitleKey]}</p>
                                        {
                                            descriptionKey ? 
                                            <div>
                                                <p>{info[descriptionKey]}</p> 
                                            </div> : null
                                        }
                                        {info.credential_url && (
                                            <a 
                                                href={info.credential_url} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                style={{"padding": "0.2rem 0.5rem", "textDecoration": "none", "color": "black", "display": "flex", "alignItems": "center", "gap": "0.5rem", "maxWidth": "70%"}}
                                                className="border border-gray-400 rounded-4 px-3 mb-3">
                                                <span>Mostrar Certificado</span>
                                                <i className="bi bi-arrow-up-right-square"></i>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div style={{marginLeft: "auto"}}>
                                    {
                                        isEdit ? 
                                            <div>
                                                <button data-testid="delete-button" onClick={() => handleClickDelete(list[key]?.id)} className="border-0 bg-white"> 
                                                    <i className="bi bi-trash3" style={{"fontSize": "1.2rem"}}></i>
                                                </button>
                                                <button data-testid="edit-button" onClick={() => handleClickEdit(list[key]?.id, info)} className="border-0 bg-white"> 
                                                    <i className="bi bi-pen" style={{"fontSize": "1.2rem"}}></i> 
                                                </button>
                                            </div> : null
                                    }
                                </div>
                            </div>
                            )
                        }                        
                </div>
            }
            {
                notificationDeleteSuccess ? 
                (
                    <ReactNotifications />
                ) : notificationDeleteError ? 
                <ReactNotifications /> : null
            }
        </div>
    )
}

export default CardPortfolio
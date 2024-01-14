import { selectEditObject, selectEditForm } from "../../reducers/portfolioSlice";
import CustomForm from "../form/customForm";
import { useDispatch, useSelector } from "react-redux";

function ModalAdd({title, description, fields, action, showModalAction, onSubmit, onUpdate, isAbout}) {
    const dispatch = useDispatch()
    const editObject = useSelector(selectEditObject)
    const isEditing = useSelector(selectEditForm)
    return(
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal" role="dialog" style={{"display": "block"}}>
                <div className="w-75 modal-dialog modal-dialog-centered justify-content-center w-50" style={{"transform": "translateX(20%)"}} role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={() => dispatch(showModalAction(false))} type="button" className="close border-0 bg-none" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{"fontSize": "1rem"}}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-4">
                        <p>{description}</p>
                        <CustomForm 
                            fields={fields} 
                            onSubmit={onSubmit} 
                            action={action} 
                            showModalAction={showModalAction}
                            initialValue={isEditing ? editObject: {}}
                            onUpdate={onUpdate}
                            isAbout={isAbout}
                        />
                    </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAdd;
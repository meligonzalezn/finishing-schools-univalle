import CustomForm from "../form/customForm";
import { useDispatch } from "react-redux";

function ModalAdd({title, description, fields, action, showModalAction}) {
    const dispatch = useDispatch()
    return(
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal" role="dialog" style={{"display": "block"}}>
                <div className="modal-dialog modal-dialog-centered justify-content-center w-50" style={{"transform": "translateX(20%)"}} role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button onClick={() => dispatch(showModalAction(false))} type="button" className="close border-0 bg-none" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style={{"fontSize": "1rem"}}>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{description}</p>
                        <CustomForm fields={fields} action={action} showModalAction={showModalAction}/>
                    </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAdd;
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { applyToVacancy } from '../../utils/vacancies-axios';


function ModalApply({ title, description, currentVacancy, applyInfo, defaultContact, showModalAction, setNotify }) {
    /* eslint-disable */
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            phone_number: phoneNumber || '',
            email: email || '',

        },
        onSubmit: async (values) => {
            if (formik.isValid) {
                setLoading(true)
                const applyState = await applyToVacancy(currentVacancy, applyInfo["portfolio"], { phone: formik.values.phone_number, email: formik.values.email })
                setLoading(false)
                if (applyState !== undefined) {
                    setNotify("successful")
                    showModalAction(false)
                } else {
                    setNotify("unsuccessful")
                    showModalAction(false)
                }
            }
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .matches(
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})+$/,
                    "Correo inválido"
                )
                .required("Correo requerido"),
            phone_number: Yup.number()
                .required("Teléfono requerido"),
        }),
        enableReinitialize: true,
    })

    return (
        <>
            <div className="modal-backdrop show"></div>
            <div className="modal" role="dialog" style={{ "display": "block" }}>
                <div className="w-75 modal-dialog modal-dialog-centered justify-content-center w-50" style={{ "transform": "translateX(20%)" }} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button onClick={() => showModalAction(false)} type="button" className="close border-0 bg-none" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" style={{ "fontSize": "1rem" }}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-4">
                            <p>{description}</p>
                            <form>
                                <div class="form-group mb-3">
                                    <label htmlFor="email" style={{ "marginBottom": "0.4rem" }}>  Correo</label>

                                    <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Ingresar email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.email && formik.touched.email ?
                                        <div className="invalid-feedback" style={{ "display": "flex" }}>{formik.errors.email}</div> : null}
                                </div>
                                <div class="form-group mb-3">
                                    <label htmlFor="phoneNumber" style={{ "marginBottom": "0.4rem" }}>Teléfono</label>
                                    <input type="number" class="form-control" id="phoneNumber" name="phone_number" placeholder="Ingresar teléfono" value={formik.values.phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.errors.phone_number && formik.touched.phone_number ?
                                        <div className="invalid-feedback" style={{ "display": "flex" }}>{formik.errors.phone_number}</div> : null}
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" checked={isChecked} onChange={(event) => {
                                        setIsChecked(event.target.checked); formik.setFieldValue("email", localStorage.getItem("user")); formik.setFieldValue("phone_number", defaultContact["phone_number"])
                                    }} class="form-check-input" id="defaultInfo" />
                                    <label class="form-check-label" htmlFor="defaultInfo">Utilizar mi información del sistema</label>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={formik.handleSubmit} disabled={formik.values.email !== '' && formik.values.phone_number !== '' ? false : true}>Aplicar
                                {loading ?
                                    <div className="spinner-border spinner-border-sm" style={{ "margin": "0rem 0.3rem 0rem 0rem" }} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    <></>}</button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalApply;
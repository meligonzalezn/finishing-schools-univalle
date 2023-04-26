import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import CardPortfolio from "../../../components/cards/card";

const PortfolioForm = () => {
    const formik = useFormik({
        initialValues: {
            about: '',
            experience: '',
            education: '',
            certifications: '',
            programmingLanguages: '',
            languages: ''
        },
        validationSchema: {
          email: Yup.string()
            .required('Campo obligatorio'),
          about: Yup.string()
            .required('Campo obligatorio'),
          experience: Yup.mixed().optional(),
          education: Yup.string().optional(),
          certifications: Yup.string().optional(),
          programmingLanguages: Yup.string().optional(),
          languages: Yup.string().optional(),
        }
    })
    return (
        <div className="panel panel-inverse" data-sortable-id="form-stuff-1" style={{"maxWidth": "900px", "justifyContent": "center", "margin": "auto"}}>
        <div className="panel-heading bg-gray-700" style={{"display": "block"}}>
            <h4 className="panel-title" style={{"fontSize": "14px"}}>Portafolio</h4>
        </div>
        <div className="panel-body">
            <p>Por favor, proporcione la siguiente información para ayudarnos a comprender mejor su experiencia y habilidades profesionales. Esta información nos permitirá brindarle una mejor experiencia y hacer coincidir oportunidades de trabajo relevantes con su perfil. Toda la información proporcionada será tratada con confidencialidad y solo se utilizará con fines relacionados con nuestros servicios.</p>
            <form>
                <div className="row">
                    <div className="col">
                        <label className="form-label col-form-label col-md-3">Sobre mi</label>
                        <textarea type="text" className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="form-label col-form-label col-md-3">Experiencia Laboral</label>
                        <CardPortfolio title="Company Name" subtitle="9 meses" small="Software Developer"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="form-label col-form-label col-md-3">Educación</label>
                        <CardPortfolio title="University" subtitle="2018-2023" small="Ingeniería de sistemas"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label className="form-label col-form-label col-md-3">Licencias y certificaciones</label>
                        <CardPortfolio title="Certificado" subtitle="Coursera" small="issued Mar 2023"/>
                    </div>
                </div>
                <div style={{"marginTop": "2rem"}}>
                    <button type="submit" className="btn btn-primary w-100px me-5px">Guardar</button>
                    <button type="submit" className="btn btn-gray w-100px me-5px">Actualizar
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default PortfolioForm;
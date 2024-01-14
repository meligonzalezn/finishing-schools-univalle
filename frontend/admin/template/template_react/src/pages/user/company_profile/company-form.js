import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import ProfileImage from '../../../assets/img/profile/user-image-default.png'
import { ReactNotifications, Store } from 'react-notifications-component';

import ReactTags from 'react-tag-autocomplete';
import { getCompanyData, registerCompanyData, updateCompanyData } from '../../../utils/company-axios';
import "../styles/tags.css"


const CompanyForm = () => {
    const [name, setName] = useState("")
    const [idCard, setIdCard] = useState("")
    const [image, setImage] = useState("")
    const [website, setWebsite] = useState("")
    const [aboutUs, setAboutUs] = useState("")
    const [fields, setFields] = useState("")
    const [size, setSize] = useState("")
    const [office, setOffice] = useState("")
    const [specialties, setSpecialties] = useState([])
    const [isFilled, setIsFilled] = useState(false)
    const [infoLoaded, setInfoLoaded] = useState(true)
    const [infoSaved, setInfoSaved] = useState(false)
    const [infoUpdated, setInfoUpdated] = useState(false)
    const [imageChanged, setImageChanged] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [address, setAddress] = useState("")
     // eslint-disable-next-line no-unused-vars
    const [city, setCity] = useState("")
    const [locations, setLocations] = useState([])

    const handleDelete = (i) => {
        const newTags = [...specialties];
        newTags.splice(i, 1);
        setSpecialties(newTags);
    };

    const handleAddition = (tag) => {
        const newTags = [...specialties, tag];
        console.log(newTags)
        setSpecialties(newTags);
    };

    /**
     * Default options for warning, success and error messages
     */
    const defaultOptions = {
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
            duration: 3000
        },
    }
    const formik = useFormik({
        initialValues: {
            companyName: name || '',
            idCard: idCard || '',
            image: image || '',
            website: website || '',
            aboutUs: aboutUs || '',
            fields: fields || '',
            size: size || '',
            office: office || '',
            isFilled: isFilled || false,
            address: address || '',
            city: city || '',
        },
        onSubmit: async (values) => {
            if (formik.isValid) {
                setInfoSaved(true)
                let companyLocations = locations
                if (values.address !== "" || values.city !== "") {
                    companyLocations.push({ address: values.address, city: values.city })
                }
                companyLocations = companyLocations.map((obj) => {
                    return JSON.stringify(obj);
                });

                let companySpecialties = specialties.map((obj) => {
                    return obj.name;
                });
                const companyData = {
                    company: {
                    aboutUs: values.aboutUs,
                    locations: companyLocations,
                    companyName: values.companyName,
                    fields: values.fields,
                    NIT: values.idCard,
                    image: values.image,
                    office: values.office,
                    size: values.size,
                    website: values.website,
                    specialties: companySpecialties
                    }
                }
                console.log(companyData)
                const response = await registerCompanyData(companyData)
                if (response?.status === 200) {
                //if(true){
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Register Success",
                        message: "Información guardada",
                        type: "success",
                        ...defaultOptions
                    });
                }
                else {
                    setInfoSaved(false)
                    Store.addNotification({
                        title: "Error",
                        message: "Error guardando la información",
                        type: "danger",
                        ...defaultOptions
                    });
                }
            }
        },
        validationSchema: Yup.object({
            companyName: Yup.string()
                .required('Campo obligatorio'),
            idCard: Yup.string()
                .required('Campo obligatorio'),
            image: Yup.mixed().optional(),
            website: Yup.string().optional(),
            aboutUs: Yup.string().optional(),
            fields: Yup.string().optional(),
            size: Yup.string().optional(),
            office: Yup.string().optional(),
            address: Yup.string().optional(),
            city: Yup.string().optional(),
        }),
        enableReinitialize: true,
    })

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            const companyData = await getCompanyData();
            setName(localStorage.getItem("user_name"));
            if (companyData !== "unregistered"){
                try { 
                    let locations = companyData["locations" ]
                    locations = locations.map((obj) => {
                        return JSON.parse(obj);
                    });
    
                    let specialties = companyData["specialties"]
                    specialties = specialties.map((obj) => {
                        return { id: undefined, name: obj};
                    });
                    console.log(specialties)
                    if (companyData) {
                        setIdCard(companyData["NIT"])
                        setImage(companyData["image"])
                        setWebsite(companyData["website"])
                        setAboutUs(companyData["aboutUs"])
                        setFields(companyData["fields"])
                        setSize(companyData["size"])
                        setOffice(companyData["office"])
                        setSpecialties(specialties)
                        setLocations(locations)
                    }
                    setIsFilled(true)
                    setInfoLoaded(true)
                } catch (error) {
                    Store.addNotification({
                        title: "Error",
                        message: "Error obteniendo la información",
                        type: "danger",
                        ...defaultOptions
                    });
                    setIsFilled(true)
                    setInfoLoaded(true)
                }
            }
            
        };
        fetchCompanyInfo();
        // eslint-disable-next-line
    }, [name, isFilled]);

    const handleUpdateCompany = async (event) => {
        event.preventDefault();
        if (formik.isValid) {
            setInfoUpdated(true)
            let companyLocations = locations
            if (formik.values.address !== "" || formik.values.city !== "") {
                companyLocations.push({ address: formik.values.address, city: formik.values.city })
            }
            companyLocations = companyLocations.map((obj) => {
                return JSON.stringify(obj);
            });
            let companySpecialties = specialties.map((obj) => {
                return obj.name;
            });
            const companyData = {
                company: {
                aboutUs: formik.values.aboutUs,
                locations: companyLocations,
                companyName: formik.values.companyName,
                fields: formik.values.fields,
                NIT: formik.values.idCard,
                image: formik.values.image,
                office: formik.values.office,
                size: formik.values.size,
                website: formik.values.website,
                specialties: companySpecialties
                }
            }
            console.log("data", companyData)
            const response = await updateCompanyData(companyData, imageChanged)
            if (response?.status === 200) {
                setInfoUpdated(false)
                Store.addNotification({
                    title: "Register Success",
                    message: "Información actualizada",
                    type: "success",
                    ...defaultOptions
                });
            }
            else {
                setInfoUpdated(false)
                Store.addNotification({
                    title: "Error",
                    message: "Error actualizando la información",
                    type: "danger",
                    ...defaultOptions
                });
            }
        }
    }

    return (
        <div>
            {
                infoLoaded ? (
                    <div className="panel panel-inverse" data-sortable-id="form-stuff-1" style={{ "maxWidth": "900px", "justifyContent": "center", "margin": "auto" }}>
                        <div className="panel-heading bg-gray-700" style={{ "display": "block" }}>
                            <h4 className="panel-title" style={{ "fontSize": "14px" }}>Formulario de perfil</h4>
                        </div>
                        <div className="panel-body">
                            <form autoComplete="off">
                                <div className='col' style={{ "display": "flex", "gap": "2rem" }}>
                                    <img src={image ? "https://res.cloudinary.com/dlhcdji3v/" + image : ProfileImage} style={{ "width": "10rem", "height": "10rem" }} alt="Perfil" className="rounded-circle img-fluid" />
                                    <div style={{ "display": "flex", "gap": "0.5rem", "justifyContent": "center", "flexDirection": "column" }}>
                                        <label className="form-label">Carga una imagen de perfil</label>
                                        <input
                                            id="formFile"
                                            name='image'
                                            className="form-control"
                                            type="file"
                                            onChange={(event) => {
                                                formik.setFieldValue('image', event.target.files[0]);
                                                setImageChanged(true);
                                            }}
                                            onBlur={formik.handleBlur}
                                            accept='.png, .jpg, jpeg'
                                        />
                                        <p>
                                            El tamaño máximo de archivo permitido es de 200 KB
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <label className="form-label col-form-label col-md-3">Nombre <span className="text-danger">*</span></label>
                                        <input
                                            name="companyName"
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre de empresa"
                                            value={formik.values.companyName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={name?.length !== 0 ? true : false}
                                        />
                                        {formik.errors.name && formik.touched.name ?
                                            <div className="invalid-feedback" style={{ "display": "flex" }}>{formik.errors.name}</div> : null}
                                    </div>
                                    <div className="col">
                                        <label className="form-label col-form-label"> NIT <span className="text-danger">*</span></label>
                                        <input
                                            name="idCard"
                                            type="text"
                                            className="form-control"
                                            placeholder="NIT"
                                            value={formik.values.idCard}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.idCard && formik.touched.idCard ?
                                            <div className="invalid-feedback" style={{ "display": "flex" }}>{formik.errors.idCard}</div> : null}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3">Sobre nosotros </label>
                                        <textarea
                                            name="aboutUs"
                                            type="text"
                                            className="form-control"
                                            value={formik.values.aboutUs}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            style={{"resize":"none", "height":"6rem"}}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3"> Sede </label>
                                        <input
                                            name='office'
                                            type="text"
                                            className="form-control"
                                            value={formik.values.office}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-4"> Tamaño de la empresa </label>
                                        <input
                                            name='size'
                                            type="text"
                                            className="form-control"
                                            value={formik.values.size}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3"> Sectores </label>
                                        <input
                                            name='fields'
                                            type="text"
                                            className="form-control"
                                            value={formik.values.fields}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3"> Sitio web</label>
                                        <input
                                            name='website'
                                            type="text"
                                            className="form-control"
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <label className="form-label col-form-label col-md-3"> Ubicación </label>
                                        <input
                                            name='address'
                                            type="text"
                                            className="form-control"
                                            placeholder='Dirección'
                                            value={formik.values.address}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className="col-5">
                                        <label className="form-label col-form-label col-md-3" style={{ "visibility": "hidden" }}> Ciudad </label>
                                        <input
                                            name='city'
                                            type="text"
                                            className="form-control"
                                            placeholder='Ciudad'
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3" style={{ "visibility": "hidden" }}> + </label>
                                        <button
                                            type='button'
                                            className="btn btn-light w-120px me-5px d-flex justify-content-center align-items-center" style={{ "gap": "0.5rem"  , "color": "#444", "padding": "1px 6px" }}
                                            onClick={(e) => {
                                                if (formik.values.address !== "" || formik.values.city !== "") {
                                                    setLocations([...locations, { address: formik.values.address, city: formik.values.city }])
                                                    formik.values.address = ""
                                                    formik.values.city = ""
                                                }
                                            }}>
                                            <i class="bi bi-plus-square-dotted" style={{ "font-size": "1.1rem" }}></i>
                                        </button>
                                    </div>
                                </div>
                                {locations.map((location, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-6">
                                            <label style={{ "visibility": "hidden" }}> Ubicación </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={location.address}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <label style={{ "visibility": "hidden" }}> Ciudad </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={location.city}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col">
                                            <label style={{ "visibility": "hidden" }}> x </label>
                                            <button
                                                type='button'
                                                className="btn btn-light w-120px me-5px d-flex justify-content-center align-items-center"style={{ "gap": "0.5rem"  , "color": "#444", "padding": "1px 6px" }}
                                                onClick={(e) => { setLocations([...locations.slice(0, index), ...locations.slice(index + 1)]) }}>
                                                <i class="bi bi-dash-square-dotted" style={{ "font-size": "1.1rem" }}></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label col-form-label col-md-3" > Especialidades </label>
                                        <ReactTags tags={specialties} onDelete={handleDelete} onAddition={handleAddition} allowNew={true}
                                        className="react-tags__selected-tag"  />
                                    </div>
                                </div>
                                <div style={{ "marginTop": "2rem", "display": "flex", "justifyContent": "right" }}>
                                    <div className='d-flex'>
                                        {
                                            isFilled ? (
                                                <button
                                                    onClick={(event) => handleUpdateCompany(event)}
                                                    className="btn btn-primary w-120px me-5px d-flex justify-content-center align-items-center" style={{ "gap": "0.5rem" }}>
                                                    Actualizar
                                                    {
                                                        infoUpdated ? (
                                                            <div className="spinner-border" role="status" style={{ "width": "1rem", "height": "1rem" }}>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                        )
                                                            : null
                                                    }
                                                </button>
                                            ) :
                                                (
                                                    <button
                                                        type='submit'
                                                        onClick={formik.handleSubmit}
                                                        disabled={isFilled ? true : false}
                                                        className="btn btn-success w-120px me-5px d-flex justify-content-center align-items-center" style={{ "gap": "0.5rem" }}>
                                                        Guardar
                                                        {
                                                            infoSaved ? (
                                                                <div className="spinner-border" role="status" style={{ "width": "1rem", "height": "1rem" }}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </button>
                                                )
                                        }
                                    
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div style={{ transform: "translate(0, 1000%)" }} className="d-flex justify-content-center align-items-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }
            <ReactNotifications />
        </div>
    )
}
export default CompanyForm;
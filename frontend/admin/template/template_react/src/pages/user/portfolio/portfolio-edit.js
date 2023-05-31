import { useSelector } from "react-redux";
import CardPortfolio from "../../../components/cards/card";
import ModalAdd from "../../../components/modal/modalAdd";
import { ReactNotifications } from 'react-notifications-component';
import { selectExperience, selectIsEditing, 
        selectEducation, selectShowModalEditExperience, 
        selectShowModalEditEducation, setShowModalEditEducation, 
        setShowModalEditExperience, setUpdateExperience, 
        setUpdateEducation, selectCertifications, 
        setShowModalEditCertifications, setUpdateCertification, 
        selectShowModalEditCertifications,
        selectShowModalEditLanguages, setShowModalEditLanguages, selectLanguages, setUpdateLanguage, deleteLanguages, deleteExperience, deleteEducation, deleteCertification, selectShowNotificationUpdateSuccess, selectShowNotificationUpdateError, selectShowNotificationDeleteSuccess, selectShowNotificationDeleteError } from "../../../reducers/portfolioSlice";
import { experienceFields, studiesFields, certificationsLicensesFields, languagesFields } from "./fields";
import { useNavigate } from "react-router-dom";
import { deleteCertificationsLicensesBack, deleteEducationBack, deleteExperienceBack, deleteLanguagesBack, updateCertificationsLicenses, updateEducation, updateExperience, updateLanguages } from "../../../utils/portfolio-axios";


const PortfolioEdit = () => {
    const navigate = useNavigate()
    const experience = useSelector(selectExperience)
    const education = useSelector(selectEducation)
    const certifications = useSelector(selectCertifications)
    const languages = useSelector(selectLanguages)
    const isEditing = useSelector(selectIsEditing)
    const showModalEditExperience = useSelector(selectShowModalEditExperience)
    const showModalEditEducation = useSelector(selectShowModalEditEducation)
    const showModalEditCertifications = useSelector(selectShowModalEditCertifications)
    const showModalEditLanguages = useSelector(selectShowModalEditLanguages)
    const showNotificationUpdateSuccess = useSelector(selectShowNotificationUpdateSuccess)
    const showNotificationUpdateError = useSelector(selectShowNotificationUpdateError)
    const showNotificationDeleteSuccess = useSelector(selectShowNotificationDeleteSuccess)
    const showNotificationDeleteError = useSelector(selectShowNotificationDeleteError)

    return (
        <div style={{"maxWidth": "900px", "justifyContent": "center", "margin": "auto"}}>
            {
                isEditing === "experience" && (
                    <div className="bg-white p-4">
                        <h4 className="d-flex align-items-center gap-3 mb-3">
                            <button onClick={() => {navigate("/user/student/portfolio")}} className="border-0 bg-white">
                                <i className="bi bi-arrow-left-circle" style={{"fontSize": "1.5rem"}}></i>
                            </button>
                            Experiencia
                        </h4>  
                        <CardPortfolio
                            list={experience}
                            titleKey="company_name"
                            timeKey="experience_time"
                            firstTimeKey="start_date"
                            secondTimeKey="end_date"
                            descriptionKey="description"
                            workExperience={true}
                            isEdit={true}
                            type={isEditing}
                            setShowModalAction={setShowModalEditExperience}
                            deleteAction={deleteExperience}
                            deleteFunction={deleteExperienceBack}
                        />
                    </div>
                )
            }
            {
                showModalEditExperience ? 
                (
                    <ModalAdd 
                        title={"Editar experiencia"} 
                        description={"Por favor, completa los siguientes campos para editar la información de la experiencia:"} 
                        fields={experienceFields} 
                        action={setUpdateExperience}
                        showModalAction={setShowModalEditExperience}
                        onUpdate={updateExperience}
                    />
                ): null
            }
            {
                isEditing === "education" && (
                    <div className="bg-white p-4">
                        <h4 className="d-flex align-items-center gap-3 mb-3">
                            <button onClick={() => {navigate("/user/student/portfolio")}} className="border-0 bg-white">
                                <i className="bi bi-arrow-left-circle" style={{"fontSize": "1.5rem"}}></i>
                            </button>
                            Educación
                        </h4>  
                        <CardPortfolio
                            list={education}
                            titleKey="degree"
                            firstTimeKey="start_date"
                            secondTimeKey="end_date"
                            subtitleKey="school"
                            iconClass="mortarboard"
                            descriptionKey="description"
                            workExperience={false}
                            isEdit={true}
                            type={isEditing}
                            setShowModalAction={setShowModalEditEducation}
                            deleteAction={deleteEducation}
                            deleteFunction={deleteEducationBack}
                        />
                    </div>
                )
            }
            {
                showModalEditEducation ? 
                (
                    <ModalAdd 
                        title={"Editar educación"} 
                        description={"Por favor, completa los siguientes campos para editar la información de la educación:"} 
                        fields={studiesFields} 
                        action={setUpdateEducation}
                        showModalAction={setShowModalEditEducation}
                        onUpdate={updateEducation}
                    />
                ): null
            }
            {
                isEditing === "certifications" && (
                    <div className="bg-white p-4">
                        <h4 className="d-flex align-items-center gap-3 mb-3">
                            <button onClick={() => {navigate("/user/student/portfolio")}} className="border-0 bg-white">
                                <i className="bi bi-arrow-left-circle" style={{"fontSize": "1.5rem"}}></i>
                            </button>
                            Certificaciones & Licencias
                        </h4>  
                        <CardPortfolio
                            list={certifications}
                            titleKey="name"
                            firstTimeKey="issue_date"
                            secondTimeKey="expiration_date"
                            subtitleKey="organization"
                            iconClass="award"
                            workExperience={false}
                            isEdit={true}
                            type={isEditing}
                            setShowModalAction={setShowModalEditCertifications}
                            deleteAction={deleteCertification}
                            deleteFunction={deleteCertificationsLicensesBack}
                        />
                    </div>
                )
            }
            {
                showModalEditCertifications ? 
                (
                    <ModalAdd 
                        title={"Editar certificaciones & licencias"} 
                        description={"Por favor, completa los siguientes campos para editar la información de las certificaciones y licencias:"} 
                        fields={certificationsLicensesFields} 
                        action={setUpdateCertification}
                        showModalAction={setShowModalEditCertifications}
                        onUpdate={updateCertificationsLicenses}
                    />
                ): null
            }
            {
                isEditing === "languages" && (
                    <div className="bg-white p-4">
                        <h4 className="d-flex align-items-center gap-3 mb-3">
                            <button onClick={() => {navigate("/user/student/portfolio")}} className="border-0 bg-white">
                                <i className="bi bi-arrow-left-circle" style={{"fontSize": "1.5rem"}}></i>
                            </button>
                            Idiomas
                        </h4>  
                        <CardPortfolio
                            list={languages}
                            titleKey="language"
                            subtitleKey="proficiency"
                            iconClass="translate"
                            workExperience={false}
                            isEdit={true}
                            type={isEditing}
                            setShowModalAction={setShowModalEditLanguages}
                            deleteAction={deleteLanguages}
                            deleteFunction={deleteLanguagesBack}
                        />
                    </div>
                )
            }
            {
                showModalEditLanguages ? 
                (
                    <ModalAdd 
                        title={"Editar idiomas"} 
                        description={"Por favor, completa los siguientes campos para editar la información de idiomas:"} 
                        fields={languagesFields} 
                        action={setUpdateLanguage}
                        showModalAction={setShowModalEditLanguages}
                        onUpdate={updateLanguages}
                    />
                ): null
            }
            {
                showNotificationUpdateSuccess ? 
                <ReactNotifications /> : null
            }
            {
                showNotificationUpdateError ? 
                <ReactNotifications /> : null
            }
            {
                showNotificationDeleteSuccess ? 
                <ReactNotifications /> : null
            }
            {
                showNotificationDeleteError ? 
                <ReactNotifications /> : null
            }
        </div>
    )
}


export default PortfolioEdit;
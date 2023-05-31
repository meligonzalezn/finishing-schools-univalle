const descriptionField = [
    {
        name: "description",
        label: "Descripción",
        required: true,
        specialField: true,
    }
]

const experienceFields = [
    {
        name: "roles",
        label: 'Rol o roles*',
        type: 'text',
        required: true,
        specialField: false,
    },
    {
        name: "company_name",
        label: "Empresa*",
        type: 'text',
        required: true,
        specialField: false,
    },
    {
        name:"experience_time",
        label: "Tiempo de experiencia",
        type: "text",
        specialField: false,
    },
    {
        name: "start_date",
        label: "Fecha de inicio",
        type: "start_date",
        specialField: false,
    },
    {
        name: "end_date",
        label: "Fecha de finalización",
        type: "end_date",
        specialField: false,
    },
    {
        name: "description",
        label: "Descripción",
        type: "textarea",
        specialField: false,
    },
]

const studiesFields = [
    {
        name: "degree", 
        label: "Título", 
        type: "text", 
        specialField: false,
    },
    {
        name: "school",
        label: "Academia*",
        type: "text",
        required: true,
        specialField: false,

    },
    {
        name: "start_date",
        label: "Fecha de inicio",
        type: "start_date",
        specialField: false,
    },
    {
        name: "end_date",
        label: "Fecha de finalización",
        type: "end_date",
        specialField: false,
    },
    {
        name: "description",
        label: "Descripción", 
        type: "textarea",
        specialField: false,
    }
]

const certificationsLicensesFields = [
    {
        name: "name",
        label: "Nombre*",
        type: "text",
        required: true,
        specialField: false,
    },
    {
        name: "organization",
        label: "Organización*",
        type: "text",
        required: true,
        specialField: false,
    },
    {
        name: "issue_date",
        label: "Fecha de expedición",
        type: "start_date",
        specialField: false,
    },
    {
        name: "expiration_date",
        label: "Fecha de expiración",
        type: "end_date",
        specialField: false,
    }, 
    {
        name: "credential_url",
        label: "URL de certificado/licencia",
        type: "text",
        specialField: false,
    }
]
 
const skillsFields = [
    {
        name: "skills",
        label: "Competencias",
        type: "text",
        required: true,
        specialField: false,
    }
]

const languagesFields = [
    {
        name: "language",
        label: "Idioma*", 
        type: "text", 
        required: true,
        specialField: false,
    },
    {
        name: "proficiency", 
        label: "Proficiencia" ,
        type: "select",
        specialField: false,
        options : [
            {value: "Nivel básico", label: "Proficiencia básica"},
            {value: "Nivel intermedio", label: "Proficiencia intermedia"},
            {value: "Nivel avanzado ", label: "Nivel avanzado"},
            {value: "Nativo o bilingue", label: "Nativo o bilingue"}
        ]
    }
]

const monthsOptions = [
    {label: "Enero", value: "Enero"},
    {label: "Febrero", value: "Febrero"},
    {label: "Marzo", value: "Marzo"},
    {label: "Abril", value: "Abril"},
    {label: "Mayo", value: "Mayo"},
    {label: "Junio", value: "Junio"},
    {label: "Julio", value: "Julio"},
    {label: "Agosto", value: "Agosto"},
    {label: "Septiembre", value: "Septiembre"},
    {label: "Octubre", value: "Octubre"},
    {label: "Noviembre", value: "Noviembre"},
    {label: "Diciembre", value: "Diciembre"}
]

export { descriptionField,experienceFields, studiesFields, certificationsLicensesFields, skillsFields, languagesFields, monthsOptions}
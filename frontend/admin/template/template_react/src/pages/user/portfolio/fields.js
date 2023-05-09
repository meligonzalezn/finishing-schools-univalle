const experienceFields = [
    {
        name: "roles",
        label: 'Rol o roles*',
        type: 'text',
        required: true,
    },
    {
        name: "company_name",
        label: "Empresa*",
        type: 'text',
        required: true,
    },
    {
        name:"experience_time",
        label: "Tiempo de experiencia",
        type: "text"
    },
    {
        name: "description",
        label: "Descripción",
        type: "textarea"
    }
]

const studiesFields = [
    {
        name: "degree", 
        label: "Título", 
        type: "text", 
    },
    {
        name: "school",
        label: "Academia*",
        type: "text",
        required: true,

    },
    {
        name: "start_date",
        label: "Fecha de inicio",
        type: "date",
    },
    {
        name: "end_date",
        label: "Fecha de finalización",
        type: "date"
    },
    {
        name: "description",
        label: "Descripción", 
        type: "textarea"
    }
]


export {experienceFields, studiesFields}
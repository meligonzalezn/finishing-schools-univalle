import "./styles/card.css"
const CardPortfolio = ({list, titleKey, firstTimeKey, secondTimeKey, subtitleKey, descriptionKey, iconClass, workExperience }) => {
    return (
        <div className="card border-0" >
            {
                workExperience ? 
                    list?.map((info, key) =>
                    <div key={key} className="stepper d-flex flex-column mt-2 ml-2" style={{"paddingLeft": "1rem"}}>
                        <div className="d-flex mb-1 gap-3">
                            <div className="d-flex flex-column pr-4 align-items-center">
                                <div className="rounded-circle bg-gray-400 text-white mb-1" style={{"width": "0.5rem", "height": "0.6rem"}}></div>
                                <div className="line h-100"></div>
                            </div>
                            <div className="mb-4 d-flex flex-column gap-1">
                                <h6 className="mb-0">{info[titleKey]}</h6>
                                <small>{info[firstTimeKey]}</small>
                                <p className="mb-1">{info[descriptionKey]}</p>
                                <div style={{"display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", "gap": "0.5rem"}}>
                                    {
                                        info["roles"]?.map((role, key) =>
                                            <span key={key} className="badge bg-gray-500" style={{"fontSize": "12px"}}>{role}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                : 
                <div className="card-body">
                        {
                            list?.map((info, key) => 
                            <div key={key} className="d-flex gap-4 align-items-start">
                                <i className={`bi bi-${iconClass} bg-gray-100 py-2 px-3`} style={{"fontSize": "1.5rem", "color": "gray", "borderRadius": "5px"}}></i>
                                <div>
                                    <h6 className="card-title mb-5px">{info[titleKey]}</h6>
                                    <small className="card-text">
                                    {info[firstTimeKey] && info[secondTimeKey] ? 
                                        `${info[firstTimeKey]} - ${info[secondTimeKey]}` : 
                                        info[firstTimeKey] ? info[firstTimeKey] : 
                                        info[secondTimeKey] ? info[secondTimeKey] : null
                                    }
                                    </small>
                                    <p>{info[subtitleKey]}</p>
                                    {
                                        descriptionKey ? 
                                        <div>
                                            <p>{info[descriptionKey]}</p> 
                                        </div> : null
                                    }
                                </div>
                            </div>
                            )
                        }
                </div>
            }
        </div>
    )
}

export default CardPortfolio
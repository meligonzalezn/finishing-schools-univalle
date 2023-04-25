const CardPortfolio = ({title, subtitle, small}) => {
    return (
        <div className="card border-0">
            <div className="card-body">
                <h4 className="card-title mb-10px">{title}</h4>
                <p className="card-text">{subtitle}</p>
                <small>{small}</small>
            </div>
        </div>
    )
}

export default CardPortfolio
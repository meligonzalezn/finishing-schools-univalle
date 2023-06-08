import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import "./searchVacancies.css";
import numeral from 'numeral';
import DatePicker from 'react-datepicker';
import { Collapse } from 'react-bootstrap';
import { getInfoToApply} from '../../utils/vacancies-axios';
import ModalApply from '../../components/modal/applyModal';
import { ReactNotifications, Store } from 'react-notifications-component';

const VacanciesSearch = () => {
	/* eslint-disable */
	
	const [data, setData] = useState([
		{
			id:1,        name: "Desarrollador frontend", company: "Perficient", description: "Familiaridad con los distintos frameworks, horarios flexibles, salario negociable", salary: "1700000", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at:"2023-05-22 02:26:56.61116+00"
		},
		{
			id:2, name: "Full-stack developer", company: "Perficient", description: "Pana trabajador", salary: "1700000", modality: "Presencial",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at: "2023-05-22 02:26:56.61116+00"
		},
		{
			id:3, name: "Desarrollador backend", company: "Perficient", description: "Pana trabajador", salary: "Adivine", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at:"2023-05-22 02:26:56.61116+00"
		},
		{
			id:4, name: "Desarrollador frontend4", company: "Perficient", description: "Pana trabajador", salary: "1300000", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at: "2023-05-22 02:26:56.61116+00"
		},
		{
			id:5, name: "Desarrollador frontend5", company: "Perficient", description: "Pana trabajador", salary: "2000001", modality: "Presencial", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año", keywords: "Ingraestructura cloud, TDD", created_at: "2023-05-22 02:26:56.61116+00"
		},
		{
			id:6, name: "Desarrollador frontend6", company: "Perficient", description: "Pana trabajador", salary: "Adivine", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD, backend", created_at: "2023-05-22 02:26:56.61116+00"
		},
		{
			id:7, name: "Especialista en infraestructura", company: "Perficient", description: "Pana trabajador", salary: "Adivine", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at:"2023-06-21 02:26:56.61116+00"
		},
		{
			id:8, name: "Desarrollador frontend8", company: "Perficientback", description: "Pana trabajador", salary: "Adivine", modality: "Virtual", place: " United State, BY 10089 ",
			contract: "Prestación de servicios", experience: "1 año de experiencia", keywords: "Ingraestructura cloud, TDD", created_at: "2023-06-22 02:26:56.61116+00"
		},

	])
	const [vacancies, setVacancies] = useState(data)

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(3);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = vacancies.slice(indexOfFirstPost, indexOfLastPost);
	const [currentVacancy, setCurrentVacany] = useState(currentPosts[0])
	const [applyInfo, setApplyInfo] = useState("")

	const [filter, setFilter] = useState(false);

	const [minSalary, setMinSalary] = useState("$ ")
	const [maxSalary, setMaxSalary] = useState("$ ")
	const [modality, setModalty] = useState("Todas")
	const [experience, setExperience] = useState("--------")
	const [startDate, setStartDate] = useState("")
	const [finishDate, setFinishDate] = useState("")
	const [search, setSearch] = useState("")

	const [isApplying, setIsApplying] = useState(false)
	const [notify, setNotify] = useState("")
	

	const paginate = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

	const searchVacancies = () => {

		let filteredData = data.filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase()) || item.company.toLowerCase().includes(search.toLowerCase())
			|| item.description.toLowerCase().includes(search.toLowerCase()) || item.keywords.toLowerCase().includes(search.toLowerCase())
		);
		let auxMinSalary = minSalary.replace("$ ", "");
		auxMinSalary = auxMinSalary.replace("$", "");
		auxMinSalary = auxMinSalary.replaceAll(",", "");
		auxMinSalary = Number(auxMinSalary)

		let auxMaxSalary = maxSalary.replace("$ ", "");
		auxMaxSalary = auxMaxSalary.replace("$", "");
		auxMaxSalary = auxMaxSalary.replaceAll(",", "");
		auxMaxSalary = Number(auxMaxSalary)

		if (modality !== "Todas") {
			filteredData = filteredData.filter((item) =>
				item.modality.toLowerCase().includes(modality.toLowerCase())

			);
		}
		if (auxMinSalary !== 0) {
			filteredData = filteredData.filter((item) =>

				Number(item.salary) >= auxMinSalary

			);
		}
		if (auxMaxSalary !== 0) {
			filteredData = filteredData.filter((item) =>

				Number(item.salary) <= auxMaxSalary

			);
		}
		if (experience !== "--------") {
			
			filteredData = filteredData.filter((item) =>
				item.experience.toLowerCase().includes(experience.toLowerCase())

			);
		}
		console.log(startDate, finishDate)
		if (startDate !== "" || startDate !== null ) {
			filteredData = filteredData.filter((item) =>
				
				formatDate(item.created_at) >= formatDate(startDate)
			);

		}
		if (finishDate !== "" || finishDate !== null ) {
			filteredData = filteredData.filter((item) =>
				
				formatDate(item.created_at) <= formatDate(finishDate)
			);

		}

		setVacancies(filteredData)
	};

	const formatCurrency = (value) => {

		let number = value.replace("$ ", "");
		number = number.replace("$", "");
		number = number.replaceAll(",", "");
		number = Number(number)
		return "$ " + numeral(number).format('0,0')

	}

	const formatDate = (value) => {

		const date = new Date(value);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
		return formattedDate

	}

	

	const defaultOptions = {
        container: 'bottom-left',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000
        },
    }

	useEffect(() => {
		if(applyInfo === ""){
			getInfoToApply().then((res)=> {
				if(res === undefined){
					setApplyInfo({})
				}
				else{
					setApplyInfo(res)
					console.log(res)
				}
				
			})
		}
		if(notify !== ""){
			if(notify === "successful"){
				
				Store.addNotification({
                    title: "Success",
                    message: "Tu solicitud se registró con exito",
                    type: "success",
                    ...defaultOptions
                });
				setNotify("")
				  
			}
			else{
				Store.addNotification({
					title: "Error",
					message: "Por favor, intenta nuevamente",
					type: "danger",
					...defaultOptions
				});
				setNotify("")

			}
		}
        
      }, [applyInfo, notify]);

	return (
		<div>
			<h1 className="page-header">Consultar vacantes <small> {vacancies.length} resultados</small></h1>
			<div className="row">
				<div className="col-md-6">
					<div className="input-group input-group-lg mb-3">
						<input type="text" className="form-control input-white" placeholder="Ingresa palabras clave" value={search} onChange={(e) => setSearch(e.target.value)} />
						<button id="searchButton"  type="button" className="btn btn-primary" onClick={(e) => searchVacancies()}><i className="fa fa-search fa-fw"></i> Buscar </button>

					</div>
					<div className="d-block d-md-flex align-items-center mb-3">
						<div class="card flex-grow-1" >
							<div class="card-header d-flex justify-content-between" >
								<b style={{ "fontSize": "0.8rem" }}>  Filtrar por </b>
								<a
									id="expandDropdown"
									className='btn btn-outline-dark'
									onClick={() => setFilter(!filter)}
									aria-expanded={filter}
									aria-controls="filter"
									style={{ "padding": "0.2rem 0.3rem" , "borderColor": "darkgray" }}
								>
									<i class="bi bi-caret-down-fill"></i>
								</a>
							</div>
							<Collapse in={filter}>
								<div
									id="filter"
								>
									<div class="card-body">
										<div className="d-flex">
											<div style={{ "paddingRight": "0.6rem" }}>
												<label className="form-label col-form-label"> Modalidad </label>
												<div id="modalityDropdown" className="dropdown me-2" >
													<button id="modalityButton"  className="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
														{modality} <b className="caret"></b>
													</button>
													<div id="modalityOptions" className="dropdown-menu dropdown-menu-start" role="menu">
														<p className="dropdown-item" onClick={(e) => setModalty(e.target.textContent)}>Presencial</p>
														<p className="dropdown-item" onClick={(e) => setModalty(e.target.textContent)}>Virtual</p>
														<p className="dropdown-item" onClick={(e) => setModalty(e.target.textContent)}>Híbrido</p>
														<p className="dropdown-item" onClick={(e) => setModalty(e.target.textContent)}>Todas</p>
													</div>
												</div>
											</div>

											<div style={{ "paddingRight": "0.6rem" }}>
												<label className="form-label col-form-label"> Salario </label>
												<input
													id="salaryMinimum"
													type="text"
													className="form-control"
													style={{ "maxWidth": "10.4rem" }}
													value={minSalary}
													onChange={(e) => setMinSalary(
														formatCurrency(e.target.value)
													)}


												/>

											</div>
											<div style={{ "display": "flex", "alignItems": "center" }}>
												<i class="bi bi-dash" style={{ "fontSize": "1.6rem", "paddingTop": "2rem", "paddingRight": "0.3rem", "color": "#565656" }}></i>

											</div>

											<div style={{ "paddingRight": "0.6rem" }}>
												<label className="form-label col-form-label" style={{ "visibility": "hidden" }}> Salario </label>
												<input
													id="salaryMaximum"
													type="text"
													className="form-control"
													style={{ "maxWidth": "10.4rem" }}
													value={maxSalary}
													onChange={(e) => setMaxSalary(
														formatCurrency(e.target.value)
													)}


												/>
											</div>






										</div>
										<div className="d-flex" style={{ "paddingRight": "0.6rem" }}>
											<div >
												<label className="form-label col-form-label"> Experiencia </label>
												<div id="experienceDropdown" className="dropdown me-2" style={{ "paddingRight": "0.6rem" }}>
													<button id="experienceButton" className="btn btn-white dropdown-toggle" data-bs-toggle="dropdown">
														{experience} <b className="caret"></b>
													</button>
													<div  id="experienceOptions"  className="dropdown-menu dropdown-menu-start" role="menu">
														<p className="dropdown-item" onClick={(e) => setExperience(e.target.textContent)}>1 año</p>
														<p className="dropdown-item" onClick={(e) => setExperience(e.target.textContent)}>2 año</p>
														<p className="dropdown-item" onClick={(e) => setExperience(e.target.textContent)}>5 años</p>
														<p className="dropdown-item" onClick={(e) => setExperience(e.target.textContent)}>0 exp</p>
														<p className="dropdown-item" onClick={(e) => setExperience(e.target.textContent)}>--------</p>
													</div>
												</div>
											</div>
											<div style={{ "paddingRight": "0.6rem" }}>
												<label className="form-label col-form-label">Fecha de publicación</label>
												<DatePicker
													id="dateMinimum"
													selected={startDate}
													onChange={(date) => setStartDate(date)}
													dateFormat={"MM/dd/yyyy"}
													className="form-control"
													placeholderText="Selecciona una fecha"
												/>
											</div>
											<div style={{ "display": "flex", "alignItems": "center" }}>
												<i class="bi bi-dash" style={{ "fontSize": "1.6rem", "paddingTop": "2rem", "paddingRight": "0.3rem", "color": "#565656" }}></i>

											</div>
											<div style={{ "paddingRight": "0.6rem" }}>
												<label className="form-label col-form-label">Fecha de publicación</label>
												<DatePicker
													id="dateMaximum"
													selected={finishDate}
													onChange={(date) => setFinishDate(date)}
													dateFormat={"MM/dd/yyyy"}
													className="form-control"
													placeholderText="Selecciona una fecha"
												/>
											</div>

										</div>
									</div>
								</div>
							</Collapse>
						</div>

					</div>


					<div  id="currentVacancy" className="card border-0">
						<div className="card-header bg-none p-3 h6 m-0 d-flex align-items-center">
							<div className="row">
								<div className="col-12">
									<h4 className="card-title">{currentVacancy.name}</h4>

								</div>
								<div className="col-12">
									<p id="currentPublishDate" className="location" style={{ "color": "#565656" }}> <b>{currentVacancy.company}</b>{currentVacancy.place ? <> <i class="bi bi-dot"></i> {currentVacancy.place} </> : <></>} <i class="bi bi-dot"></i> {formatDate(currentVacancy.created_at)} </p>

								</div>

							</div>
						</div>
						<ul class="list-group list-group-flush">
							<li class="list-group-item">
								<div className="row">
									{currentVacancy.salary ?
										<>
											<div id="currentSalary" className="col-12 d-flex align-items-center" >
												<i class="bi bi-cash-coin" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
												Salario: {formatCurrency(currentVacancy.salary)}

											</div>
										</>
										: <></>
									}

									{currentVacancy.experience ?
										<>
											<div className="col-12 d-flex align-items-center">

												<i class="bi bi-calendar4-week" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
												Experiencia:{currentVacancy.experience}

											</div>
										</>
										: <></>
									}

									{currentVacancy.modality ?
										<>
											<div className="col-12 d-flex align-items-center">

												<i class="bi bi-briefcase" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
												Modalidad: {currentVacancy.modality}

											</div>
										</>
										: <></>
									}

									<div className="col-12 d-flex align-items-center">

										<i class="bi bi-tools" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
										Habilidades: {currentVacancy.keywords}

									</div>
									{currentVacancy.contract ?
										<>
											<div className="col-12 d-flex align-items-center">

												<i class="bi bi-file-earmark-text" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
												Contrato: {currentVacancy.contract}

											</div>
										</>
										: <></>
									}


								</div>
							</li>
							{currentVacancy.description ?
								<>
									<li class="list-group-item">


										<p className="desc" style={{ "whiteSpace": "break-spaces" }}>

											{currentVacancy.description}
										</p>
									</li>
								</>
								: <></>
							}


						</ul>

					</div>

					<div className="card-footer bg-none d-flex p-3">
						<button type="button" class="btn btn-primary ms-auto" onClick={()=>setIsApplying(true)}>Aplicar</button>

					</div>
				</div>
				{ isApplying ? 
					<ModalApply
					title={"Información de contacto"} 
					description={"Por favor, ingresa la información a la que te gustaria que te contacten:"} 
				
					defaultContact={applyInfo}
					showModalAction={setIsApplying}
					currentVacancy={currentVacancy}
					applyInfo={applyInfo}
					setNotify={setNotify}

					
				/>
				:
					null
				}
				<div className="col-md-6 " >
					<div className=" overflow-auto" style={{ "height": "34rem" }}>
						<div id="resultsList" className="result-list">
							{currentPosts.map((vacancy, index) => (
								<div className="result-item" key={index} onClick={() => { setCurrentVacany(currentPosts[index]) }}>
									<div className="result-info">
										<h4 className="title"> {vacancy.name}</h4>
										<p className="location" style={{ "color": "#565656" }}>   <b>{vacancy.company} </b>
											{vacancy.place ?
												<>
													<i class="bi bi-dot"></i> {vacancy.place}
												</>
												: <></>
											}
											<i class="bi bi-dot"></i>
											<span style={{ color: "#048f04d1" }}>  <b>{formatDate(vacancy.created_at)}</b> </span> </p>
										{vacancy.modality ?
											<>
												<div className="d-flex align-items-center">
													<i class="bi bi-briefcase" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
													Modalidad: {vacancy.modality}
												</div>
											</>
											: <></>
										}

										{vacancy.experience ?
											<>
												<div className="d-flex align-items-center">
													<i class="bi bi-calendar4-week" style={{ "fontSize": "1.4rem", "paddingRight": "0.5rem", "color": "#565656" }}></i>
													Experiencia: {vacancy.experience}
												</div>
											</>
											: <></>
										}


									</div>

								</div>

							))}

						</div>

					</div>
					<div className="d-flex  flex-row-reverse mt-10px">
						<ReactPaginate
							onPageChange={paginate}
							pageCount={Math.ceil(vacancies.length / postsPerPage)}
							previousLabel={'«'}
							nextLabel={'»'}
							containerClassName={'containerClassName'}
							previousClassName={'previousClassName'}
							pageLinkClassName={'pageLinkClassName'}
							previousLinkClassName={'pageLinkClassName'}
							nextLinkClassName={'pageLinkClassName'}
							activeLinkClassName={'activeLinkClassName'}


						/>
					</div>
				</div>

			</div>
			<ReactNotifications />
		</div>
	)

}

export default VacanciesSearch;
import React from 'react';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Highlight from 'react-highlight';
import Chart from 'react-apexcharts';
import { AppSettings } from './../../config/app-settings.js';

class Widgets extends React.Component {
	static contextType = AppSettings;
	
	constructor(props) {
		super(props);
		
		this.state = {
			lightTheme: true,
			darkTheme: false,
			modalWidgetList: false,
			modalWidgetTable: false,
			modalWidgetChart: false,
			modalWidgetListWithIcon: false,
			modalWidgetStat: false,
			modalWidgetCardSquare: false,
			modalWidgetImgIcon: false,
			modalWidgetCard: false,
			modalWidgetChatInput: false,
			modalWidgetMap: false,
			modalWidgetTodolist: false
		}
		
		this.codeMirrorOptions = {
			mode: 'application/xml',
			theme: 'material',
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 2,
			autoScroll: false
		}
	}
	
	setWidgetTheme = (theme) => {
		this.setState(state => ({
			lightTheme: (theme === 'light') ? true : false,
			darkTheme: (theme === 'dark') ? true : false
		}));
	}
	
	handleGetDate(minusDate) {
		var d = new Date();
				d = d.setDate(d.getDate() - minusDate);
		return d;
	}
	
	chartData = {
		series: [
			{ 
				name: 'Unique Visitors', 
				data: [
					[this.handleGetDate(77), 13], [this.handleGetDate(76), 13], [this.handleGetDate(75), 6 ], 
					[this.handleGetDate(73), 6 ], [this.handleGetDate(72), 6 ], [this.handleGetDate(71), 5 ], [this.handleGetDate(70), 5 ], 
					[this.handleGetDate(69), 5 ], [this.handleGetDate(68), 6 ], [this.handleGetDate(67), 7 ], [this.handleGetDate(66), 6 ], 
					[this.handleGetDate(65), 9 ], [this.handleGetDate(64), 9 ], [this.handleGetDate(63), 8 ], [this.handleGetDate(62), 10], 
					[this.handleGetDate(61), 10], [this.handleGetDate(60), 10], [this.handleGetDate(59), 10], [this.handleGetDate(58), 9 ], 
					[this.handleGetDate(57), 9 ], [this.handleGetDate(56), 10], [this.handleGetDate(55), 9 ], [this.handleGetDate(54), 9 ], 
					[this.handleGetDate(53), 8 ], [this.handleGetDate(52), 8 ], [this.handleGetDate(51), 8 ], [this.handleGetDate(50), 8 ], 
					[this.handleGetDate(49), 8 ], [this.handleGetDate(48), 7 ], [this.handleGetDate(47), 7 ], [this.handleGetDate(46), 6 ], 
					[this.handleGetDate(45), 6 ], [this.handleGetDate(44), 6 ], [this.handleGetDate(43), 6 ], [this.handleGetDate(42), 5 ], 
					[this.handleGetDate(41), 5 ], [this.handleGetDate(40), 4 ], [this.handleGetDate(39), 4 ], [this.handleGetDate(38), 5 ], 
					[this.handleGetDate(37), 5 ], [this.handleGetDate(36), 5 ], [this.handleGetDate(35), 7 ], [this.handleGetDate(34), 7 ], 
					[this.handleGetDate(33), 7 ], [this.handleGetDate(32), 10], [this.handleGetDate(31), 9 ], [this.handleGetDate(30), 9 ], 
					[this.handleGetDate(29), 10], [this.handleGetDate(28), 11], [this.handleGetDate(27), 11], [this.handleGetDate(26), 8 ], 
					[this.handleGetDate(25), 8 ], [this.handleGetDate(24), 7 ], [this.handleGetDate(23), 8 ], [this.handleGetDate(22), 9 ], 
					[this.handleGetDate(21), 8 ], [this.handleGetDate(20), 9 ], [this.handleGetDate(19), 10], [this.handleGetDate(18), 9 ], 
					[this.handleGetDate(17), 10], [this.handleGetDate(16), 16], [this.handleGetDate(15), 17], [this.handleGetDate(14), 16], 
					[this.handleGetDate(13), 17], [this.handleGetDate(12), 16], [this.handleGetDate(11), 15], [this.handleGetDate(10), 14], 
					[this.handleGetDate(9) , 24], [this.handleGetDate(8) , 18], [this.handleGetDate(7) , 15], [this.handleGetDate(6) , 14], 
					[this.handleGetDate(5) , 16], [this.handleGetDate(4) , 16], [this.handleGetDate(3) , 17], [this.handleGetDate(2) , 7 ], 
					[this.handleGetDate(1) , 7 ], [this.handleGetDate(0) , 7 ]
				]
			},
			{ 
				name: 'Page Views', 
				data: [
					[this.handleGetDate(77), 14], [this.handleGetDate(76), 13], [this.handleGetDate(75), 15], 
					[this.handleGetDate(73), 14], [this.handleGetDate(72), 13], [this.handleGetDate(71), 15], [this.handleGetDate(70), 16], 
					[this.handleGetDate(69), 16], [this.handleGetDate(68), 14], [this.handleGetDate(67), 14], [this.handleGetDate(66), 13], 
					[this.handleGetDate(65), 12], [this.handleGetDate(64), 13], [this.handleGetDate(63), 13], [this.handleGetDate(62), 15], 
					[this.handleGetDate(61), 16], [this.handleGetDate(60), 16], [this.handleGetDate(59), 17], [this.handleGetDate(58), 17], 
					[this.handleGetDate(57), 18], [this.handleGetDate(56), 15], [this.handleGetDate(55), 15], [this.handleGetDate(54), 15], 
					[this.handleGetDate(53), 19], [this.handleGetDate(52), 19], [this.handleGetDate(51), 18], [this.handleGetDate(50), 18], 
					[this.handleGetDate(49), 17], [this.handleGetDate(48), 16], [this.handleGetDate(47), 18], [this.handleGetDate(46), 18], 
					[this.handleGetDate(45), 18], [this.handleGetDate(44), 16], [this.handleGetDate(43), 14], [this.handleGetDate(42), 14], 
					[this.handleGetDate(41), 13], [this.handleGetDate(40), 14], [this.handleGetDate(39), 13], [this.handleGetDate(38), 10], 
					[this.handleGetDate(37), 9 ], [this.handleGetDate(36), 10], [this.handleGetDate(35), 11], [this.handleGetDate(34), 11], 
					[this.handleGetDate(33), 11], [this.handleGetDate(32), 10], [this.handleGetDate(31), 9 ], [this.handleGetDate(30), 10], 
					[this.handleGetDate(29), 13], [this.handleGetDate(28), 14], [this.handleGetDate(27), 14], [this.handleGetDate(26), 13], 
					[this.handleGetDate(25), 12], [this.handleGetDate(24), 11], [this.handleGetDate(23), 13], [this.handleGetDate(22), 13], 
					[this.handleGetDate(21), 13], [this.handleGetDate(20), 13], [this.handleGetDate(19), 14], [this.handleGetDate(18), 13], 
					[this.handleGetDate(17), 13], [this.handleGetDate(16), 19], [this.handleGetDate(15), 21], [this.handleGetDate(14), 22],
					[this.handleGetDate(13), 25], [this.handleGetDate(12), 24], [this.handleGetDate(11), 24], [this.handleGetDate(10), 22], 
					[this.handleGetDate(9) , 16], [this.handleGetDate(8) , 15], [this.handleGetDate(7) , 12], [this.handleGetDate(6) , 12], 
					[this.handleGetDate(5) , 15], [this.handleGetDate(4) , 15], [this.handleGetDate(3) , 15], [this.handleGetDate(2) , 18], 
					[this.handleGetDate(2) , 18], [this.handleGetDate(0) , 17]
				] 
			}
		],
		options: {
			colors: ['#ff5b57', '#f59c1a'],
			fill: {
				opacity: .75,
				type: 'solid'
			},
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				offsetY: 15,
				offsetX: 500,
				labels: {
					colors: '#20252a'
				}
			},
			xaxis: {
				type: 'datetime',
				tickAmount: 6,
				labels: {
					style: {
						colors: '#20252a'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: '#20252a'
					}
				}
			},
			tooltip: { y: { formatter: function (val) { return "$ " + val + " thousands" } } },
			chart: { height: '100%', type: 'area', toolbar: { show: false }, stacked: true },
			plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
			dataLabels: { enabled: false },
			grid: { 
				show: true, borderColor: 'rgba(32, 37, 42, .15)',
				xaxis: {
					lines: {
						show: true
					}
				},   
				yaxis: {
					lines: {
						show: true
					}
				},
				padding: {
					top: -40,
					right: 3,
					bottom: 0,
					left: 10
				},
			},
			stroke: { 
				show: false,
				curve: 'straight'
			}
		}
	}
	
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/widget">Home</Link></li>
					<li className="breadcrumb-item active">Widgets</li>
				</ol>
				<h1 className="page-header">
					Widgets <small>header small text goes here...</small>
				</h1>
			
				<span className="btn-group float-end ms-20px p-2px bg-black bg-opacity-20 rounded">
					<button className={'btn btn-sm btn-white border-0 ' + (this.state.lightTheme ? 'active ' : '')} onClick={() => this.setWidgetTheme('light')}><i className="fa fa-sun text-blue"></i> Light</button>
					<button className={'btn btn-sm btn-white border-0 ' + (this.state.darkTheme ? 'active ' : '')} onClick={() => this.setWidgetTheme('dark')}><i className="fa fa-moon"></i> Dark</button>
				</span>
				<p className="mb-20px">
					All the widgets is reusable and responsive. You may use the predefined css to configure the padding, margin or background. Besides that, all the widgets have light and dark version. 
					Kindly add the <code>.dark-mode</code> to the widget will change it to the dark version.
				</p>
				
				<div className="row">
					<div className="col-lg-12 col-xl-4">
						<div className="row">
							<div className="col-xl-12 col-lg-6">
								<div className="mb-10px mt-10px fs-10px">
									<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetList" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
									<b className="text-dark">WIDGET LIST</b>
								</div>
								<div className={'widget-list rounded mb-4 ' + (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-list-item">
										<div className="widget-list-media">
											<img src="/assets/img/user/user-12.jpg" width="50" alt="" className="rounded" />
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Christopher Struth</h4>
											<p className="widget-list-desc">Bank Transfer</p>
										</div>
										<div className="widget-list-action">
											<a href="#/" data-bs-toggle="dropdown" className="text-gray-500"><i className="fa fa-ellipsis-h fs-14px"></i></a>
											<div className="dropdown-menu dropdown-menu-end">
												<a href="#/" className="dropdown-item">Option 1</a>
												<a href="#/" className="dropdown-item">Option 2</a>
												<a href="#/" className="dropdown-item">Option 3</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Option 4</a>
											</div>
										</div>
									</div>
									<div className="widget-list-item">
										<div className="widget-list-media">
											<img src="/assets/img/user/user-13.jpg" width="50" alt="" className="rounded" />
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Janie Flowers</h4>
											<p className="widget-list-desc">Bank Transfer</p>
										</div>
										<div className="widget-list-action">
											<a href="#/" data-bs-toggle="dropdown" className="text-gray-500"><i className="fa fa-ellipsis-h fs-14px"></i></a>
											<div className="dropdown-menu dropdown-menu-end">
												<a href="#/" className="dropdown-item">Option 1</a>
												<a href="#/" className="dropdown-item">Option 2</a>
												<a href="#/" className="dropdown-item">Option 3</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Option 4</a>
											</div>
										</div>
									</div>
									<div className="widget-list-item">
										<div className="widget-list-media">
											<img src="/assets/img/user/user-14.jpg" width="50" alt="" className="rounded" />
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Janie Flowers</h4>
											<p className="widget-list-desc">Bank Transfer</p>
										</div>
										<div className="widget-list-action">
											<a href="#/" data-bs-toggle="dropdown" className="text-gray-500"><i className="fa fa-ellipsis-h fs-14px"></i></a>
											<div className="dropdown-menu dropdown-menu-end">
												<a href="#/" className="dropdown-item">Option 1</a>
												<a href="#/" className="dropdown-item">Option 2</a>
												<a href="#/" className="dropdown-item">Option 3</a>
												<div className="dropdown-divider"></div>
												<a href="#/" className="dropdown-item">Option 4</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="col-xl-12 col-lg-6">
								<div className="mb-10px mt-10px fs-10px">
									<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetListWithIcon" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
									<b className="text-dark">WIDGET LIST WITH ICON</b>
								</div>
								<div className={'widget-list rounded mb-4 ' + (this.state.darkTheme ? 'dark-mode ' : '')}>
									<Link to="/widget" className="widget-list-item">
										<div className="widget-list-media icon">
											<i className="fa fa-plane bg-dark text-white"></i>
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Airplane Mode</h4>
										</div>
										<div className="widget-list-action text-end">
											<i className="fa fa-angle-right fa-lg text-gray-500"></i>
										</div>
									</Link>
									<Link to="/widget" className="widget-list-item">
										<div className="widget-list-media icon">
											<i className="fa fa-wifi bg-dark text-white"></i>
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Wi-Fi</h4>
										</div>
										<div className="widget-list-action text-nowrap text-gray-600 fw-bold text-decoration-none">
											Connected
											<i className="fa fa-angle-right fa-lg ms-3 text-gray-500"></i>
										</div>
									</Link>
									<Link to="/widget" className="widget-list-item">
										<div className="widget-list-media icon">
											<i className="fab fa-bluetooth bg-indigo text-white"></i>
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Bluetooth</h4>
										</div>
										<div className="widget-list-action text-nowrap text-gray-600 fw-bold text-decoration-none">
											On
											<i className="fa fa-angle-right text-gray-500 fa-lg ms-3"></i>
										</div>
									</Link>
									<Link to="/widget" className="widget-list-item">
										<div className="widget-list-media icon">
											<i className="fa fa-signal bg-pink text-white"></i>
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Cellular</h4>
										</div>
										<div className="widget-list-action text-decoration-none fw-bold">
											<i className="fa fa-angle-right text-gray-500 fa-lg"></i>
										</div>
									</Link>
									<Link to="/widget" className="widget-list-item">
										<div className="widget-list-media icon">
											<i className="fa fa-link bg-yellow text-dark"></i>
										</div>
										<div className="widget-list-content">
											<h4 className="widget-list-title">Personal Hotspot</h4>
										</div>
										<div className="widget-list-action text-nowrap text-gray-600 fw-bold text-decoration-none">
											Off
											<i className="fa fa-angle-right text-gray-500 fa-lg ms-3"></i>
										</div>
									</Link>
								</div>
							</div>
							
							<div className="col-xl-12 col-lg-6">
								<div className="mb-10px mt-10px fs-10px">
									<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetChatInput" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
									<b className="text-dark">WIDGET CHAT</b>
								</div>
								<div className={'widget-chat rounded mb-4 ' + (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-chat-header">
										<div className="widget-chat-header-icon">
											<i className="fab fa-earlybirds w-30px h-30px fs-20px bg-yellow text-dark d-flex align-items-center justify-content-center rounded"></i>
										</div>
										<div className="widget-chat-header-content">
											<h4 className="widget-chat-header-title">Company Discussion Group</h4>
											<p className="widget-chat-header-desc">55 members, 4 online</p>
										</div>
									</div>
									<PerfectScrollbar className="widget-chat-body" style={{height: '235px'}} options={{suppressScrollX: true}}>
										<div className="widget-chat-item with-media start">
											<div className="widget-chat-media">
												<img alt="" src="/assets/img/user/user-1.jpg" />
											</div>
											<div className="widget-chat-info">
												<div className="widget-chat-info-container">
													<div className="widget-chat-name text-indigo">Hudson Mendes</div>
													<div className="widget-chat-message">Should we plan for a company trip this year?</div>
													<div className="widget-chat-time">6:00PM</div>
												</div>
											</div>
										</div>
										<div className="widget-chat-item with-media start">
											<div className="widget-chat-media">
												<img alt="" src="/assets/img/user/user-2.jpg" />
											</div>
											<div className="widget-chat-info">
												<div className="widget-chat-info-container">
													<div className="widget-chat-name text-primary">Sam Sugerman</div>
													<div className="widget-chat-message">ok let's do it</div>
													<div className="widget-chat-time">6:01PM</div>
												</div>
											</div>
										</div>
										<div className="widget-chat-item end">
											<div className="widget-chat-info">
												<div className="widget-chat-info-container">
													<div className="widget-chat-message">i'm ok with it</div>
													<div className="widget-chat-time">6:05PM</div>
												</div>
											</div>
										</div>
										<div className="text-center text-gray-500 m-2 fw-bold">Today</div>
										<div className="widget-chat-item with-media start">
											<div className="widget-chat-media">
												<img alt="" src="/assets/img/user/user-3.jpg" />
											</div>
											<div className="widget-chat-info">
												<div className="widget-chat-info-container">
													<div className="widget-chat-name text-orange">Jaxon Allwood</div>
													<div className="widget-chat-message">
														Here is some images for New Zealand
														<div className="row gx-1 mt-5px">
															<div className="col-md-4">
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-51-thumb.jpg)'}}></div>
																</Link>
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-52-thumb.jpg)'}}></div>
																</Link>
															</div>
															<div className="col-md-4">
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-53-thumb.jpg)'}}></div>
																</Link>
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-54-thumb.jpg)'}}></div>
																</Link>
															</div>
															<div className="col-md-4">
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-59-thumb.jpg)'}}></div>
																</Link>
																<Link to="/widgets" className="widget-card widget-card-sm square mb-1">
																	<div className="widget-card-cover" style={{backgroundImage: 'url(/assets/img/gallery/gallery-60-thumb.jpg)'}}></div>
																</Link>
															</div>
														</div>
													</div>
													<div className="widget-chat-time">6:20PM</div>
												</div>
											</div>
										</div>
									</PerfectScrollbar>
									<div className="widget-input">
										<form action="" method="POST" name="">
											<div className="widget-input-container">
												<div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-camera"></i></Link></div>
												<div className="widget-input-box">
													<input type="text" className="form-control" placeholder="Write a message..." />
												</div>
												<div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-smile"></i></Link></div>
												<div className="widget-input-divider"></div>
												<div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-microphone"></i></Link></div>
											</div>
										</form>
									</div>
								</div>
							</div>
							
							<div className="col-xl-12 col-lg-6">
								<div className="mb-10px mt-10px fs-10px">
									<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetTodolist" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
									<b className="text-dark">WIDGET TODOLIST</b>
								</div>
								<div className={'widget-todolist rounded mb-4 '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-todolist-header">
										<div className="widget-todolist-header-title">Todolist</div>
										<div className="widget-todolist-header-total"><span>0</span><small>Done</small></div>
									</div>
									<div className="widget-todolist-body">
										<div className="widget-todolist-item">
											<div className="widget-todolist-input">
												<div className="form-check">
													<input className="form-check-input" type="checkbox" id="widget_todolist_1" />
												</div>
											</div>
											<div className="widget-todolist-content">
												<h6 className="mb-2px">Borrow Tony's travel guide</h6>
												<div className="text-gray-500 fw-bold fs-11px">Vacation in Rome</div>
											</div>
											<div className="widget-todolist-icon">
												<Link to="/widgets"><i className="fa fa-question-circle"></i></Link>
											</div>
										</div>
										<div className="widget-todolist-item">
											<div className="widget-todolist-input">
												<div className="form-check">
													<input className="form-check-input" type="checkbox" id="widget_todolist_2" />
												</div>
											</div>
											<div className="widget-todolist-content">
												<h6 className="mb-2px">Finish expense report</h6>
												<div className="text-gray-500 fw-bold fs-11px">Today, 4:00PM, Daily</div>
											</div>
											<div className="widget-todolist-icon">
												<Link to="/widgets"><i className="fa fa-question-circle"></i></Link>
											</div>
										</div>
										<div className="widget-todolist-item">
											<div className="widget-todolist-input">
												<div className="form-check">
													<input className="form-check-input" type="checkbox" id="widget_todolist_3" />
												</div>
											</div>
											<div className="widget-todolist-content">
												<h6 className="mb-2px">Confirm conference call for Wednesday</h6>
												<div className="text-gray-500 fw-bold fs-11px">Work</div>
											</div>
											<div className="widget-todolist-icon">
												<Link to="/widgets"><i className="fa fa-question-circle"></i></Link>
											</div>
										</div>
										<div className="widget-todolist-item">
											<div className="widget-todolist-input">
												<div className="form-check">
													<input className="form-check-input" type="checkbox" id="widget_todolist_4" />
												</div>
											</div>
											<div className="widget-todolist-content">
												<h6 className="mb-2px"><b className="text-warning">!!</b> Mobile App WIP Presentation</h6>
												<div className="text-gray-500 fw-bold fs-11px">Today, 12:00PM</div>
											</div>
											<div className="widget-todolist-icon">
												<Link to="/widgets"><i className="fa fa-question-circle"></i></Link>
											</div>
										</div>
										<div className="widget-todolist-item">
											<div className="widget-todolist-input">
												<i className="fa fa-plus text-gray-500 fa-fw"></i>
											</div>
											<div className="widget-todolist-content">
												<input type="text" className="form-control border-0 shadow-none rounded-0 p-0 h-20px bg-none" placeholder="Write your task here..." />
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="col-xl-12 col-lg-6">
								<div className="mb-10px mt-10px fs-10px">
									<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetMap" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
									<b className="text-dark">WIDGET MAP</b>
								</div>
								<div className={'widget-map rounded mb-4 '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-input-container">
										<div className="widget-input-icon"><Link to="/widgets" className={(this.state.darkTheme ? 'text-white ' : 'text-gray-500')}><i className="fa fa-ellipsis-v"></i></Link></div>
										<div className="widget-input-box">
											<input type="text" className="form-control" placeholder="Search here" />
										</div>
										<div className="widget-input-icon"><Link to="/widgets" className={(this.state.darkTheme ? 'text-white ' : 'text-gray-500')}><i className="fa fa-microphone"></i></Link></div>
										<div className="widget-input-divider"></div>
										<div className="widget-input-icon"><Link to="/widgets" className={(this.state.darkTheme ? 'text-white ' : 'text-gray-500')}><i className="fa fa-location-arrow"></i></Link></div>
									</div>
									<div className="widget-map-body">
										<iframe className="d-block" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5650178360584!2d-122.41879278478642!3d37.77679637975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2smy!4v1524046379645" width="100%" height="230" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
									</div>
									<div className="widget-map-list" data-id="widget">
										<div className="widget-list bg-none">
											<div className="widget-list-item">
												<div className="widget-list-media text-center">
													<Link to="/widgets"><i className="fab fa-twitter fa-3x"></i></Link>
												</div>
												<div className="widget-list-content">
													<h4 className="widget-list-title">Twitter Headquater</h4>
													<p className="widget-list-desc">Corporate Office</p>
												</div>
												<div className="widget-list-action">
													<Link to="/widgets" className="text-gray-500"><i className="fa fa-angle-right fa-2x"></i></Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-xl-8">
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetImgIcon" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET IMAGE / ICON</b>
						</div>
						<div className="row mb-4">
							<div className="col-sm-6">
								<div className="d-flex flex-wrap">
									<div className="widget-icon rounded bg-indigo me-5px mb-5px text-white">
										<i className="fab fa-digital-ocean"></i>
									</div>
									<div className="widget-icon rounded bg-blue me-5px mb-5px text-white">
										<i className="fab fa-twitter"></i>
									</div>
									<div className="widget-icon rounded bg-success me-5px mb-5px text-white">
										<i className="fab fa-android"></i>
									</div>
									<div className="widget-icon rounded bg-warning me-5px mb-5px text-white">
										<i className="fab fa-firefox"></i>
									</div>
									<div className="widget-icon rounded bg-danger me-5px mb-5px text-white">
										<i className="fab fa-google-plus-g"></i>
									</div>
									<div className="widget-icon rounded bg-pink me-5px mb-5px text-white">
										<i className="fab fa-pinterest"></i>
									</div>
								</div>
								<div className="clearfix">
									<div className={'widget-icon widget-icon-xl user rounded float-start me-5px mb-5px ' + (this.state.darkTheme ? 'text-white text-opacity-50 bg-dark ' : 'bg-gray-500 text-white')}>
										<i className="fa fa-user"></i>
									</div>
									<div className={'widget-icon widget-icon-lg user rounded float-start me-5px mb-5px ' + (this.state.darkTheme ? 'text-white text-opacity-50 bg-dark ' : 'bg-gray-500 text-white')}>
										<i className="fa fa-user"></i>
									</div>
									<div className={'widget-icon user rounded float-start me-5px mb-5px ' + (this.state.darkTheme ? 'text-white text-opacity-50 bg-dark ' : 'bg-gray-500 text-white')}>
										<i className="fa fa-user"></i>
									</div>
									<div className={'widget-icon widget-icon-sm user rounded float-start me-5px mb-5px ' + (this.state.darkTheme ? 'text-white text-opacity-50 bg-dark ' : 'bg-gray-500 text-white')}>
										<i className="fa fa-user"></i>
									</div>
									<div className={'widget-icon widget-icon-xs user rounded float-start me-5px mb-5px ' + (this.state.darkTheme ? 'text-white text-opacity-50 bg-dark ' : 'bg-gray-500 text-white')}>
										<i className="fa fa-user"></i>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="float-start">
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-11-thumb.jpg)'}}
									></div>
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-12-thumb.jpg)'}}
									></div>
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-13-thumb.jpg)'}}
									></div>
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-14-thumb.jpg)'}}
									></div>
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-15-thumb.jpg)'}}
									></div>
									<div className="widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-16-thumb.jpg)'}}
									></div>
									<br />
									<div className="widget-img widget-img-xl rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-21-thumb.jpg)'}}
									></div>
									<div className="widget-img widget-img-lg rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-22-thumb.jpg)'}}
									></div>
									<div className="widget-img widget-img rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-23-thumb.jpg)'}}
									></div>
									<div className="widget-img widget-img-sm rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-24-thumb.jpg)'}}
									></div>
									<div className="widget-img widget-img-xs rounded bg-dark float-start me-5px mb-5px"
										style={{ backgroundImage: 'url(/assets/img/gallery/gallery-25-thumb.jpg)'}}
									></div>
								</div>
							</div>
						</div>
						
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetCard" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET CARD</b>
						</div>
						<div className="row">
							<div className="col-sm-6">
								<Link to="/widgets" className={'widget-card rounded mb-20px '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-card-cover rounded" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-portrait-11-thumb.jpg)'}}></div>
									<div className="widget-card-content">
										<b className="text-white">Download and get free trial.</b>
									</div>
									<div className="widget-card-content bottom">
										<i className="fab fa-pushed fa-5x text-indigo"></i>
										<h4 className="text-white mt-10px"><b>Apple Draw<br /> Photo Booth</b></h4>
										<h5 className="fs-12px text-white text-opacity-75 mb-0"><b>EASILY DRAW ON PHOTOS</b></h5>
									</div>
								</Link>
							</div>
							<div className="col-sm-6">
								<Link to="/widgets" className={'widget-card rounded mb-20px '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
									<div className="widget-card-cover rounded"></div>
									<div className="widget-card-content">
										<h5 className={'fs-12px ' + (this.state.darkTheme ? 'text-white text-opacity-75' : 'text-black text-opacity-75')}><b>MAKING A DIFFERENCE</b></h5>
										<h4 className="mb-10px text-pink"><b>Apple Heart<br /> Study App</b></h4>
										<i className="fa fa-heartbeat fa-5x text-pink text-opacity-50"></i>
									</div>
									<div className="widget-card-content bottom">
										<b className={'fs-12px ' + (this.state.darkTheme ? 'text-white text-opacity-75' : 'text-black text-opacity-75')}>Opt in and help heart research.</b>
									</div>
								</Link>
							</div>
						</div>
						
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetCardSquare" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET CARD SQUARE</b>
						</div>
						<div className="row">
							<div className="col-xs-6 col-sm-3">
								<div className="row gx-1 mb-1">
									<div className="col-6">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-1-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-2-thumb.jpg)'}}></div>
										</Link>
									</div>
									<div className="col-6">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-3-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-4-thumb.jpg)'}}></div>
										</Link>
									</div>
								</div>
								<div className="fs-12px fw-bold text-black">Camera Roll</div>
								<div className="fs-10px fw-bold text-black-lighter mb-3">2,711</div>
							</div>
							<div className="col-xs-6 col-sm-3">
								<Link to="/widgets" className="widget-card rounded square mb-5px">
									<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-7-thumb.jpg)'}}>
										<span className="widget-card-cover-icon"><i className="fa fa-play fa-lg"></i></span>
									</div>
								</Link>
								<div className="fs-12px fw-bold text-black pt-2px">Videos</div>
								<div className="fs-10px fw-bold text-black-lighter mb-3">31</div>
							</div>
							<div className="col-xs-6 col-sm-3">
								<Link to="/widgets" className="widget-card rounded square mb-5px">
									<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-10-thumb.jpg)'}}>
										<div className="d-flex h-100 align-items-center justify-content-center">
											<div className="text-center">
												<div className="text-white fs-14px"><b>PORTRAITS OF</b></div>
												<div className="text-white-transparent-8 fw-bold">2021</div>
											</div>
										</div>
									</div>
								</Link>
								<div className="fs-12px fw-bold text-black pt-2px">Memory 2021</div>
								<div className="fs-10px fw-bold text-black-lighter mb-3">1,239</div>
							</div>
							<div className="col-xs-6 col-sm-3">
								<div className="row gx-1 mb-5px">
									<div className="col-3">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-1-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-2-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-3-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-4-thumb.jpg)'}}></div>
										</Link>
									</div>
									<div className="col-3">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-5-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-6-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-7-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-8-thumb.jpg)'}}></div>
										</Link>
									</div>
									<div className="col-3">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-9-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-10-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-11-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-12-thumb.jpg)'}}></div>
										</Link>
									</div>
									<div className="col-3">
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-13-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-14-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-15-thumb.jpg)'}}></div>
										</Link>
										<Link to="/widgets" className="widget-card rounded square mb-1">
											<div className="widget-card-cover" style={{ backgroundImage: 'url(/assets/img/gallery/gallery-16-thumb.jpg)'}}></div>
										</Link>
									</div>
								</div>
								<div className="fs-12px fw-bold text-black">Albums</div>
								<div className="fs-10px fw-bold text-black-lighter mb-15px">8</div>
							</div>
						</div>
					
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetStat" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET STAT</b>
						</div>
						<div className="row gx-2 mb-20px">
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-teal mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-globe fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">TODAY'S VISITS</div>
										<div className="stats-number">7,842,900</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '70.1%'}}></div>
										</div>
										<div className="stats-desc">Better than last week (70.1%)</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-blue mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-dollar-sign fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">TODAY'S PROFIT</div>
										<div className="stats-number">180,200</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '40.5%'}}></div>
										</div>
										<div className="stats-desc">Better than last week (40.5%)</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-purple mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-archive fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">NEW ORDERS</div>
										<div className="stats-number">38,900</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '76.3%'}}></div>
										</div>
										<div className="stats-desc">Better than last week (76.3%)</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-dark mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-comment-alt fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">NEW COMMENTS</div>
										<div className="stats-number">3,988</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '54.9%'}}></div>
										</div>
										<div className="stats-desc">Better than last week (54.9%)</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-orange mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-file-alt fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">PENDING INVOICE</div>
										<div className="stats-number">20</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '23.5%'}}></div>
										</div>
										<div className="stats-desc">More than last week (23.5%)</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-sm-6">
								<div className="widget widget-stats bg-pink mb-7px">
									<div className="stats-icon stats-icon-lg"><i className="fa fa-exclamation-triangle fa-fw"></i></div>
									<div className="stats-content">
										<div className="stats-title">ERROR LOG</div>
										<div className="stats-number">5</div>
										<div className="stats-progress progress">
											<div className="progress-bar" style={{width: '10.5%'}}></div>
										</div>
										<div className="stats-desc">More than last week (10.5%)</div>
									</div>
								</div>
							</div>
						</div>
					
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetChart" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET CHART</b>
						</div>
						<div className={'widget rounded mb-4 '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
							<div className="widget-header">
								<h4 className="widget-header-title">Audience Overview</h4>
								<div className="widget-header-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-fw fa-upload"></i></Link></div>
								<div className="widget-header-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-fw fa-cog"></i></Link></div>
							</div>
							<div className="row m-0">
								<div className="col widget-chart-content">
									<Chart type="area" options={this.chartData.options} series={this.chartData.series} />
								</div>
								<div className="col-lg-4 p-3">
									<div className="widget-chart-info">
										<h4 className="widget-chart-info-title">Total sales</h4>
										<p className="widget-chart-info-desc">Lorem ipsum dolor sit consectetur adipiscing elit.</p>
										<div className="widget-chart-info-progress">
											<b>Monthly Plan</b>
											<span className="float-end">70%</span>
										</div>
										<div className="progress h-10px">
											<div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill" style={{width: '70%'}}></div>
										</div>
									</div>
									<hr />
									<div className="widget-chart-info">
										<h4 className="widget-chart-info-title">Task progress</h4>
										<p className="widget-chart-info-desc">Vestibulum sollicitudin in lectus a cursus.</p>
										<div className="widget-chart-info-progress">
											<b>Marketing Research</b>
											<span className="float-end">74%</span>
										</div>
										<div className="progress h-10px mb-15px">
											<div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill bg-indigo" style={{width: '74%'}}></div>
										</div>
										<div className="widget-chart-info-progress">
											<b>Mobile App Development</b>
											<span className="float-end">25%</span>
										</div>
										<div className="progress h-10px mb-15px">
											<div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill bg-green" style={{width: '25%'}}></div>
										</div>
										<div className="widget-chart-info-progress">
											<b>Website Redesign</b>
											<span className="float-end">95%</span>
										</div>
										<div className="progress h-10px">
											<div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill bg-orange" style={{width: '95%'}}></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					
						<div className="mb-10px mt-10px fs-10px">
							<a href="#/" data-bs-toggle="modal" data-bs-target="#modalWidgetTable" className="float-end text-gray-600 text-decoration-none me-3px fw-bold">source code</a>
							<b className="text-dark">WIDGET TABLE</b>
						</div>
						<div className="table-responsive">
							<table className={'table table-bordered widget-table rounded '+ (this.state.darkTheme ? 'dark-mode ' : '')}>
								<thead>
									<tr className="text-nowrap">
										<th width="1%">Image</th>
										<th>Product Info</th>
										<th>Price</th>
										<th>Qty</th>
										<th>Total</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<img src="/assets/img/product/product-6.png" alt="" width="100" />
										</td>
										<td>
											<h5 className="mb-1">Mavic Pro Combo</h5>
											<p className="fs-11px fw-bold text-gray-600 mb-3">Portable yet powerful, the Mavic Pro is your personal drone, ready to go with you everywhere.</p>
											<div className="progress h-10px rounded-pill mb-5px">
												<div className="progress-bar progress-bar-striped progress-bar-animated bg-orange fs-10px fw-bold" style={{width: '30%'}}>30%</div>
											</div>
											<div className="clearfix fs-10px">
												status: 
												<b className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}>Shipped</b>
											</div>
										</td>
										<td className="text-nowrap">
											<b className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}>$999</b><br />
											<small className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}><del>$1,202</del></small>
										</td>
										<td>1</td>
										<td>999.00</td>
										<td>
											<Link to="/widgets" className={'btn btn-sm w-80px rounded-pill '+ (this.state.darkTheme ? 'btn-inverse ' : 'btn-default ')}>Edit</Link>
										</td>
									</tr>
									<tr>
										<td>
											<img src="/assets/img/product/product-7.png" alt="" width="100" />
										</td>
										<td>
											<h5 className="mb-1">Inspire 2</h5>
											<p className="fs-11px fw-bold text-gray-600 mb-3">Cinematic aerial performance for filmmakers.</p>
											<div className="progress h-10px rounded-pill mb-5px">
												<div className="progress-bar progress-bar-striped progress-bar-animated bg-success fs-10px fw-bold" style={{width: '100%'}}>100%</div>
											</div>
											<div className="clearfix fs-10px">
												status: 
												<b className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}>received</b>
											</div>
										</td>
										<td className="text-nowrap">
											<b className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}>$999</b><br />
											<small className={(this.state.darkTheme ? 'text-white ' : 'text-dark')}><del>$1,202</del></small>
										</td>
										<td>1</td>
										<td>999.00</td>
										<td>
											<Link to="/widgets" className={'btn btn-sm w-80px rounded-pill '+ (this.state.darkTheme ? 'btn-inverse ' : 'btn-default ')}>Edit</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				
        <div className="modal fade" id="modalWidgetMap">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Map</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget-map rounded">\n'+
'  <div className="widget-input-container">\n'+
'    <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-ellipsis-v"></i></Link></div>\n'+
'    <div className="widget-input-box">\n'+
'      <input type="text" className="form-control" placeholder="Search here" />\n'+
'    </div>\n'+
'    <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-microphone"></i></Link></div>\n'+
'    <div className="widget-input-divider"></div>\n'+
'    <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-location-arrow"></i></Link></div>\n'+
'  </div>\n'+
'  <div className="widget-map-body">\n'+
'    <iframe className="d-block" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5650178360584!2d-122.41879278478642!3d37.77679637975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2smy!4v1524046379645" width="100%" height="230" frameborder="0" style={{border:0}} allowfullscreen></iframe>\n'+
'  </div>\n'+
'  <div className="widget-map-list" data-id="widget">\n'+
'    <div className="widget-list bg-none">\n'+
'      <div className="widget-list-item">\n'+
'        <div className="widget-list-media text-center">\n'+
'          <Link to="/widgets"><i className="fab fa-twitter fa-3x"></i></Link>\n'+
'        </div>\n'+
'        <div className="widget-list-content">\n'+
'          <h4 className="widget-list-title">Twitter Headquater</h4>\n'+
'          <p className="widget-list-desc">Corporate Office</p>\n'+
'        </div>\n'+
'        <div className="widget-list-action">\n'+
'          <Link to="/widgets" className="text-gray-500"><i className="fa fa-angle-right fa-2x"></i></Link>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetTodolist">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Todolist</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget-todolist rounded">\n'+
'  <div className="widget-todolist-header">\n'+
'    <div className="widget-todolist-header-title">Todolist</div>\n'+
'    <div className="widget-todolist-header-total"><span>0</span><small>Done</small></div>\n'+
'  </div>\n'+
'  <div className="widget-todolist-body">\n'+
'    <div className="widget-todolist-item">\n'+
'      <div className="widget-todolist-input">\n'+
'        <div className="form-check">\n'+
'          <input className="form-check-input" type="checkbox" id="widget_todolist_1" />\n'+
'        </div>\n'+
'      </div>\n'+
'      <div className="widget-todolist-content">\n'+
'        <h6 className="mb-2px">Borrow Tony\'s travel guide</h6>\n'+
'        <div className="text-gray-500 fw-bold fs-11px">Vacation in Rome</div>\n'+
'      </div>\n'+
'      <div className="widget-todolist-icon">\n'+
'        <Link to="/widgets"><i className="fa fa-question-circle"></i></Link>\n'+
'      </div>\n'+
'    </div>\n'+
'    ...\n'+
'    <div className="widget-todolist-item">\n'+
'      <div className="widget-todolist-input">\n'+
'        <i className="fa fa-plus text-gray-500 fa-fw"></i>\n'+
'      </div>\n'+
'      <div className="widget-todolist-content">\n'+
'        <input type="text" className="form-control border-0 shadow-none rounded-0 p-0 h-20px bg-none" placeholder="Write your task here..." />\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetChatInput">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Chat & Input</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget-chat rounded mb-4">\n'+
'  <div className="widget-chat-header">\n'+
'    <div className="widget-chat-header-icon">\n'+
'      <i className="fab fa-earlybirds w-30px h-30px fs-20px bg-yellow text-dark d-flex align-items-center justify-content-center rounded"></i>\n'+
'    </div>\n'+
'    <div className="widget-chat-header-content">\n'+
'      <h4 className="widget-chat-header-title">Company Discussion Group</h4>\n'+
'      <p className="widget-chat-header-desc">55 members, 4 online</p>\n'+
'    </div>\n'+
'  </div>\n'+
'  <PerfectScrollbar className="widget-chat-body" style={{height: \'235px\'}} options={{suppressScrollX: true}}>\n'+
'    <div className="text-center text-gray-500 m-2 fw-bold">Today</div>\n'+
'    <div className="widget-chat-item with-media start">\n'+
'      <div className="widget-chat-media">\n'+
'        <img alt="" src="/assets/img/user/user-1.jpg" />\n'+
'      </div>\n'+
'      <div className="widget-chat-info">\n'+
'        <div className="widget-chat-info-container">\n'+
'          <div className="widget-chat-name text-indigo">Hudson Mendes</div>\n'+
'          <div className="widget-chat-message">Should we plan for a company trip this year?</div>\n'+
'          <div className="widget-chat-time">6:00PM</div>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'    ...\n'+
'  </PerfectScrollbar>\n'+
'  <div className="widget-input">\n'+
'    <form action="" method="POST" name="">\n'+
'      <div className="widget-input-container">\n'+
'        <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-camera"></i></Link></div>\n'+
'        <div className="widget-input-box">\n'+
'          <input type="text" className="form-control" placeholder="Write a message..." />\n'+
'        </div>\n'+
'        <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-smile"></i></Link></div>\n'+
'        <div className="widget-input-divider"></div>\n'+
'        <div className="widget-input-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-microphone"></i></Link></div>\n'+
'      </div>\n'+
'    </form>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetImgIcon">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Image / Icon</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget-icon rounded bg-indigo me-5px mb-5px text-white">\n'+
'  <i className="fab fa-digital-ocean"></i>\n'+
'</div>\n'+
'\n'+
'<div className="widget-icon widget-icon-xl user rounded float-start me-5px mb-5px bg-gray-500 text-white">\n'+
'  <i className="fa fa-user"></i>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetCard">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget List Card</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<Link to="/widgets" className="widget-card rounded mb-20px">\n'+
'  <div className="widget-card-cover rounded" style={{ backgroundImage: \'url(/assets/img/gallery/gallery-portrait-11-thumb.jpg)\'}}></div>\n'+
'  <div className="widget-card-content">\n'+
'    <b className="text-white">Download and get free trial.</b>\n'+
'  </div>\n'+
'  <div className="widget-card-content bottom">\n'+
'    <i className="fab fa-pushed fa-5x text-indigo"></i>\n'+
'    <h4 className="text-white mt-10px"><b>Apple Draw<br /> Photo Booth</b></h4>\n'+
'    <h5 className="fs-12px text-white text-opacity-75 mb-0"><b>EASILY DRAW ON PHOTOS</b></h5>\n'+
'  </div>\n'+
'</Link>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetCardSquare">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget List Card Square</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<Link to="/widgets" className="widget-card rounded square mb-1">\n'+
'  <div className="widget-card-cover" style={{ backgroundImage: \'url(/assets/img/login-bg/login-bg-1-thumb.jpg)\'}}></div>\n'+
'</Link>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetStat">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Stat</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget widget-stats bg-teal mb-7px">\n'+
'  <div className="stats-icon stats-icon-lg"><i className="fa fa-globe fa-fw"></i></div>\n'+
'  <div className="stats-content">\n'+
'    <div className="stats-title">TODAY\'S VISITS</div>\n'+
'    <div className="stats-number">7,842,900</div>v\n'+
'    <div className="stats-progress progress">\n'+
'      <div className="progress-bar" style={{width: \'70.1%\'}}></div>\n'+
'    </div>\n'+
'    <div className="stats-desc">Better than last week (70.1%)</div>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetChart">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Chart</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget rounded mb-4">\n'+
'  <div className="widget-header">\n'+
'    <h4 className="widget-header-title">Audience Overview</h4>\n'+
'    <div className="widget-header-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-fw fa-upload"></i></Link></div>\n'+
'    <div className="widget-header-icon"><Link to="/widgets" className="text-gray-500"><i className="fa fa-fw fa-cog"></i></Link></div>\n'+
'  </div>\n'+
'  <div className="row m-0">\n'+
'    <div className="col widget-chart-content">\n'+
'      <Chart type="area" options={this.chartData.options} series={this.chartData.series} />\n'+
'    </div>\n'+
'    <div className="col-lg-4 p-3">\n'+
'      <div className="widget-chart-info">\n'+
'        <h4 className="widget-chart-info-title">Total sales</h4>\n'+
'        <p className="widget-chart-info-desc">Lorem ipsum dolor sit consectetur adipiscing elit.</p>\n'+
'        <div className="widget-chart-info-progress">\n'+
'          <b>Monthly Plan</b>\n'+
'          <span className="float-end">70%</span>\n'+
'        </div>\n'+
'        <div className="progress h-10px">\n'+
'          <div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill" style={{width: \'70%\'}}></div>\n'+
'        </div>\n'+
'      </div>\n'+
'      <hr />\n'+
'      <div className="widget-chart-info">\n'+
'        <h4 className="widget-chart-info-title">Task progress</h4>\n'+
'        <p className="widget-chart-info-desc">Vestibulum sollicitudin in lectus a cursus.</p>\n'+
'        <div className="widget-chart-info-progress">\n'+
'          <b>Marketing Research</b>\n'+
'          <span className="float-end">74%</span>\n'+
'        </div>\n'+
'        <div className="progress h-10px mb-15px">\n'+
'          <div className="progress-bar progress-bar-striped progress-bar-animated rounded-pill bg-indigo" style={{width: \'74%\'}}></div>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetTable">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget Table</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="table-responsive">\n'+
'  <table className="table table-bordered widget-table rounded">\n'+
'    <thead>\n'+
'      <tr className="text-nowrap">\n'+
'        <th width="1%">Image</th>\n'+
'        <th>Product Info</th>\n'+
'        <th>Price</th>\n'+
'        <th>Qty</th>\n'+
'        <th>Total</th>\n'+
'        <th></th>\n'+
'      </tr>\n'+
'    </thead>\n'+
'    <tbody>\n'+
'      <tr>\n'+
'        <td>\n'+
'          <img src="/assets/img/product/product-6.png" alt="" width="100" />\n'+
'        </td>\n'+
'        <td>\n'+
'          <h5 className="mb-1">Mavic Pro Combo</h5>\n'+
'          <p className="fs-11px fw-bold text-gray-600 mb-3">Portable yet powerful, the Mavic Pro is your personal drone, ready to go with you everywhere.</p>\n'+
'          <div className="progress h-10px rounded-pill mb-5px">\n'+
'            <div className="progress-bar progress-bar-striped progress-bar-animated bg-orange fs-10px fw-bold" style={{width: \'30%\'}}>30%</div>\n'+
'          </div>\n'+
'          <div className="clearfix fs-10px">\n'+
'            status: \n'+
'            <b className="text-dark">Shipped</b>\n'+
'          </div>\n'+
'        </td>\n'+
'        <td className="text-nowrap">\n'+
'          <b className="text-dark">$999</b><br />\n'+
'          <small className="text-dark"><del>$1,202</del></small>\n'+
'        </td>\n'+
'        <td>1</td>\n'+
'        <td>999.00</td>\n'+
'        <td>\n'+
'          <Link to="/widgets" className="btn btn-sm w-80px rounded-pill btn-default">Edit</Link>\n'+
'        </td>\n'+
'      </tr>\n'+
'    </tbody>\n'+
'  </table>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
        	</div>
        </div>
        <div className="modal fade" id="modalWidgetList">
        	<div className="modal-dialog modal-lg">
        		<div className="modal-content">
							<div className="modal-header">
								<h4>Widget List</h4>
								<button className="btn-close" data-bs-dismiss="modal"> </button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<div className="widget-list rounded mb-4">\n'+
'  <div className="widget-list-item">\n'+
'    <div className="widget-list-media">\n'+
'      <img src="/assets/img/user/user-12.jpg" width="50" alt="" className="rounded" />\n'+
'    </div>\n'+
'    <div className="widget-list-content">\n'+
'      <h4 className="widget-list-title">Christopher Struth</h4>\n'+
'      <p className="widget-list-desc">Bank Transfer</p>\n'+
'    </div>\n'+
'    <div className="widget-list-action">\n'+
'      <a href="#/" data-bs-toggle="dropdown" className="text-gray-500"><i className="fa fa-ellipsis-h fs-14px"></i></a>\n'+
'      <div className="dropdown-menu dropdown-menu-end">\n'+
'        <a href="#/" className="dropdown-item">Option 1</a>\n'+
'        <a href="#/" className="dropdown-item">Option 2</a>\n'+
'        <a href="#/" className="dropdown-item">Option 3</a>\n'+
'        <div className="dropdown-divider"></div>\n'+
'        <a href="#/" className="dropdown-item">Option 4</a>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>'}</Highlight>
							</div>
							<div className="modal-footer">
								<button className="btn btn-default" data-bs-dismiss="modal">Close</button>
							</div>
						</div>
					</div>
        </div>
				<div className="modal fade" id="modalWidgetListWithIcon">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title">Widget List with Icon</h4>
								<button data-bs-dismiss="modal" className="btn-close"></button>
							</div>
							<div className="hljs-wrapper">
								<Highlight className='html'>{
'<!-- begin widget-list -->\n'+
'<div className="widget-list rounded">\n'+
'  <!-- begin widget-list-item -->\n'+
'  <a href="#/" className="widget-list-item">\n'+
'    <div className="widget-list-media icon">\n'+
'      <i className="fa fa-link bg-yellow text-dark"></i>\n'+
'    </div>\n'+
'    <div className="widget-list-content">\n'+
'      <h4 className="widget-list-title">Personal Hotspot</h4>\n'+
'    </div>\n'+
'    <div className="widget-list-action text-nowrap text-gray-600 fw-bold text-decoration-none">\n'+
'      Off\n'+
'      <i className="fa fa-angle-right text-gray-500 fa-lg"></i>\n'+
'    </div>\n'+
'  </a>\n'+
'  <!-- end widget-list-item -->\n'+
'  ...\n'+
'</div>\n'+
'<!-- end widget-list -->'}</Highlight>
							</div>
							<div className="modal-footer">
								<a href="#/" data-bs-dismiss="modal" className="btn btn-default">Close</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Widgets;
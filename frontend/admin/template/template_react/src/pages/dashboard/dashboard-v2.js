import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Calendar from 'react-calendar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Chart from 'react-apexcharts';
import { Panel, PanelHeader, PanelFooter } from './../../components/panel/panel.jsx';
import { AppSettings } from './../../config/app-settings.js';

class DashboardV2 extends React.Component {
	static contextType = AppSettings;
	
	
	handleGetDate(minusDate) {
		var d = new Date();
				d = d.setDate(d.getDate() - minusDate);
		return d;
	};
	
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
			colors: ['#00acac', '#348fe2'],
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
					colors: '#ffffff'
				}
			},
			xaxis: {
				type: 'datetime',
				tickAmount: 6,
				labels: {
					style: {
						colors: '#ffffff'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: '#ffffff'
					}
				}
			},
			tooltip: { y: { formatter: function (val) { return "$ " + val + " thousands" } } },
			chart: { height: '100%', type: 'area', toolbar: { show: false }, stacked: true },
			plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
			dataLabels: { enabled: false },
			grid: { 
				show: true, borderColor: 'rgba(255,255,255, .15)',
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
	};
	pieChartData = {
		height: 180,
		series: [416747,784466],
		options: {
			labels: ['New Visitors', 'Return Visitors'],
			chart: { type: 'donut' },
			dataLabels: { dropShadow: { enabled: false }, style: { colors: ['#fff'] } },
			stroke: { show: false },
			colors: [ '#348fe2', '#00acac' ],
			legend: { show: false }
		}
	};
	
	render() {
		this.formatDate = (d) => {
			var monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			d = new Date(d);
			d = monthsName[d.getMonth()] + ' ' + d.getDate();
			return d;
		}
		this.getDate = (minusDate) => {
			var d = new Date();
			d = d.setDate(d.getDate() - minusDate);
			return d;
		}
		
		this.map = {
			center: {
				lat: 59.95,
				lng: 30.33
			},
			zoom: 9
		}
		this.date = new Date();	
		
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/dashboard/v2">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/dashboard/v2">Dashboard</Link></li>
					<li className="breadcrumb-item active">Dashboard v2</li>
				</ol>
				<h1 className="page-header">Dashboard v2 <small>header small text goes here...</small></h1>
				<div className="row">
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-teal">
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
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-blue">
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
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-indigo">
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
					<div className="col-xl-3 col-md-6">
						<div className="widget widget-stats bg-dark">
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
				</div>
				<div className="row">
					<div className="col-xl-8">
						<div className="widget-chart with-sidebar inverse-mode">
							<div className="widget-chart-content bg-gray-800">
								<h4 className="chart-title">
									Visitors Analytics
									<small>Where do our visitors come from</small>
								</h4>
								<div className="widget-chart-full-width dark-mode overflow-hidden pe-3 mb-n3 pt-3">
									<Chart type="area" height="244" width="100%" options={this.chartData.options} series={this.chartData.series} />
								</div>
							</div>
							<div className="widget-chart-sidebar bg-gray-900">
								<div className="chart-number">
									1,225,729
									<small>Total visitors</small>
								</div>
								<div className="flex-grow-1 d-flex align-items-center dark-mode">
									<Chart type="donut" height={this.pieChartData.height} options={this.pieChartData.options} series={this.pieChartData.series} />
								</div>
								<ul className="chart-legend fs-11px">
									<li><i className="fa fa-circle fa-fw text-blue fs-9px me-5px t-minus-1"></i> 34.0% <span>New Visitors</span></li>
									<li><i className="fa fa-circle fa-fw text-teal fs-9px me-5px t-minus-1"></i> 56.0% <span>Return Visitors</span></li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xl-4">
						<Panel>
							<PanelHeader noButton={true}>
								Visitors Origin
							</PanelHeader>
							<div style={{height: '170px'}}>
								<GoogleMapReact defaultCenter={this.map.center} defaultZoom={this.map.zoom}></GoogleMapReact>
							</div>
							<div className="list-group">
								<Link to="/dashboard/v2" className="list-group-item rounded-0 list-group-item-action list-group-item-inverse d-flex justify-content-between align-items-center text-ellipsis">
									1. United State 
									<span className="badge bg-teal fs-10px">20.95%</span>
								</Link> 
								<Link to="/dashboard/v2" className="list-group-item list-group-item-action list-group-item-inverse d-flex justify-content-between align-items-center text-ellipsis">
									2. India
									<span className="badge bg-blue fs-10px">16.12%</span>
								</Link>
								<Link to="/dashboard/v2" className="list-group-item list-group-item-action list-group-item-inverse d-flex justify-content-between align-items-center text-ellipsis">
									3. Mongolia
									<span className="badge bg-gray-600 fs-10px">14.99%</span>
								</Link>
							</div>
						</Panel>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-4 col-lg-6">
						<Panel className="bg-light">
							<PanelHeader noButton={true}>
								<div className="d-flex">
									Chat History <span className="badge bg-teal ms-auto">4 message</span>
								</div>
							</PanelHeader>
							<PerfectScrollbar className="chats" style={{height: '260px'}} options={{suppressScrollX: true}}>
								<div className="chats-item start">
									<span className="date-time">yesterday 11:23pm</span>
									<Link to="/dashboard/v2" className="name">Sowse Bawdy</Link>
									<Link to="/dashboard/v2" className="image"><img alt="" src="../assets/img/user/user-12.jpg" /></Link>
									<div className="message">
										Lorem ipsum dolor sit amet, consectetuer adipiscing elit volutpat. Praesent mattis interdum arcu eu feugiat.
									</div>
								</div>
								<div className="chats-item end">
									<span className="date-time">08:12am</span>
									<Link to="/dashboard/v2" className="name"><span className="badge bg-blue">ADMIN</span> Me</Link>
									<Link to="/dashboard/v2" className="image"><img alt="" src="../assets/img/user/user-13.jpg" /></Link>
									<div className="message">
										Nullam posuere, nisl a varius rhoncus, risus tellus hendrerit neque.
									</div>
								</div>
								<div className="chats-item start">
									<span className="date-time">09:20am</span>
									<Link to="/dashboard/v2" className="name">Neck Jolly</Link>
									<Link to="/dashboard/v2" className="image"><img alt="" src="../assets/img/user/user-10.jpg" /></Link>
									<div className="message">
										Euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
									</div>
								</div>
								<div className="chats-item start">
									<span className="date-time">11:15am</span>
									<Link to="/dashboard/v2" className="name">Shag Strap</Link>
									<Link to="/dashboard/v2" className="image"><img alt="" src="../assets/img/user/user-14.jpg" /></Link>
									<div className="message">
										Nullam iaculis pharetra pharetra. Proin sodales tristique sapien mattis placerat.
									</div>
								</div>
							</PerfectScrollbar>
							<PanelFooter>
								<form name="send_message_form" data-id="message-form">
									<div className="input-group">
										<input type="text" className="form-control" name="message" placeholder="Enter your message here." />
										<button className="btn btn-primary" type="button"><i className="fa fa-camera"></i></button>
										<button className="btn btn-primary" type="button"><i className="fa fa-link"></i></button>
									</div>
								</form>
							</PanelFooter>
						</Panel>
					</div>
					<div className="col-xl-4 col-lg-6">
						<Panel>
							<PanelHeader noButton={true}>
								Today's Schedule
							</PanelHeader>
							<div>
								<Calendar value={this.date} />
							</div>
							<hr className="m-0 bg-gray-500" />
							<div className="list-group list-group-flush">
								<Link to="/dashboard/v2" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-ellipsis">
									Sales Reporting
									<span className="badge bg-teal fs-10px">9:00 am</span>
								</Link> 
								<Link to="/dashboard/v2" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-ellipsis rounded-bottom">
									Have a meeting with sales team
									<span className="badge bg-blue fs-10px">2:45 pm</span>
								</Link>
							</div>
						</Panel>
					</div>
					<div className="col-xl-4 col-lg-6">
						<Panel>
							<PanelHeader noButton={true}>
								<div className="d-flex">
									New Registered Users 
									<span className="badge bg-teal ms-auto">24 new users</span>
								</div>
							</PanelHeader>
							<ul className="registered-users-list clearfix">
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-5.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Savory Posh
										<small>Algerian</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-3.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Ancient Caviar
										<small>Korean</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-1.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Marble Lungs
										<small>Indian</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-8.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Blank Bloke
										<small>Japanese</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-2.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Hip Sculling
										<small>Cuban</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-6.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Flat Moon
										<small>Nepalese</small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-4.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Packed Puffs
										<small>Malaysian></small>
									</h4>
								</li>
								<li>
									<Link to="/dashboard/v2"><img src="/assets/img/user/user-9.jpg" alt="" /></Link>
									<h4 className="username text-ellipsis">
										Clay Hike
										<small>Swedish</small>
									</h4>
								</li>
							</ul>
							<PanelFooter className="text-center">
								<Link to="/dashboard/v2" className="text-decoration-none text-inverse">View All</Link>
							</PanelFooter>
						</Panel>
					</div>
				</div>
			</div>
		)
	}
};

export default DashboardV2;
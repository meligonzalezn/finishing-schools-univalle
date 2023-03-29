import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import Chart from 'chart.js/auto';
import { Line, Bar, Radar, PolarArea, Pie, Doughnut } from 'react-chartjs-2';
import Highlight from 'react-highlight';
import { AppSettings } from './../../config/app-settings.js';

class ChartJs extends React.Component {
	static contextType = AppSettings;
	
	randomScalingFactor() { 
		return Math.round(Math.random()*100)
	};
	
	lineChart = {
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
					label: 'Dataset 1',
					borderColor: this.context.color.blue,
					pointBackgroundColor: this.context.color.blue,
					pointRadius: 4,
					borderWidth: 2,
					backgroundColor: 'rgba(' + this.context.color.blueRgb + ', .3)',
					data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
			}, {
					label: 'Dataset 2',
					borderColor: 'rgba(' + this.context.color.componentColorRgb + ', .85)',
					pointBackgroundColor: this.context.color.componentBg,
					pointRadius: 4,
					borderWidth: 2,
					backgroundColor: 'rgba(' + this.context.color.componentColorRgb + ', .5)',
					data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false,
			hover: {
				mode: 'nearest',
				intersect: true
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			}
		}
	};
	
	barChart = {
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [{
				label: 'Dataset 1',
				borderWidth: 1,
				borderColor: this.context.color.indigo,
				backgroundColor: 'rgba(' + this.context.color.indigoRgb + ', .3)',
				data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
			}, {
				label: 'Dataset 2',
				borderWidth: 1,
				borderColor: 'rgba(' + this.context.color.componentColorRgb + ', .85)',
				backgroundColor: 'rgba(' + this.context.color.componentColorRgb + ', .3)',
				data: [this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor(), this.randomScalingFactor()]
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false
		}
	};
	
	radarChart = {
		data: {
			labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
			datasets: [{
				label: 'Dataset 1',
				borderWidth: 2,
				borderColor: this.context.color.red,
				pointBackgroundColor: this.context.color.red,
				pointRadius: 2,
				backgroundColor: 'rgba(' + this.context.color.redRgb + ', .2)',
				data: [65,59,90,81,56,55,40]
			}, {
				label: 'Dataset 2',
				borderWidth: 2,
				borderColor: this.context.color.componentColor,
				pointBackgroundColor: this.context.color.componentColor,
				pointRadius: 2,
				backgroundColor: 'rgba(' + this.context.color.componentColorRgb + ', .2)',
				data: [28,48,40,19,96,27,100]
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false
		}
	};
	
	polarAreaChart = {
		data: {
			labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
			datasets: [{
				data: [300, 160, 100, 200, 120],
				backgroundColor: ['rgba(' + this.context.color.indigoRgb + ', .7)', 'rgba(' + this.context.color.blueRgb + ', .7)', 'rgba(' + this.context.color.successRgb + ', .7)', 'rgba(' + this.context.color.gray300Rgb + ', .7)', 'rgba(' + this.context.color.gray900Rgb + ', .7)'],
				borderColor: [this.context.color.indigo, this.context.color.blue, this.context.color.success, this.context.color.gray300, this.context.color.gray900],
				borderWidth: 2,
				label: 'My dataset'
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false
		}
	};
	
	pieChart = {
		data: {
			labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
			datasets: [{
				data: [300, 50, 100, 40, 120],
				backgroundColor: ['rgba(' + this.context.color.redRgb + ', .7)', 'rgba(' + this.context.color.orangeRgb + ', .7)', 'rgba(' + this.context.color.gray500Rgb + ', .7)', 'rgba(' + this.context.color.gray300Rgb + ', .7)', 'rgba(' + this.context.color.gray900Rgb + ', .7)'],
				borderColor: [this.context.color.red, this.context.color.orange, this.context.color.gray500, this.context.color.gray300, this.context.color.gray900],
				borderWidth: 2,
				label: 'My dataset'
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false
		}
	};
	
	doughnutChart = {
		data: {
			labels: ['Dataset 1', 'Dataset 2', 'Dataset 3', 'Dataset 4', 'Dataset 5'],
			datasets: [{
				data: [300, 50, 100, 40, 120],
				backgroundColor: ['rgba(' + this.context.color.indigoRgb + ', .7)', 'rgba(' + this.context.color.blueRgb + ', .7)', 'rgba(' + this.context.color.successRgb + ', .7)', 'rgba(' + this.context.color.gray300Rgb + ', .7)', 'rgba(' + this.context.color.gray900Rgb + ', .7)'],
				borderColor: [this.context.color.indigo, this.context.color.blue, this.context.color.success, this.context.color.gray300, this.context.color.gray900],
				borderWidth: 2,
				label: 'My dataset'
			}]
		},
		options: {
			animation: {
				duration: 0
			},
			responsive: true, 
			maintainAspectRatio: false
		}
	};

	render() {
		Chart.defaults.color = 'rgba(' + this.context.color.componentColorRgb + ', .65)';
		Chart.defaults.font.family = this.context.font.family;
		Chart.defaults.font.weight = 600;
		Chart.defaults.scale.grid.color = 'rgba(' + this.context.color.componentColorRgb + ', .15)';
		Chart.defaults.scale.ticks.backdropColor = 'rgba(' + this.context.color.componentColorRgb + ', 0)';
		
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/chart/js">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/chart/js">Chart</Link></li>
					<li className="breadcrumb-item active">Chart JS</li>
				</ol>
				<h1 className="page-header">Chart JS <small>header small text goes here...</small></h1>
				<div className="row">
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Line Chart</PanelHeader>
							<PanelBody>
								<p>
									A line chart is a way of plotting data points on a line.
									Often, it is used to show trend data, and the comparison of two data sets.
								</p>
								<div style={{ height: '300px'}}>
									<Line data={this.lineChart.data} options={this.lineChart.options} />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { Line } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'var randomScalingFactor = function() {\n'+
'  return Math.round(Math.random()*100)\n'+
'};\n\n'+
'this.lineChart = {\n'+
'  data: {\n'+
'    labels: [\'January\', \'February\', \'March\', \'April\', \'May\', \'June\', \'July\'],\n'+
'    datasets: [{\n'+
'        label: \'Dataset 1\',\n'+
'        borderColor: this.context.color.blue,\n'+
'        pointBackgroundColor: this.context.color.blue,\n'+
'        pointRadius: 4,\n'+
'        borderWidth: 2,\n'+
'        backgroundColor: \'rgba(\' + this.context.color.blueRgb + \', .7)\',\n'+
'        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]\n'+
'    }, {\n'+
'        label: \'Dataset 2\',\n'+
'        borderColor: \'rgba(\' + this.context.color.componentColorRgb + \', .85)\',\n'+
'        pointBackgroundColor: this.context.color.componentBg,\n'+
'        pointRadius: 4,\n'+
'        borderWidth: 2,\n'+
'        backgroundColor: \'rgba(\' + this.context.color.componentColorRgb + \', .5)\',\n'+
'        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false,\n'+
'    hover: {\n'+
'      mode: \'nearest\',\n'+
'      intersect: true\n'+
'    },\n'+
'    tooltips: {\n'+
'      mode: \'index\',\n'+
'      intersect: false,\n'+
'    },\n'+
'  }\n'+
'};\n'+
'\n'+
'<Line data={this.lineChart.data} options={this.lineChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Bar Chart</PanelHeader>
							<PanelBody>
								<p>
									A bar chart is a way of showing data as bars.
									It is sometimes used to show trend data, and the comparison of multiple data sets side by side.
								</p>
								<div style={{ height: '300px'}}>
									<Bar data={this.barChart.data} options={this.barChart.options} />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { Bar } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'var randomScalingFactor = function() {\n'+
'  return Math.round(Math.random()*100)\n'+
'};\n\n'+
'this.barChart = {\n'+
'  data: {\n'+
'    labels: [\'January\', \'February\', \'March\', \'April\', \'May\', \'June\', \'July\'],\n'+
'    datasets: [{\n'+
'      label: \'Dataset 1\',\n'+
'      borderWidth: 1,\n'+
'      borderColor: this.context.color.indigo,\n'+
'      backgroundColor: \'rgba(\' + this.context.color.indigoRgb + \', .3)\',\n'+
'      data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]\n'+
'    }, {\n'+
'      label: \'Dataset 2\',\n'+
'      borderWidth: 1,\n'+
'      borderColor: \'rgba(\' + this.context.color.componentColorRgb + \', .85)\',\n'+
'      backgroundColor: \'rgba(\' + this.context.color.componentColorRgb + \', .3)\',\n'+
'      data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false\n'+
'  }\n'+
'};\n'+
'\n'+
'<Bar data={this.barChart.data} options={this.barChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Radar Chart</PanelHeader>
							<PanelBody>
								<p>
									A radar chart is a way of showing multiple data points and the variation between them.
									They are often useful for comparing the points of two or more different data sets.
								</p>
								<div style={{ height: '300px'}}>
									<Radar data={this.radarChart.data} options={this.radarChart.options} />
								</div>
							</PanelBody>
							
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { Radar } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'this.radarChart = {\n'+
'  data: {\n'+
'    labels: [\'Eating\', \'Drinking\', \'Sleeping\', \'Designing\', \'Coding\', \'Cycling\', \'Running\'],\n'+
'    datasets: [{\n'+
'      label: \'Dataset 1\',\n'+
'      borderWidth: 2,\n'+
'      borderColor: this.context.color.red,\n'+
'      pointBackgroundColor: this.context.color.red,\n'+
'      pointRadius: 2,\n'+
'      backgroundColor: \'rgba(\' + this.context.color.redRgb + \', .2)\',\n'+
'      data: [65,59,90,81,56,55,40]\n'+
'    }, {\n'+
'      label: \'Dataset 2\',\n'+
'      borderWidth: 2,\n'+
'      borderColor: this.context.color.componentColor,\n'+
'      pointBackgroundColor: this.context.color.componentColor,\n'+
'      pointRadius: 2,\n'+
'      backgroundColor: \'rgba(\' + this.context.color.componentColorRgb + \', .2)\',\n'+
'      data: [28,48,40,19,96,27,100]\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false\n'+
'  }\n'+
'};\n'+
'\n'+
'<Radar data={this.radarChart.data} options={this.radarChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>Polar Area Chart</PanelHeader>
							<PanelBody>
								<p>
									Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment 
									differs depending on the value.
								</p>
								<div style={{ height: '300px'}}>
									<PolarArea data={this.polarAreaChart.data} options={this.polarAreaChart.options} />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { PolarArea } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'var randomScalingFactor = function() {\n'+
'  return Math.round(Math.random()*100)\n'+
'};\n\n'+
'this.polarAreaChart = {\n'+
'  data: {\n'+
'    labels: [\'Dataset 1\', \'Dataset 2\', \'Dataset 3\', \'Dataset 4\', \'Dataset 5\'],\n'+
'    datasets: [{\n'+
'      data: [300, 160, 100, 200, 120],\n'+
'      backgroundColor: [\'rgba(\' + this.context.color.indigoRgb + \', .7)\', \'rgba(\' + this.context.color.blueRgb + \', .7)\', \'rgba(\' + this.context.color.successRgb + \', .7)\', \'rgba(\' + this.context.color.gray300Rgb + \', .7)\', \'rgba(\' + this.context.color.gray900Rgb + \', .7)\'],\n'+
'      borderColor: [this.context.color.indigo, this.context.color.blue, this.context.color.success, this.context.color.gray300, this.context.color.gray900],\n'+
'      borderWidth: 2,\n'+
'      label: \'My dataset\'\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false\n'+
'  }\n'+
'};\n'+
'\n'+
'<PolarArea data={this.polarAreaChart.data} options={this.polarAreaChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<Panel>
							<PanelHeader>Pie Chart</PanelHeader>
							<PanelBody>
								<p>
									Pie and doughnut charts are probably the most commonly used chart there are. They are divided into segments, the arc of each segment shows the proportional value of each piece of data.
								</p>
								<div style={{ height: '300px'}}>
									<Pie data={this.pieChart.data} options={this.pieChart.options} />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { Pie } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'this.pieChart = {\n'+
'  data: {\n'+
'    labels: [\'Dataset 1\', \'Dataset 2\', \'Dataset 3\', \'Dataset 4\', \'Dataset 5\'],\n'+
'    datasets: [{\n'+
'      data: [300, 50, 100, 40, 120],\n'+
'      backgroundColor: [\'rgba(\' + this.context.color.redRgb + \', .7)\', \'rgba(\' + this.context.color.orangeRgb + \', .7)\', \'rgba(\' + this.context.color.gray500Rgb + \', .7)\', \'rgba(\' + this.context.color.gray300Rgb + \', .7)\', \'rgba(\' + app.color.gray900Rgb + \', .7)\'],\n'+
'      borderColor: [this.context.color.red, this.context.color.orange, this.context.color.gray500, this.context.color.gray300, this.context.color.gray900],\n'+
'      borderWidth: 2,\n'+
'      label: \'My dataset\'\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false\n'+
'  }\n'+
'};\n'+
'\n'+
'<Pie data={this.pieChart.data} options={this.pieChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-md-6">
						<Panel>
							<PanelHeader>Doughnut Chart</PanelHeader>
							<PanelBody>
								<p>
									Pie and doughnut charts are registered under two aliases in the Chart core. Other than their different default value, and different alias, they are exactly the same.
								</p>
								<div style={{ height: '300px'}}>
									<Doughnut data={this.doughnutChart.data} options={this.doughnutChart.options} />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { Doughnut } from \'react-chartjs-2\';\n'+
'import { AppSettings } from \'./../../config/app-settings.js;\'\n\n'+
'static contextType = AppSettings;\n'+
'\n'+
'var randomScalingFactor = function() {\n'+
'  return Math.round(Math.random()*100)\n'+
'};\n\n'+
'this.doughnutChart = {\n'+
'  data: {\n'+
'    labels: [\'Dataset 1\', \'Dataset 2\', \'Dataset 3\', \'Dataset 4\', \'Dataset 5\'],\n'+
'    datasets: [{\n'+
'      data: [300, 50, 100, 40, 120],\n'+
'      backgroundColor: [\'rgba(\' + this.context.color.indigoRgb + \', .7)\', \'rgba(\' + this.context.color.blueRgb + \', .7)\', \'rgba(\' + this.context.color.successRgb + \', .7)\', \'rgba(\' + this.context.color.gray300Rgb + \', .7)\', \'rgba(\' + this.context.color.gray900Rgb + \', .7)\'],\n'+
'      borderColor: [this.context.color.indigo, this.context.color.blue, this.context.color.success, this.context.color.gray300, this.context.color.gray900],\n'+
'      borderWidth: 2,\n'+
'      label: \'My dataset\'\n'+
'    }]\n'+
'  },\n'+
'  options: {\n'+
'    animation: {\n'+
'      duration: 0\n'+
'    },\n'+
'    responsive: true, \n'+
'    maintainAspectRatio: false\n'+
'  }\n'+
'};\n'+
'\n'+
'<Doughnut data={this.doughnutChart.data} options={this.doughnutChart.options} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
				</div>
			</div>
		)
	}
}

export default ChartJs;
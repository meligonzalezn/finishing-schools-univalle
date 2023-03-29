import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { SketchPicker, ChromePicker } from 'react-color';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';
import DateTime from 'react-datetime';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-datetime/css/react-datetime.css';
import 'react-datepicker/dist/react-datepicker.css';
import Highlight from 'react-highlight';

class FormPlugins extends React.Component {
	constructor(props) {
		super(props);
		
		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');
		
		this.minDateRange = (current) => {
			return current.isAfter( minYesterday );
		};
		this.maxDateRange = (current) => {
			return current.isAfter( maxYesterday );
		};
		this.minDateChange = (value) => {
			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};
		this.handleChange = (date) => {
			this.setState({
				startDate: date
			});
		}
		this.state = {
			maxDateDisabled: true,
			startDate: new Date(),
			sketchBackgroundColor: '#348fe2',
			chromeBackgroundColor: '#8753de',
			tags: [
				{ id: 1, name: 'Apples' },
				{ id: 2, name: 'Pears' }
			],
			suggestions: [
				{ id: 3, name: 'Bananas' },
				{ id: 4, name: 'Mangos' },
				{ id: 5, name: 'Lemons' },
				{ id: 6, name: 'Apricots' }
			],
			text: '',
			editor: {
				height: (window.innerHeight > 600) ? window.innerHeight - 315 : 300
			}
		}
		this.handleSketchChangeComplete = (color) => {
			this.setState({ sketchBackgroundColor: color.hex });
		};
		this.handleChromeChangeComplete = (color) => {
			this.setState({ chromeBackgroundColor: color.hex });
		};
		this.handleDelete = (i) => {
			const tags = this.state.tags.slice(0)
			tags.splice(i, 1)
			this.setState({ tags })
		}

		this.handleAddition = (tag) => {
			const tags = [].concat(this.state.tags, tag)
			this.setState({ tags })
		}
		this.selectOptions = [
			{ value: 'chocolate', label: 'Chocolate' },
			{ value: 'strawberry', label: 'Strawberry' },
			{ value: 'vanilla', label: 'Vanilla' }
		];
		this.styles = {
			control: styles => ({ 
				backgroundColor: 'var(--app-component-bg)', 
				color: 'var(--app-component-color)',
				border: '1px solid var(--app-component-border-color)',
				borderRadius: '4px',
				display: 'flex'
			}),
			indicatorSeparator: styles => ({
				backgroundColor: 'transparent'
			}),
			input: styles => ({
				color: 'var(--app-component-color)',
				fontWeight: '600',
				gridArea: '1/1/2/3',
				flex: '1 1 auto',
				display: 'inline-grid',
				margin: '2px',
				gridTemplateColumns: '0 min-content',
				boxSizing: 'content-box',
				paddingTop: '2px',
				paddingBottom: '2px',
				visibility: 'visible'
			}),
			singleValue: styles => ({
				color: 'var(--app-component-color)',
				gridArea: '1/1/2/3',
				marginLeft: '2px',
				marginRight: '2px',
				maxWidth: '100%',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				boxSizing: 'border-box'
			}),
			placeholder: styles => ({
				color: 'rgba(var(--app-component-color-rgb), .5)',
				fontWeight: '600',
				gridArea: '1/1/2/3'
			}),
			menu: styles => ({
				backgroundColor: 'var(--app-component-dropdown-bg)',
				position: 'absolute',
				top: '100%',
				borderRadius: '4px',
				margin: '8px 0',
				zIndex: '1',
				boxSizing: 'border-box',
				width: '100%'
			}),
			option: (styles, { data, isDisabled, isFocused, isSelected }) => {
				return {
					backgroundColor: isFocused ? 'var(--app-component-dropdown-hover-bg)' : '',
					color: 'var(--app-component-color)',
					cursor: isDisabled ? 'not-allowed' : 'default',
					padding: '8px 12px'
				};
			}
		};
	}
	
	handleChange(value) {
		this.setState({ text: value })
	}
	
	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/form/plugins">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/form/plugins">Form Stuff</Link></li>
					<li className="breadcrumb-item active">Form Plugins</li>
				</ol>
				<h1 className="page-header">Form Plugins <small>header small text goes here...</small></h1>
				
				<div className="row">
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>
								Bootstrap Date Time Picker
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Default Date Time</label>
										<div className="col-lg-8">
											<DateTime inputProps={{ placeholder: 'Datepicker' }} closeOnSelect={true} />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Select Time</label>
										<div className="col-lg-8">
											<DateTime dateFormat={false} inputProps={{ placeholder: 'Timepicker' }} />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Range Pickers</label>
										<div className="col-lg-8">
											<div className="row gx-2">
												<div className="col-6">
													<DateTime isValidDate={ this.minDateRange } inputProps={{ placeholder: 'Min Date' }} closeOnSelect={true} onChange={ this.minDateChange } />
												</div>
												<div className="col-6">
													<DateTime isValidDate={ this.maxDateRange } inputProps={{ placeholder: 'Max Date', disabled: this.state.maxDateDisabled }} closeOnSelect={true} />
												</div>
											</div>
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import DateTime from \'react-datetime\';\n'+
'\n'+
'<!-- html -->\n'+
'<DateTime inputProps={{ placeholder: \'Datepicker\' }} closeOnSelect={true} />'}
								</Highlight>
							</div>
						</Panel>
						
						<Panel>
							<PanelHeader>
								React Select
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">React Select Dropdown</label>
										<div className="col-lg-8">
											<Select options={this.selectOptions} styles={this.styles} />
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import Select from \'react-select\';\n'+
'\n'+
'this.selectOptions = [\n'+
'  { value: \'chocolate\', label: \'Chocolate\' },\n'+
'  { value: \'strawberry\', label: \'Strawberry\' },\n'+
'  { value: \'vanilla\', label: \'Vanilla\' }\n'+
'];\n'+
'this.styles = {\n'+
'  control: styles => ({ \n'+
'    backgroundColor: \'var(--app-component-bg)\', \n'+
'    color: \'var(--app-component-color)\',\n'+
'    border: \'1px solid var(--app-component-border-color)\',\n'+
'    borderRadius: \'4px\',\n'+
'    display: \'flex\'\n'+
'  }),\n'+
'  indicatorSeparator: styles => ({\n'+
'    backgroundColor: \'transparent\'\n'+
'  }),\n'+
'  input: styles => ({\n'+
'    color: \'var(--app-component-color)\',\n'+
'    fontWeight: \'600\',\n'+
'    gridArea: \'1/1/2/3\',\n'+
'    flex: \'1 1 auto\',\n'+
'    display: \'inline-grid\',\n'+
'    margin: \'2px\',\n'+
'    gridTemplateColumns: \'0 min-content\',\n'+
'    boxSizing: \'content-box\',\n'+
'    paddingTop: \'2px\',\n'+
'    paddingBottom: \'2px\',\n'+
'    visibility: \'visible\'\n'+
'  }),\n'+
'  singleValue: styles => ({\n'+
'    color: \'var(--app-component-color)\',\n'+
'    gridArea: \'1/1/2/3\',\n'+
'    marginLeft: \'2px\',\n'+
'    marginRight: \'2px\',\n'+
'    maxWidth: \'100%\',\n'+
'    overflow: \'hidden\',\n'+
'    textOverflow: \'ellipsis\',\n'+
'    whiteSpace: \'nowrap\',\n'+
'    boxSizing: \'border-box\'\n'+
'  }),\n'+
'  placeholder: styles => ({\n'+
'    color: \'rgba(var(--app-component-color-rgb), .5)\',\n'+
'    fontWeight: \'600\',\n'+
'    gridArea: \'1/1/2/3\'\n'+
'  }),\n'+
'  menu: styles => ({\n'+
'    backgroundColor: \'var(--app-component-dropdown-bg)\',\n'+
'    position: \'absolute\',\n'+
'    top: \'100%\',\n'+
'    borderRadius: \'4px\',\n'+
'    margin: \'8px 0\',\n'+
'    zIndex: \'1\',\n'+
'    boxSizing: \'border-box\',\n'+
'    width: \'100%\'\n'+
'  }),\n'+
'  option: (styles, { data, isDisabled, isFocused, isSelected }) => {\n'+
'    return {\n'+
'      backgroundColor: isFocused ? \'var(--app-component-dropdown-hover-bg)\' : \'\',\n'+
'      color: \'var(--app-component-color)\',\n'+
'      cursor: isDisabled ? \'not-allowed\' : \'default\',\n'+
'      padding: \'8px 12px\'\n'+
'    };\n'+
'  }\n'+
'};\n'+
'\n'+
'<!-- html -->\n'+
'<Select options={this.selectOptions} styles={this.styles} />'}
								</Highlight>
							</div>
						</Panel>
						
						<Panel>
							<PanelHeader>
								Datepicker
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Default Datepicker</label>
										<div className="col-lg-8">
											<DatePicker selected={this.state.startDate} onChange={this.handleChange} className="form-control" />
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Inline Datepicker</label>
										<div className="col-lg-8">
											<DatePicker inline selected={this.state.startDate} onChange={this.handleChange} />
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import DatePicker from \'react-datepicker\';\n'+
'\n'+
'this.handleChange = (date) => {\n'+
'  this.setState({\n'+
'    startDate: date\n'+
'  });\n'+
'}\n'+
'this.state = {\n'+
'  startDate: new Date()\n'+
'}\n'+
'\n'+
'<!-- html -->\n'+
'<DatePicker selected={this.state.startDate} onChange={this.handleChange} className="form-control" />'}
								</Highlight>
							</div>
						</Panel>
					</div>
					<div className="col-xl-6">
						<Panel>
							<PanelHeader>
								React Input Mask
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Date</label>
										<div className="col-lg-8">
											<InputMask mask="9999/99/99" className="form-control" placeholder="yyyy/mm/dd"></InputMask>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Phone</label>
										<div className="col-lg-8">
											<InputMask mask="(999) 999-999" className="form-control" placeholder="(999) 999-9999"></InputMask>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Tax ID</label>
										<div className="col-lg-8">
											<InputMask mask="99-999999" className="form-control" placeholder="99-9999999"></InputMask>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Product Key</label>
										<div className="col-lg-8">
											<InputMask mask="a\*-999-a999" className="form-control" placeholder="a*-999-a999"></InputMask>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">SSN</label>
										<div className="col-lg-8">
											<InputMask mask="999/99/9999" className="form-control" placeholder="999/99/9999"></InputMask>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">SSN</label>
										<div className="col-lg-8">
											<InputMask mask="AAA-1111-A" className="form-control" placeholder="AAA-9999-A"></InputMask>
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import InputMask from \'react-input-mask\';\n'+
'\n'+
'<!-- html -->\n'+
'<InputMask mask="9999/99/99" className="form-control" placeholder="yyyy/mm/dd"></InputMask>\n'+
'<InputMask mask="(999) 999-999" className="form-control" placeholder="(999) 999-9999"></InputMask>\n'+
'<InputMask mask="99-999999" className="form-control" placeholder="99-9999999"></InputMask>\n'+
'<InputMask mask="a\\*-999-a999" className="form-control" placeholder="a*-999-a999"></InputMask>\n'+
'<InputMask mask="999/99/9999" className="form-control" placeholder="999/99/9999"></InputMask>\n'+
'<InputMask mask="AAA-1111-A" className="form-control" placeholder="AAA-9999-A"></InputMask>'}
								</Highlight>
							</div>
						</Panel>
						
						<Panel>
							<PanelHeader>
								React Colorpicker
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Sketch Type Colorpicker</label>
										<div className="col-lg-8">
											<div className="input-group">
												<input type="text" className="form-control bg-white" readOnly value={this.state.sketchBackgroundColor} />
												<span className="input-group-text">
													<a href="#/" data-bs-toggle="dropdown" className="p-0 border-0">
														<i style={{width: '16px', height: '16px', display: 'block', background: this.state.sketchBackgroundColor}}></i>
													</a>
													<div className="dropdown-menu">
														<SketchPicker color={ this.state.sketchBackgroundColor } onChangeComplete={ this.handleSketchChangeComplete } />
													</div>
												</span>
											</div>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Chrome Type Colorpicker</label>
										<div className="col-lg-8">
											<div className="input-group">
												<input type="text" className="form-control bg-white" readOnly value={this.state.chromeBackgroundColor} />
												<span className="input-group-text">
													<a href="#/" data-bs-toggle="dropdown" className="p-0 border-0">
														<i style={{width: '16px', height: '16px', display: 'block', background: this.state.chromeBackgroundColor}}></i>
													</a>
													<div className="dropdown-menu">
														<ChromePicker color={ this.state.chromeBackgroundColor } onChangeComplete={ this.handleChromeChangeComplete } />
													</div>
												</span>
											</div>
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import { SketchPicker, ChromePicker } from \'react-color\';\n'+
'import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from \'reactstrap\';\n'+
'\n'+
'<!-- html -->\n'+
'<UncontrolledDropdown>\n'+
'  <div className="input-group">\n'+
'    <input type="text" className="form-control bg-white" readOnly value={this.state.sketchBackgroundColor} />\n'+
'    <span className="input-group-text">\n'+
'      <DropdownToggle className="p-0 border-0">\n'+
'        <i style={{width: \'16px\', height: \'16px\', display: \'block\', background: this.state.sketchBackgroundColor}}></i>\n'+
'      </DropdownToggle>\n'+
'    </span>\n'+
'  </div>\n'+
'  <DropdownMenu>\n'+
'    <SketchPicker color={ this.state.sketchBackgroundColor } onChangeComplete={ this.handleSketchChangeComplete } />\n'+
'  </DropdownMenu>\n'+
'</UncontrolledDropdown>'}
								</Highlight>
							</div>
						</Panel>
						<Panel>
							<PanelHeader>React Quill</PanelHeader>
							<PanelBody>
								<div className="pb-2px">
									<ReactQuill value={this.state.text} onChange={this.handleChange} className="h-200px mb-40px" />
								</div>
							</PanelBody>
							<div className="hljs-wrapper">
								<Highlight className='typescript'>{
'import ReactQuill from \'react-quill\';\n'+
'import \'react-quill/dist/quill.snow.css\';\n'+
'\n'+
'<!-- html -->\n'+
'<div className="pb-2px">\n'+
'  <ReactQuill value={this.state.text} onChange={this.handleChange} className="h-200px mb-40px" />\n'+
'</div>'}
								</Highlight>
							</div>
						</Panel>
						
						<Panel>
							<PanelHeader>
								React Tags Input
							</PanelHeader>
							<PanelBody className="p-0">
								<form className="form-horizontal form-bordered">
									<div className="form-group row">
										<label className="col-lg-4 col-form-label">Default Input Tag</label>
										<div className="col-lg-8">
											<ReactTags tags={this.state.tags} suggestions={this.state.suggestions} onDelete={this.handleDelete.bind(this)} onAddition={this.handleAddition.bind(this)} />
										</div>
									</div>
								</form>
							</PanelBody>
							<div className="hljs-wrapper position-static">
								<Highlight className='typescript'>{
'import ReactTags from \'react-tag-autocomplete\';\n'+
'\n'+
'this.state = {\n'+
'  suggestions: [\n'+
'    { id: 3, name: \'Bananas\' },\n'+
'    { id: 4, name: \'Mangos\' },\n'+
'    { id: 5, name: \'Lemons\' },\n'+
'    { id: 6, name: \'Apricots\' }\n'+
'  ]\n'+
'}\n'+
'this.handleDelete = (i) => {\n'+
'  const tags = this.state.tags.slice(0)\n'+
'  tags.splice(i, 1)\n'+
'  this.setState({ tags })\n'+
'}\n'+
'\n'+
'this.handleAddition = (tag) => {\n'+
'  const tags = [].concat(this.state.tags, tag)\n'+
'  this.setState({ tags })\n'+
'}\n'+
'\n'+
'<!-- html -->\n'+
'<ReactTags tags={this.state.tags} suggestions={this.state.suggestions} onDelete={this.handleDelete.bind(this)} onAddition={this.handleAddition.bind(this)} />'}
								</Highlight>
							</div>
						</Panel>
					</div>
				</div>
			</div>
		)
	}
}

export default FormPlugins;
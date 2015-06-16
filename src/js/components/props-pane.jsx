const React = require('react');
const {Button, Input, TabbedArea, TabPane} = require('react-bootstrap');
const cssConvert = require('lib/css');
const AceEditor  = require('react-ace');
require('brace/mode/css');

let Pane = React.createClass({

	currentComponentStyle: '',

	getInitialState(){
		return this.createState();
	},

	componentWillReceiveProps(nextProps){ // when selecting new component and pane filled with it's props
		this.replaceState(this.createState(nextProps));
	},

	createState(nextProps){
		let props = nextProps || this.props;
		if(!props.component){
			return {};
		}
		let state = {props: {}};
		for(let i in props.component.props){
			if(i === 'style') {
				continue;
			}
			state.props[i] = props.component.props[i];
		}
		let chld = props.component.children;
		if(chld && chld.length === 1 && typeof chld[0] === 'string'){
			state.text = chld[0];
		}

		return state;
	},


	fillPropInputs(){
		this.propInputs = [];

		var fillTheProp = (prop) => {
			return (e) => {
				this.setState({props: {[prop]: e.target.value}});
			};
		};

		for(var i in this.props.component.element.propTypes){
			this.propInputs.push(<Input
							type='text'
							value={this.state.props[i]}
							bsSize='small'
							label={i}
							// FIXME long attribute nmes requre much more space (separate line)
							labelClassName='col-xs-8 col-md-6 props-pane__label'
							wrapperClassName='col-xs-4 col-md-6'
							onChange={fillTheProp(i)}
							onBlur={this.save}/>);
		}
	},

	addTextEdit(){
		if(typeof this.state.text === 'string'){
			return (
				<div>
					<hr style={{clear: 'both'}}/>
					<Input
						type='text'
						value={this.state.text}
						bsSize='small'
						label='Inner text'
						labelClassName='col-xs-6 col-md-4'
						wrapperClassName='col-xs-6 col-md-8'
						onChange={(e) => {
							this.setState({text: e.target.value});
						}}
						onBlur={this.save}/>
				</div>
			);
		}
	},

	save(){
		let newProps = {};
		for(var i in this.state.props){
			if(this.state.props[i]){
				newProps[i] = this.state.props[i];
			}
		}
		newProps.style = cssConvert.css2object(this.currentComponentStyle);
		let schemaDiff = {
			props: newProps
		};
		if(typeof this.state.text === 'string'){
			schemaDiff.children = [this.state.text];
		}else{
			schemaDiff.children = this.props.component.children;
		}
		this.props.save(schemaDiff);
	},

	render() {
		let style = {
			width: '20%',
			float: 'left',
			marginTop: '-43px',
			height: '100%',
			overflow: 'auto',
			borderRight: '1px solid #d0d0d0',
			backgroundColor: '#F7F7F7',
			padding: '43px 10px 0'
		};
		if(!this.props.component){
			return <aside style={style} />;
		}
		this.fillPropInputs();
		let name = this.props.component.element.displayName;
		return (
			<aside style={style}>
				<h3>{name}</h3>
				<TabbedArea defaultActiveKey={1}>
						<TabPane eventKey={1} tab='Props'>
							{this.propInputs}
							{this.addTextEdit()}
						</TabPane>
						<TabPane eventKey={2} tab='Style'>
							<AceEditor
								mode='css'
								width='100%'
								height='8em'
								value={name + cssConvert.object2css(this.props.component.props.style)}
								onChange={(value) => {
									this.currentComponentStyle = value;
								}}
								name='style-editor'/>
							<Button onClick={this.save}>Save</Button>
						</TabPane>
						<TabPane eventKey={3} tab='Logic'>
							<Button style={{marginTop:'0.5em'}}>Edit component's logic</Button>
						</TabPane>
					</TabbedArea>
			</aside>
		);
	}

});

module.exports = Pane;

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

	componentWillReceiveProps(nextProps){
		this.replaceState(this.createState(nextProps));
	},

	createState(nextProps){
		let props = nextProps || this.props;
		if(!props.component){
			return {};
		}
		let state = {};
		for(let i in props.component.props){
			if(i === 'style') {
				continue;
			}
			state[i] = props.component.props[i];
		}
		return state;
	},


	fillPropInputs(){
		this.propInputs = [];

		var fillTheProp = (prop) => {
			return (e) => {
				this.setState({[prop]: e.target.value});
			};
		};

		for(var i in this.props.component.element.propTypes){
			this.propInputs.push(<Input
							type='text'
							value={this.state[i]}
							label={i}
							onChange={fillTheProp(i)}
							onBlur={this.save}/>);
		}
	},

	save(){
		let newProps = {};
		for(var i in this.state){
			if(this.state[i]){
				newProps[i] = this.state[i];
			}
		}
		newProps.style = cssConvert.css2object(this.currentComponentStyle);
		this.props.save(newProps);
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
		let name = this.props.component.element.displayName
		return (
			<aside style={style}>
				<h3>{name}</h3>
				<TabbedArea defaultActiveKey={1}>
						<TabPane eventKey={1} tab='Props'>
							{this.propInputs}
							<Button>Edit component's logic</Button>
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
					</TabbedArea>
			</aside>
		);
	}

});

module.exports = Pane;

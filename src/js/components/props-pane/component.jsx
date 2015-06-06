const React = require('react');
const {Button, Input} = require('react-bootstrap');
var AceEditor  = require('react-ace');
require('brace/mode/css');
var camelcase = require('camelcase');
var decamelize = require('decamelize');

function toCss(style){
	let result = '{\n';
	for(var key in style){
		result += `\t${decamelize(key, '-')}: ${style[key]};\n`;
	}
	return result + '}\n';
}

function toObject(style){
	style = style.match(/{(.|\s)+}/gm)[0].replace(/{|}/g, '');
	return style.split('\n').reduce((res, line) => {
		let lineArr = line.split(':');
		if(lineArr.length !== 2){
			return res;
		}
		res[camelcase(lineArr[0].trim())] = lineArr[1].replace(';', '').trim();
		return res;
	}, {});
}

let Pane = React.createClass({

	currentComponentStyle: '',

	getInitialState(){
		return this.createState();
	},

	componentWillReceiveProps(nextProps){
		this.replaceState(this.createState(nextProps));
	},

	createState(nextProps){
		var props = nextProps || this.props;
		if(!props.component){
			return {};
		}
		let state = {};
		for(var i in props.component.props){
			if(i === 'style'){
				state[i] = toCss(props.component.props[i]);
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
				if(prop === 'style') {
					this.currentComponentStyle = e;
					return;
				}
				this.setState({[prop]: e.target.value});
			};
		};

		for(var i in this.state){
			if(i === 'style'){
				var name = this.props.component.element.displayName;
				this.propInputs.push(
				<div>
					<b>style</b>
					<AceEditor
						mode='css'
						width='100%'
						height='8em'
						value={name + this.state[i]}
						onChange={fillTheProp(i)}
						name='style-editor'/>
				</div>
				);
				continue;
			}
			this.propInputs.push(<Input
							type='text'
							value={this.state[i]}
							label={i}
							onChange={fillTheProp(i)}/>);
		}
	},

	save(){
		let newProps = {};
		for(var i in this.state){
			if(this.state[i]){
				if(i === 'style'){
					newProps.style = toObject(this.currentComponentStyle);
					continue;
				}
				newProps[i] = this.state[i];
			}
		}
		this.props.save(newProps);
	},

	render() {
		let style = {
			width: '20%',
			float: 'left',
			marginTop: '-43px',
			height: '100%',
			borderRight: '1px solid #d0d0d0',
			backgroundColor: '#F7F7F7',
			padding: '43px 10px 0'
		};
		if(!this.props.component){
			return <aside style={style} />;
		}
		this.fillPropInputs();
		return (
			<aside style={style}>
				<h3>{this.props.component.element.displayName}</h3>
				<h4>Props</h4>
				{this.propInputs}
				<h4>Logic</h4>
				<Button onClick={this.save}>Save</Button>
			</aside>
		);
	}

});

module.exports = Pane;

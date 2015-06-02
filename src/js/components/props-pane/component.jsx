const React = require('react');
const {Button, Input} = require('react-bootstrap');


let Pane = React.createClass({

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
			state[i] = JSON.stringify(props.component.props[i]);
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

		for(var i in this.state){
			var type = typeof this.props.component.props[i] === 'object' ? 'textarea' : 'text';
			this.propInputs.push(<Input
							type={type}
							value={this.state[i]}
							label={i}
							onChange={fillTheProp(i)}/>);
		}
	},

	save(){
		var newProps = {};
		for(var i in this.state){
			if(this.state[i]){
				newProps[i] = JSON.parse(this.state[i]);
			}
		}
		this.props.save(newProps);
	},

	render() {
		this.fillPropInputs();
		return (
			<aside style={{
					width: '20%',
					float: 'left',
					height: '100%',
					borderRight: '1px solid #d0d0d0',
					backgroundColor: '#F7F7F7',
					padding: '0 10px'
				}}>
				<h4>Props</h4>
				{this.propInputs}
				<h4>Logic</h4>
				<p>Logic description will be here with CodeMirror</p>
				<Button onClick={this.save}>Save</Button>
			</aside>
		);
	}

});

module.exports = Pane;

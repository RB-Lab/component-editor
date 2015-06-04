const React = require('react');
const _ = require('lodash');
const Pane = require('components/pane/component.jsx');
const WorkSpace = require('components/workspace/component.jsx');
const PropsPane = require('components/props-pane/component.jsx');
const {Button} = require('react-bootstrap');
const reactToJsx = require('react-to-jsx');

var orginalSchema;

function schema2VDOM(schema, onClick){
	orginalSchema = schema;
	function parse(schema){
		if(Array.isArray(schema)){
			return schema.map(parse);
		} else
		if (typeof schema === 'object'){
			if(onClick){
				if(!schema.props){
					schema.props = {};
				}
				schema.props.onClick = function(e){
					e.stopPropagation();
					onClick(schema);
				};
			}
			return React.createElement(
				schema.element,
				schema.props,
				parse(schema.children)
			);
		} else
		if (typeof schema === 'string' || typeof schema === 'number'){
			return schema;
		}
	}

	return parse(schema);
}

let App = React.createClass({

	workSpaceChilds: [],

	activeComponent: null,

	addComponent(component){
		if(this.activeComponent){
			if(!this.activeComponent.children){
				this.activeComponent.children = [];
			}
			this.activeComponent.children.push(component);
		} else {
			this.workSpaceChilds.push(component);
		}

		this.props.notify();
	},

	export(){
		console.log(reactToJsx(schema2VDOM(orginalSchema)));
	},

	setActiveComponent(component){
		if(this.activeComponent){
			var originalCN = this.activeComponent.props.className.replace('active-component', '');
			this.activeComponent.props.className = originalCN;
		}
		this.activeComponent = component;
		if(component){
			if(this.activeComponent.props.className){
				this.activeComponent.props.className += ' active-component';
			} else {
				this.activeComponent.props.className = 'active-component';
			}
		}
		this.props.notify();
	},

	resetActiveComponent(){
		this.setActiveComponent(null);
	},

	updateComponent(newProps){
		this.activeComponent.props = newProps;
		this.props.notify();
	},

	makeCustom(elementName){
		let newElementsChildren = _.clone(this.activeComponent.children);
		let newElement = React.createClass({
			displayName: elementName,
			render: function(){
				return schema2VDOM(newElementsChildren);
			}
		});
		this.activeComponent.element = newElement;
		delete this.activeComponent.children;
	},

	render() {
		return (
			<section>

				<nav style={{
					padding: '0.3em 1em',
					borderBottom: '1px #7B7B7B solid',
					zIndex: 1,
					position: 'relative',
					background: '#E7E7E7',
					textAlign: 'right'}}>
					<Button onClick={this.export}>Export</Button>
				</nav>
				<PropsPane
					save={this.updateComponent.bind(this)}
					component={this.activeComponent}/>
				<WorkSpace onClick={this.resetActiveComponent}>
					{schema2VDOM(this.workSpaceChilds, this.setActiveComponent)}
				</WorkSpace>
				<Pane addComponent={this.addComponent} makeCustom={this.makeCustom}/>
			</section>
		);
	}

});

module.exports = App;

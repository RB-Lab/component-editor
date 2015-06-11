const React = require('react');
const _ = require('lodash');
const schema2VDOM = require('lib/schema2react');
const exportToText = require('lib/react2text');
const wrapInDiv = require('lib/wrap-in-div');
const ComponentsPane = require('components/components-pane.jsx');
const WorkSpace = require('components/workspace.jsx');
const PropsPane = require('components/props-pane.jsx');
const ModalExportTrigger = require('components/modals/modal-export.jsx');

let App = React.createClass({

	workSpaceChilds: [], // TODO get rid of workSpaceChilds,
	//make just 'container' active component by default
	customComponents: [],
	customComponentsToExport: [],

	activeComponent: null,

	addComponent(component){

		if(!component.props){
			component.props = {};
		}
		component.props.onClick = function(e){
			e.stopPropagation();
			this.setActiveComponent(component);
		}.bind(this);

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
		return {
			components: this.customComponentsToExport.map((c) => {
				return {
					name: c.displayName,
					body: exportToText(c.displayName, c.children)
				};
			}),
			app: exportToText('App', this.workSpaceChilds)
		};
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
		_.assign(this.activeComponent.props, newProps.props);
		this.activeComponent.children = newProps.children;
		this.props.notify();
	},

	makeCustom(elementName){
		let newElementsChildren = _.clone(this.activeComponent.children);
		let newElement = React.createClass({
			onClick(){

			},
			displayName: elementName,
			render: function(){
				return wrapInDiv(schema2VDOM(newElementsChildren));
			}
		});
		this.activeComponent.children = [{element: newElement}];
		this.customComponents.push(newElement);
		this.customComponentsToExport.push({
			displayName: elementName,
			children: newElementsChildren
		});
		// TODO save somewhere new Elements itselfs
		this.props.notify();
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
					<ModalExportTrigger export={this.export} />
				</nav>
				<PropsPane
					save={this.updateComponent.bind(this)}
					component={this.activeComponent}/>
				<WorkSpace onClick={this.resetActiveComponent}>
					{schema2VDOM(this.workSpaceChilds, this.setActiveComponent)}
				</WorkSpace>
				<ComponentsPane
					ref='componentPicker'
					addComponent={this.addComponent}
					makeCustom={this.makeCustom}
					customComponents={this.customComponents}/>
			</section>
		);
	}

});

module.exports = App;

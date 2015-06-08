const React = require('react');
const {Button} = require('react-bootstrap');
const NameModalTrigger = require('components/modals/modal-name.jsx');
const BootstrapPane = require('components/components-panes/bootstrap/pane.jsx');

const ComponentsPane = React.createClass({

	addCustomComponent(component){
		return () => {
			this.props.addComponent({
				element: component
			});
		};
	},

	render() {
		return (
			<aside style={{
					width: '20%',
					float: 'right',
					height: '100%',
					marginTop: '-43px',
					paddingTop: '43px',
					borderLeft: '1px solid #d0d0d0',
					backgroundColor: '#F7F7F7',
					paddingLeft: '10px',
					position: 'relative'
				}}>
				<BootstrapPane {...this.props} />
				<h4>Custom components</h4>
				{this.props.customComponents.map((comp) => {
					return (
						<Button onClick={this.addCustomComponent(comp)}>
							{comp.displayName}
						</Button>
					);
				})}
				<NameModalTrigger onOk={this.props.makeCustom} />
			</aside>
		);
	}

});

module.exports = ComponentsPane;

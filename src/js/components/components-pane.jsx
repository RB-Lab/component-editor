const React = require('react');
const {Button, Input, Row, Col} = require('react-bootstrap');
const NameModalTrigger = require('components/modals/modal-name.jsx');

let Pane = React.createClass({

	addButton(){
		this.props.addComponent({
			element: Button,
			children: ['Button']
		});
	},

	addTextInput(){
		this.props.addComponent({
			element: Input,
			props: {
				type: 'text',
				placeholder: 'Enter text',
				label: 'Working example with validation'
			}
		});
	},
	addRow(){
		this.props.addComponent({
			element: Row,
			props: {
				style: {
					minHeight: '20px',
					outline: '1px #ddd solid'
				}
			}
		});
	},
	addCol4(){
		this.props.addComponent({
			element: Col,
			props:{
				md: 4,
				style: {
					minHeight: '20px',
					outline: '1px #ddd solid'
				}
			}
		});
	},
	addCol8(){
		this.props.addComponent({
			element: Col,
			props:{
				md: 8,
				style: {
					minHeight: '20px',
					outline: '1px #ddd solid'
				}
			}
		});
	},

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
				<h4>Grid</h4>
				<Button onClick={this.addRow}>Row</Button>
				<Button onClick={this.addCol4}>Col-4</Button>
				<Button onClick={this.addCol8}>Col-8</Button>
				<h4>Controls</h4>
				<Button onClick={this.addButton}>Button</Button><br/>
				<Button onClick={this.addTextInput}>Input</Button>
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

module.exports = Pane;
const React = require('react');
const {Button, Input} = require('react-bootstrap');

const InputInjector = React.createClass({

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

	render() {
		return (
			<Button onClick={this.addTextInput}>Input</Button>
		);
	}

});

module.exports = InputInjector;

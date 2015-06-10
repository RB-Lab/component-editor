const React = require('react');
const {Button, Input} = require('react-bootstrap');

const TextareaInjector = React.createClass({

	addTextarea(){
		this.props.addComponent({
			element: Input,
			props: {
				type: 'textarea',
				label: 'Some Text',
				placeholder: 'Enter text'
			}
		});
	},

	render() {
		return (
			<Button onClick={this.addTextarea}>Text area</Button>
		);
	}

});

module.exports = TextareaInjector;

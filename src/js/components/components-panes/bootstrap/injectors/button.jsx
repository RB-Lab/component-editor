const React = require('react');
const {Button} = require('react-bootstrap');

const BootstrapPane = React.createClass({

	addButton(){
		this.props.addComponent({
			element: Button,
			children: ['Button']
		});
	},

	render() {
		return (
			<Button onClick={this.addButton}>Button</Button>
		);
	}

});

module.exports = BootstrapPane;

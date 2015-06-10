const React = require('react');
const {Button, ProgressBar} = require('react-bootstrap');

const ProgressBarInjector = React.createClass({
	addBar(){
		this.props.addComponent({
			element: ProgressBar,
			props: {
				now: 20
			}
		});
	},

	render() {
		return (
			<Button onClick={this.addBar}>Progress bar</Button>
		);
	}

});

module.exports = ProgressBarInjector;

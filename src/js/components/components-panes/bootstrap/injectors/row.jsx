const React = require('react');
const {Button, Row} = require('react-bootstrap');

const RowInjector = React.createClass({
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

	render() {
		return (
			<Button onClick={this.addRow}>Row</Button>
		);
	}

});

module.exports = RowInjector;

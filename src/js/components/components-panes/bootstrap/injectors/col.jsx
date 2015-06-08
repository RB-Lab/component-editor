const React = require('react');
const {Button, Col} = require('react-bootstrap');

const ColInjector = React.createClass({
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

	render() {
		return (
			<section>
				<Button onClick={this.addCol4}>Col-4</Button>
				<Button onClick={this.addCol8}>Col-8</Button>
			</section>
		);
	}

});

module.exports = ColInjector;

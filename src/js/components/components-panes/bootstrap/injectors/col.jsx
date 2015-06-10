const React = require('react');
const {Button, Col, MenuItem, ButtonGroup, DropdownButton} = require('react-bootstrap');

const TOTAL_COLS = 12;

const ColInjector = React.createClass({

	addCols(type, len){
		let props = {
			style: {
				minHeight: '20px',
				outline: '1px #ddd solid'
			}
		};
		props[type] = len;
		this.props.addComponent({
			element: Col,
			props: props
		});
	},

	renderColButtons(type, n){
		var items = [];
		for(let i = 0; i < n; i++){
			items.push(
				<MenuItem  eventKey={i} onClick={()=>{
					this.addCols(type, i)
				}}>{i}</MenuItem>
			);
		}
		return items;
	},

	render() {
		return (
			<section>
				<h5>Collumn:</h5>
				<ButtonGroup>
					<DropdownButton title='xs'>
						{this.renderColButtons('xs',TOTAL_COLS)}
					</DropdownButton>
					<DropdownButton title='sm'>
						{this.renderColButtons('sm',TOTAL_COLS)}
					</DropdownButton>
					<DropdownButton title='md'>
						{this.renderColButtons('md',TOTAL_COLS)}
					</DropdownButton>
					<DropdownButton title='lg'>
						{this.renderColButtons('lg',TOTAL_COLS)}
					</DropdownButton>
				</ButtonGroup>
			</section>
		);
	}

});

module.exports = ColInjector;

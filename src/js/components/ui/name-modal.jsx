const React = require('react');
const {Button, Modal, Input, OverlayMixin} = require('react-bootstrap');


const NameModal = React.createClass({

	onOk(){
		this.props.onOk(this.refs.name.value);
		this.props.close();
	},

	render(){
		return (
		<Modal title='Modal heading' onRequestHide={this.props.close}>
				<div className='modal-body'>
					<Input ref='name' type='text' placeholder='Enter name' />
				</div>
				<div className='modal-footer'>
					<Button bsStyle='primary' onClick={this.onOk}>ok</Button>
				</div>
			</Modal>
		);
	}
});

const NameModalTrigger = React.createClass({
	mixins: [OverlayMixin],

	getInitialState(){
		return {
			isModalOpen: false
		};
	},

	handleToggle() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	},

	render(){
		return (
			<Button
				style={{
					position: 'absolute',
					bottom: '1em',
					left: 0,
					right: 0,
					margin: 'auto',
					display: 'inline-block',
					width: '180px'
				}}
				onClick={this.handleToggle}>
					Make cutom element
				</Button>
		);
	},

	renderOverlay(){
		if (!this.state.isModalOpen) {
			return <span/>;
		}

		return <NameModal onOk={this.props.onOk} close={this.handleToggle}/>;
	}
});

module.exports = NameModalTrigger;

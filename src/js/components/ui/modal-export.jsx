const React = require('react');
const {Button, Modal, OverlayMixin, TabbedArea, TabPane} = require('react-bootstrap');
var AceEditor  = require('react-ace');
require('brace/mode/jsx');


const ExportModal = React.createClass({
	render(){
		return (
			<Modal title='Modal heading' bsSize="large" onRequestHide={this.props.close}>
				<div className='modal-body'>
					<TabbedArea defaultActiveKey={1}>
						<TabPane eventKey={1} tab='App'>
							<AceEditor
								mode='jsx'
								width='100%'
								value={this.props.data.app}
								name='app'/>
						</TabPane>
						{this.props.data.components.map((c, i) => {
							return <TabPane eventKey={i+2} tab={c.name}>
									<AceEditor
										mode='jsx'
										width='100%'
										value={c.body}
										name={c.name}/>
								</TabPane>;
						})}
					</TabbedArea>
				</div>
			</Modal>
		);
	}
});

const ExportModalTrigger = React.createClass({
	mixins: [OverlayMixin],

	getInitialState(){
		return {
			isModalOpen: false
		};
	},

	hideModal() {
		this.setState({
			isModalOpen: false
		});
	},

	showModal() {
		this.setState({
			isModalOpen: true,
			data: this.props.export()
		});
	},

	render(){
		return (
			<Button onClick={this.showModal}>Export</Button>
		);
	},

	renderOverlay(){
		if (!this.state.isModalOpen) {
			return <span/>;
		}

		return <ExportModal data={this.state.data} close={this.hideModal}/>;
	}
});

module.exports = ExportModalTrigger;

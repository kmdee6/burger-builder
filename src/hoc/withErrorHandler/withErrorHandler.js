import React, {Component} from "react";
import Wrap from "../Wrap/Wrap";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
        }

        componentWillMount() {
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        closeModalHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Wrap>
                    <Modal show={this.state.error} closeModal={this.closeModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrap>
            );
        }
    }
};

export default withErrorHandler;
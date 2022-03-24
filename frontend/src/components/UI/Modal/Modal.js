import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate(){
        console.log('modal called')
    }
    render() {
        return(
            <div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    style ={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} // Inline style
                    className = {classes.Modal}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;
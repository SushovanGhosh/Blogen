import React from 'react'
import ReactDOM from 'react-dom'

const Modal = props =>{
    return ReactDOM.createPortal(
        <div className="modal fade" id={props.id}>
            <div className={`modal-dialog ${props.size}`}>
                <div className="modal-content">
                    <div className={`modal-header ${props.headerStyle}`}>
                        <h5 className="modal-title">
                            {props.title}
                        </h5>
                        <button className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        {/* {props.children} */}
                        {props.textboxes()}
                    </div>
                    <div className="modal-footer">
                        {props.footer}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal
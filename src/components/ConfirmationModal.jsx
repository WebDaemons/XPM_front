import React, { useState, useCallback } from 'react'
import './ConfirmationModal.css'

const ConfirmationModal = ({active, setActive, children, customWidth}) => {

    return (
    <div className={active ? "ConfirmationModalContainer active" : "ConfirmationModalContainer"} onClick={() => setActive(false)}> 
        <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()} style={{width:customWidth}}>
            {children}
        </div>
    </div>
    )
}

export default ConfirmationModal
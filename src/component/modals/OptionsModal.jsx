import React from 'react';
import ParentModal from './ParentModal';
import { actionType as T } from '../../reducer';
import './optionsModal.css';

const OptionsModal = ({ superState, dispatcher }) => {
    const close = () => {
        dispatcher({ type: T.SET_OPTIONS_MODAL, payload: false });
    };
    const Options = 'Options';
    return (
        <ParentModal closeModal={close} ModelOpen={superState.optionsModal} title={Options}>
            <div className="main-div">
                <label htmlFor="Docker">
                    Docker
                    <input type="checkbox" />
                </label>
                <label htmlFor="Unlock" className="main-div-comp">
                    Unlock
                    <input type="checkbox" />
                </label>
                <label htmlFor="Maxtime" className="main-div-comp">
                    Max Time&nbsp;
                    <input type="text" />
                </label>
                <br />
                <br />
                <br />
                <span>Params:</span>
                <br />
                <textarea name="" id="" cols="80" rows="10" />
            </div>
        </ParentModal>
    );
};

export default OptionsModal;

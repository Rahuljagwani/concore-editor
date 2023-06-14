import React from 'react';
import ReactMarkdown from 'react-markdown';
import ParentModal from './ParentModal';
import { actionType as T } from '../../reducer';

const MarkDown = ({ superState, dispatcher }) => {
    const title = 'Demo';
    const close = () => {
        dispatcher({ type: T.SET_MARKDOWN_MODAL, payload: false });
    };
    return (
        <ParentModal closeModal={close} ModelOpen={superState.markDownModal} title={title}>
            <ReactMarkdown>{superState.inputFile}</ReactMarkdown>
        </ParentModal>
    );
};

export default MarkDown;

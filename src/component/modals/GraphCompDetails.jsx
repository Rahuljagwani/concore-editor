import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import './graph-comp-details.css';
import ParentModal from './ParentModal';
import { readTextFile, createFile } from '../../toolbarActions/toolbarFunctions';

const ModalComp = ({ closeModal, superState, dispatcher }) => {
    const [data, setData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [element, setElement] = useState(null);
    const [editSourceClicked, setEditSourceClicked] = useState(false);
    const [createSourceClicked, setCreateSourceClicked] = useState(false);
    const [helpClicked, setHelpClicked] = useState(false);
    const [createHelpClicked, setCreateHelpClicked] = useState(false);
    const { modalPayload, ModelOpen } = superState;
    const {
        cb, title, submitText, Children, defaultStyle, defaultLabel, labelAllowed, type,
    } = modalPayload;

    useEffect(() => {
        setErrorMessage('');
    }, [ModelOpen]);

    useEffect(() => {
        setData({ label: defaultLabel || '', style: defaultStyle });
        setErrorMessage('');
    }, [defaultLabel, defaultStyle]);

    const submit = (e) => {
        e.preventDefault();
        const message = cb(data.label, data.style);
        if (message.ok) {
            setErrorMessage('');
            setData({ label: defaultLabel || '', style: defaultStyle });
            closeModal();
        } else setErrorMessage(message.err);
    };

    useEffect(() => {
        if (createSourceClicked) {
            createFile(superState, dispatcher);
        }
        if (editSourceClicked && element === null) {
            toast.error('Respective file is not present in same directory');
        } else if (element !== null) {
            readTextFile(superState, dispatcher, element.fileObj, element.fileHandle);
        }
        setEditSourceClicked(false);
        setCreateSourceClicked(false);
    }, [createSourceClicked, editSourceClicked, element]);

    useEffect(() => {
        if (createHelpClicked) {
            createFile(superState, dispatcher);
        }
        if (helpClicked && element === null) {
            toast.error('Respective doc is not present in same directory');
        } else if (element !== null) {
            readTextFile(superState, dispatcher, element.fileObj, element.fileHandle);
        }
        setHelpClicked(false);
        setCreateHelpClicked(false);
    }, [createHelpClicked, helpClicked, element]);

    const openFile = () => {
        setElement(null);
        if (superState.fileState !== undefined && data.label !== '') {
            const fname = data.label.split(':')[1];
            superState.fileState.forEach((ele) => {
                if (ele.key.split('/')[1] === fname) {
                    setElement(ele);
                }
            });
        }
        if (submitText === 'Edit Node') {
            setEditSourceClicked(true);
        } else if (submitText === 'Create Node') {
            setCreateSourceClicked(true);
        }
    };

    const openDoc = () => {
        setElement(null);
        if (superState.fileState !== undefined && data.label !== '') {
            const docname1 = data.label.split(':')[1].split('.')[0].concat('.md');
            const docname2 = data.label.split(':')[1].split('.')[0].concat('.txt');
            superState.fileState.forEach((ele) => {
                if (ele.key.split('/')[1] === docname1 || ele.key.split('/')[1] === docname2) {
                    setElement(ele);
                }
            });
        }
        if (submitText === 'Edit Node') {
            setHelpClicked(true);
        } else if (submitText === 'Create Node') {
            setCreateHelpClicked(true);
        }
    };

    return (
        <ParentModal closeModal={closeModal} ModelOpen={ModelOpen} title={title}>
            <form onSubmit={submit}>
                <div className="modal-content-body">
                    <Children data={data} setData={setData} labelAllowed={labelAllowed} />
                    {errorMessage ? <div className="err">{errorMessage}</div> : <></>}
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">{submitText}</button>
                    { type === 'Node' ? (
                        <>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={openFile}
                            >
                                { submitText === 'Edit Node' ? 'Edit Source' : 'Create Source' }
                            </button>
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={openDoc}
                            >
                                { submitText === 'Edit Node' ? 'Help' : 'Create Help' }
                            </button>
                        </>
                    ) : '' }
                </div>
            </form>
        </ParentModal>
    );
};
export default ModalComp;

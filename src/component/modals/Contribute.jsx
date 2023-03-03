import React, { useState } from 'react';
import Axios from 'axios';
import Modal from './ParentModal';
import { actionType as T } from '../../reducer';

const ContributeModal = ({ superState, dispatcher }) => {
    const closeModal = () => {
        dispatcher({ type: T.SET_CONTRIBUTE_MODAL, payload: false });
    };
    const [study, setStudy] = useState('');
    const [path, setPath] = useState('');
    const [auth, setAuth] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [branch, setBranch] = useState('');
    const submit = (e) => {
        e.preventDefault();
        Axios.post(`http://127.0.0.1:5000/contribute?study=${study}&auth=${auth}&desc=${desc}&title=${title}&path=${path}&branch=${branch}`)
            .then((res) => { // eslint-disable-next-line
                alert(res.data);
            }).catch((err) => { // eslint-disable-next-line
                alert(err);
            });
    };
    return (
        <Modal
            ModelOpen={superState.contributeModal}
            title="Contribute"
            closeModal={closeModal}
        >
            <form className="proj-details">
                <span>Study Name</span>
                <input
                    placeholder="Study Name"
                    required
                    value={study}
                    onChange={(e) => setStudy(e.target.value)}
                />
                <span>Study Path</span>
                <input
                    placeholder="Please provide correct path of study"
                    required
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                <span>Author Name</span>
                <input
                    placeholder="Author of Study"
                    value={auth}
                    onChange={(e) => setAuth(e.target.value)}
                    required
                />
                <span>Branch Name</span>
                <input
                    placeholder="Branch Name"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                />
                <span>PR Title</span>
                <input
                    placeholder="PR Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <span>PR Description</span>
                <input
                    placeholder="PR Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <div className="expand">
                    <button type="submit" className="btn btn-primary" onClick={submit}>Generate PR</button>
                </div>
            </form>
        </Modal>
    );
};
export default ContributeModal;

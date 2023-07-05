import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import ParentModal from './ParentModal';
import './Loader.css';

const Loader = ({ superState }) => {
    const stopDocker = () => {
        superState.curGraphInstance.stop();
    };
    return (
        <ParentModal ModelOpen={superState.loader} title="Wait.... The function is being executed">
            <div className="loader-main">
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
                <BeatLoader color="#36d7b7" className="loader-items" />
            </div>
            <br />
            <br />
            { superState.dockerCheck && superState.graphs[superState.curGraphIndex].built
                ? <button className="btn loader-btn" onClick={stopDocker} type="button">STOP Docker Build</button>
                : '' }
        </ParentModal>
    );
};

export default Loader;

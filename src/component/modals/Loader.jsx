import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import ParentModal from './ParentModal';

const Loader = ({ superState }) => (
    <ParentModal ModelOpen={superState.loader} title="Wait........">
        <BeatLoader color="#36d7b7" />
    </ParentModal>
);

export default Loader;

import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import { MdCheckCircle, MdError } from 'react-icons/md';

import { Container, FIleInfo, Preview } from './style';

const FIleList = ({ files }) => (
    <Container>
        {files.map(uploadedFile =>(
            <li key={uploadedFile.id}>
                <FIleInfo>
                    <Preview src={uploadedFile.preview}></Preview>
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize} 
                        </span>
                    </div>
                </FIleInfo>

                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: 'coral' }
                            }}
                            strokeWidth={10}
                            value={uploadedFile.progress}
                        />
                    )}

                    { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" /> }
                    { uploadedFile.error &&  <MdError size={24} color="#e57878" /> }
                </div>
            </li>
        ))}
    </Container>
);

export default FIleList;

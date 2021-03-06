import React from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FIleInfo, Preview } from './style';

const FIleList = ({ files, onDelete }) => (
    <Container>
        {files.map(uploadedFile =>(
            <li key={uploadedFile.id}>
                <FIleInfo>
                    <Preview src={uploadedFile.preview}></Preview>
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize}
                            {!!uploadedFile.url && (
                                <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>
                            )}
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

                    {uploadedFile.url && (
                        <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}

                    { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" /> }
                    { uploadedFile.error &&  <MdError size={24} color="#e57878" /> }
                </div>
            </li>
        ))}
    </Container>
);

export default FIleList;

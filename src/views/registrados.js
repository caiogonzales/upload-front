import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from '../services/api';

import GlobalStyle from "../styles/global";
import { Container, Content } from '../styles';

import FileList from '../components/FIleList'

// import { Container } from './styles';

export default class Registrados extends Component {

    state = {
        uploadeFiles: [],
    };
    async componentDidMount() {
        const response = await api.get('posts');

        this.setState({
            uploadeFiles: response.data.map(file => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url,
            }))
        })
    }
    handleUpload = files => {
        const uploadeFiles = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));

        this.setState({
            uploadeFiles: this.state.uploadeFiles.concat(uploadeFiles)
        })

        uploadeFiles.forEach(this.processUpload)
    };
    updateFile = (id, data) => {
        this.setState({
            uploadeFiles: this.state.uploadeFiles.map(uploadedFile => {
                return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
            })
        })
    }

    processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('posts', data, {

            onUploadProgress: e => {
                console.log('ok');
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));

                this.updateFile(uploadedFile.id, {
                    progress,
                })
            }
        })
            .then(response => {
                this.updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url
                });
            })
            .catch(() => {
                this.updateFile(uploadedFile.id, {
                    error: true
                })
            })
    }

    handleDelete = async id => {
        await api.delete(`posts/${id}`);

        this.setState({
            uploadeFiles: this.state.uploadeFiles.filter(file => file.id !== id),
        })
    }

    componentWillUnmount() {
        this.state.uploadeFiles.forEach(file => URL.revokeObjectURL(file.preview));
    }

    render() {
        const { uploadeFiles } = this.state
        return (
            <Container>
                <Content>
                    <h1>Vídeos registrados</h1>
                    {!!uploadeFiles.length && (<FileList files={uploadeFiles} />)}
                </Content>
                <GlobalStyle />
            </Container>
        )
    }
}
import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'reactstrap';

import classNames from 'classnames';

import { rxHttp, loggerErr } from '../index';

export class Uploader extends Component {

    constructor(props) {
        super(props);

        this.files = [];
        if (this.props.file) this.files.push[this.props.file];
        if (this.props.files) this.files = this.props.files;
        
        this.uploading = false;

        this.showUploader = true;

        this.uploadFile = this.uploadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    uploadFile(event) {
        
        let sourceFile = event.target.files[0]
        let goUpload = true;

        for (let file of this.files) {
            if (file.fileName.indexOf(sourceFile.name) > 0) {
                goUpload = false;
            }
        }

        if (goUpload) {

            this.uploading = true;
            this.forceUpdate();

            let data = {
                file: sourceFile,
                action: 'upload',
                folder: this.props.upload.folder
            };
            if (this.props.type === 'image') {
                data['image'] = 'resize';
            }

            rxHttp.uploadFile(this.props.upload.host, data).subscribe(
                (response) => {
                    if (this.props.single) {
                        this.showUploader = false;
                    }
                    this.files.push(response[0]);
                    this.props.uploadChange(this.files);
                    this.uploading = false;
                    this.forceUpdate();
                },
                (error) => { loggerErr("Uploader, uploadFile", error); }
            );
        }
        else {
            loggerErr("Uploader, uploadFile", "File is already uploaded.");
        }
    }

    deleteFile(file) {

        file = file.thumbName ? [file.thumbName, file.fileName] : file.fileName;

        let data = {action: "del", file};

        return rxHttp.post(this.props.upload.host, data).subscribe(
            (response) => {
                if (response[0].deletedFile === file || (response[0].deletedFile === file[0] && response[1].deletedFile === file[1])) {
                    this.files.splice(this.files.indexOf(file), 1);
                    this.props.uploadChange(this.files);
                    if (this.props.single) {
                        this.showUploader = false;
                    }
                }    
            },
            (error) => { loggerErr("Uploader, deletedFile", error); }
        );
    }

    render() {

        let rowSwitch = classNames({
            row: true,
            'filesContainer': this.props.type==='file',
            'imgContainer': this.props.type==='image'
        });

        let colSwitch = classNames({
            'fileLinkWrap': this.props.type==='file',
            'fileWrap': this.props.type==='image'
        });

        return (
            <div>
            {this.showUploader &&
                <label className="uploader">
                    <input type="file" className="fileUpl" onChange={this.uploadFile} />
                    <span><i className="fa fa-upload" aria-hidden="true"></i> {this.uploading ? this.props.tr.uploader.uploading : this.props.tr.label}</span>
                </label>
            }
            {this.files && this.files.length > 0 &&
                <div className={rowSwitch}>                    
                    {this.files.map((file, i) => (
                        <Col key={i} xs="12" md="2" className={colSwitch}>
                        {this.props.type === 'file' &&
                            <div>
                                <a href={file.fileName} target="_blank" className="sameHeight fileLink">
                                <i className="fa fa-file" aria-hidden="true"></i> {file.name}
                                </a>
                                <span className="fileDel" title={this.props.tr.uploader.deleteFile} onClick={() => this.deleteFile(file)}>x</span>
                            </div>
                        }
                        {this.props.type === 'image' &&
                            <div>
                                <img src={file.thumbName} alt={file.thumbName} className="img-fluid img-rounded sameHeight" />
                                <span className="fileDel" title={this.props.tr.uploader.deletePic} onClick={() => this.deleteFile(file)}>x</span>
                            </div>
                        }
                        </Col>
                    ))}
                </div>
            }
            </div>
        )
    }
}

Uploader.propTypes = {
    uploadLabel: PropTypes.string,
    tr: PropTypes.object,                       // {label, uploader}
    type: PropTypes.string,
    single: PropTypes.bool,
    required: PropTypes.bool,
    file: PropTypes.object,
    files: PropTypes.array,
    uploadChange: PropTypes.func, 
    upload: PropTypes.object                    // {host, folder}
};

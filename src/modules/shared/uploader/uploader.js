import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'reactstrap';

import classNames from 'classnames';

import { rxHttp, showLoader, addMessage, loggerErr } from '../index';

import store from '../../../redux/store';

export class Uploader extends Component {

    constructor(props) {
        super(props);

        this.files = typeof this.props.value === 'string'
            ? [this.props.value]
            : this.props.value;
 
        this.showUploader = true;

        this.uploadFile = this.uploadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    uploadFile(event) {
        
        let sourceFile = event.target.files[0]
        let goUpload = true;

        for (let file of this.files) {
            if (this.file.fileName.indexOf(sourceFile.name) > 0) {
                goUpload = false;
            }
        }

        if (goUpload) {

            store.dispatch(showLoader(true));

            let data = new FormData();
            data.append("file", sourceFile);
            data.append("action", "upload");
            if (this.props.type == "image") {
                data.append("image", "resize");
            }
            data.append("folder", this.props.upload.folder);

            $.post({
                data,
                type: "POST",
                url: this.props.upload.host,
                cache: false,
                contentType: false,
                processData: false,
                success: (uploadedFile) => {
                    if (this.props.single) {
                        this.showUploader = false;
                    }
                    this.files.push(uploadedFile.data[0]);
                    this.props.uploadChange(this.files);
                    store.dispatch(showLoader(false));
                },
                error: (error) => {
                    loggerErr("Uploader, uploadFile", error);
                    store.dispatch(showLoader(false));
                }
            });
        }
        else {
            loggerErr("Uploader, uploadFile", "File is already uploaded.");
        }
    }

    deleteFile(fileUrl) {
        let origFileUrl = fileUrl;
        if (fileUrl.name) {
            fileUrl = fileUrl.fileName;
        }
        if (fileUrl.thumbName) {
            fileUrl = [fileUrl.thumbName, fileUrl.fileName];
        }
        let data = JSON.stringify({
            action: "del",
            file: fileUrl
        });

        store.dispatch(showLoader(true));

        return rxHttp.post(this.props.upload.host, data).subscribe(
            (response) => {
                if (response[0].deletedFile == fileUrl || (response[0].deletedFile == fileUrl[0] && response[1].deletedFile == fileUrl[1])) {
                    this.files.splice(this.files.indexOf(fileUrl), 1);
                    this.props.uploadChange(this.files);
                    if (this.props.single) {
                        this.showUploader = false;
                    }
                    store.dispatch(showLoader(false));
                }    
            },
            (error) => {
                loggerErr("Summernote, mediaDelete", error);
                store.dispatch(showLoader(false));
            }
        );
    }

    render() {

        let classSwitch = classNames({
            filesContainer: this.type=='file',
            imgContainer: this.type=='image'
        });

        return (
            <div>
            {this.showUploader &&
                <label className="uploader">
                    <input type="file" className="fileUpl" onchange={() => this.uploadFile} />
                    <span><i className="fa fa-upload" aria-hidden="true"></i>{this.props.uploadLabel}</span>
                </label>
            }
            {this.files && this.files.length > 0 &&
                <Row className={classSwitch}>
                {this.props.tyoe.file &&
                    <div>
                    {this.files.map((file, i) => (
                        <Col key={i} xs="12" md="3" lg="2" className="fileLinkWrap">
                            <a href={file.fileName} target="_blank" className="sameHeight fileLink">
                            <i className="fa fa-file" aria-hidden="true"></i> {file.name}
                            </a>
                            <span className="fileDel" title={this.props.delLabel} onclick={() => this.deleteFile}>x</span>
                        </Col>
                    ))}
                    </div>    
                }
                {this.props.tyoe.image &&
                    <div>
                    {this.files.map((file, i) => (
                        <Col key={i} xs="12" md="2" className="fileWrap">
                            <img src={file.thumbName} className="img-fluid img-rounded sameHeight" />
                            <span className="fileDel" title={this.props.delLabel} onclick={() => this.deleteFile}>x</span>
                        </Col>
                    ))}
                    </div>    
                }
                </Row>
            }
            </div>
        )
    }
}

Uploader.propTypes = {
    uploadLabel: PropTypes.string,
    delLabel: PropTypes.string,
    type: PropTypes.string,
    single: PropTypes.bool,
    required: PropTypes.bool,
    uploadValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    uploadChange: PropTypes.func, 
    upload: PropTypes.object                    // {host, folder}
};

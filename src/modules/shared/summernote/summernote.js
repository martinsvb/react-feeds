import React, { Component } from 'react';
import { baseURL, rxHttp } from '../index';

import 'rxjs/add/operator/toPromise';

import $ from 'jquery';
import 'tether';
import 'bootstrap';
import 'summernote';

export class Summernote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'summernote-'+Date.now()
        };

        this.initialized = false;
    }

    componentDidMount() {
        this.summernote = window.summernote;
        
        if (!this.initialized) {
            
            let config = this.props.config || {
                height: Number(this.props.height) || 200,
                minHeight: Number(this.props.minHeight) || this.props.height || 200,
                maxHeight: Number(this.props.maxHeight) || this.props.height || 500,
                placeholder: this.props.placeholder || 'Text...',
                focus: this.props.focus,
                airMode: this.props.airMode,
                dialogsInBody: this.props.dialogsInBody,
                editable: this.props.editable,
                lang: 'en-US',
                disableResizeEditor: this.props.disableResizeEditor
            };
            
            config.callbacks = {
                onChange: (content) => this.props.onChange && this.props.onChange(content),
                onInit: (evt) => this.props.onChange && this.props.onChange(evt)
            };

            if (this.props.serverImgUp) {
                config.callbacks.onImageUpload = (files) => {
                    this.imageUpload({files: files, editable: this.props.editable});
                };
                config.callbacks.onMediaDelete = (target) => {
                    let fileUrl;
                    let attributes = target[0].attributes;
                    for (let i = 0; i < attributes.length; i++) {
                        if (attributes[i].name == "src") {
                            fileUrl = attributes[i].value;
                        }
                    }
                    this.mediaDelete(fileUrl)
                        .then((resp) => { console.log(resp.json().data) })
                        .catch((err) => { console.log("error: ", err) });
                };
            }

            this.initialized = true;
            $('.'+this.state.id).summernote(config);
        }
    }

    componentWillUnmount() {
        $('.'+this.state.id).summernote('destroy');
        this.initialized = false;
    }

    render() {
        
        const { id } = this.state;
        const classString = `summernote ${id}`;
        
        return (
            <div>
                <div className={classString} dangerouslySetInnerHTML={{__html: this.props.value}} ></div>
            </div>
        );
    }

    imageUpload(dataUpload) {
        if (dataUpload.editable) {
            let data = new FormData();
            data.append("file", dataUpload.files[0]);
            data.append("action", "upload");
            data.append("image", "resizeNoThumb");
            data.append("folder", this.uploadFolder);
            $.post({
                data: data,
                type: "POST",
                url: this.hostUpload,
                cache: false,
                contentType: false,
                processData: false,
                success: (uploadedImg) => {
                    let insertImg = $('<img style="width: 100%;" src="' + uploadedImg.data[0].fileName + '" />');
                    $('.'+this.state.id).summernote('insertNode', insertImg[0]);
                    console.log("Uploaded image: " + uploadedImg.data[0]);
                },
                error: (err) => { console.log("error: ", err) }
            });
        }
    }

    mediaDelete(fileUrl) {
        let data = JSON.stringify({
            action: "del",
            file: fileUrl
        });
        
        return this._http.post(this.hostUpload, data)
                .toPromise()
                .then((response) => response)
                .catch((err) => Promise.reject(err.message || err));
    }
}
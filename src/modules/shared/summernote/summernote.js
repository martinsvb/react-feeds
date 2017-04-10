import React, { Component, PropTypes } from 'react';
import { rxHttp, loggerErr } from '../index';

export class Summernote extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 'summernote-'+Date.now()
        };

        this.initialized = false;

        this.editable = this.props.disable ? false : true;
    }

    componentDidMount() {
        if (!this.initialized) {
            
            let config = this.props.config || {
                height: Number(this.props.height) || 200,
                minHeight: Number(this.props.minHeight) || this.props.height || 200,
                maxHeight: Number(this.props.maxHeight) || this.props.height || 500,
                placeholder: this.props.placeholder || 'Text...',
                focus: this.props.focus,
                airMode: this.props.airMode,
                dialogsInBody: this.props.dialogsInBody,
                editable: this.editable,
                lang: 'en-US',
                disableResizeEditor: this.props.disableResizeEditor
            };
            
            config.callbacks = {
                onChange: (value, name) => this.props.onChange && this.props.onChange(value, this.props.name),
                onInit: (evt) => this.props.onInit && this.props.onInit(evt)
            };

            if (this.props.upload) {
                config.callbacks.onImageUpload = (files) => {
                    this.imageUpload({files, editable: this.editable});
                };
                config.callbacks.onMediaDelete = (target) => {
                    let fileUrl = target[0].attributes.filter((attr) => attr.name == "src");
                    let data = JSON.stringify({
                        action: "del",
                        file: fileUrl
                    });
                    
                    rxHttp.post(this.props.upload.host, data).subscribe(
                            (response) => response,
                            (error) => { loggerErr("Summernote, mediaDelete", error) }
                        );
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
        
        return (
            <div>
                <div className={`summernote ${this.state.id}`} dangerouslySetInnerHTML={{__html: this.props.value}} ></div>
            </div>
        );
    }

    imageUpload(dataUpload) {
        if (dataUpload.editable) {
            let data = new FormData();
            data.append("file", dataUpload.files[0]);
            data.append("action", "upload");
            data.append("image", "resizeNoThumb");
            data.append("folder", this.props.upload.folder);
            $.post({
                data: data,
                type: "POST",
                url: this.props.upload.host,
                cache: false,
                contentType: false,
                processData: false,
                success: (uploadedImg) => {
                    let insertImg = $('<img style="width: 100%;" src="' + uploadedImg.data[0].fileName + '" />');
                    $('.'+this.state.id).summernote('insertNode', insertImg[0]);
                },
                error: (error) => { loggerErr("Summernote, imageUpload", error) }
            });
        }
    }
}

Summernote.propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    height: PropTypes.number,
    minHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    placeholder: PropTypes.string,
    focus: PropTypes.bool,
    airMode: PropTypes.bool,
    dialogsInBody: PropTypes.bool,
    disable: PropTypes.bool,
    lang: PropTypes.string,
    disableResizeEditor: PropTypes.bool,
    upload: PropTypes.object                    // {host: string, folder: string}
};

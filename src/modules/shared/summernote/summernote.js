import React, { Component } from 'react';
import { baseURL, rxHttp } from '../index';

import 'rxjs/add/operator/toPromise';

export class reactSummernote extends Component {

    constructor(props) {
      super(props);

      this.editor = {};

      this.config = this.props.config || {
          height: Number(this.props.height) || 200,
          minHeight: Number(this.props.minHeight) || this.props.height || 200,
          maxHeight: Number(this.props.maxHeight) || this.props.height || 500,
          placeholder: this.props.placeholder || 'Text...',
          focus: this.setLogicVars(this.props.focus, false),
          airMode: this.setLogicVars(this.props.airMode, false),
          dialogsInBody: this.setLogicVars(this.props.dialogsInBody, false),
          editable: this.setLogicVars(this.props.editable, true),
          lang: $.summernote.lang[this.lang] ? this.lang : 'en-US',
          disableResizeEditor: this.setLogicVars(this.props.disableResizeEditor, false)
      };
      
      this.config.callbacks = {
          onChange: (evt) => { console.log("change: ", evt) },
          onInit: (evt) => { console.log("init: ", evt) }
      };

      /** URL for upload server images */
      this.hostUpload;

      /** Uploaded images server folder */
      this.uploadFolder;
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
                    $(this._elementRef.nativeElement).find('.summernote').summernote('insertNode', insertImg[0]);
                    console.log("Uploaded image: " + uploadedImg.data[0]);
                },
                error: (err) => { this._errHandle(err) }
            });
        }
    }

    mediaDelete(fileUrl) {
        let data = JSON.stringify({
            action: "del",
            file: fileUrl
        });

        let headers = new Headers({
            'Accept': '*/*',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        
        return this._http.post(this.hostUpload, data, options)
                .toPromise()
                .then((response) => response)
                .catch((err) => Promise.reject(err.message || err));
    }

    /**
     * Set logical varibles from text input values
     * 
     * @param any variable, logic varible for setting
     * @param boolean defaultValue, this value will be set if variable is not set
     * 
     * @return boolean variable, finally setted variable value
     */
    setLogicVars(variable, defaultVal) {
      variable = typeof variable !== 'undefined' ? true : false; 
      if (!variable && defaultVal) variable = defaultVal;

      return variable;
    }

    writeValue (value) {
        if (value) {

            if (typeof this.serverImgUp !== 'undefined') {
                this.config.callbacks.onImageUpload = (files) => {
                    this._imageUpload({files: files, editable: this.editable});
                };
                this.config.callbacks.onMediaDelete = (target) => {
                    let fileUrl;
                    let attributes = target[0].attributes;
                    for (let i = 0; i < attributes.length; i++) {
                        if (attributes[i].name == "src") {
                            fileUrl = attributes[i].value;
                        }
                    }
                    this._mediaDelete(fileUrl)
                        .then((resp) => { console.log(resp.json().data) })
                        .catch((err) => { console.log("error: ", err) });
                };
            }

            $(this._elementRef.nativeElement).find('.summernote').summernote(this.config);
            $(this._elementRef.nativeElement).find('.summernote').summernote('code', this.props.value);
        }
    }

  render() {
    const { value, defaultValue, className } = this.props;
    const html = value || defaultValue;

    return (
      <div className={className}>
        <div id={this.uid} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}
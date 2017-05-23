import * as React from 'react';

import Button from '../buttons/Button';
import FormDynamic, { IFormDynamicAction, IFormDynamicProps } from './Form-Dynamic';

import * as Select from 'react-select';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three', disabled: true },
    { value: 'four', label: 'Four' },
    { value: 'five', label: 'Five' }
];

export default
class FormDynamicItem
extends FormDynamic {

    constructor(props: IFormDynamicProps & IFormDynamicAction) {
        super(props);
        this.state = {
            ...this.state,
            formValid: false,
            formValidFields: ['name', 'email']
        };
        this.formEvents = {
            onChange: (model: Object, valid: boolean) => {
                this.setState({
                    formValidFields: this.state.model.check
                        ? ['name', 'email', 'min', 'max']
                        : ['name', 'email']
                }, () => {
                    this.setState({
                        formValid: this.validator.formValid(this.state.formValidFields)
                    });
                });
            }
        };
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(this.state.model);
        }
    }

    render() {

        return (
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {this.renderLabel('name')}{this.renderInput('name')}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        {this.renderLabel('email')}{this.renderInput('email')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {this.renderInput('check')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {this.renderInput('select')}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        {this.renderInput('selectmulti')}
                    </div>
                </div>
                {this.state.model.check &&
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {this.renderLabel('min')}{this.renderInput('min')}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        {this.renderLabel('max')}{this.renderInput('max')}
                    </div>
                </div>
                }
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {this.renderInput('button')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6 text-right">
                        <br />
                        <Button
                            type="primary"
                            disabled={!this.state.formValid}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

export function showcaseFormDynamicItem() {

    return (
        <div>
            <FormDynamicItem
                fields={fields}
            />
        </div>
    );
}

export const fields = [
    {
        icon: 'user',
        label: 'name',
        name: 'name',
        placeholder: 'name',
        type: 'text',
        validationRules: ['required', 'minLength:3'],
        value: ''
    },
    {
        btnClear: true,
        label: 'email',
        name: 'email',
        placeholder: 'email',
        type: 'email',
        validationRules: ['required', 'emailSimple'],
        value: ''
    },
    {
        label: 'min',
        name: 'min',
        placeholder: 'min',
        type: 'number',
        validationRules: ['lower:max'],
        value: ''
    },
    {
        label: 'max',
        name: 'max',
        placeholder: 'max',
        type: 'number',
        validationRules: ['greaterEqual:min'],
        value: ''
    },
    {
        label: 'check me',
        name: 'check',
        type: 'checkbox',
        value: false
    },
    {
        name: 'select',
        type: 'searchselect',
        value: 'one',
        searchSelectOptions: options,
    },
    {
        name: 'selectmulti',
        type: 'searchselect',
        multiselect: true,
        value: 'one,two',
        searchSelectOptions: options,
    },
    {
        buttonClick: (model: any) => { console.log(model); },
        disabled: true,
        icon: 'user',
        name: 'button',
        placeholder: 'submit',
        type: 'button-primary'
    }
];

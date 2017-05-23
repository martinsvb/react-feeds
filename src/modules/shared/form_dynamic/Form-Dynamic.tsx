import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';

import { DATE_DISPLAY_FORMAT, DATETIME_DISPLAY_FORMAT, TIME_DISPLAY_FORMAT } from 'pg-constants';
import { dateToStr, isDate } from '../../utils';
import Button from '../buttons/Button';
import Icon from '../icons/Icon';
import Checkbox from './Checkbox';
import DropdownList, { IDropdownItem } from './DropdownList';
import Editor from './Editor';
import Calendar from './pickers/Calendar';
import Clock from './pickers/Clock';
import PickerWrapper from './pickers/PickerWrapper';
import * as Select from 'react-select';
import Tags from './Tags';
import { Validator, valueExists } from './validator';

export interface ISearchSelectItem {
    value: string|number;
    label: string|number;
}

export interface IFormField {
    type: string; // 'text', 'number', 'email', 'password', date, datetime, time, checkbox, textarea, editor, dropdown, searchselect, tags, button-[type]
    name: string;
    value?: any;
    placeholder?: string;
    label?: string;
    multiselect?: boolean;
    children?: Array<IDropdownItem>;
    className?: string;
    disabled?: boolean;
    validationRules?: any;
    buttonClick?: any;
    btnClear?: boolean;
    icon?: string;
    openedPicker?: boolean;
    searchSelectOptions?: Array<Select.Option>;
    yearNav?: boolean;
    format?: string;
}

export interface IFormDynamicProps {
    fields: Array<IFormField>;
    formValid?: boolean;
    formValidFields?: Array<string>;
}

export interface IFormDynamicAction {
    onChange?: (model: Object, valid?: boolean) => void;
    onSubmit?: (model: Object) => void;
}

export interface IFormDynamicState {
    model: any;
    error: any;
    pickers: {[key: string]: boolean};
    formValid: boolean;
    formValidFields?: Array<string>;
}

export default
class FormDynamic
extends React.Component<IFormDynamicProps & IFormDynamicAction, IFormDynamicState>
{
    inputs: {[key: string]: any};
    rules: {[key: string]: string};
    validator: Validator;
    formEvents: IFormDynamicAction;

    buttonsTypes: Array<String> = ['primary', 'success', 'info', 'warning', 'danger', 'muted', 'disabled'];

    dateTypesFormat: {[key: string]: string} = {
        date: DATE_DISPLAY_FORMAT,
        datetime: DATETIME_DISPLAY_FORMAT,
        time: TIME_DISPLAY_FORMAT
    };

    constructor(props: IFormDynamicProps & IFormDynamicAction) {
        super(props);

        this.initModel();

        this.formEvents = {};

        let lang = 'en'; // this.props.params.lang
        this.validator = new Validator(lang, this.rules);
    }

    initModel() {

        let model: any = {};
        let error: any = {};
        let pickers: {[key: string]: boolean} = {};

        this.inputs = {};
        this.rules = {};

        let names: Array<string> = [];

        for (const field of this.props.fields) {
            // Exceptions
            if (names.includes(field.name)) {
                throw new Error(`Field ${field.name} is alredy used in form fields.`);
            }
            if (field.type === 'dropdown' && (!field.children || field.children.length === 0)) {
                throw new Error(`Dropdown ${field.name} children is missing`);
            }
            if (field.type.startsWith('button-') && !this.buttonsTypes.includes(field.type.substring(7))) {
                throw new Error(`Button ${field.name} has set bad type parameter
                Supported parameters: ${this.buttonsTypes.join(', ')}
                Inserted: ${field.type.substring(7)}`);
            }

            names.push(field.name);

            // Model
            model[field.name] = this.setModel(field, field.value);

            // Validation
            if (field.validationRules) {
                this.rules[field.name] = field.validationRules;
                error[field.name] = null;
            }

            // Pickers closed
            if (field.type === 'date' || field.type === 'datetime' || field.type === 'time') {
                pickers[field.name] = false;
            }
        }

        this.state = {
            model, error, pickers,
            formValid: typeof this.props.formValid !== 'undefined' ? this.props.formValid : true,
            formValidFields: this.props.formValidFields || []
        };
    }

    handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            this.state.formValid
                ? this.handleSubmit(event)
                : event.preventDefault();
        }
    }

    handleChange = (name: string, value: any, field: IFormField) => {
        this.setState({
            model: {...this.state.model, ...{[name]: this.setModel(field, value)}}
        }, () => {
            this.validator.setModel(this.state.model);

            if (this.state.error[name]
            || (['checkbox', 'dropdown', 'editor', 'tags', 'date', 'datetime', 'time']
            .includes(field.type) && field.validationRules)) {
                this.validate(name);
            }

            if (typeof this.formEvents.onChange === 'function') {
                this.formEvents.onChange(this.state.model);
            }
            else {
                this.setState({
                    formValid: this.validator.formValid(this.props.formValidFields || null)
                }, () => {
                    if (typeof this.props.onChange === 'function') {
                        this.props.onChange(this.state.model, this.state.formValid);
                    }
                });
            }
        });
    }

    handleBlur = (event: any) => {
        const name = event.target.name;

        this.validate(name);
    }

    handleFocus = (name: string) => {
        if (typeof this.state.pickers[name] !== 'undefined') {
            this.setState({
                pickers: {...this.state.pickers, ...{[name]: !this.state.pickers[name]}}
            });
        }
        else if (this.inputs[name]) {
            this.inputs[name].focus();
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(this.state.model);
        }
    }

    isDateType(type: string = '') {
        return Object.keys(this.dateTypesFormat).includes(type);
    }

    isRequired = (field: IFormField) => {
        return field.validationRules && field.validationRules.includes('required');
    }

    setModel(field: IFormField, value: any) {

        switch (true) {
            case field.type === 'number':
                return Number(value);

            case field.type === 'searchselect' && valueExists(value):
                value = value.constructor === Array
                    ? value.map((item: ISearchSelectItem) => item.value).join(',')
                    : value.value;
                return value;

            default:
                return value;
        }
    }

    validate(name: string) {
        this.validator.setModel(this.state.model);
        if (this.rules[name]) {
            this.setState({
                error: {...this.state.error, ...{[name]: this.validator.itemValid(name)}}
            });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            {this.renderInput()}
            </form>
        );
    }

    renderInput(renderName: string = '') {

        return (
            <div>
                {this.props.fields.map((field, i) => (
                    <div key={i}>
                    {(!renderName || renderName === field.name) &&
                    <div>
                    {['text', 'number', 'email', 'password', ...Object.keys(this.dateTypesFormat)]
                    .includes(field.type) &&
                        <div className={classNames(
                            'input-wrapper', {'with-btn-clear': field.btnClear, 'with-icon': !!field.icon}
                        )}>
                            <input
                                type={this.isDateType(field.type) ? 'text' : field.type}
                                id={field.name}
                                name={field.name}
                                value={(this.isDateType(field.type) && isDate(this.state.model[field.name]))
                    ? dateToStr(this.state.model[field.name], field.format || this.dateTypesFormat[field.type] || '')
                    : this.state.model[field.name]}
                                placeholder={field.placeholder}
                                className={classNames(field.className, {invalid: this.state.error[field.name]})}
                                ref={(input) => { this.inputs[field.name] = input; }}
                                onChange={(event: any) => {
                                    const { name, value } = event.target;
                                    this.handleChange(name, value, field);
                                }}
                                onKeyPress={this.handleKeyPress}
                                onBlur={this.handleBlur}
                                onFocus={() => this.handleFocus(field.name)}
                                disabled={field.disabled}
                                readOnly={this.isDateType(field.type)} />
                            {field.icon &&
                            <Icon onClick={() => this.handleFocus(field.name)} name={field.icon}/>
                            }
                            {field.btnClear &&
                            <button onClick={(event) => {
                                event.preventDefault();
                                this.state.model[field.name] = '';
                                this.forceUpdate();
                            }}
                            className="btn-clear">&#10006;</button>
                            }
                            {(field.type === 'date' || field.type === 'datetime' || field.type === 'time')
                            && this.state.pickers[field.name] &&
                                <PickerWrapper close={() => this.handleFocus(field.name)}>
                                    {(field.type === 'date' || field.type === 'datetime') &&
                                    <Calendar
                                        onChange={(value: any) => this.handleChange(field.name, value, field)}
                                        value={field.value}
                                        close={() => this.handleFocus(field.name)}
                                        yearNav={field.yearNav}
                                    />
                                    }
                                    {(field.type === 'datetime' || field.type === 'time') &&
                                    <Clock
                                        onChange={(value: any) => this.handleChange(field.name, value, field)}
                                        value={field.value}
                                        close={() => this.handleFocus(field.name)}
                                        className={field.type === 'datetime' ? 'datetime-align' : null}
                                    />
                                    }
                                </PickerWrapper>
                            }
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                            {this.state.error[field.name] && <p>{this.state.error[field.name]}</p>}
                        </div>
                    }

                    {field.type === 'checkbox' &&
                        <div>
                            <Checkbox
                                name={field.name}
                                value={this.state.model[field.name]}
                                label={field.label}
                                className={classNames(field.className, {invalid: this.state.error[field.name]})}
                                required={this.isRequired(field)}
                                onChange={(value: any) => this.handleChange(field.name, value, field)}
                            />
                        </div>
                    }

                    {field.type === 'textarea' &&
                        <div className="input-wrapper">
                            {field.label && <label htmlFor={field.name}>{field.label}</label>}
                            <textarea
                                id={field.name}
                                name={field.name}
                                className={classNames(field.className, {invalid: this.state.error[field.name]})}
                                value={this.state.model[field.name]}
                                onChange={(event: any) => {
                                    const { name, value } = event.target;
                                    this.handleChange(name, value, field);
                                }}
                                onBlur={this.handleBlur}
                            ></textarea>
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                        </div>
                    }

                    {field.type === 'editor' &&
                        <div className="input-wrapper">
                            <Editor
                                label={field.label}
                                name={field.name}
                                className={classNames(field.className, {invalid: this.state.error[field.name]})}
                                onChange={(value: any) => this.handleChange(field.name, value, field)}
                                value={this.state.model[field.name]}
                            />
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                        </div>
                    }

                    {field.type === 'dropdown' && field.children &&
                        <div className="input-wrapper">
                            <DropdownList
                                name={field.name}
                                placeholder={field.placeholder}
                                selected={this.state.model[field.name]}
                                multiselect={field.multiselect ? field.multiselect : false}
                                onChange={(selected: any) => this.handleChange(field.name, selected, field)}
                                children={field.children}
                            />
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                        </div>
                    }

                    {field.type === 'searchselect' &&
                        <div className="input-wrapper">
                            <Select
                                name={field.name}
                                className={classNames(field.className, {invalid: this.state.error[field.name]})}
                                value={this.state.model[field.name]}
                                options={field.searchSelectOptions}
                                onChange={(selected: Select.Option) => this.handleChange(field.name, selected, field)}
                                multi={field.multiselect ? field.multiselect : false}
                                joinValues={true}
                                autosize={true}
                                disabled={field.disabled}
                            />
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                        </div>
                    }

                    {field.type === 'tags' &&
                        <div className="input-wrapper">
                            <section>
                                <Tags
                                    name={field.name}
                                    value={this.state.model[field.name]}
                                    onChange={(tags: any) => this.handleChange(field.name, tags, field)}
                                />
                            </section>
                            {this.isRequired(field) &&
                            <span className={classNames('required', {invalid: this.state.error[field.name]})}>*</span>
                            }
                        </div>
                    }

                    {field.type.startsWith('button-') &&
                        <Button
                            type={field.type.substring(7)}
                            className={classNames(field.className, {'btn-icon btn-icon-left': !!field.icon})}
                            disabled={field.hasOwnProperty('disabled') ? !this.state.formValid : false}
                            onClick={() => field.buttonClick(this.state.model)}
                        >
                            {field.icon && <Icon name={field.icon} />} {field.placeholder}
                        </Button>
                    }
                    </div>
                    }
                    </div>
                ))}
            </div>
        );
    }

    renderLabel(name: string) {

        if (name) {
            const field = this.props.fields.filter((f) => name === f.name)[0];

            return field
                ? <label htmlFor={field.name}>{field.label || field.name}</label>
                : null;
        }

        return null;
    }
}

import * as React from 'react';

import FormDynamic from './Form-Dynamic';

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
        icon: 'lock',
        name: 'password',
        placeholder: 'password',
        type: 'password',
        validationRules: ['required', 'minLength:5'],
        value: ''
    },
    {
        icon: 'lock',
        name: 'repassword',
        placeholder: 'repassword',
        type: 'password',
        validationRules: ['required', 'minLength:5', 'equal:password'],
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
        validationRules: ['required', 'greater:min'],
        value: ''
    },
    {
        label: 'Text',
        name: 'text',
        type: 'textarea',
        validationRules: ['required'],
        value: ''
    },
    {
        label: 'Editor',
        name: 'editor',
        type: 'editor',
        validationRules: ['required'],
        value: ''
    },
    {
        label: 'check me',
        name: 'check',
        type: 'checkbox',
        value: false
    },
    {
        children: [
            {id: 'visiting-the-usa', name: 'Visiting the USA'},
            {
                children: [
                    {id: 'voa-newscenter', name: 'VOA NewsCenter'}
                ],
                id: 'arirang',
                name: 'Arirang'
            },
            {id: 'zone-creator-allcontent', name: 'Zone Creator AllContent'},
            {
                children: [
                    {id: 'africa', name: 'Africa'},
                    {id: 'asia', name: 'Asia'},
                    {id: 'us', name: 'US'},
                    {id: 'europe', name: 'Europe'},
                    {id: 'meddle-east', name: 'Middel East'},
                    {id: 'economy', name: 'Economy'},
                    {id: 'eap', name: 'EAP'}
                ],
                id: 'breaking-news',
                name: 'Breaking News'
            }
        ],
        name: 'countries',
        placeholder: 'Select country',
        type: 'dropdown',
        validationRules: ['required']
    },
    {
        icon: 'calendar',
        name: 'date',
        placeholder: 'date',
        type: 'date',
        validationRules: ['required', 'lower:datetime'],
        value: '',
        yearNav: true
    },
    {
        name: 'datetime',
        placeholder: 'datetime',
        type: 'datetime',
        validationRules: ['required', 'greater:date'],
        value: ''
    },
    {
        name: 'time',
        placeholder: 'time',
        type: 'time',
        value: ''
    },
    {
        name: 'tags',
        type: 'tags',
        validationRules: ['required'],
        value: [{id: 1, text: 'tag 1'}, {id: 2, text: 'tag 2'}, {id: 3, text: 'tag 3'}]
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

const handleChange = (model: Object, valid: boolean) => {
    console.log(valid, model);
};

const handleSubmit = (model: Object) => {
    console.log('showcase: ', model);
};

export function showcaseFormDynamic() {

    return (
        <div>
            <FormDynamic
                fields={fields}
                formValid={false}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

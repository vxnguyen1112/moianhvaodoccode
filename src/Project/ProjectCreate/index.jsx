import React, {useState} from 'react';
import { Form, Breadcrumbs } from 'components';

import { FormCont, FormHeading, FormElement, ActionButton } from '../ProjectSettings/Styles';

const ProjectCreate = () => {

    const project = {
        name: "",
        domain: "",
        description: "",
    }

    const [isPublic, setIsPublic] = useState(false)

    const handleCheckbox = () => {
        setIsPublic(!isPublic)
    }

    return (
        <Form
            initialValues={Form.initialValues(project, get => ({
                name: get('name'),
                description: get('description'),
                domain: get('domain')
            }))}
            validations={{
                name: [Form.is.required(), Form.is.maxLength(100)],
                description: Form.is.required(),
                domain: Form.is.required()
            }}
            onSubmit={async (values, form) => {
                try {
                    toast.success('Changes have been saved successfully.');
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormCont>
                <FormElement>
                <Breadcrumbs items={['Projects', "singularity 1.0", 'Project Create']} />
                <FormHeading>Project Create</FormHeading>
        
                <Form.Field.Input name="name" label="Name" />
                <Form.Field.Input name="domain" label="Domain" />
                <Form.Field.TextEditor
                    name="description"
                    label="Description"
                    tip="Describe the project in as much detail as you'd like."
                />
                <div
                    style={{
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                    }} 
                >
                    <label htmlFor="public"> Public</label>
                    <input 
                        type="checkbox" 
                        id="public" 
                        name="public"
                        checked={isPublic}
                        onChange={handleCheckbox}
                        style={{
                            width: 15,
                            height: 15,
                            appearance: 'auto',
                            marginLeft: 20
                        }} 
                    />
                </div>
        
                <ActionButton type="submit" variant="primary">
                    Create project
                </ActionButton>
                </FormElement>
            </FormCont>
        </Form>
    );

}

export default ProjectCreate;
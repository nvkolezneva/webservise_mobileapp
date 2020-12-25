import {
    List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    TextField,
    EditButton,
    TextInput,
    NumberInput,
    NumberField,
    EmailField,
    required,
} from "react-admin";

export const ContactList = (props) => (
    <List {...props} pagination={null}>
        <Datagrid>
            <NumberField source="id"/>
            <TextField source="name"/>
            <TextField source="description"/>
            <TextField source="phone"/>
            <EmailField source="email"/>
            <EditButton basePath="/contacts"/>
        </Datagrid>
    </List>
);

const ContactTitle = ({record}) => {
    return <span></span>;
};

export const ContactEdit = (props) => (
    <Edit title={<ContactTitle/>} {...props}>
        <SimpleForm>
            <NumberInput disabled source="id"/>
            <TextInput source="name"/>
            <TextInput source="description"/>
            <TextInput source="phone"/>
            <TextInput source="email"/>
        </SimpleForm>
    </Edit>
);

export const ContactCreate = (props) => (
    <Create title="Создать контакт" {...props}>
        <SimpleForm>
            <NumberInput validate={required()} source="id"/>
            <TextInput source="name"/>
            <TextInput source="description"/>
            <TextInput source="phone"/>
            <TextInput source="email"/>
        </SimpleForm>
    </Create>
);

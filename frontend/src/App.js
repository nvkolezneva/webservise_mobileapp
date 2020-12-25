import React from "react";
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import {createMuiTheme} from "@material-ui/core/styles";

import {ContactCreate, ContactEdit, ContactList} from "./crud";
import "./App.css";

const theme = createMuiTheme({
    palette: {
        type: "light",
    },
});

function App() {
    return (
        <div className="App">
            <Admin
                {...{theme}}
                dataProvider={simpleRestProvider("http://localhost:3001")}
            >
                <Resource
                    name="contacts"
                    list={ContactList}
                    edit={ContactEdit}
                    create={ContactCreate}
                />
            </Admin>
        </div>
    );
}

export default App;

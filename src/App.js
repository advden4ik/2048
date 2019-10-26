import React, {useState} from 'react';
import Layout from "./components/Layout/Layout";
import Field from "./components/Field/Field";

const App = () => {
    const [matrix] = useState([])

    return (
        <Layout>
            <Field cells={matrix}/>
        </Layout>
    );
}

export default App;

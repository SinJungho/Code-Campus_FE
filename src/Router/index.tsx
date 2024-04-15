import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import * as P from '../pages';

const Router = () => {
    return (
        <Layout>
            <Routes>
                <Route path='*' element={<P.Home />} />
            </Routes>
        </Layout>
    );
};

export default Router;
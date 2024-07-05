import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import * as P from '../pages';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='*' element={<P.Home />} />
                </Route>
                <Route path='/login' element={<P.Login />} />
                <Route path='/signup' element={<P.SignUp />} />
            </Routes>
        </div>
    );
};

export default Router;
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './modules/redux/store';
import App from './App';
import './index.css';
import {UserList} from "./modules/user-list";
import {Community} from "./modules/community";
import {User} from "./modules/user";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="user-list" element={<UserList />} />
                <Route path="community" element={<Community />} />
                <Route path="user" element={<User />} />
            </Routes>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('pageContent'));
root.render(
  <React.StrictMode>
        {/* <Routes>
            <Route path='/' element={<App />}>
                <Route index element={<Home />} />

                <Route exact path='articles' element={<Articles />} />
                <Route exact path='articles/new' element={<NewArticle />} />
                <Route path='/articles/:id' element={<EditArticle />} />

                <Route exact path='/journalists' element={<Journalists />} />
                <Route exact path='journalists/new' element={<NewJournalist />} />
                <Route path='/journalists/:id' element={<EditJournalist />} />
                <Route exact path='/images' element={<Images />} />
            </Route>
        </Routes> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

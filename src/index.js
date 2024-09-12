import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

/* CSS */
import './index.css';
import './App.css';

/* 페이지 */
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(

    <BrowserRouter>
            <App/>
    </BrowserRouter>
);

reportWebVitals();
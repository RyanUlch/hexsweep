import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Cannot use React.StrictMode since using states with random numbers causes too many cells to be made into bombs from running StrictMode rendering twice on dev build
root.render(<App />);
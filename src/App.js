import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import ChatBot from './components/ChatBot';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/index';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  if (process.env.NODE_ENV === 'development') {
    const meta = document.createElement('meta');
    meta.name = 'csrf-token';
    meta.content = 'YOUR_TEST_TOKEN'; 
    document.head.appendChild(meta);
  }

  return (
  <>
      <ChatBot />
    <RouterProvider router={router} />
    </>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PackageForm from './Component/PackageForm';
import "bootstrap/dist/css/bootstrap.min.css";
import PackageGet from './Component/PackageGet';
import 'react-notifications/lib/notifications.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PackageForm/>} />
          <Route path='/getData' element={<PackageGet/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

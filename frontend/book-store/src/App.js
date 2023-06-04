import ListBookComponent from './component/ListBookComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<ListBookComponent />}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;

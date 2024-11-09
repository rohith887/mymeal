
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from './Recipe';
import { RecipePage } from './RecipePage';
function App() {

   return (

     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Recipe/>} />
          <Route path='/recipe' element={<RecipePage/>}/>
        </Routes>
     </BrowserRouter>
       
   );
 
}

export default App;

import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './js/GlobalStyles';

import './App.css';

import MainLayout from "./components/layout/MainLayout";
import Home from "./components/page/home";
import TeamPicker from "./components/page/teamPicker";
import DraftPicker from "./components/page/draftPicker";

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path="/teampick" element={<TeamPicker />} />
        <Route path="/draftpick" element={<DraftPicker />} />
      </Routes>
    </>
  );
}

export default App;

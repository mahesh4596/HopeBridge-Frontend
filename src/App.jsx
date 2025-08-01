import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Signup from './Signup';
import NeedyProfileRegistration from './NeedyProfile';
import NeedyDashboard from './NeedyDashboard';
import NeedyList from './NeedyList';
import DonorDashboard from './DonorDashboard';
import AvailMed from './AvailMed';
import ListedMed from './ListedMed';
import DonorDetails from './donordetails';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* All Routes - No authentication required */}
      <Route path="/needy/register" element={<NeedyProfileRegistration />} />
      <Route path="/donor/signup" element={<DonorDetails />} />
      <Route path="/needy/dashboard" element={<NeedyDashboard />} />
      <Route path="/needy/list" element={<NeedyList />} />
      <Route path="/donor/dashboard" element={<DonorDashboard />} />
      <Route path="/donate/medicine" element={<AvailMed />} />
      <Route path="/listed-medicines" element={<ListedMed />} />
    </Routes>
  );
}

export default App;

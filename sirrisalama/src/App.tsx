import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import StaffLayout from './components/StaffLayout'
import Landing from './pages/Landing'
import Report from './pages/Report'
import WeCare from './pages/WeCare'
import Follow from './pages/Follow'
import Support from './pages/Support'
import Ussd from './pages/Ussd'
export default function App() {
  return (
    <Routes>
      {/* Public site: what reporters see */}
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="report" element={<Report />} />
        <Route path="follow" element={<Follow />} />
        <Route path="support" element={<Support />} />
        <Route path="ussd" element={<Ussd />} />
      </Route>
      {/* Responder area: separate address, separate layout, sign-in required */}
      <Route path="responders" element={<StaffLayout />}>
        <Route index element={<WeCare />} />
      </Route>
      {/* The old /wecare address and anything unknown go back to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

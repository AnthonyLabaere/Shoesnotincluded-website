import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './gui/components/footer'
import Navbar from './gui/components/navbar'

import Contact from './gui/screens/Contact';
import Home from './gui/screens/Home';
import LegalNotices from './gui/screens/LegalNotices';
import CGUCGV from './gui/screens/CGUCGV';
import PrivacyPolicy from './gui/screens/PrivacyPolicy';
import RedirectionError from './gui/screens/RedirectionError';
import Scenarios from './gui/screens/Scenarios';
import Scenario from './gui/screens/Scenario';
import WhatIsThat from './gui/screens/WhatIsThat';
import Prices from './gui/screens/Prices';
import Cookies from './gui/screens/Cookies';
import Account from './gui/screens/Account';
import Payment from './gui/screens/Payment';
import FAQ from './gui/screens/FAQ';
import TheyTalkAboutUs from './gui/screens/TheyTalkAboutUs';
import TeamBuilding from './gui/screens/TeamBuilding';
import CardValidation from './gui/screens/CardValidation';

import { GlobalStyles } from './style/global'
import { theme } from './style/theme'

const App: React.VoidFunctionComponent = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <GlobalStyles />

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/scenario/*" element={<Scenario />} />
            <Route path="/enquoicaconsiste" element={<WhatIsThat />} />
            <Route path="/tarif" element={<Prices />} />
            <Route path="/team-building" element={<TeamBuilding />} />
            <Route path="/mentions-legales" element={<LegalNotices />} />
            <Route path="/cgu-cgv" element={<CGUCGV />} />
            <Route path="/confidentialite" element={<PrivacyPolicy />} />
            <Route path="/join/*" element={<RedirectionError />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/compte" element={<Account />} />
            <Route path="/achat" element={<Payment />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ils-parlent-de-nous" element={<TheyTalkAboutUs />} />
            <Route path="/validation-carte" element={<CardValidation />} />
          </Routes>
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App

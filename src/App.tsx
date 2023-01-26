import './style/bootstrap.scss';
import 'react-toastify/dist/ReactToastify.css';

import React, { ReactElement, Suspense, useState } from 'react';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import * as Constants from './constants';
import CookiesBanner from './gui/components/CookiesBanner';
import Footer from './gui/components/footer';
import Loading from './gui/components/Loading';
import Navbar from './gui/components/navbar';
import ScrollToTop from './gui/components/ScrollToTop';
import Account from './gui/screens/Account';
import CheapEscapeGame from './gui/screens/Blog/CheapEscapeGame';
import DifferencesPaperChaseEscapeGame from './gui/screens/Blog/DifferencesPaperChaseEscapeGame';
import DiscoverNantesMobileEscapeGame from './gui/screens/Blog/DiscoverNantesMobileEscapeGame';
import EscapeGameOrigins from './gui/screens/Blog/EscapeGameOrigins';
import ETourism from './gui/screens/Blog/ETourism';
import MobileEscapeGame from './gui/screens/Blog/MobileEscapeGame';
import OutdoorEscapeGame from './gui/screens/Blog/OutdoorEscapeGame';
import TopReasonsToTryEscapeGame from './gui/screens/Blog/TopReasonsToTryEscapeGame';
import TopReasonsToTryMobileEscapeGame from './gui/screens/Blog/TopReasonsToTryMobileEscapeGame';
import TopReasonsToTryOutdoorEscapeGame from './gui/screens/Blog/TopReasonsToTryOutdoorEscapeGame';
import WhatIsAnEscapeGame from './gui/screens/Blog/WhatIsAnEscapeGame';
import CardValidation from './gui/screens/CardValidation';
import CGUCGV from './gui/screens/CGUCGV';
import Contact from './gui/screens/Contact';
import Cookies from './gui/screens/Cookies';
import FAQ from './gui/screens/FAQ';
import Home from './gui/screens/Home';
import LegalNotices from './gui/screens/LegalNotices';
import Payment from './gui/screens/Payment';
import Prices from './gui/screens/Prices';
import PrivacyPolicy from './gui/screens/PrivacyPolicy';
import RedirectionError from './gui/screens/RedirectionError';
import Scenario from './gui/screens/Scenario';
import Scenarios from './gui/screens/Scenarios';
import TeamBuilding from './gui/screens/TeamBuilding';
import TheyTalkAboutUs from './gui/screens/TheyTalkAboutUs';
import WhatIsThat from './gui/screens/WhatIsThat';
import i18n from './i18n';
import LocaleContext from './LocaleContext';
import ReactGAPageView from './ReactGAPageView';
import { GlobalStyles } from './style/global';
import { theme } from './style/theme';

const App = (): ReactElement => {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', () => {
    setLocale(i18n.language);
  });

  ReactGA.initialize(Constants.GA_TRACKING_ID);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocaleContext.Provider value={{ locale, setLocale }}>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <GlobalStyles />

              <Navbar />
              <ReactGAPageView />

              <ScrollToTop />

              <Helmet>
                <title>Escape Game sur Mobile en plein air - ShoesNotIncluded</title>
                <meta
                  name="description"
                  content="ShoesNotIncluded est une application mobile d'escape game en plein air, multijoueur, pour les particuliers ou les entreprises recherchant un team building."
                />
              </Helmet>

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
                {/* Pages du "blog" */}
                <Route path="/escape-game" element={<WhatIsAnEscapeGame />} />
                <Route path="/origine-escape-game" element={<EscapeGameOrigins />} />
                <Route path="/escape-game-mobile" element={<MobileEscapeGame />} />
                <Route path="/escape-game-pas-cher" element={<CheapEscapeGame />} />
                <Route path="/e-tourisme" element={<ETourism />} />
                <Route
                  path="/difference-jeu-de-piste-escape-game"
                  element={<DifferencesPaperChaseEscapeGame />}
                />
                <Route path="/escape-game-plein-air" element={<OutdoorEscapeGame />} />
                <Route
                  path="/10-raisons-de-faire-escape-game"
                  element={<TopReasonsToTryEscapeGame />}
                />
                <Route
                  path="/10-raisons-de-faire-escape-game-mobile"
                  element={<TopReasonsToTryMobileEscapeGame />}
                />
                <Route
                  path="/10-raisons-de-faire-escape-game-plein-air"
                  element={<TopReasonsToTryOutdoorEscapeGame />}
                />

                <Route
                  path="/decouvrir-nantes-escape-game-mobile"
                  element={<DiscoverNantesMobileEscapeGame />}
                />
              </Routes>

              <ToastContainer />

              <Footer />

              <CookiesBanner />
            </BrowserRouter>
          </Suspense>
        </LocaleContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;

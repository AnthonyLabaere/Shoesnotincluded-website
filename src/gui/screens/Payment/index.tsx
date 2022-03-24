import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import * as Constants from "../../../constants";
import * as StripeFirestore from "../../../firebase/firestore/stripeFirestore";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { ContentContainer, StyledLink } from '../../components/common'
import Button from '../../components/button'
import Checkbox from '../../components/Checkbox'
import Marginer from '../../components/marginer'
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer'

const PaymentText = styled.h3`
  text-align: left;
`;

const Payment = () => {
  const { userAuth } = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [checkoutSessionId, setCheckoutSessionId] = useState<string>();
  const [stripeUrl, setStripeUrl] = useState<string>();

  const createPayment = () => {
    if (userAuth !== undefined && userAuth !== null) {
      StripeFirestore.createPayment(userAuth.uid, setCheckoutSessionId);
    }
  };

  useEffect(() => {
    if (userAuth !== undefined && userAuth !== null && checkoutSessionId !== undefined) {
      const unsubscribe = StripeFirestore.subscribeToCheckoutSession(userAuth.uid, checkoutSessionId, checkoutSessionTmp => {
        if (checkoutSessionTmp !== undefined && checkoutSessionTmp.url !== undefined) {
          setCheckoutSessionId(undefined);
          setStripeUrl(checkoutSessionTmp.url);
        }
      });

      return unsubscribe;
    }
  }, [checkoutSessionId]);

  useEffect(() => {
    if (stripeUrl !== undefined) {
      console.log(stripeUrl);
      // Redirection vers stripe
      window.location.href = stripeUrl;
    }
  }, [stripeUrl]);

  const [consent, setConsent] = useState(false);
  const [tryWithoutConsent, setTryWithoutConsent] = useState(false);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Achat d'une partie</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <ContentContainer>
            <Marginer direction="vertical" margin="2em" />
            <PaymentText>
              Cet achat vous donnera accès à un bon pour une partie ShoesNotIncluded.
              <ul>
                <li>Compatible avec tous les scénarios.</li>
                <li>Permet de jouer jusqu'à 5 joueurs simultanés.</li>
                <li>Peut être utilisé pour soi ou offert en cadeau 🎁.</li>
                <li>N'a pas de date de fin de validité 📆.</li>
                <li>10% de réduction par rapport à un achat sur l'application mobile.</li>
              </ul>
            </PaymentText>
            <PaymentText>
              <Checkbox id="consent" label={<>J'accepte les <StyledLink to="/cgu-cgv">conditions générales de ventes</StyledLink></>} value={consent} onChange={setConsent} />
            </PaymentText>
            {/* <Link style={{ display: 'flex', flex: 1 }} to="/achat"><Button style={{ flex: 1 }}>Je souhaite acheter un bon pour une partie</Button></Link> */}
            <div style={{ display: 'flex', flex: 1 }}>
              <Button style={{ flex: 1 }} disabled={loading} onClick={() => {
                if (consent) {
                  setTryWithoutConsent(false);
                  setLoading(true);
                  createPayment();
                } else {
                  setTryWithoutConsent(true);
                }
              }} >
                {
                  !loading ?
                    "Acheter un bon pour une partie à " + Constants.WEBSITE_GAME_COST
                    : "Redirection vers le site partenaire en cours, merci de patienter..."
                }
              </Button>
            </div>
            {
              tryWithoutConsent && <PaymentText style={{ color: Constants.THEME_RED_COLORS[0] }}>
                Veuillez accepter les conditions générales de vente.
              </PaymentText>
            }
          </ContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Payment

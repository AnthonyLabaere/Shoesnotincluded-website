import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import * as Constants from "../../../constants";
import * as StripeFirestore from "../../../firebase/firestore/stripeFirestore";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { ContentContainer, StyledLink } from '../../components/common';
import Button from '../../components/button';
import Checkbox from '../../components/Checkbox';
import Marginer from '../../components/marginer';
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer';

const PaymentText = styled.h3`
  text-align: left;
`;

const Payment = () => {
  const navigate = useNavigate();

  const { userAuth } = useCurrentUser();

  useEffect(() => {
    if (userAuth === null) {
      navigate("../compte", { replace: true, state: { fromPayment: true } });
    }
  }, [userAuth]);

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
      // Redirection vers stripe
      window.location.href = stripeUrl;
    }
  }, [stripeUrl]);

  const [consent, setConsent] = useState(false);
  const [tryWithoutVerifiedUser, setTryWithoutVerifiedUser] = useState(false);
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
                <li>Prix réduit de 10% par rapport à un achat sur l'application mobile.</li>
              </ul>
              ❗ Attention, ce bon d'achat est uniquement activable sur <u>Android</u>. La politique de vente d'Apple ne nous permet pas de vous faire profiter de cette réduction.
            </PaymentText>
            <PaymentText>
              <Checkbox id="consent" label={<>J'accepte les <StyledLink to="/cgu-cgv">conditions générales de ventes</StyledLink></>} value={consent} onChange={setConsent} />
            </PaymentText>
            <div style={{ display: 'flex', flex: 1 }}>
              <Button style={{ flex: 1 }} disabled={userAuth === undefined || userAuth === null || loading} onClick={() => {
                if (userAuth !== undefined && userAuth !== null) {
                  if (userAuth.emailVerified === false) {
                    setTryWithoutVerifiedUser(true);
                  } else {
                    setTryWithoutVerifiedUser(false);
                    if (consent) {
                      setTryWithoutConsent(false);
                      setLoading(true);
                      createPayment();
                    } else {
                      setTryWithoutConsent(true);
                    }
                  }
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
              tryWithoutVerifiedUser && <PaymentText style={{ color: Constants.THEME_RED_COLORS[0] }}>
                Veuillez terminer votre inscription en cliquant sur le lien fourni par mail, puis rafraîchissez la page.
              </PaymentText>
            }
            {
              tryWithoutConsent && <PaymentText style={{ color: Constants.THEME_RED_COLORS[0] }}>
                Veuillez accepter les conditions générales de vente.
              </PaymentText>
            }
            <PaymentText>
              Pour utiliser le bon d'achat, veuillez vous référer à la section "Comment utiliser un bon d'achat ?" de la <StyledLink to="/faq">FAQ</StyledLink>.<br />
            </PaymentText>
            <i>Précision : les bons d'achat ne sont pour l'instant pas visibles dans l'historique de l'application mobile.</i>
          </ContentContainer>
        </ContentPageContainer>
      </InnerPageContainer>
    </PageContainer>
  )
}

export default Payment

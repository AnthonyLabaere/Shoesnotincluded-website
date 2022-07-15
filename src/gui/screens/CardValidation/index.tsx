import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Button from '../../components/button';
import styled from 'styled-components';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';

import * as Constants from '../../../constants';
import useCurrentUser from "../../../hooks/useCurrentUser";
import * as FirebaseFunctions from '../../../firebase/functions';
import { ContentContainer, StyledALink } from '../../components/common';
import Marginer from '../../components/marginer';
import { ContentPageContainer, InnerPageContainer, PageContainer } from '../../components/pageContainer';
import Modal from '../../components/Modal';
import * as NotificationUtils from "../../../utils/notificationUtils";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  width: 50%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    width: 100%;
    text-align: center;
  }
`;

export const Label = styled.label`
  font-size: 1.5em;
`;

export const Input = styled.input`
    width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(200, 200, 200, 0.03);
    padding: 0 10px;
    transition: all, 200ms ease-in-out;
    box-sizing: border-box;
    border-bottom: 1.4px solid rgba(200, 200, 200, 0.4);

    &::placeholder {
        color: rgba(170, 170, 170, 1);
    }

    &:focus {
        outline: none;
        border-bottom: ${({ theme }) => ("2px solid " + theme.linkHoverColor)};
    }
`;

export const ErrorMessage = styled.div`
  font-weight: bold;
  color: ${Constants.THEME_RED_COLORS[0]};
  margin-top: 5px;
  min-height: 20px;
`;

const ModalTextLine = styled.div`
  font-size: 1.25em;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
`;


const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    flex-direction: column;
  }
`;

const ModalButton = styled(Button)`
  flex: 1;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    width: 100%;
  }
`;


const CardValidation = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: Constants.DEVICE_SIZES.tablet });

  const validate = (values: { voucherCardId?: string, validationCode?: string }) => {
    const errors: { voucherCardId?: string, validationCode?: string } = {};
    if (!values.voucherCardId) {
      errors.voucherCardId = 'Champ requis';
    }

    if (!values.validationCode) {
      errors.validationCode = 'Champ requis';
    }
    return errors;
  }

  const [voucherId, setVoucherId] = useState<undefined | string>();

  const formik = useFormik({
    initialValues: {
      voucherCardId: '',
      validationCode: ''
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      FirebaseFunctions.consumeVoucherCard(values.voucherCardId, values.validationCode, (voucherId) => {
        setSubmitting(false);
        setVoucherId(voucherId);
      }, () => setSubmitting(false));
    },
  });

  const { userAuth } = useCurrentUser();

  useEffect(() => {
    if (userAuth === null) {
      navigate("../compte", { replace: true, state: { fromCardValidation: true } });
    }
  }, [userAuth]);

  const [redirectToAccount, setRedirectToAccount] = useState(false);

  useEffect(() => {
    if (redirectToAccount === true && voucherId !== undefined) {
      setRedirectToAccount(false);
      setVoucherId(undefined);

      navigate("../compte", { state: { voucherId: voucherId } });
    }
  }, [redirectToAccount, voucherId]);

  return (
    <PageContainer>
      <InnerPageContainer>
        <ContentPageContainer coloredBackground>
          <ContentContainer>
            <h1>Validation d'une carte de bon pour une partie</h1>
          </ContentContainer>
        </ContentPageContainer>
        <ContentPageContainer>
          <Form onSubmit={formik.handleSubmit}>
            <InputContainer>
              {/* TODO : mettre une infobulle (avec un point d'interrogation visible à droite et clickable ?) avec une image pour expliquer où est l'identifiant de la carte */}
              <Label htmlFor="voucherCardId">Identifiant de la carte</Label>
              <Input id="voucherCardId" type="text" {...formik.getFieldProps('voucherCardId')} />
              <ErrorMessage>{formik.touched.voucherCardId && formik.errors.voucherCardId ? formik.errors.voucherCardId : ""}</ErrorMessage>
            </InputContainer>

            <InputContainer>
              {/* TODO : mettre une infobulle (avec un point d'interrogation visible à droite et clickable ?) avec une image pour expliquer où est le code de validation */}
              <Label htmlFor="validationCode">Code de validation</Label>
              <Input id="validationCode" type="text" {...formik.getFieldProps('validationCode')} minLength={4} maxLength={4} />
              <ErrorMessage>{formik.touched.validationCode && formik.errors.validationCode ? formik.errors.validationCode : ""}</ErrorMessage>
            </InputContainer>

            <Button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? "Validation en cours..." : "Valider ma carte"}</Button>
          </Form>
          <Marginer direction="vertical" margin="2em" />
        </ContentPageContainer>
      </InnerPageContainer>

      <Modal
        isOpen={voucherId !== undefined}
        onClose={() => {
          setRedirectToAccount(true);
        }}
        contentLabel="Confirmation de validation">
        <h2>Confirmation de validation</h2>
        <ModalTextLine>Votre carte a été validée.</ModalTextLine>
        <div style={{ cursor: 'pointer' }} onClick={() => {
          navigator.clipboard.writeText(voucherId as string);
          NotificationUtils.handleMessage(`Bon d'achat ${(voucherId as string).substring(0, 3)}... copié dans le presse-papier.`);
        }}>
          <ModalTextLine style={{ display: isMobile ? 'block' : 'flex' }}><FontAwesomeIcon style={{ marginRight: 5 }} icon={faCopy} size="1x" />Votre bon d'achat est le {voucherId}.</ModalTextLine>
        </div>
        <ModalTextLine style={{ fontStyle: "italic" }}>
          Pour l'utiliser :<br />
          1 - Ouvrez l'application ShoesNotIncluded (ou téléchargez-là au préalable sur les stores <StyledALink href={Constants.PLAY_STORE_LINK}>Android</StyledALink> ou <StyledALink href={Constants.APPLE_STORE_LINK}>Apple</StyledALink>).<br />
          2 - Sélectionnez un scénario (exemple : Le testament d'Anne de Bretagne)<br />
          3 - Cliquez sur "Utiliser un bon d'achat"<br />
          4 - Renseignez le code du bon d'achat obtenu lors du paiement.<br />
        </ModalTextLine>
        <ModalTextLine style={{ marginTop: 25 }}>Un mail récapitulatif a été envoyé à l'adresse mail associée à votre compte.</ModalTextLine>
        <ModalButtonsContainer>
          <ModalButton onClick={() => setRedirectToAccount(true)}>Bien compris !</ModalButton>
        </ModalButtonsContainer>
      </Modal>

    </PageContainer >
  )
}

export default CardValidation

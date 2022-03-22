// Create our number formatter.
const AMOUNT_FORMATTER = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const getPaymentStatusLabel = (statusCode: string): string => {
  // cf https://stripe.com/docs/api/payment_intents/object
  // requires_payment_method, requires_confirmation, requires_action, processing, requires_capture, canceled, or succeeded
  if (statusCode === 'succeeded') {
    return "Validé";
  }

  switch (statusCode) {
    case 'requires_payment_method':
    case 'requires_confirmation':
    case 'requires_action':
    case 'requires_capture':
      return "Inconnu"
    case 'canceled':
      return "Annulé"
    case "succeeded":
      return "Confirmé";
    default:
      return "Inconnu"
  }

}

export const getPaymentAmount = (amount: number): string => {
  // Montant en centimes
  return AMOUNT_FORMATTER.format(amount / 100); /* $2,500.00 */
}

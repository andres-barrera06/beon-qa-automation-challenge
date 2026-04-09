export const CheckoutSelectors = {
  FIRST_NAME_INPUT: '[data-test="firstName"]',
  LAST_NAME_INPUT: '[data-test="lastName"]',
  ZIP_CODE_INPUT: '[data-test="postalCode"]',
  CONTINUE_BUTTON: '[data-test="continue"]',
  FINISH_BUTTON: '[data-test="finish"]',
  SUCCESS_MESSAGE: '[data-test="complete-header"]',
  SUMMARY_TOTAL: '[data-test="total-label"]',
} as const;

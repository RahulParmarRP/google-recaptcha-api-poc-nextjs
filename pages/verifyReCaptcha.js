export const verifyReCaptcha = async (reCaptchaToken) => {
  let verified = false;

  const queryParams = new URLSearchParams({
    secret: "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe",
    response: reCaptchaToken
  });

  const apiUrlWithParams = `${"https://www.google.com/recaptcha/api/siteverify"}?${queryParams.toString()}`;

  try {
    const res = await fetchWrapper({
      instance: "reCaptchaVerifyInstance",
      method: "POST",
      url: apiUrlWithParams
    });

    verified = Boolean(res?.success) || false;

    if (res?.success && res["error-codes"]) {
      const errorCodes = res["error-codes"].toString();
      info({
        moduleName: "verifyReCaptcha",
        message: `Failed to verify Google ReCaptcha token: ${errorCodes}`,
        errorMessage: errorCodes
      });
    }
  } catch (err) {
    error({
      moduleName: "verifyReCaptcha",
      message: "Failed to verify Google ReCaptcha token",
      requestPath: queryParams,
      errorMessage: err?.message,
      errorStack: err
    });
  }

  return verified;
};

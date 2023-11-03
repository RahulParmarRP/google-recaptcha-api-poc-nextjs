export default async function clientSideVerify(captchaCode) {
  const requestOptions = {
    method: "post"
  };

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?response=${captchaCode}&secret=${"6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"}`,
    requestOptions
  );

  const t = response.json();
  console.log(t);
}

export default async function serverSideVerify(captchaCode) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reCaptchaToken: captchaCode })
  };

  // fetch("http://localhost:3000/api/verify-captcha", requestOptions)
  fetch("http://localhost:3000/api/verify-captcha", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data?.verified); // true or false
      if (data?.verified) {
        alert("captcha verified");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

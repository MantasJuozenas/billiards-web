export const checkOS = () => {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let res = {
    web: false,
    mobileWin: false,
    mobileAndroid: false,
    mobileShittyIos: false
  };

  if (/windows phone/i.test(userAgent)) {
    res = { ...res, mobileWin: true };
    return res;
  }

  if (/android/i.test(userAgent)) {
    res = { ...res, mobileAndroid: true };
    return res;
  }
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    res = { ...res, mobileShittyIos: true };
    return res;
  }

  res = { ...res, web: true };
  return res;
};

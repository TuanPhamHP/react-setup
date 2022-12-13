import { crypt, decrypt } from './FormatnParse';

export const setCookie = (
  cName,
  cValue,
  expDays = 30,
  shouldCrypt = false,
  sameSite = 'Lax'
) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    const storedVal = shouldCrypt ? crypt('', cValue) : cValue;
    document.cookie =
      cName +
      '=' +
      storedVal +
      `; SameSite=${sameSite}; ` +
      expires +
      '; path=/';
  } catch (error) {
    console.error(
      'Error when try to set a cookie via helper: setCookie:',
      error
    );
  }
};
export const getCookie = (cName, shouldDecrypt = false) => {
  try {
    const name = cName + '=';
    const cDecoded = decodeURIComponent(document.cookie); // to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return shouldDecrypt ? decrypt('', res) : res;
  } catch (error) {
    console.error(
      'Error when try to get a cookie via helper: getCookie:',
      error
    );
  }
};
export const deleteCookie = (cName) => {
  try {
    const expires = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
    document.cookie = cName + '=; ' + expires + '; path=/';
  } catch (error) {
    console.error(
      'Error when try to delete a cookie via helper: deleteCookie:',
      error
    );
  }
};
// export default { setCookie, getCookie, deleteCookie }

import { parsePhoneNumberFromString } from "libphonenumber-js";

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  return !phoneNumber ? value : phoneNumber.formatInternational();
};

export default normalizePhoneNumber;

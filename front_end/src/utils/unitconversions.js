const convertCentimetersToFeet = (cm) => {
  const cmToInches = cm / 2.54;
  const inchesToFeetAndInches = {
    feet: Math.floor(cmToInches / 12),
    inches: cmToInches % 12,
  };

  return `${inchesToFeetAndInches.feet} ' ${Math.floor(inchesToFeetAndInches.inches)}`;
};

const convertCentimeteresToMeters = (cm) => {
  return cm / 100;
};

const convertImperialPoundsToMetricKilos = (pounds) => {
  return pounds / 2.20462262;
};

export { convertCentimetersToFeet, convertCentimeteresToMeters };

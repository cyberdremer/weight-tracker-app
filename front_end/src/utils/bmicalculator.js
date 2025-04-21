const calulateBMIUsingMetric = (heightM, weightK) => {
  return heightM / weightK ** 2;
};

const calculateBMIUsingImperial = (heightInInches, weightP) => {
  const imperialBMIConstant = 703;
  return imperialBMIConstant * (weightP / heightInInches ** 2);
};

export { calculateBMIUsingImperial, calculateBMIUsingImperial };




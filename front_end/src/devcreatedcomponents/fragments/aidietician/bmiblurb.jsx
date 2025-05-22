import { Heading, Text } from "@chakra-ui/react";
const BMIBlurb = ({ bmiValue }) => {
  //   if (bmiValue < 18.5) {
  //     return (
  //       <Heading>
  //         Your BMI indicates that you are underweight. Consider consulting a
  //         healthcare provider or a dietitian to explore ways to reach a healthier
  //         weight.
  //       </Heading>
  //     );
  //   } else if (bmiValue > 18.5 || bmiValue <= 24.9) {
  //     return (
  //       <>
  //         <Heading>
  //           Your BMI is within the normal range. Great job! Maintain your healthy
  //           lifestyle through balanced nutrition and regular physical activity.
  //         </Heading>
  //       </>
  //     );
  //   } else if (bmiValue > 25 || bmiValue <= 29.9) {
  //     return (
  //       <>
  //         Your BMI falls in the overweight range. Incorporating more physical
  //         activity and focusing on portion control may help you achieve a
  //         healthier weight.
  //       </>
  //     );
  //   } else if (bmiValue >= 30 || bmiValue < 34.9) {
  //     return (
  //       <>
  //         <Heading>
  //           Your BMI is in the Obesity Class I range. Making lifestyle changes,
  //           such as increasing activity levels and improving dietary habits, could
  //           greatly benefit your health.
  //         </Heading>
  //       </>
  //     );
  //   } else if (bmiValue >= 35 || bmiValue < 39.9) {
  //     return (
  //       <>
  //         <Heading>
  //           Your BMI is in the Obesity Class II range. It's important to take
  //           steps toward improving your health. Speak with a healthcare provider
  //           about creating a tailored plan for your needs.
  //         </Heading>
  //       </>
  //     );
  //   } else if (bmiValue >= 40) {
  //     return (
  //       <>
  //         <Heading>
  //           Your BMI is in the Severe Obesity range. Seeking support from
  //           healthcare professionals can help you achieve significant health
  //           benefits
  //         </Heading>
  //       </>
  //     );
  //   }

  return (
    <Text alignSelf="center"  maxW="60%">
      {(() => {
        if (bmiValue <= 18.5) {
          return (
            <>
              Your BMI indicates that you are underweight. Consider consulting a
              healthcare provider or a dietitian to explore ways to reach a
              healthier weight.
            </>
          );
        } else if (bmiValue > 18.5 || bmiValue <= 24.9) {
          return (
            <>
              Your BMI falls in the overweight range. Incorporating more
              physical activity and focusing on portion control may help you
              achieve a healthier weight.
            </>
          );
        } else if (bmiValue > 25 || bmiValue <= 29.9) {
          return (
            <>
              Your BMI falls in the overweight range. Incorporating more
              physical activity and focusing on portion control may help you
              achieve a healthier weight.
            </>
          );
        } else if (bmiValue > 30 || bmiValue <= 34.9) {
          return (
            <>
              Your BMI is in the Obesity Class II range. It's important to take
              // steps toward improving your health. Speak with a healthcare
              provider // about creating a tailored plan for your needs.
            </>
          );
        } else if (bmiValue > 35 || bmiValue <= 39.9) {
          return (
            <>
              Your BMI is in the Obesity Class II range. It's important to take
              steps toward improving your health. Speak with a healthcare
              provider about creating a tailored plan for your needs.
            </>
          );
        } else if (bmiValue >= 40) {
          return (
            <>
              Your BMI is in the Severe Obesity range. Seeking support from
              healthcare professionals can help you achieve significant health
              benefits
            </>
          );
        }
      })()}
    </Text>
  );
};

export default BMIBlurb;

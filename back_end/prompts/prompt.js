

const userDietPrompt = (
  currWeight,
  weightGoal,
  dietaryRestriction,
  height,
  isImperial
) => {
  return `Create a diet plan for someone based on the text below.
    Text: """
    Current Weight: ${currWeight}
    Weight Goal: ${weightGoal}
    Dietary Restrictions: ${dietaryRestriction}
    Height: ${height + (isImperial === true ? "in" : "cm")}
    

    """

    The response must be in JSON format which is an array of objects. The parent element will be named plan.
    The objects in the array will contain elements called breakfast, lunch, dinner and exercise. The array will be of length 7.
    
    `;
};

// TODO change the unit based on isImperial field on user.
module.exports = userDietPrompt;

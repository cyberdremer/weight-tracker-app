import DashboardHeader from "../fragments/dashboard/dashboardheader";
import { Flex, HStack, VStack, Box, Button, Heading } from "@chakra-ui/react";
import AiDieticianForm from "../fragments/aidietician/aidieticianform";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { SuccessAlert, ErrorAlert } from "../alerts/alert";
import { protectedPostRequestJSON } from "@/utils/requests";
import AiDieticianResponseContainer from "../fragments/aidietician/aidieticianresponsecontainer";
const env = import.meta.env.VITE_ENV;
const prodTimer = import.meta.env.VITE_PROD_ALERT_TIMER;
const devTimer = import.meta.env.VITE_DEV_ALERT_TIMER;
const timer = env === "dev" ? devTimer : prodTimer;;


const mockResponse = [
  {
    breakfast:
      "Oatmeal made with ½ cup rolled oats, 1 cup unsweetened almond milk, topped with ½ cup mixed berries and 1 tbsp chopped walnuts",
    lunch:
      "Grilled chicken breast (4 oz) salad with mixed greens, cherry tomatoes, cucumber, 1 tbsp olive oil & vinegar dressing",
    dinner: "Baked salmon (4 oz) with ½ cup quinoa and steamed asparagus",
    exercise:
      "30-minute brisk walk + 10 minutes of bodyweight squats and lunges",
  },
  {
    breakfast:
      "2 scrambled eggs with spinach and mushrooms, 1 slice whole-grain toast",
    lunch:
      "Quinoa bowl with ½ cup cooked quinoa, black beans (¼ cup), roasted bell peppers, avocado slices (¼ avocado)",
    dinner: "Turkey meatballs (4 oz) with zucchini noodles and marinara sauce",
    exercise:
      "25-minute interval jog (run/walk) + 5-minute core (planks and mountain climbers)",
  },
  {
    breakfast:
      "Greek yogurt (5 oz) with 1 tbsp honey, 2 tbsp granola and sliced banana",
    lunch:
      "Whole-grain wrap with tuna (canned in water, drained), mixed greens, shredded carrots, 1 tsp light mayo",
    dinner: "Stir-fry tofu (4 oz) and mixed vegetables over ½ cup brown rice",
    exercise:
      "30-minute cycling (outdoor or stationary) + 5 minutes stretching",
  },
  {
    breakfast:
      "Smoothie: 1 cup baby spinach, 1 cup unsweetened almond milk, ½ cup frozen berries, 1 scoop protein powder",
    lunch:
      "Lentil soup (1 bowl) with side salad (mixed greens, cherry tomatoes, balsamic)",
    dinner:
      "Grilled shrimp (4 oz) skewers with ½ cup couscous and roasted Brussels sprouts",
    exercise:
      "20-minute HIIT (bodyweight exercises) + 10-minute yoga stretches",
  },
  {
    breakfast: "2-egg veggie omelet (peppers, onions, tomatoes), 1 small apple",
    lunch:
      "Chicken and avocado salad: shredded chicken (4 oz), mixed greens, avocado (¼), lemon juice",
    dinner:
      "Beef stir-fry (4 oz lean beef) with broccoli, snap peas over ½ cup cauliflower rice",
    exercise: "40-minute moderate swim or aqua aerobics",
  },
  {
    breakfast:
      "Chia pudding (3 tbsp chia seeds soaked in 1 cup unsweetened almond milk) topped with kiwi slices",
    lunch:
      "Whole-grain pita with hummus (2 tbsp), grilled veggies (zucchini, eggplant)",
    dinner: "Baked cod (4 oz) with sweet potato (½ medium) and green beans",
    exercise: "30-minute power walk + 10 minutes resistance band exercises",
  },
  {
    breakfast:
      "Whole-grain English muffin with 1 tbsp natural peanut butter and sliced strawberries",
    lunch: "Turkey chili (1 bowl) with kidney beans, tomatoes, bell peppers",
    dinner:
      "Grilled chicken fajitas (4 oz chicken, peppers, onions) in lettuce wraps",
    exercise: "Restorative yoga or gentle stretching for 30 minutes",
  },
];

const AiDietician = () => {
  const [error, setError] = useState({
    message: "",
    occurred: false,
  });
  const [success, setSuccess] = useState({
    message: "",
    occurred: false,
  });
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    goal: "",
    diet: "",
  });

  const [select, setSelect] = useState({ goal: "", diet: "" });
  const handleDietSelect = (e) => {
    setSelect({ ...select, diet: e.value });
    setForm({ ...form, diet: e.value[0] });
  };

  const handleGoalSelect = (e) => {
    setSelect({ ...select, goal: e.value });
    setForm({ ...form, goal: e.value[0] });
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      if (!data && data.length === 0 && !mockResponse) {
        throw new Error("No diet data to download!");
      }
      
      setSuccess({
        message: "PDF downloaded succesfully!",
        occurred: true,
      });
      setTimeout(() => {
        setSuccess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });

      setTimeout(() => {
        setError({
          message: "",
          ocurred: false,
        });
      }, timer);
    }
  };
  const handleSaveToAccount = async (e) => {
    e.preventDefault();
    try {
      // if (!data || data.length === 0) {
      //   throw new Error("No diet data to save!");
      // }
      const response = await protectedPostRequestJSON("/dietician/savediet", mockResponse);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSuceess({
        message: response.data.message,
        occurred: true,
      });

      setTimeout(() => {
        setSucess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          occurred: false,
        });
        setTimeout(() => {
          setError({
            message: "",
            occurred: false,
          });
        }, timer);
      });
    }
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await postRequest("/aidietician", form);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setSucess({
        message: response.data.message,
        occurred: true,
      });
      setData(response.data.plan);
      setTimeout(() => {
        setSucess({
          message: "",
          occurred: false,
        });
      }, timer);
    } catch (error) {
      setError({
        message: error.message,
        occurred: true,
      });
      setTimeout(() => {
        setError({
          message: "",
          occurred: false,
        });
      }, timer);
    }
  };

  return (
    <>
      <Flex grow="1" direction="column" minH="100vh">
        <DashboardHeader></DashboardHeader>
        {error.occurred && <ErrorAlert message={error.message}></ErrorAlert>}
        {success.occurred && (
          <SuccessAlert message={success.message}></SuccessAlert>
        )}
        <HStack gap="5" margin="10">
          <AiDieticianForm
            diet={select.diet}
            goal={select.goal}
            handleDietSelect={handleDietSelect}
            handleGoalSelect={handleGoalSelect}
            handleGenerate={handleGenerate}
          ></AiDieticianForm>
          {/* TODO Add conditional rendering for when the user has not generated a diet yet. */}
          <AiDieticianResponseContainer
            response={mockResponse}
            handleDownload={handleDownload}
            handleSaveToAccount={handleSaveToAccount}
          ></AiDieticianResponseContainer>
        </HStack>
      </Flex>
    </>
  );
};

export default AiDietician;

import { ISantaFormProps } from "../types/SantaFormField.types";

/**
 * Lookup table for messages related to Santa.
 */
export const messagesLookUp = [
  {
    code: "1",
    message:
      "Hooray! Your message to Santa has been received. Get ready for some holiday magic! 🎄",
  },
  {
    code: "2",
    message:
      "Oops! It seems you are not registered. Make sure to enter the correct username to send your message to Santa.",
  },
  {
    code: "3",
    message:
      "Sorry, you're on the naughty list from this year! Only children under 10 years old are eligible to send messages to Santa! 🤫",
  },
];

/**
 * The configuration object for the Santa form.
 */
export const santaFormProps: ISantaFormProps = {
  id: {
    label: "Who are you?",
    errorMessages: {
      required: "Santa's gift list is long. Please tell Santa who you are.",
    },
    placeholder: "charlie.brown",
    type: "text",
  },
  message: {
    label: "What do you want for Christmas?",
    errorMessages: {
      required: "Oh? You don't want anything for Christmas?",
      maxLength:
        "Santa can just give you just enough. Please keep your message to 100 characters or less. Maybe next Christmas?",
    },
    placeholder: "gifts, gifts, gifts!",
    type: "as",
  },
};

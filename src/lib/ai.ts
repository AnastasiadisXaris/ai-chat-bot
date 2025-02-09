import { pipeline } from "@huggingface/transformers";

let model: any = null;

const initModel = async () => {
  if (!model) {
    model = await pipeline("text-generation", "gpt2");
  }
  return model;
};

export const generateAIResponse = async (message: string) => {
  try {
    const generator = await initModel();
    const response = await generator(message, {
      max_length: 100,
      temperature: 0.7,
      num_return_sequences: 1,
    });

    return response[0].generated_text;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Συγγνώμη, προέκυψε κάποιο σφάλμα.";
  }
};

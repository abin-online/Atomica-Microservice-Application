import dotenv from 'dotenv';
dotenv.config()

import { OpenAI } from "openai"; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const analyzeComplexityWithAI = async (code: string, retries = 3) => {
    const prompt = `Analyze the time and space complexity of the following code:
  
    \`\`\`
    ${code}
    \`\`\`
    
    Please provide the time complexity and space complexity in Big-O notation.`;
  
    let attempt = 0;
    while (attempt < retries) {
      try {
        const completion = await openai.completions.create({
          model: "gpt-3.5-turbo",
          prompt: prompt,
          max_tokens: 500,
          temperature: 0,
        });
  
        const response = completion.choices[0].text?.trim();
        return response || "Complexity analysis failed";
      } catch (error: any) {
        if (error.code === 'insufficient_quota' || error.status === 429) {
          console.log(`Rate limit exceeded. Retrying attempt ${attempt + 1}...`);
          attempt++;
          await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retry
        } else {
          console.error("Error analyzing code complexity: ", error);
          return "Error occurred during complexity analysis";
        }
      }
    }
  
    return "Exceeded retry attempts due to rate limit";
  };
  
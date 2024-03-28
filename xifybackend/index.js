import { OpenAI } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const chatModel = new ChatOpenAI({
  openAIApiKey: "",
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world class everything sex matters expert."],
    ["user", "{input}"],
  ]);

  const outputParser = new StringOutputParser();
  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

// const response = await chatModel.invoke("what is LangSmith?");
const response = await llmChain.invoke({
    input: "what is the best sex position?",
  });
console.log(response)


// import express from "express";
// import   bodyParser  from "body-parser";
// import cors from "cors"
// import { OpenAI } from "@langchain/openai";
// import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { StringOutputParser } from "@langchain/core/output_parsers";

// // Initialize Express app
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Use CORS with default options - this will allow all cross-origin requests
// app.use(cors());
// // Use bodyParser middleware for parsing JSON
// app.use(bodyParser.json());

// // Initialize ChatOpenAI with the provided API key
// const chatModel = new ChatOpenAI({
//   openAIApiKey: "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", // Make sure to replace with your actual API key
// });

// const prompt = ChatPromptTemplate.fromMessages([
//   ["system", "You are a world class everything sex matters expert."],
//   ["user", "{input}"],
// ]);

// const outputParser = new StringOutputParser();
// const llmChain = prompt.pipe(chatModel).pipe(outputParser);

// // Define POST endpoint for the model invocation
// app.post('/api/invoke', async (req, res) => {
//   try {
//     const { input } = req.body;

//     if (!input) {
//       return res.status(400).send({ error: 'Input is required' });
//     }

//     // Invoke the model with the input from the request
//     const response = await llmChain.invoke({ input });

//     // Send back the response
//     res.send({ response });
//   } catch (error) {
//     console.error('Error invoking model:', error);
//     res.status(500).send({ error: 'Failed to invoke model' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

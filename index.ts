import {
    ChatCompletionRequestMessage,
    ChatCompletionRequestMessageRoleEnum,
    Configuration,
    OpenAIApi,
  } from 'openai';
  import { load } from 'ts-dotenv';
  import * as readlineSync from 'readline-sync';
  
  
  type Message = {
    inputText: string;
    completionText: string;
  };
  
  const env = load({
    OPENAI_API_KEY: String,
  });
  
  const configuration = new Configuration({
    apiKey: env.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const CHAT_GPT_SYSTEM_PROMPT = '孫悟空になりきって回答して下さい。'; //①
  
  (async () => {
    const history: Message[] = [];
    while (true) {
      const userInput = readlineSync.question('何か聞きたいことはありますか？: '); //②
      const messages: Array<ChatCompletionRequestMessage> = [ //③
        {
          role: ChatCompletionRequestMessageRoleEnum.System, 
          content: CHAT_GPT_SYSTEM_PROMPT,
        },
      ];
      for (const message of history) { //④
        messages.push({
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: message.inputText,
        });
        messages.push({
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: message.completionText,
        });
      }
      messages.push({ role: 'user', content: userInput }); //⑤
      try {
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 256,
        });
        const completionText = completion.data.choices[0].message;
        console.log(completionText);
        if (completionText) {
          history.push({ //⑥
            inputText: userInput,
            completionText: completionText.toString(),
          });
        }
        const userInputAgain = readlineSync.question( //⑦
          '\nChatGPTとの会話を続けますか? (Y/N)'
        );
        if (userInputAgain.toUpperCase() === 'N') {
          return;
        } else if (userInputAgain.toUpperCase() !== 'Y') {
          console.log("不正な値です。'Y' か 'N'を入力してください。");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
  })();
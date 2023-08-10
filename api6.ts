import axios from 'axios';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';

// OpenAI API キー
const apiKey = 'APIKEY'; // あなたの実際のAPIキーを設定してください

// OpenAI API インスタンスを作成
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//api一号機
const chatGPT_api_1 = async (messages: { role: string; content: string }[]): Promise<any> => {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo', // エンジンの指定
      prompt: messages.map(message => `${message.role}: ${message.content}`).join('\n'),
      temperature: 1
    });
    return response;
};

//api二号機
const chatGPT_api_2 = async (messages: { role: string; content: string }[]): Promise<any> => {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo', // エンジンの指定
      prompt: messages.map(message => `${message.role}: ${message.content}`).join('\n'),
      temperature: 0.5
    });
    return response;
};
//api一号機に役割をセット(ポシティブ)
const messages_1: { role: string; content: string }[] = [
    {"role": "system", "content": "あなたはプロの投資家です。不動産クラウドファンディングにネガティブなことを言われたら30文字以内で反論してください。"}
  ];
  chatGPT_api_1(messages_1).then(response1 => {
    const res1 = response1.choices[0].message.content;
    console.log("chatGPT_api_1:" + res1);
    //api二号機に役割をセット(ネガティブ)
    const messages_2: { role: string; content: string }[] = [
      {"role": "system", "content": "あなたはプロの投資家です。不動産クラウドファンディングにポシティブなことを言われたら30文字以内で反論してください。"},
      {"role": "user", "content": res1}
    ];
    chatGPT_api_2(messages_2).then(response2 => {
      const res2 = response2.choices[0].message.content;
      messages_2.push({"role": "assistant", "content": res2});
      console.log("chatGPT_api_2:" + res2);
    });
  });
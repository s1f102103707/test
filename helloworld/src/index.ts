import 'esm';
//import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms';
//import { PromptTemplate } from 'langchain/prompts';
import { ConversationChain } from 'langchain/chains';

// dotenv の設定
import 'dotenv/config';

// export const run1 = async () => {
//   // LLMの準備
//   const llm = new OpenAI({ temperature: 0.9 });

//   // LLMの呼び出し
//   const res = await llm.call('コンピュータゲームを作る日本語の新会社名をを1つ提案してください');
//   console.log(res);
// };

// export const run = async () => {
//   // LLMの準備
//   const llm = new OpenAI({ temperature: 0.9 });

//   // プロンプトテンプレートの準備
//   const prompt = new PromptTemplate({
//     inputVariables: ['product'],
//     template: '{product}を作る日本語の新会社名をを1つ提案してください',
//   });

//   // チェーンの準備
//   const chain = new LLMChain({ llm, prompt });

//   // チェーンの実行
//   const res = await chain.call({ product: '家庭用ロボット' });
//   console.log(res['text']);
// };

export const run = async () => {
  // LLMの準備
  const llm = new OpenAI({ temperature: 0 });

  // ConversationChainの準備
  const chain = new ConversationChain({ llm });

  // 会話の実行
  const input1 = 'こんにちは!';
  const res1 = await chain.call({ input: input1 });
  console.log('Human:', input1);
  console.log('AI:', res1['response']);

  // 会話の実行
  const input2 = 'AIさんの好きな料理は？';
  const res2 = await chain.call({ input: input2 });
  console.log('Human:', input2);
  console.log('AI:', res2['response']);

  // 会話の実行
  const input3 = 'その料理の作り方は？';
  const res3 = await chain.call({ input: input3 });
  console.log('Human:', input3);
  console.log('AI:', res3['response']);
};
run();

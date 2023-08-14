import axios from 'axios';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';


const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = 'APIKEY'; // あなたの実際のAPIキーを設定してください

const count = 7; //ループ回数
let nowcount = 0;
let communicationhistory:any[] = [];//型の指定ができるようにany型を設定
communicationhistory.push('プログラマーの将来についてどう思いますか？');

function makeRequest() {
  let userInputContent = ''; // ユーザーの入力内容

  if (communicationhistory.length > 1) {
    userInputContent = communicationhistory.join('\n');
  }
//1号機
  const inputData = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'あなたはプログラマーの将来が明るいと感じています。プログラマーの将来についてネガティブなことを言われたら100文字以内で反論して下さい。' },
      { role: 'user', content: userInputContent }, // 過去の会話履歴を利用
    ],
  };
  //2号機
  const inputDatas = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'あなたはプログラマーの将来が危ういと感じています。プログラマーの将来についてポジティブなことを言われたら100文字以内で反論して下さい。' },
      { role: 'user', content: userInputContent }, // 過去の会話履歴を利用
    ],
  };
  if (communicationhistory.length%2!==0) {
  axios.post(apiEndpoint, inputData, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      max_tokens: 150,
    },
  })
    .then((response) => {
      const message = response.data.choices[0]?.message;
      if (message) {
        console.log('1号機:', message.content);
        communicationhistory.push(message.content);
        nowcount++;
        if (nowcount < count) {
          makeRequest();
        } else {
          console.log('終了');
        }
      } else {
        console.error('Error: Response message not found.');
      }
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  }
  else {
    axios.post(apiEndpoint, inputDatas, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        max_tokens: 150,
      },
    })
      .then((response) => {
        const message = response.data.choices[0]?.message;
        if (message) {
          console.log('2号機:', message.content);
          communicationhistory.push(message.content);
          nowcount++;
          if (nowcount < count) {
            makeRequest();
          } else {
            console.log('終了');
          }
        } else {
          console.error('Error: Response message not found.');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }
}

makeRequest();
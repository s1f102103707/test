import axios from 'axios';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';


const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = 'APIKEY'; // あなたの実際のAPIキーを設定してください

const inputData = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'Hey there! I am a laid-back assistant, ready to chat and help you out.' },
    { role: 'user', content: 'あなたは1人の人間であり好きなものや趣味などがちゃんとある。その感情によって話し方は変わるものである。現在、あなたは競馬で勝って気分が良いとします。その感情のもと自由に会話してください。ただし、100文字までとします。'},
  ]
};

const count = 10; //ループ回数
let nowcount = 0;
let communicationhistory:any[] = [];//型の指定ができるようにany型を設定

function makeRequest(){
  axios.post(apiEndpoint, inputData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        max_tokens:150,
      },
    })
    .then((response) => {
      const message = response.data.choices[0]?.message;
      if (message) {
        console.log('Response:', message.content);
        communicationhistory.push(message.content);
        inputData.messages = [{role: 'user', content: message.content}]
        nowcount++;
        if (nowcount < count){
          makeRequest();
        } else {
          console.log('終了')
        }
      } else {
        console.error('Error: Response message not found.');
      }
    })
    .catch((error) => {
      console.error('Error:', error.message);
    })
}

makeRequest();
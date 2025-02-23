import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 250,  
  duration: '30s', 
};

export default function () {
  let headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJWUGhaS0xJcHdhVXdGY0F3IiwiaWF0IjoxNzM5NDQ0MzU2LCJleHAiOjE3Mzk0NDc5NTZ9.vJ4VkcLcLvHiPkr89F4AiY1ZdVLhKCb6GU36wuuFIIc',
    'Content-Type': 'application/json',
  };
  let res = http.get('http://localhost:5000/api/invest/equity', { headers: headers });
  check(res, { 'is status 200': (r) => r.status === 200 });
  sleep(1);
}

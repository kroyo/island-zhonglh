
// const xhr = new XMLHttpRequest();
// xhr.open('GET', './data/test.json', false); //xhrReq.open(method, url, async, user, password);
// xhr.onreadystatechange = function () {
//   if(xhr.readyState === 4) {  //  readyState: 4  DONE	下载操作已完成。
//     if(xhr.status === 200) {  // 
//       // console.log(JSON.parse(xhr.responseText))
//       alert(xhr.responseText)
//     }
//   } 
// }
// xhr.send(null)

// console.log(234)

function ajax(url) {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);  // 默认为异步
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }else if(xhr.status === 404) {
          reject(new Error('404 not Found'))
        }
      }
    }
    xhr.send(null);
  });
  return p
}
const url = './data/test.json';
ajax(url).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})
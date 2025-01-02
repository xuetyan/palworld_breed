const Koa = require('koa')
const cors = require('koa2-cors')
const Router = require('koa-router')
const router = new Router()
const request = require('request')
const qs = require('qs')
const xlsx = require('xlsx')
const app = new Koa()

const pals = require('./pals')
const pals_key = pals.map(m => m.key)

let result = []
let pal = []
let breed = []

router.get('/', (ctx) => {
  console.log('router');
  ctx.body = { msg: 'success' }
})

router.get('/pal', (ctx) => {
  ctx.body = pal
})

router.get('/breed', (ctx) => { 
  ctx.body = breed
})

function getData(url, q, excelName) {
  const query = { ...q }

  const fet = function () {
    const queryStr = qs.stringify(query)
    const options = {
      url: url + queryStr,
      method: "get",
      headers: {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "x-requested-with": 'XMLHttpRequest', // 必须
      },
    }
    request(options, (error, response, body) => {
      const data = JSON.parse(body).data
      result = result.concat(data.list)
      // console.log(data.list.length);
      if (data.hasMore == 1) {
        setTimeout(() => {
          console.log('continue');
          query.page += 1
          fet()
        }, 200);
      } else {
        console.log('end');
        writeFile(`./file/${excelName}.xlsx`, result)
      }
    })
  }

  fet()
}

function getDataNew() {
  let index = 0
  const option = function (k) {
    const url = `https://www.palworldbreed.com/_next/data/QlGgTQeBY0eTQxyIDL1jc/zh-CN/all/all/${pals_key[index]}.json`
    return {
      url,
      method: "get",
    }
  }
  const fet = function () {
    request(option(), (error, response, body) => {
      const data = JSON.parse(body).pageProps.data
      result = result.concat(data)
      if (index < pals_key.length) {
        index++
        fet()
        console.log('continue');
      } else {
        console.log('end');
        const r = formatData(result)
        writeFile(`./file/breed_new.xlsx`, r)
      }
    })
  }
  fet()
}

// getDataNew()

function formatData(data) {
  const r = data.map(m => {
    // key, number, name
    const { parent1_pal, parent2_pal, child_pal } = m
    return {
      s1: parent1_pal.number,
      s1_sign: parent1_pal.key,
      s1_name: parent1_pal.name,
      s2: parent2_pal.number,
      s2_sign: parent2_pal.key,
      s2_name: parent2_pal.name,
      ret: child_pal.number,
      ret_sign: child_pal.key,
      ret_name: child_pal.name,
    }
  })
  return r
}

// getData('https://palworld.caimogu.cc/breed?', {
//   seed1: 0,
//   seed2: 0,
//   result: 0,
//   generation: 1,
//   tboss: 0,
//   page: 1
// }, 'breed')

// https://palworld.caimogu.cc/pal?attr=&appear=&encounter=&work=&nocturnal_habit=&level=&drop=&page=1
// getData('https://palworld.caimogu.cc/pal?', { page: 1 }, 'pal')

readFile('./file/pal.xlsx').then((res) => {
  pal = res
})
readFile('./file/breed_new.xlsx').then((res) => {
  breed = res
})

/**
 * 读取excel中的数据，并以json格式输出
 * @param {string} filePath 文件所在路径
 */
function readFile(filePath) {
  const fileContent = xlsx.readFile(filePath); // 读取excel文件
  const name = fileContent.SheetNames[0] // 获取excel第一张sheet的名字
  const sheet = fileContent.Sheets[name] // 获取excel第一张sheet中的数据
  const jsonData = xlsx.utils.sheet_to_json(sheet) // 将数据转成 json 格式
  return new Promise((resolve) => {
    resolve(jsonData)
  })
}
/**
* 将json数据写入并生成excel文件
* @param {string} filePath 路径
* @param {Array} jsonData 数据
* @param {string} sheetName 表格名字, 默认 Sheet1
*/
function writeFile(filePath, jsonData, sheetName = 'Sheet1') {
  const excleBook = xlsx.utils.book_new() // 新建文件
  xlsx.utils.book_append_sheet(excleBook, xlsx.utils.json_to_sheet(jsonData), sheetName); // 向文件中添加sheet，并将数据写入sheet
  xlsx.writeFile(excleBook, filePath); // 输出文件
}
// const jsonData = readFile('C:/Users/xxxx/Desktop/test/test.xlsx')
// writeFile('./file/breed.xlsx',jsonData)

app.use(router.routes()).use(router.allowedMethods())
app.use(cors())

app.listen('3111', () => {
  console.info('3111 start success');
  console.log();
})
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  {
    logo: 'B',
    url: 'https://www.bilibili.com',
  },
]
const simplifyUrl = (url) => {
  return url
    .replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
} // 简化url

const render = () => {
  $siteList.find('li:not(.lastLi)').remove()
  hashMap.forEach((node, index) => { // 添加index，方便删除
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${simplifyUrl(node.url)[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    }) // 替代a标签跳转
    $li.on('click', '.close', (e) => {
      e.stopPropagation() // 阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()

$('.addButton').on('click', () => {
  let url = window.prompt('请问你要添加的网址是啥？')
  if (url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  console.log(url)
  hashMap.push({
    logo: url[0],
    url: url,
  })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string) // 在本地的localStorage存储一个x，它的值为string
}

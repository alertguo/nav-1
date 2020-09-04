const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'https://www.acfun.cn' },
  { logo: './images/bilibili.png', url: 'https://www.bilibili.com' },
]

const render = () => {
  $siteList.find('li:not(.lastLi)').remove()
  hashMap.forEach((node) => {
    const $li = $(`<li>
      <a href="${node.url}">
        <div class="site">
          <div class="logo">${node.logo[0]}</div>
          <div class="link">${node.url}</div>
        </div>
      </a>
  </li>`).insertBefore($lastLi)
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
    logoType: 'text',
    url: url,
  })
  render()
})

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string) // 在本地的localStorage存储一个x，它的值为string
}

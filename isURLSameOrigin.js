// 解析URL的协议和域名
function resolveURL(url) {
    // 设置a标签的dom节点的href值
    urlParsingNode.setAttribute('href', url)
    // 通过结构获得协议和域名
    const { protocol, host } = urlParsingNode
    return {
        protocol,
        host
    }
}

// 创建一个a标签并获取其dom节点
const urlParsingNode = document.createElement('a')
// 获取当前页面的源
const currentOrigin = resolveURL(window.location.href)

// 判断URL是否为同源
function isURLSameOrigin(requestURL) {
    // 解析传入的URL
    const parsedOrigin = resolveURL(requestURL)
    // 判断传入的URL与当前页面URL的协议和域名是否相同
    return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}
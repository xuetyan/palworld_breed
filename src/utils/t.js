function a(e) {
  const n = Object.keys(e).sort(),
    t = {}
  for (const i in n) t[n[i]] = e[n[i]]
  return t
}

function i(e) {
  const n2 = a(e)
  let t = ""
  for (const e in n2) t += `${e}=${n2[e]}&`
  t = `${t}key=227cb549b3f4e267478a5d0ee0a759c8`
  // eslint-disable-next-line no-undef
  t = CryptoJS.MD5(t).toString().toLowerCase()
  return t
}

export const o = function (n) {
  const r = Object.assign({}, n, {
    sign: i(n)
  })

  const fd = new FormData()
  for (const [k, v] of Object.entries(r)) {
    fd.append(k, v)
  }
  return fd
}

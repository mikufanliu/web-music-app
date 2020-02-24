export function addClass (el, className) {
  if (hasClass(el)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el) {
    let reg = RegExp(`(^|\s)+classnName+(\s|$)`)
  return reg.test(el.className)
}
export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

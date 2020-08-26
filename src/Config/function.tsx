export const debounce = (callback: Function, delay: number) => {
  console.log(1234)

  let timeoutHandler: any = null
  return (...args: Array<any>) => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler)
    }
    timeoutHandler = setTimeout(() => {
      callback(...args)
      timeoutHandler = null
    }, delay)
  }
}

import { forwardRef } from "react"

export default forwardRef(function Input(props, ref) {
  return (
    <input type="number" min="10" max="40" ref={ref} {...props} />
  )
});
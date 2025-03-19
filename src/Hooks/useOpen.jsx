import{ useState } from 'react'

export default function useOpen() {
    const [open, setOpen] = useState(false)
    const handlerOpen = () => {
        setOpen(!open)
    }
  return {open, handlerOpen}
}

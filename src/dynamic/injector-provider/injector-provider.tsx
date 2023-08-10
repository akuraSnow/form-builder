import { useEffect, useState } from "react"

export function InjectorProvider({ load, children, path }: any) {
  console.log('path: ', path);


  const [hasChild, setHasChild]: [any, any] = useState(false)

  useEffect(() => {
    async function requireAll() {
      const requireComponent = await require.context('./', true, /\.component.ts$/);
      return requireComponent.keys().map(requireComponent);
    }

    requireAll().then((res) => {
      setHasChild(true);
    })
  }, [])


  return !hasChild ? load : <div>{children}</div>
};

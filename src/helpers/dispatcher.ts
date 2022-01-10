export function dispatcher<T>() {
  return (() => {
    throw new Error('Method not implemented')
  }) as React.Dispatch<T>
}

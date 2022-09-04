export const applicationsAdaptor = async () => {
  const result = await fetch('http://personio-fe-test.herokuapp.com/api/v1/candidates')
  return await result.json()
}

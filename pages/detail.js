const Detail = () => {
  return <div>Details</div>
}

Detail.getInitialProps = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 2000)
  })
}

export default Detail

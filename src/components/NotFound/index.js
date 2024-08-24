import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <img
      className="not-found-image"
      src="https://raw.githubusercontent.com/rajmanish23/nxt-assess/master/src/assets/not-found-image.png"
      alt="not found"
    />
    <div className="not-found-text-container">
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)

export default NotFound

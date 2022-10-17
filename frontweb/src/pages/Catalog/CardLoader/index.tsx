import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <div className="card-loader-container">
    <ContentLoader
      speed={2}
      width={300}
      height={300}
      viewBox="0 0 300 300"
      backgroundColor="#ffffff"
      foregroundColor="#ecebeb"
    >
      <rect x="-14" y="9" rx="2" ry="2" width="400" height="400" />
    </ContentLoader>
  </div>
);

export default CardLoader;

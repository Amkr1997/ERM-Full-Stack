type OtherComponentProps = {
  userNamme: string;
};

const OtherComponent: React.FC<OtherComponentProps> = ({ userNamme }) => {
  return (
    <div>
      <h1>{userNamme}</h1>
    </div>
  );
};

export default OtherComponent;

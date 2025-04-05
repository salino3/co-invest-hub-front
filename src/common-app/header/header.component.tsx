import "./header.styles.scss";
export const Header: React.FC = () => {
  return (
    <header className="rootHeader">
      <div className="containerHeader">
        <div className="boxUp">
          <div className="boxData">email</div>
          <div className="boxName">logo</div>
        </div>
        <div className="boxDown">
          <div className="boxLeft">
            <span>my companies</span>
          </div>
          <div className="boxCenter">
            <span>Searching</span>
          </div>
          <div className="boxRight">
            <span>Settings</span>
          </div>
        </div>
      </div>
    </header>
  );
};

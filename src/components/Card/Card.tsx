import "./card.css";
const Card = ({ heading, value }) => {
  return (
    <div className="card">
      <p className="card-heading">{heading}</p>
      <p className="card-value">{value}</p>
    </div>
  );
};

export default Card;

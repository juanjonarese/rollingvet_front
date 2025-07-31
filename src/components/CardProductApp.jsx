import { Link } from "react-router-dom";

const CardProductApp = (props) => {
  //   console.log(props.product.image);

  const { imagen, titulo, _id } = props.product;
  return (
    <div className="col my-5">
      <Link className="card-link" to={`/product/${_id}`}>
        <div className="card h-100">
          <img src={imagen} className="card-img-top card-image" alt={titulo} />
          <div className="card-body">
            <h5 className="card-title">{titulo}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardProductApp;

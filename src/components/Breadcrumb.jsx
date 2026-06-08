import { Link } from "react-router-dom";

function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">

      <ol className="breadcrumb">

        {items.map((item, index) => {

          const ultimo =
            index === items.length - 1;

          return (
            <li
              key={index}
              className={`breadcrumb-item ${
                ultimo ? "active" : ""
              }`}
            >

              {ultimo ? (
                item.label
              ) : (
                <Link to={item.path}>
                  {item.label}
                </Link>
              )}

            </li>
          );

        })}

      </ol>

    </nav>
  );
}

export default Breadcrumb;
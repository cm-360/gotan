import "./Card.css";

export default function Card(props: React.PropsWithChildren) {
  return (
    <div className="card" {...props}>
      {props.children}
    </div>
  );
}

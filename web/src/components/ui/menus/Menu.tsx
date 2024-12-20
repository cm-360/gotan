import "./Menu.css";

export default function Menu(props: React.PropsWithChildren) {
  return <div className="menu">{props.children}</div>;
}

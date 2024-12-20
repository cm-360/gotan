import "./Modal.css";

export default function Modal(props: React.PropsWithChildren) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{props.children}</div>
    </div>
  );
}

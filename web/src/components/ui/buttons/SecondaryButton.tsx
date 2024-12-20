import Button from "./Button";

export default function SecondaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <Button className="button button-secondary" {...props} />;
}

import Button from "./Button";

export default function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <Button className="button button-primary" {...props} />;
}

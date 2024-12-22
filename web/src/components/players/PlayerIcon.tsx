import { minidenticon } from "minidenticons";
import { ImgHTMLAttributes, useMemo } from "react";

export interface PlayerIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  saturation: number;
  lightness: number;
}

export default function PlayerIcon({
  name,
  saturation,
  lightness,
  ...props
}: PlayerIconProps) {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(name, saturation, lightness)),
    [name, saturation, lightness]
  );
  return <img src={svgURI} alt={name} {...props} />;
}

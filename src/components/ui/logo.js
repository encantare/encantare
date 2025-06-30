import Image from "next/image";

export function LogoEncantare({ size = 56 }) {
  return (
    <div
      className="rounded-full overflow-hidden shadow-md"
      style={{ height: size, width: size }}
    >
      <Image
        src="/logo.png"
        alt="Logo Encantare"
        width={size}
        height={size}
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
}

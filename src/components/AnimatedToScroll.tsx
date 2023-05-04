import { ArrowDownIcon } from "@assets";

type PropsType = {
  onClick?: () => void;
  text: string;
  position: "top" | "bottom";
  bordered?: boolean;
};

export const AnimatedToScroll = ({
  onClick,
  text,
  position,
  bordered = true,
}: PropsType) => {
  return (
    <div
      className={`flex items-center flex-col gap-3 cursor-pointer absolute ${
        position == "bottom" ? "bottom-12" : "top-14"
      }`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div
        style={{
          transform: `rotate(${position == "bottom" ? 0 : 180}deg)`,
        }}
      >
        <ArrowDownIcon bordered={bordered} animated={position == "bottom"} />
      </div>
      <div
        className="text-lg"
        style={{
          color: "#252223",
        }}
      >
        {text}
      </div>
    </div>
  );
};

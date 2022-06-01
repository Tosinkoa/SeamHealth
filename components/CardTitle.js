import { MdWbSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const CardTitle = ({ title, showIcon }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="px-10">
      <div className="card_title_background ">
        <h1 className="title_background">{title}</h1>
        {showIcon ? (
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="text-2xl">
            {theme === "light" ? <BsMoonStarsFill /> : <MdWbSunny />}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CardTitle;

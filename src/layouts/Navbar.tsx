// BookOpenText

import Logo from "@/assets/library-icon.png";
import ModeToggle from "@/components/dark-mode/ModeToggle";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex items-center gap-2">
      <div>
        <img src={Logo} width={70} height={70} />
      </div>
      <div className="ml-auto flex items-center gap-5">
        <Link to={"allbooks"}>All Books</Link>
        <Link to={"addbook"}>Add Book</Link>
        <Link to={""}>Borrow Summary</Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;

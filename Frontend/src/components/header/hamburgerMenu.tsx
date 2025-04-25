import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Link } from "react-router";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Menu Button */}
      <DialogTrigger asChild>
        <IconButton
          className="p-2 rounded-full bg-white text-white"
          onClick={() => setOpen(true)}
        >
          <HamburgerMenuIcon color="white"  className="cursor-pointer w-full"/>
        </IconButton>
      </DialogTrigger>

      {/* Menu Content */}
      {open && (
        <DialogContent
          className="fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg p-4 flex flex-col z-50"
        >
          {/* Close Button */}
          <button
            className="ml-auto p-2 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            X
          </button>

          {/* Menu Items */}
          <nav className="mt-4 space-y-4">
            <Link to="/" className="block text-lg font-medium hover:text-blue-500">
              Home
            </Link>
            <Link to="/product" className="block text-lg font-medium hover:text-blue-500">
              Product
            </Link>
          </nav>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default HamburgerMenu;

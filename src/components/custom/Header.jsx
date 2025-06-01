import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FcGoogle } from "react-icons/fc";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaPlaneDeparture } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(null);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      window.location.reload();
    });
  };

  return (
    <header className='sticky top-0 z-50 border-b backdrop-blur-sm bg-white/50'>
      <div className='flex items-center justify-between w-full px-4 py-3 mx-auto max-w-7xl'>
        <a href="/" className="flex items-center">
          <img src="/logo.png" width={48} height={48} alt="WanderWise Logo" className="object-contain rounded-full" />
          <span className="text-xl font-bold tracking-wide text-[#1f2937]"> WANDERWISE</span>
        </a>

        {/* Desktop Navigation */}
        <div className="items-center hidden gap-4 md:flex">
          {user ? (
            <>
              <a href="/create-trip">
                <Button variant="outline" className="px-4 py-2 text-sm rounded-full">Create Trip</Button>
              </a>
              <a href="/history">
                <Button variant="outline" className="px-4 py-2 text-sm rounded-full">History</Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture || "/cat.png"}
                    alt={user?.name || "User"}
                    className="object-cover w-10 h-10 border rounded-full shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-32 text-center cursor-pointer">
                  <h2
                    className='text-sm font-medium transition hover:text-red-600'
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              className='bg-blue-700 hover:bg-[#1e5c9d] text-white px-5 py-2 rounded-full text-sm font-medium'
              onClick={() => setOpenDailog(true)}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <HiMenuAlt3 className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-6">
                {user ? (
                  <>
                    <a href="/create-trip">
                      <Button variant="outline" className="flex items-center w-full gap-3 text-black rounded-full">
                        <FaPlaneDeparture className="w-5 h-5 text-black" />
                        Create Trip
                      </Button>
                    </a>
                    <a href="/history">
                      <Button variant="outline" className="flex items-center w-full gap-3 text-black rounded-full">
                        <HiOutlineClipboardList className="w-5 h-5 text-black" />
                        History
                      </Button>
                    </a>
                    <div className='flex items-center gap-3 mt-4'>
                      <img
                        src={user?.picture || "/cat.png"}
                        alt="User"
                        className="w-10 h-10 border rounded-full"
                      />
                      <div className="text-sm font-medium">{user?.name}</div>
                    </div>
                    <Button
                      variant="destructive"
                      className="mt-4 rounded-full"
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button className="mt-4 text-black bg-white border rounded-full" onClick={() => setOpenDailog(true)}>Sign In</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={openDailog}>
        <DialogContent className="w-[90%] max-w-sm sm:max-w-md rounded-md">
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center justify-center p-4">
                <img src="/logo.png" width={160} alt="App Logo" />
                <h2 className="mt-6 text-xl font-semibold text-black">Sign In with Google</h2>
                <p className="text-sm text-center text-black bold">
                  Securely log in using your Google account
                </p>
                <Button
                  disabled={loading}
                  onClick={login}
                  className="flex items-center justify-center w-full gap-3 mt-6 text-black bg-white border shadow-sm hover:bg-gray-100"
                >
                  <FcGoogle className="w-6 h-6" />
                  <span className="text-sm font-medium">Sign in with Google</span>
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;

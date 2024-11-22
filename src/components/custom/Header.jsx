import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FcGoogle } from "react-icons/fc";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
    console.log(storedUser);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="flex items-center justify-between p-3 px-5 shadow-sm">
      <img src="/logo.png" width={200} alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            {/* Use Link for navigation */}
            <a href="/create-trip">
              <Button variant="outline" className="text-black rounded-full">Create Trip</Button>
            </a>
            <a href="/history">
              <Button variant="outline" className="text-black rounded-full">History</Button>
           </a> 
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || "/cat.png"}
                  alt={user?.name || "UserName"}
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
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
          </div>
        ) : (
          <Button
            className="bg-[#2e79d5] text-white hover:bg-[#1e5c9d]"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" width={200} />
              <h2 className="text-lg font-bold mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="flex items-center w-full gap-4 mt-5"
              >
                <FcGoogle className="h-9 w-9" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

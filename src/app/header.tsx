"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

function AccountDropDown() {
    const session = useSession();

    const isLoggedIn = !!session.data;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}>
                    <Avatar className="mr-2">
                        <AvatarImage src={session.data?.user.image ?? ""} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {session.data?.user.name}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {isLoggedIn ? (
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOutIcon className="mr-2" /> Sign Out
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => signIn("google")}>
                        <LogInIcon className="mr-2" /> Sign In
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function Header() {
    const session = useSession();

    return (
        <header className="bg-gray-100 dark:bg-gray-900  py-4">
            <div className="flex justify-between items-center container mx-auto">
                <Link
                    href={"/"}
                    className="flex gap-2 items-center text-xl hover:underline"
                >
                    <Image
                        src="/icon.png"
                        width={60}
                        height={60}
                        alt="the application icon of a magnifying glass"
                    />
                    <div>DevFinder</div>
                </Link>
                <div className="flex items-center gap-4">
                    <AccountDropDown />

                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}

import React from 'react';
import axios from "axios";
import Image from "next/image";
import Link from "next/link"
import { useAuthDispatch, useAuthState } from "../context/auth"
import { FaSearch } from 'react-icons/fa';

export const NavBar: React.FC = () => {
    const { loading, authenticated } = useAuthState();
    const dispatch = useAuthDispatch();

    const handleLogout = () => {
        axios.post("/auth/logout")
            .then(() => {
                dispatch("LOGOUT");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 bg-white h-13">
            <span className="text-2xl font-semibold text-gray-400">
                <Link href="/">
                    <a>
                        <Image
                        src="/reddit-logo.png" 
                        alt='logo'
                        width={50} 
                        height={50}
                        />
                    </a>
                </Link>
            </span>
            <div className="max-w-full px-4">
                <div className="relative flex items-center bg-gray-100 border rounded hover:border-gray-700 hover:bg-white">
                <FaSearch className="ml-2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Reddit"
                        className="px-3 py-1 bg-transparent rounded h-7 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex">
                {!loading && (
                    authenticated ? (
                        <button
                            className="w-20 px-2 mr-2 text-sm text-center text-white bg-gray-400 rounded h-7"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    ) : (<>
                        <Link href="/login">
                            <a className="w-20 px-2 pt-1 mr-2 text-sm text-center text-blue-500 border border-blue-500 rounded h-7">
                                로그인
                            </a>
                        </Link>
                        <Link href="/register">
                            <a className="w-20 px-2 pt-1 text-sm text-center text-white bg-gray-400 rounded h-7">
                                회원가입
                            </a>
                        </Link>
                    </>)
                )}
            </div>
        </div>
    );
};

export default NavBar;
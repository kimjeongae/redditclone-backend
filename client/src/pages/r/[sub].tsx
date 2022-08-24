import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react'
import useSWR from 'swr';
import cls from 'classnames'
import Image from 'next/image'
import { useAuthState } from '../../context/auth';

const SubPage = () => {

    const [ownSub, setOwnSub] = useState(false);
    const {authenticated, user } = useAuthState();

    const fetcher = async (url: string) => {
    try
        {
            const res = await Axios.get(url);
            return res.data;
        } catch(error: any){
            throw error.respose.data;
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const subName = router.query.sub;
    const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null, fetcher );
    console.log('sub', sub);
    useEffect(() => {
        if(!sub || !user) return;
        setOwnSub(authenticated && user?.username === sub.username);
    }, [sub]);   

    const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        
        console.log('event', event);

        if(event.target.files === null) return;
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", fileInputRef.current!.name);
        console.log('formData', formData);

        try{
            await Axios.post(`/subs/${sub.name}/upload`, formData, {
                headers: { "Context-Type": "multipart/form-data" }
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    const openFileInput = (type: string) => {
        if(!ownSub) return;
        const fileInput = fileInputRef.current;
        if(fileInput) {
            fileInput.name = type;
            console.log('type', type);
            fileInput.click();
        }
    }

    return (
        <>
        {sub && (
            <Fragment>
                <div>
                    <input type="file" hidden={true} ref={fileInputRef} onChange={uploadImage} />
                    {/* 배너이미지 */}
                    <div className={cls("bg-gray-400")}>
                        {sub.bannerUrl ? (
                            <div 
                            className="h-56"
                            style={{
                                backgroundImage: `url(${sub.bannerUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            onClick= {() => openFileInput("banner")}
                            >
                            </div>    
                        ) : (
                            <div className='h-20 bg-gray-400'
                                onClick= {() => openFileInput("banner")}
                            >
                            </div>    
                        )}
                    </div>
                    {/* 커뮤니티 메타 데이터 */}
                    <div className='h-20 bg-white'>
                        <div className='relative flex max-w-5xl px-5 mx-auto'>
                            <div className='absolute' style={{top: -15}}>
                                {sub.imageUrl && (
                                    <Image  
                                        src={sub.imageUrl} 
                                        alt="커뮤니티 이미지" 
                                        width={70}
                                        height={70} 
                                        className="rounded-full"
                                        onClick= {() => openFileInput("image")}
                                    />
                                )}
                            </div>
                            <div className='pt-1 pl-24'>
                                <div className='flex items-center'>
                                    <h1 className='text-3xl font-bold'>
                                        {sub.title}
                                    </h1>
                                </div>
                                <p className='text-sm font-bold text-gray-400'>
                                    /r/{sub.name}                                        
                                </p>
                            </div>
                        </div>                        
                    </div>
                    {/* 포스트와 사이드바 */}
                    <div className='flex max-w-5xl px-4 pt-5 mx-auto'>

                    </div>
                </div>
            </Fragment>                
        )}
        </>
    )
}

export default SubPage
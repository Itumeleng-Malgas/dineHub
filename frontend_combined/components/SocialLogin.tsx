import { Button } from 'antd'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react';
import { errorNotification } from '@/utils/common';

const SocialLogin = () => {
    const handleSignIn = async (provider: string) => {

        const result = await signIn(provider, {
            callbackUrl: 'http://localhost:3000/admin',
            redirect: false
        });

        if (result?.error) {
            errorNotification("SignIn Failed", `Failed to sign in with ${provider}. Please try again. - ${result.error}`);
        }
      };

    return (
        <div className="flex">
            <Button onClick={async () => await handleSignIn('google')}  className="flex-1 mr-1">
                <div className="flex justify-center items-center">
                    <FcGoogle size={18}/><span className="ml-1">Google</span>
                </div>
            </Button>
        </div>
    )
}

export default SocialLogin
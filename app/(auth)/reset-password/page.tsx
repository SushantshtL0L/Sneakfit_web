import ResetPasswordForm from "../_components/ResetPasswordForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <Suspense fallback={<div>Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}

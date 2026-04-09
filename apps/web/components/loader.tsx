import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="size-6 animate-spin" />
        </div>
    );
}
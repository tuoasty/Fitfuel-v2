// @ts-ignore
import { cn } from "@/lib/utils"

export type NotificationType = {
    message: string;
    type: 'success' | 'error';
} | null;

interface NotificationProps {
    notification: NotificationType;
}

export function Notification({ notification }: NotificationProps) {
    if (!notification) return null;

    return (
        <div className={cn(
            "text-sm p-3 rounded-md text-center transition-all duration-300",
            notification.type === 'success' 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-destructive/10 text-destructive border border-destructive/20"
        )}>
            {notification.message}
        </div>
    );
}
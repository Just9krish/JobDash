import { useCurrentUser } from "@/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createInitials } from "@/lib/utils";

export default function Avataar() {
  const user = useCurrentUser();

  return (
    <>
      {user && (
        <Avatar className="border-spacing-2 hover:border">
          <AvatarImage src={user.image || ""} />
          <AvatarFallback>
            {createInitials(user.firstName, user.lastName)}
          </AvatarFallback>
        </Avatar>
      )}
    </>
  );
}

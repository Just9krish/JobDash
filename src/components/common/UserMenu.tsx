import { useCurrentUser } from "@/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Avataar from "../special/Avataar";
import ConfirmationDialog from "./ConfirmationDialog";
import { logout } from "@/actions/auth.action";

const userMenuOptions = [
  {
    label: "My Applications",
    value: "my-applications",
  },
  {
    label: "My Bookmarks",
    value: "my-bookmarks",
  },
  {
    label: "My Resume",
    value: "my-resume",
  },
  {
    label: "My Preferences",
    value: "my-prefeernces",
  },
  {
    label: "Manage Account",
    value: "manage-account",
  },
];

export default function UserMenu() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avataar />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        {user && (
          <div>
            <h5>{user.firstName + " " + user.lastName}</h5>
            {user.email && (
              <p className="text-muted-foreground">{user.email}</p>
            )}
          </div>
        )}
        <DropdownMenuSeparator className="my-4" />
        {userMenuOptions.map((menu) => (
          <DropdownMenuItem key={menu.value}>{menu.label}</DropdownMenuItem>
        ))}
        {/* <ConfirmationDialog onConfirm={() => logout()}> */}
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        {/* </ConfirmationDialog> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

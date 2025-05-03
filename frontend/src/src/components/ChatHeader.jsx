import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, blockUser, unblockUser, authUser } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>

        {authUser?.blockedUsers?.includes(selectedUser._id) ? (
          <button 
            onClick={async () => {
              try {
                await unblockUser(selectedUser._id);
              } catch (error) {
                console.error("Error unblocking user:", error);
              }
            }} 
            className="btn btn-success"
          >
            Unblock User
          </button>
        ) : (
          <button 
            onClick={async () => {
              try {
                await blockUser(selectedUser._id);
              } catch (error) {
                console.error("Error blocking user:", error);
              }
            }} 
            className="btn btn-danger"
          >
            Block User
          </button>
        )}
      </div>
    </div>
  );
};
export default ChatHeader;

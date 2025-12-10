import { AuthState } from '../features/auth/auth.models';
import { CallState } from '../features/calls/call.models';
import { ChatState } from '../features/chat/chat.models';
import { PresenceState } from '../features/presence/presence.models';
import { RoomState } from '../features/rooms/room.models';

export interface AppState {
  //interface properties go here
  auth: AuthState;
  chat: ChatState;
  calls: CallState;
  rooms: RoomState;
  presence: PresenceState;
}

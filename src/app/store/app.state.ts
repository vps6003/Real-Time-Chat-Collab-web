import { AuthState } from '../feature/auth/auth.models';
import { CallState } from '../feature/calls/call.models';
import { ChatState } from '../feature/chat/chat.models';
import { PresenceState } from '../feature/presence/presence.models';
import { RoomState } from '../feature/rooms/room.models';

export interface AppState {
  //interface properties go here
  auth: AuthState;
  chat: ChatState;
  calls: CallState;
  rooms: RoomState;
  presence: PresenceState;
}

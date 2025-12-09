import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private ws!: WebSocket;
  private messagesSubject = new Subject<string>();
  messages$ = this.messagesSubject.asObservable();

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  connect() {
    if (!this.isBrowser) return; // ❗ Prevent SSR crash

    this.ws = new WebSocket(environment.websockUrl);

    this.ws.onopen = () => console.log('WS Connected');
    this.ws.onmessage = (msg) => this.messagesSubject.next(msg.data);
    this.ws.onclose = () => console.log('WS Closed');
    this.ws.onerror = (err) => console.error('WS Error', err);
  }

  send(text: string) {
    if (this.isBrowser && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(text);
    }
  }
}

import {
  UserProvider,
  MessageProvider,
  WebSocketProvider,
  UsersProvider,
  TypingProvider,
} from '@/contexts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <UsersProvider>
        <TypingProvider>
          <MessageProvider>
            <WebSocketProvider>
              <main
                style={{
                  background: `radial-gradient(
                                    ellipse at bottom,
                                    oklch(67.3% 0.182 276.935) 0%,
                                    oklch(58.5% 0.233 277.117) 35%,
                                    oklch(35.9% 0.144 278.697) 65%,
                                    oklch(25.7% 0.09 281.288) 100%
                                )`,
                }}
                className="max-w-full w-screen h-screen inmd:h-svh p-2 inmd:p-0 flex items-center justify-items-center insm:bg-none! insm:bg-indigo-950!"
              >
                {children}
              </main>
            </WebSocketProvider>
          </MessageProvider>
        </TypingProvider>
      </UsersProvider>
    </UserProvider>
  );
}

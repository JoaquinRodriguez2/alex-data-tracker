import { createClient } from "@supabase/supabase-js";


export function logUser(email: string, password: string) {
  const supabase = createClient('http://127.0.0.1:54321', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')
  supabase.auth
    .signInWithPassword({
      email,
      password,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
}

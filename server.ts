import { interactions, message } from "https://deno.land/x/discordinteractions/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";

const client = interactions({
    publicKey: "7d97dfb7e20c9955f8c0a8726aaca1b26f2d19aefdd1fbebb4f5d933457d2fd3"
})
    .slash("hello", (i) => message({ content: `Hello ${i.member?.user.username}!` }))
    .slash("quote", async (_) => {
        const response = await fetch("https://api.quotable.io/random");
        const quote = await response.json();
        return message({ content: `"${quote.content}" —${quote.author}` });
    })

serve(client.handle);

import { signJwtAccessToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import * as bcrypt from "bcrypt";


interface ChatGPTModel {
  model: "gpt-3.5-turbo";
}
interface ChatGPTResponse {
  message: string;
  error: string;
}

interface ChatGPTPrompt {
  body: {
    model: ChatGPTModel;
    messages: string[];
  };
}

interface Prompt {
  prompt: string;
}


interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}



export default function Page() {
  const form = useRef<HTMLFormElement>(null);
  const promptInput = useRef<HTMLInputElement>(null);
  const chatLog = useRef<HTMLDivElement>(null);

  const getForm = () => {
    if (form.current) {
      return form.current;
    }
    throw new Error("form is not defined");
  };

  const getPromptInput = () => {
    if (promptInput.current) {
      return promptInput.current;
    }
    throw new Error("promptInput is not defined");
  };

  const getChatLog = () => {
    if (chatLog.current) {
      return chatLog.current;
    }
    throw new Error("chatLog is not defined");
  };

  const createMessageInstance = useCallback(({ prompt }: Prompt) => {
    getChatLog().innerHTML += `
        <div className="message-instance-container">
        <div className="message user-messsage">
            <div className="content">
                <div className="message-image" />
                <p>${prompt}</p>
            </div>
        </div>
        <div className="message ai-message">
            <div className="content">
                <div className="message-image">
                    <img src="https://i.imgur.com/8ScLNnk.png" alt="" />
                </div>
                <p>random text messagefrom ai</p>
            </div>
        </div>
    </div>
        `;
  }, []);

  const askChatGPT = async ({ prompt }: Prompt) => {
    return fetch(`${process.env.CHAT_GPT_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer${process.env.CHAT_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 150,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  };
  // scrolls to bottom of chat log
  const handleScroll = useCallback(() => {
    getChatLog().scrollTop = getChatLog().scrollHeight;
  }, []);

  useEffect(() => {
    getForm().addEventListener("submit", (e) => {
      e.preventDefault();
      const prompt = getPromptInput().value;
      if (prompt !== "") {
        createMessageInstance({ prompt });
        askChatGPT({ prompt });
        handleScroll();
        getPromptInput().value = "";
      }
    });
  }, [handleScroll, createMessageInstance]);

  return (
    <div className= "chat-container" >
    <div ref={ chatLog } className = "chat-log" >
      {/* DYNAMIC */ }
      < /div>
      < div className = "new-message" >
        <form ref={ form } className = "new-message-form" >
          <input ref={ promptInput } type = "text" placeholder = "Type a message" />
            </form>
            < /div>
            < /div>
  );
}

export const handler = async (req, res) => {

}
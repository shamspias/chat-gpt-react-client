import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Bot from "../images/bot.png";
import useLocalStorage from "../hooks/useLocalStorage";

const baseURL = "https://chatbot.deadlyai.com";

const ChatUi = () => {
  const userMsg = ["me", "you", "hello"];
  const botMsg = ["nice", "great", "hi"];
  const [bot, setBot] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [taskId, setTaskId] = useState("");

  // value of local storage
  const [userMsgArr, setUserMsgArr] = useLocalStorage("userMsgArr", []);
  const [botMsgArr, setBotMsgArr] = useLocalStorage("botMsgArr", []);

  //   Formik
  const initialValues = {
    text: "",
  };
  const onSubmit = async (values) => {
    const newPrompt = values.text;
    setUserMsgArr([...userMsgArr, newPrompt]); // set user msg to local storage
    formik.values.text = "";

    axios
      .post(`${baseURL}/chat`, { newPrompt })
      .then((res) => {
        axios
          .get(`${baseURL}/result/${res.data.task_id}`)
          .then((res) => {
            setResponse(res?.data?.data);
            setBotMsgArr([...botMsgArr, res?.data?.data]);
          })
          .catch((err) => {
            console.log(err.response);
            setBotMsgArr([...botMsgArr, "Please try again"]);
          });
      })
      .catch((err) => {
        console.log(err.response);
        setBotMsgArr([...botMsgArr, "Please try again"]);
      });

  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <section className="bg-[#282c34] md:py-16 h-screen">
      <div className="md:w-1/2 bg-white mx-auto">
        {/* component */}
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen md:h-[85vh]">
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      Please write something
                    </span>
                  </div>
                </div>
                <img
                  src={Bot}
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
              </div>
            </div>
            {userMsgArr.length
              ? userMsgArr.map((msg, i) => (
                  <div key={i}>
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {msg}
                            </span>
                          </div>
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-2"
                        />
                      </div>
                    </div>

                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {botMsgArr.length ? botMsgArr[i] : null}
                            </span>
                          </div>
                        </div>
                        <img
                          src={Bot}
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-1"
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null}

            {/* <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      {prompt}
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div>

            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      {response}
                    </span>
                  </div>
                </div>
                <img
                  src={Bot}
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
              </div>
            </div> */}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <form
                onSubmit={formik.handleSubmit}
                className="w-full relative flex"
              >
                <input
                  id="text"
                  name="text"
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-3"
                  //   onChange={(e) => setPrompt(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.text}
                />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                  <button
                    type="submit"
                    //   onClick={handleSubmit}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                  >
                    <span className="font-bold">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n",
          }}
        />
      </div>
    </section>
  );
};

export default ChatUi;

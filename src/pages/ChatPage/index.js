import Chat from "./../../components/Chat";
import "./ChatPage.css";
import { ChatMessage, ReceiveMsgRequest, Empty } from "./../../chat_pb";
import { useEffect, useState } from "react";

export default function ChatPage({ client, setIsOpen4,toUser}) {
  const [msgList, setMsgList] = useState([]);
  const username = window.localStorage.getItem("username");
  const [userTypingmsg,setUserTypingMsj]=useState("")
  const [userSeenmsg,setUserSeenMsj]=useState("")

  useEffect(() => {
    const strRq = new ReceiveMsgRequest();
    strRq.setUser(username);
    var chatStream = client.receiveMsg(strRq, {});
    chatStream.on("data", (response) => {
      const from = response.getFrom();
      const msg = response.getMsg();
      const time = response.getTime();
      const toUserFromResponse=response.getTo();
      if(localStorage.getItem('username')=='admin'){
        if(msg==="useropenedchat"){
          console.log(msg)
        }
        if (from === username && toUser==toUserFromResponse) {
          if(!(msg==="?isseen?" || msg ==="?istyping?")){
            setMsgList((oldArray) => [
            ...oldArray,
            { from, msg, time, mine: true },
          ]);
          setUserSeenMsj("")
        }
        }
        else if(toUserFromResponse === username && from==toUser){
          setUserTypingMsj("") 
          if(msg==="?isseen?"){
            setUserSeenMsj("Seen")
          }
          else if(msg==="?istyping?")
          {
            setUserTypingMsj(from+" is typing...")
          }else{
          setMsgList((oldArray) => [
            ...oldArray,
            { from, msg, time, mine: false },
          ]);}
        }

      }
      else {
        if(msg==="useropenedchat"){
          console.log(msg)
        }
        if (from === username) {
          if(!(msg==="?isseen?" || msg ==="?istyping?")){
          setMsgList((oldArray) => [
            ...oldArray,
            { from, msg, time, mine: true },
          ]);
          setUserSeenMsj("")
        }
        }
        else if(toUserFromResponse === username){
 
          setUserTypingMsj("")
          if(msg==="?isseen?"){
            setUserSeenMsj("Seen")
          }
          else if(msg==="?istyping?")
          {
            setUserTypingMsj(from+" is typing...")
          }
          else{
          setMsgList((oldArray) => [
            ...oldArray,
            { from, msg, time, mine: false },
          ]);}
        }
      }
    });

    chatStream.on("status", function (status) {
      console.log(status.code, status.details, status.metadata);
    });

    chatStream.on("end", () => {
      console.log("Stream ended.");
    });
  }, []);

  function sendMessage(message) {
    const msg = new ChatMessage();
    msg.setMsg(message);
    msg.setFrom(username);
    msg.setTime(new Date().toLocaleString());
    msg.setTo(toUser)

    client.sendMsg(msg, null, (err, response) => {
      console.log(response);
    });
  }

  return (
    <div className="chatpage" style={{height:"350px"}}>
      <div className="chatpage-section" style={{height:"300px"}}>
        <Chat msgList={msgList} sendMessage={sendMessage} setIsOpen4={setIsOpen4} userTypingmsg={userTypingmsg} userSeenmsg={userSeenmsg}
        username={username} toUser={toUser} />
      </div>
    </div>
  );
}
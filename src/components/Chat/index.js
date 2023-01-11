import "./Chat.css";
import { Button ,Form} from "react-bootstrap";
export default function Chat({ msgList, sendMessage,setIsOpen4,userSeenmsg,userTypingmsg,
username,toUser}) {
  function handler() {
    var msg = window.msgTextArea.value;
    sendMessage(msg);
    window.msgTextArea.value = "";
  }
  function closeModal(){
    setIsOpen4(false)
  }
  function typingfunction(){
    var msg = "?istyping?";
    sendMessage(msg);
  }
  function seenFunction(){
    var msg="?isseen?"
    sendMessage(msg)
  }
  return (
    <div className="chat">
      <div className="chat-header">
      <i class="bi bi-x-lg" style={{float:"right",marginRight:"2px"}} onClick={closeModal}></i>
        <h4 style={{textAlign:"center",marginTop:"8px"}}>Chat discussion between {username}(me) and {toUser}</h4>
      </div>
      <div className="chat-list">
        {msgList?.map((chat, i) => (
          <ChatCard chat={chat} key={i} />
        ))}
        <span style={{fontSize:"10px"}}>{userTypingmsg}</span>
        {msgList.length>0 && msgList[msgList.length-1].mine ?<span style={{fontSize:"10px",float:"right",marginRight:"5px"}}>{userSeenmsg}</span>: <span></span>}
      </div>
      <div className="chat-input" onClick={seenFunction}>
          <textarea id="msgTextArea" onChange={typingfunction}/>
        <div
          style={{
            paddingLeft: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button style={{width:"150px",margin:"auto",marginRight:"5px",backgroundColor:"magenta",borderColor:"pink"}} className="butonu"onClick={handler}>Send <i class="bi bi-send-fill"></i></Button>
        </div>
      </div>
    </div>
  );
}

function chatAlight(almeu){
  if(almeu==true)
  {return "right"}
  else return "left"
}

function ChatCard({ chat }) {
  return (
    <>
      <div style={{ fontSize: "9px", marginLeft: "4px", paddingLeft: "8px",textAlign:chatAlight(chat?.mine) }}>
        <span>{chat?.from}</span>
      </div>
      <div
        className={
          chat?.mine ? "chatcard chatcard-mine" : "chatcard chatcard-friend"
        }
      >
        <div className="chatcard-msg" >
        <div style={{ height:"fit-content",overflowWrap:"break-word"}}>{chat?.msg}</div>
        </div>
        <div className="chatcard-time">
          <span>{chat?.time}</span>
        </div>
      </div>
    </>
  );
}
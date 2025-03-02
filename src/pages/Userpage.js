import React, {  useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import NavbarUser from '../components/NavbarUser';
import Modal from 'react-modal';
import {Button,Table,Form} from 'react-bootstrap'
import { Line } from 'react-chartjs-2';
import SockJsClient from 'react-stomp';
import Card from 'react-bootstrap/Card';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ChatServiceClient } from "../chat_grpc_web_pb";
import ChatPage from './ChatPage';
import { ChatMessage, ReceiveMsgRequest, Empty } from "../chat_pb"
ChartJS.register(...registerables);
const client = new ChatServiceClient("http://localhost:8080", null, null);
function Userpage() {
    const [device, setDevice] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [data,setData] = useState({
        labels: [],
        datasets: [],
      });
    const [selectedDevice,setSelectedDevice]=useState([])
    const [message, setMessage] = useState('');
    const [toUser,setToUser]=useState('')
   

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    let iddevice=parseInt(msg.message)
    
    for(let i of device){
      if(i.iddevices === iddevice)
      {
        setIsHidden(true);
        setMessage("The device with description "+i.description+" exceeded maximum Energy Hourly Consumption"); 
        break;
      }
      else{
      setMessage("");
      setIsHidden(false);
      }
    }
  }
    const togglePopup = (device) => {
        setIsOpen(!isOpen);
        setSelectedDevice(device)
      }
    function closeModal() {
        setIsOpen(false);
      }
      function toTime(date){
        return date?.split('T')[1].substring(0,5)
    }

    useEffect(() => {

        var obj = JSON.parse(localStorage.getItem('user'));
          
        let headers2 = {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '+ obj
             };
        axios.get("http://localhost:8081/devices/username",{headers:headers2})
            .then(res => {
                setDevice(res.data);
                
            })
            .catch(err => {
               
            })
              }, [])

    async function handleSubmit(event){
        event.preventDefault()
        var { date22} = document.forms[0];
        var obj = JSON.parse(localStorage.getItem('user'));
        let headers = {
                "Content-Type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer '+ obj
         };
         var finalDate=date22.value.split("-")[1]+"/"+date22.value.split("-")[2]+"/"+date22.value.split("-")[0]

         axios.get("http://localhost:8081/devices/chart?id="+selectedDevice+"&data="+finalDate,{headers:headers})
            .then(resp => {
                console.log(resp.data)     
                var listatime = [];
                resp.data.forEach(elem => {
                    listatime.push(toTime(elem.timest))
                }); 
                var valori = [];
                resp.data.forEach(elem => {
                  valori.push(elem.encons)
                });   

                setData({
                    labels: listatime,
                    datasets: [
                      {
                        label: 'Measurements',
                        backgroundColor: 'rgb(238, 9, 215)',
                        borderColor: 'rgb(238, 9, 215)',
                        data: valori,
                      },
                               
                    ],
                  })
                
            })
            .catch(err => {
               
            })

    }

    const openChat   = (username) => {
      setIsOpen3(true)
      setToUser('admin')
      sendMessage()
   }
   function setIsOpen4(val){
    setIsOpen3(val)
}
function sendMessage(message) {
  const msg = new ChatMessage();
  msg.setMsg("useropenedchat");
  msg.setFrom(window.localStorage.getItem("username"));
  msg.setTime(new Date().toLocaleString());
  msg.setTo(toUser)

  client.sendMsg(msg, null, (err, response) => {
    console.log(response);
  });

}
    if(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("role"))[0].authority==="user")
    return (
        <div className="App2">
            <NavbarUser />
            <h2 style={{marginLeft: "400px", marginTop:"50px"}}> Bun venit pe pagina utilizatorului! </h2>
            <h2 style={{marginLeft: "470px", marginTop:"20px"}}> Dispozitivele mele 
            <Button style={{marginLeft:"15px"}}variant="dark" onClick={openChat}>Chat with admin</Button></h2>
            {isOpen3 &&  <ChatPage client={client} toUser={toUser} setIsOpen4={setIsOpen4}></ChatPage>} 
            <Table variant='dark' bordered style={{marginTop:'10px',width:"750px",marginLeft:"270px",marginBottom:"10px"}}>
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>#</th>  
                        <th style={{textAlign:"center"}}>Description</th>
                        <th style={{textAlign:"center"}}>Address</th>
                        <th  style={{textAlign:"center"}}>Max Energy Cons/H</th>
                        <th style={{textAlign:"center"}}>Possible Actions</th>
                    </tr>
                </thead>

                {device.map((device) => (
                      
                      <tbody>
                      <tr>
                              <td style={{textAlign:"center"}}>{device.iddevices}</td>
                              <td style={{textAlign:"center"}}>{device.description}</td>
                              <td style={{textAlign:"center"}}>{device.address}</td>
                              <td  style={{textAlign:"center"}} >{device.mhec}</td>
                              <td style={{textAlign:"center"}} ><Button variant="info" style={{marginRight:"10px"}} onClick={()=>togglePopup(device.iddevices)}>See Chart</Button></td>
                      </tr>                                                
                  </tbody>
                          
                      ))}
        </Table>

        <SockJsClient
        url={'http://localhost:8081/ws-message'}
        topics={['/topic/message']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
         />

        { isHidden && < Card bg='danger' style={{ width: '20rem',marginLeft:'40%',alignContent:'center' }}>
        <div>
      <Card.Text style={{textAlign:"center",padding:"20px"}} >{message}</Card.Text>
    </div></Card>}
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            dialogClassName={"CSRModal"}
            ariaHideApp={false}
            >

        <Button style={{marginLeft:"1050px"}} variant="danger"
        onClick={closeModal}>Close</Button>
            <Form  onSubmit= {handleSubmit}>
                <Form.Group>
                    <Form.Label>Selectați data </Form.Label>
                    <Form.Control
                required
                type="date"
                name="date22"
                max={new Date().toISOString().split("T")[0]}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
                </Form.Group>
                <Button class="but" variant="danger" type="submit" style={{margin:"20px"}}>
                    Selectează data
                </Button>
            </Form>

            <h3 className="mt-5">See measurements per Hour</h3>
            
      <Line data={data}
       />
       <h6 style={{marginTop:"10px"}}>OX - ora masuratorii</h6>
       <h6>OY - valoarea in KWh</h6>
      </Modal>
        </div>
      );
    else
    return(
          <div className='App2'><h1>Nu există autorizare de acces aici!</h1>
               <h2>Vă rugăm să vă autentificați și reveniti.Accesați butonul de mai jos.</h2>
            <div className='content'  style={{ display: "flex" , justifyContent: "space-around"}}>
                 <Link  to="/login"  style={{color: 'red' ,backgroundColor:'white',fontSize:'100',width:'55'}}>Log In </Link>
          </div>
          </div>
           
      )
}

export default Userpage;
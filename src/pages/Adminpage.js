import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'
import NavAdmin from '../components/NavAdmin';
import {Button,Form,Table} from 'react-bootstrap'
import Modal from 'react-modal';
import '../App.css';
function AdminPage() {

    const [persoane, setPersoane] = useState([]);
    const [device, setDevice] = useState([]);
    const [isVizible, setIsVisible] = useState(false);
    const [isVizibleD, setIsVisibleD] = useState(false);
    const [isVizibleAdd, setIsVisibleAdd] = useState(false);
    const [isVizibleAddP, setIsVisibleAddP] = useState(false);
    const [errorMessage, setMessage] = useState("");
    const [errorMessage2, setMessage2] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedDevice,setSelectedDevice]= useState([]);
    const [selectedPerson,setSelectedPerson]= useState([]);
    // Aici sunt functii helpere

    const togglePopup = (device) => {
        setIsOpen(!isOpen);
        setSelectedDevice(device)
      }
    const togglePopup2 = (person) => {
        setIsOpen2(!isOpen2);
        setSelectedPerson(person)
      }
    function closeModal() {
        setIsOpen(false);
        setIsOpen2(false);
      }

    function toggleVisible () {
        setIsVisible(!isVizible);
        setIsVisibleD(false)
        setIsVisibleAdd(false)
        setIsVisibleAddP(false)
      }

    function toggleVisibleD (){
        setIsVisibleD(!isVizibleD);
        setIsVisible(false);
        setIsVisibleAdd(false)
        setIsVisibleAddP(false)
      }
    function toggleVisibleAdd () {
        setIsVisibleAdd(!isVizibleAdd);
        setIsVisible(false);
        setIsVisibleD(false)
        setIsVisibleAddP(false)
      }

    function toggleVisibleAddP () {
        setIsVisibleAddP(!isVizibleAddP)
        setIsVisibleAdd(false);
        setIsVisible(false);
        setIsVisibleD(false)
      }

    // Requesturile trimise
    useEffect(() => {

        var obj = JSON.parse(localStorage.getItem('user'));
          
        
        let headers2 = {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '+ obj
             };
        axios.get("http://localhost:8081/person/alluser",{headers:headers2})
            .then(res => {
                setPersoane(res.data);
                
            })
            .catch(err => {
               
            })
        axios.get("http://localhost:8081/devices/all",{headers:headers2})
            .then(resp => {
                setDevice(resp.data);
            })
            .catch(err => {
               
            })


    }, [])
    // adauga device

    async function handleSubmit(event) {
        var { desc,address, mhec,own} = document.forms[0];
        const params = new URLSearchParams({
            id: parseInt(own.value)
          }).toString();
          var obj = JSON.parse(localStorage.getItem('user'));
          let headers = {
                  "Content-Type": "application/json; charset=UTF-8",
                  "Authorization": 'Bearer '+ obj
           };
          
           try {
            var response= await axios.post("http://localhost:8081/devices/save?"+params,
            {description:desc.value,address:address.value,mhec:parseFloat(mhec.value)},
                {headers: headers}
                )
          } catch (error) {
            
            setMessage("Ceva nu a mers bine, mai incercati!");
            
          }
        }
    // adauga pers
    async function handleSubmit2(event) {
        var { uname,pass} = document.forms[0];
          var obj = JSON.parse(localStorage.getItem('user'));
          let headers = {
                  "Content-Type": "application/json; charset=UTF-8",
                  "Authorization": 'Bearer '+ obj
           };
          
           try {
            var response= await axios.post("http://localhost:8081/person/save",
            {username:uname.value,password:pass.value,role:"client"},
                {headers: headers}
                )
          } catch (error) {
            
            setMessage("Ceva nu a mers bine, mai incercati!");
            
          }
        }
    // delte

    const deletePerson   = (nr) => {
        var obj = JSON.parse(localStorage.getItem('user'));

        const params = new URLSearchParams({
           id: nr,
       }).toString();

       const url="http://localhost:8081/person/delete?"+params
       let headers2 = {
           "Content-Type": "application/json; charset=UTF-8",
           "Authorization": 'Bearer '+ obj
            };

       axios.delete(url,{ headers: headers2})
           .then(res => {
               window.location.reload()
           })
           .catch(err => {
               console.log(err);
           })
    }

    const deleteDevice   = (nr) => {
        var obj = JSON.parse(localStorage.getItem('user'));

        const params = new URLSearchParams({
           id: nr,
       }).toString();

       const url="http://localhost:8081/devices/delete?"+params
       let headers2 = {
           "Content-Type": "application/json; charset=UTF-8",
           "Authorization": 'Bearer '+ obj
            };

       axios.delete(url,{ headers: headers2})
           .then(res => {
               window.location.reload()
           })
           .catch(err => {
               console.log(err);
           })
    }
    //edit device

    async function editDevice(event) {
        var { desc,addr, mhec2} = document.forms[0];
          var obj = JSON.parse(localStorage.getItem('user'));
          let headers = {
                  "Content-Type": "application/json; charset=UTF-8",
                  "Authorization": 'Bearer '+ obj
           };

           try {
            var response= await axios.post("http://localhost:8081/devices/edit",
            {iddevices:selectedDevice.iddevices,description:desc.value,address:addr.value,mhec:parseFloat(mhec2.value)},
                {headers: headers}
                )
          } catch (error) {
            
            setMessage("Ceva nu a mers bine, mai incercati!");
            
          }
        }
    //edit person
    async function editPerson(event) {
        var { uname,pass} = document.forms[0];
          var obj = JSON.parse(localStorage.getItem('user'));
          let headers = {
                  "Content-Type": "application/json; charset=UTF-8",
                  "Authorization": 'Bearer '+ obj
           };
  
           try {
            var response= await axios.post("http://localhost:8081/person/edit",
            {idpeople:selectedPerson.idpeople,username:uname.value,password:pass.value},
                {headers: headers}
                )
          } catch (error) {
            
            setMessage("Ceva nu a mers bine, mai incercati!");
            
          }
        }
   // Pagina efectiva
    if(JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("role"))[0].authority==="admin")
    return (
     
        // butoanele
        <div className="App2">
               <NavAdmin></NavAdmin>
            <h2 style={{marginLeft: "450px", marginTop:"50px"}}> Bun venit pe pagina adminului! </h2>
            <div style={{display: 'flex '}}>
            <Button style={{marginRight:"20px",width:"150px",marginLeft:"320px",marginTop:"20px"}} onClick={()=>toggleVisible()}>Vezi persoane</Button>
            <Button style={{marginRight:"20px",width:"150px",marginLeft:"20px",marginTop:"20px"}} onClick={()=>toggleVisibleD()}>Vezi devices</Button>
            <Button style={{marginRight:"20px",width:"150px",marginLeft:"20px",marginTop:"20px"}} onClick={()=>toggleVisibleAddP()}>Adauga Persoana</Button>
            <Button style={{marginRight:"20px",width:"150px",marginLeft:"20px",marginTop:"20px"}} onClick={()=>toggleVisibleAdd()}>Adauga Device</Button>
        </div>

        {/* divul cu tabele */}
        {/* Tabelul de pers */}
        <div>
        { isVizible &&
        <Table variant='dark' bordered style={{marginBottom:'-10px',marginTop:'10px',width:"1000px",marginLeft:"150px"}}>
                <thead>
                    <tr>
                        <th>#</th>  
                        <th style={{textAlign:"center"}}>Username</th>
                        <th style={{textAlign:"center"}}>Password</th>
                        <th style={{textAlign:"center"}}>Role</th>
                        <th style={{textAlign:"center"}}>Possible Actions</th>

                    </tr>
                </thead>

                {persoane.map((person) => (
                      
                      <tbody>
                      <tr>
                              <td style={{textAlign:"center"}}>{person.idpeople}</td>
                              <td style={{textAlign:"center"}}>{person.username}</td>
                              <td style={{textAlign:"center"}}>{person.password}</td>
                              <td style={{textAlign:"center"}}>{person.role}</td>
                              <td style={{textAlign:"center"}} >
                              <Button variant="info" style={{marginRight:"10px"}} onClick={()=>togglePopup2(person)}>Edit</Button>
                              <Button variant="info" style={{marginRight:"10px"}}  onClick={()=>deletePerson(person.idpeople)} >Delete</Button>
                              </td>
                      </tr>                                                
                  </tbody>
                          
                      ))}
        </Table>}

        {/* Tabelul de devices */}
        { isVizibleD &&
        <Table variant='dark' bordered style={{marginTop:'10px',width:"750px",marginLeft:"270px",marginBottom:"10px"}}>
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>#</th>  
                        <th style={{textAlign:"center"}}>Description</th>
                        <th style={{textAlign:"center"}}>Address</th>
                        <th  style={{textAlign:"center"}}>Max Energy Cons/H</th>
                        <th  style={{textAlign:"center"}}>  Owner  </th>
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
                              <td  style={{textAlign:"center"}} >{device.person.username}</td>
                              <td  style={{textAlign:"center"}} >
                              <Button variant="info" style={{marginRight:"10px"}} onClick={()=>togglePopup(device)}>Edit</Button>
                              <Button variant="info" style={{marginRight:"10px"}}  onClick={()=>deleteDevice(device.iddevices)} >Delete</Button>
                              </td>
                            
                      </tr>                                                
                  </tbody>
                          
                      ))}
        </Table>}
        {/* Formul de add device */}
        {isVizibleAdd &&
         <div style={{
            position:'absolute',
            display: 'block',
            width: 700,
            left:400,
            marginTop:"20px"
        }}>
        <Form style={{fontSize:13}} onSubmit= {handleSubmit}>
            <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" required name= "desc"
                        placeholder="Introduceți descrierea" />
            </Form.Group>
            <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" required name= "address"
                        placeholder="Introduceți adresa" />
            </Form.Group>
            <Form.Group>
                    <Form.Label>Maxim Energy Consumption per Hour</Form.Label>
                    <Form.Control type="number"  step="0.1" required name= "mhec" onChange={(event) =>
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value
                            }/>
            </Form.Group>
                <Form.Group>
                    <Form.Label>The Owner</Form.Label>
                    <Form.Select aria-label="Default select example" name= "own">
                    { persoane.map((person) => (
                                   <option value={[person.idpeople]}>{[person.username]}</option>
                               ))

                               }
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: "bold",fontSize:15}}>{errorMessage}</Form.Label>
                </Form.Group>
                <Button  class="but"  type="submit" style={{margin:"8px"}}>
                     Adauga
                </Button>
            </Form> </div>}

             {/* Formul de add person */}
        {isVizibleAddP &&
         <div style={{
            position:'absolute',
            display: 'block',
            width: 700,
            left:400,
            marginTop:"20px"
        }}>
        <Form style={{fontSize:13}} onSubmit= {handleSubmit2}>
            <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" required name= "uname"
                        placeholder="Introduceți username" />
            </Form.Group>
            <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required name= "pass"
                        placeholder="Introduceți parola" />
            </Form.Group>
                <Form.Group>
                    <Form.Label style={{fontWeight: "bold",fontSize:15}}>{errorMessage2}</Form.Label>
                </Form.Group>
                <Button  class="but"  type="submit" style={{margin:"8px"}}>
                     Adauga
                </Button>
            </Form> </div>}

            {/* Edit device */}
            <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            dialogClassName={"CSRModal"}
            >

        <Button style={{marginLeft:"1050px"}} variant="danger"
        onClick={closeModal}>Close</Button>
        <Form style={{fontSize:15}} onSubmit= {editDevice}>
          
                <Form.Group>
                    <Form.Label>Descriere device</Form.Label>
                    <Form.Control type="text" defaultValue={selectedDevice.description} required name= "desc"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" defaultValue={selectedDevice.address}  required name= "addr"  />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Maxim Energy Consumption per Hour</Form.Label>
                    <Form.Control type="number"  step="0.001" required name= "mhec2"
                    defaultValue={selectedDevice.mhec}
                    onChange={(event) =>
                                event.target.value < 0
                                    ? (event.target.value = 0)
                                    : event.target.value
                            }/>
            </Form.Group>
                <Form.Group>
                </Form.Group>
                <Button  class="but" variant="info" type="submit" style={{margin:"8px"}}>
                    Salvează
                </Button>
            </Form>
      </Modal>
      {/* Edit Person */}
      <Modal
            isOpen={isOpen2}
            onRequestClose={closeModal}
            dialogClassName={"CSRModal"}
            >

        <Button style={{marginLeft:"1050px"}} variant="danger"
        onClick={closeModal}>Close</Button>
        <Form style={{fontSize:15}} onSubmit= {editPerson}>
          
                <Form.Group>
                    <Form.Label>Username </Form.Label>
                    <Form.Control type="text" defaultValue={selectedPerson.username} required name= "uname"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Parola</Form.Label>
                    <Form.Control type="password" defaultValue={selectedPerson.password}  required name= "pass"  />
                </Form.Group>
                <Button  class="but" variant="info" type="submit" style={{margin:"8px"}}>
                    Salvează
                </Button>
            </Form>
      </Modal>
        </div>
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
export default AdminPage;
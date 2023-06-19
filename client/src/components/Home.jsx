import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    
    const [data,setData]=useState([]);
    const [time,setTime]=useState('');
    const [name,setName] = useState('');
    const navigate=useNavigate();
	const handleLogout = () => {
        const url="http://localhost:8083/api/put"
        localStorage.removeItem("token");
        navigate('/');
        axios.put(url,{id:data[data.length-1]._id});
		
	};
    useEffect(()=>{
        if(localStorage.getItem("token")===null){
            navigate("/");
        }
        const url = "http://localhost:8083/api/get/"+localStorage.getItem("email");
	    axios.get(url)
        .then((response) => {setData(response.data);setTime(response.data[0].registeredTime);
            setName(response.data[0].username);})
        .catch(err=>console.log(err));      
     },[]);

	return (
		<div className="Home_container">
			<nav className="navbar">
				<h1>Welcome {name}</h1>
				<button className="white_button" onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <h4>Registered at :{time}</h4>
            <table>
                <caption >Login records</caption>
                <thead>
                    <tr style={{backgroundColor:"#3bb19b",color:"white"}}>
                        <th>Logged in time</th>
                        <th>Logged out time</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&  data.map((record)=>(
                         <tr key={record._id}>
                         <td>{record.loginTime}</td>
                         <td>{record.logOutTime}</td>
                     </tr>
                    ))}
                   
                </tbody>
            </table>
		</div>
	);
};

export default Home;
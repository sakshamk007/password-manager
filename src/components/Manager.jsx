import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [row, setRow] = useState({ site: "", username: "", password: "" })
    const [rows, setRows] = useState([])

    const eyeRef = useRef()
    const passwordRef = useRef()

    // const getPasswords = async ()=>{
    //     let request = await fetch('http://localhost:3000')
    //     let passwords = await request.json()
    //     setRows(passwords)
    // }

    // useEffect(() => {
    //   getPasswords()
    // }, [])
    

    const handlePassword = () => {
        if (eyeRef.current.src.includes("/eye.svg")) {
          eyeRef.current.src = "/eyeslash.svg";
          passwordRef.current.type = "text";
        } else {
            eyeRef.current.src = "/eye.svg";
            passwordRef.current.type = "password";
        }
      };

    useEffect(() => {
      let data = localStorage.getItem("rows")
      if (data){
        let rows = JSON.parse(data)
        setRows(rows)
      }
    }, [])

    const saveToLS = ()=>{
        localStorage.setItem("rows", JSON.stringify(rows))
    }
    

    const handleSave = async () => {
        if (row.site.length!=0 && row.username.length!=0 && row.password.length!=0){
            // await fetch('http://localhost:3000', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id: row.id})})
            // await fetch('http://localhost:3000', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...row, id: uuidv4()})})
            setRows([...rows, { ...row, id: uuidv4() }])
            setRow({ site: "", username: "", password: "" })
            toast('Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        else{
            toast('Fill empty field(s)', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        saveToLS()
    }

    const handleChange = (e) => {
        setRow({ ...row, [e.target.name]: e.target.value })
    }

    const handleDelete = async (id) => {
        let confirmation = confirm('Do you want to delete?')
        if (confirmation) {
            setRows(rows.filter(item => { return item.id !== id }))
            // await fetch('http://localhost:3000', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id})})

            toast('Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            saveToLS()
        }
    }

    const handleEdit = async (id) =>{
        setRow(rows.filter(item=>{return item.id==id})[0])
        setRows(rows.filter(item=>{return item.id!==id}))
        // await fetch('http://localhost:3000', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({id})})

        saveToLS()
    }

    const handleCopy = (item)=>{
        navigator.clipboard.writeText(item)
        toast('Copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className='bg-green-800 md:h-[75%] h-[70%] md:w-[50%] w-[90%] mx-auto my-10 p-4 rounded-xl text-white border-2 border-white flex flex-col gap-4 md:text-base text-[10px]'>
                <div className='text-center text-xl'>Your Passwords</div>
                <div>
                    <input onChange={handleChange} className='w-full p-2 rounded-xl text-black' type="text" name="site" id="site" value={row.site} placeholder='Enter URL' />
                </div>
                <div className='flex justify-center items-center gap-4 relative md:flex-row flex-col'>
                    <input onChange={handleChange} className='w-full p-2 rounded-xl text-black' type="text" name="username" id="username" value={row.username} placeholder='Enter username' />
                    <input ref={passwordRef} onChange={handleChange} className='w-full p-2 rounded-xl text-black ' type="password" name="password" id="password" value={row.password} placeholder='Enter password' /><img ref={eyeRef} onClick={handlePassword} src="/eye.svg" alt="" className='absolute md:bottom-2 md:right-[15%] right-[5%] bottom-[45%]' />
                    <button onClick={handleSave} className='rounded-xl bg-green-950 gap-2 flex justify-center items-center md:px-2 p-2 w-fit'><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        style={{ width: "25px", height: "25px" }}>
                    </lord-icon>Save</button>
                </div>
                <div className='container overflow-y-auto flex justify-center'>
                    <table className="md:table-auto table-fixed rounded-xl overflow-hidden border-separate w-full">
                        <thead className='bg-slate-900'>
                            <tr>
                                <th>URL</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((item, index) => {
                                return <tr key={index} className='text-center border-separate bg-green-950 p-2'>
                                    <td><div className='flex justify-center items-center gap-2 cursor-pointer px-2'><span className='truncate'>{item.site}</span><FaCopy className='w-[25px]' onClick={()=>{handleCopy(item.site)}} /></div></td>
                                    <td><div className='flex justify-center items-center gap-2 cursor-pointer px-2'><span className='truncate'>{item.username}</span><FaCopy className='w-[25px]' onClick={()=>{handleCopy(item.username)}} /></div></td>
                                    <td><div className='flex justify-center items-center gap-2 cursor-pointer px-2'><span className='truncate'>{"*".repeat(item.password.length)}</span><FaCopy className='w-[25px]' onClick={()=>{handleCopy(item.password)}} /></div></td>
                                    <td className='flex gap-2 justify-center cursor-pointer py-2'><FaEdit onClick={()=>{handleEdit(item.id)}}/><RiDeleteBin6Fill onClick={() => {handleDelete(item.id)}} /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Manager

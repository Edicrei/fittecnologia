'use client'

import Link from "next/link";
import axios from 'axios'; 
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useEffect, useState, SetStateAction } from "react";
import moment from 'moment';

import Modal from 'react-modal';
import router from "next/router";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
  },
};



export default function details() {

  const [autor, setAutor] = useState('');
  const [created, setCreated] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('')

  useEffect(() => {
    const bookid = localStorage.getItem("bookid");
    axios.get('http://localhost:3001/books/'+ bookid)
      .then((res) => {   
       setAutor(res.data.autor)
       setCreated(res.data.created)
       setDescription(res.data.description)
       setImage(res.data.image)
       setTitle(res.data.title)
      });
    
  }, []);
  

  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);

  const  openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () =>  {
    // references are now sync'd and can be accessed.

  }

  const closeModal= () =>  {
    setIsOpen(false);
  }

  const  openModal1 = () => {
    setIsOpen1(true);
  }

  const afterOpenModal1 = () =>  {
    // references are now sync'd and can be accessed.
   
  }

  const closeModal1= () =>  {
    setIsOpen1(false);
  }

  const datepicker = moment(created).format('DD/MM/YYYY');

  const updateBook = () =>{
    const bookid = localStorage.getItem("bookid");
    const newData = {
      autor: autor,
      description: description,
      title: title,
      created: created
    };
    
  
    axios.put(`http://localhost:3001/books/${bookid}`, newData)
      .then(response => {
        // Handle the response
        console.log(response)
      })
      .catch(error => {
        // Handle errors
        console.log(error)
      });
  }


  const deleteBook = async () =>{
    const bookid = localStorage.getItem("bookid");
    try {
      await axios.delete(`http://localhost:3001/books/${bookid}`);
      console.log("Post deleted:", bookid);
      
    } catch (error) {
      console.error("Error deleting post:", error);
    }

    return router.push('/')
  }

 


  return (
    <main
    className="flex min-h-screen flex-col items-center justify-between p-24 bg-white"
    >
    

     <div className='w-3/4 m-auto'>
           <div className="mt-10">
                <div className="flex flex-row ..." >
                <Link href="/"> 
                <div className="flex flex-row...">
                <p className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-1xl"> {"<"} </p>
                     <p className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl" style={{marginTop: 18}}>  Voltar</p>
                     </div>
                 </Link>
                    <p className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl" style={{marginLeft: 600}}   onClick={openModal}>Editar</p>
                    <p className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl" style={{marginLeft: 25, color: '#af0f0a'}}   onClick={openModal1}>Excluir</p>
                   
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2  className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl text-center">Novo Livro</h2>
                      <button onClick={closeModal}>x</button>
                      <form className="max-md mx-auto">

                      <div className="flex flex-row...">
                      <div >
                      <input type="text" id="title" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Titulo" defaultValue={title} onChange={e => setTitle(e.target.value)}  required style={{color: '#000', width: 400}} /> <br/>
                      <input type="text" id="autor" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Autor"  defaultValue={autor} onChange={e => setAutor(e.target.value)}  required style={{color: '#000'}} /> <br/>
                      <div className="flex flex-row...">
                          <input type="text"  id="date" value={datepicker} className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-96" disabled  required style={{color: '#000'}} /> 
                          <input type="date" required onChange={e => setCreated(e.target.value)}  style={{width: 20 }} />
                      </div>
                      <br/>
                      </div>
                                          
                      <div className="flex items-center justify-center w-full " style={{marginLeft: 25}}>
                          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-60 rounded-lg  bg-white-50 dark:hover:bg-white-800 dark:bg-white-700 hover:bg-white-100 dark:border-white-600 dark:hover:border-white-500 dark:hover:bg-white-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <img
                                className="fit-picture" 
                                src={image}
                                alt=""             
                                width="150.000000pt" 
                                height="210.000000pt" 
                                />
                              </div>
                          </label>
                      </div> 
                      </div>
                      <br/>
                      <textarea  id="description" className="block w-full p-4 ps-10 text-sm text-black-900 border border-gray-300 rounded-lg bg-black-50 focus:ring-white-500 focus:border-black-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-black-400 dark:text-white dark:focus:ring-white-500 dark:focus:border-white-500 w-full" placeholder="Descrição" defaultValue={description} onChange={e => setDescription(e.target.value)}   required style={{color: '#000'}} rows={4} cols={50}/>
                    
                      <div className="flex flex-row... " style={{marginLeft: 145, marginTop: 25}}>
                        <button type="button" style={{backgroundColor: '#D5D5D5', color:"#4D4D4D"}} onClick={closeModal}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-40">
                          Cancelar
                          </button>
                          <button type="button"  style={{backgroundColor: '#78C2EB', color: "#fff"}} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40" onClick={updateBook} >Salvar</button>
                          </div>
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                      </form>
                    </Modal>
                    
                    <Modal
                      isOpen={modalIsOpen1}
                      onAfterOpen={afterOpenModal1}
                      onRequestClose={closeModal1}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <h2   className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-1xl lg:text-1xl text-center">Tem Certeza?</h2>
                      <div className="text-gray-500 text-base text-ellipsis overflow-hidden ...">
                      <p className="text-gray-500 text-base text-ellipsis overflow-hidden ... text-center">
                                     Ao excluir não será possível recuperá-lo. Realmente  <p className="text-gray-500 text-base text-ellipsis overflow-hidden ...">  deseja excluí-lo?
                                    </p>
                                    </p>
                                    </div>
                      <button onClick={closeModal1}>x</button>
                      <form className="max-md mx-auto">

                     
                   
                      <div className="flex flex-row... " style={{marginLeft: 150, marginTop: 25}}>
                        <button type="button" style={{backgroundColor: '#D5D5D5', color:"#4D4D4D"}} onClick={closeModal1}
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-40">
                          Cancelar
                          </button>
                          <button type="button"  style={{backgroundColor: '#A70000', color: '#fff'}} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-40" onClick={deleteBook}>Excluir</button>
                          </div>
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                      </form>
                    </Modal>
                </div>
                
              
                  <div className="flex flex-col items-center bg-white   md:flex-row hover:bg-white-100 dark:border-white-700 dark:bg-white-800 dark:hover:bg-white-700 w-full">

                    
                        
                      <div className="flex flex-col justify-between p-1 leading-normal">
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray">{title}</h5>

                          <div className="flex flex-row...">
                              <div className="px py-4">
                              <p className="text-gray-500 text-base text-ellipsis  overflow-hidden ...">
                                por {autor}
                              </p>
                              </div>

                              <div className="px-6 py-4">
                              <p className="text-gray-500 text-base text-ellipsis overflow-hidden ..." style={{marginLeft: 150}}>
                                Publicado em  {datepicker} 
                              </p>
                              </div>
                              </div>
                              
                          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">{description}</p>
                      </div>


                             <figure className="max-w-lg">
                             
                                    
                                    <img 
                                    className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0" 
                                    src={image}  
                                    alt="image description" 
                                    style={{marginLeft: 80, marginTop:  40}}
                                    width="300"
                                    
                                    />

                                    </figure>
                                   

                               

                 
                  </div> 
                  
               </div>
                  
            </div> 
            
        </main>
  );
}
